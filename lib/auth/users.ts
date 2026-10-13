import { randomBytes, randomUUID, scrypt, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import type { Workspace } from "../../components/auth/workspace";

const scryptAsync = promisify(scrypt) as (password: string, salt: Buffer, keyLength: number) => Promise<Buffer>;

// Local JSON store — fine for development; swap for a real database before deploying.
const USERS_FILE = path.join(process.cwd(), "data", "users.json");

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  workspace: Workspace;
  passwordHash: string;
  createdAt: string;
};

async function readUsers(): Promise<StoredUser[]> {
  try {
    return JSON.parse(await readFile(USERS_FILE, "utf8")) as StoredUser[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeUsers(users: StoredUser[]) {
  await mkdir(path.dirname(USERS_FILE), { recursive: true });
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, 64);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string) {
  const [saltHex, hashHex] = stored.split(":");
  const expected = Buffer.from(hashHex, "hex");
  const actual = await scryptAsync(password, Buffer.from(saltHex, "hex"), expected.length);
  return timingSafeEqual(expected, actual);
}

/** Returns null when an account with this email already exists in the workspace. */
export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  workspace: Workspace;
}): Promise<StoredUser | null> {
  const users = await readUsers();
  if (users.some((user) => user.email === input.email && user.workspace === input.workspace)) {
    return null;
  }

  const user: StoredUser = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    workspace: input.workspace,
    passwordHash: await hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeUsers(users);
  return user;
}

export async function authenticateUser(email: string, password: string, workspace: Workspace) {
  const user = (await readUsers()).find((u) => u.email === email && u.workspace === workspace);
  if (!user) return null;
  return (await verifyPassword(password, user.passwordHash)) ? user : null;
}
