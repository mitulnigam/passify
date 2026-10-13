import { logout } from "../../lib/auth/actions";
import type { Workspace } from "./workspace";

export function LogoutButton({ workspace }: { workspace: Workspace }) {
  return (
    <form action={logout}>
      <input type="hidden" name="workspace" value={workspace} />
      <button
        type="submit"
        className="rounded-full border-2 border-slate-500/60 px-6 py-3 text-sm font-bold text-slate-200 font-pixel hover:border-white hover:text-white"
      >
        LOG OUT
      </button>
    </form>
  );
}
