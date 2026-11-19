import type { OrgPassTemplate } from "./orgTemplates";
import { PassQrCode } from "./PassQrCode";

export type OrgBadgeData = {
  name?: string;
  role?: string;
  organization?: string;
  idNumber?: string;
  validUntil?: string;
  photoUrl?: string;
  verificationUrl?: string;
  qrUrl?: string;
  passNumber?: string;
};

type OrgBadgePreviewProps = {
  template: OrgPassTemplate;
  data?: OrgBadgeData;
  /** Max width of the badge in px. */
  maxWidth?: number;
};

export function OrgBadgePreview({ template, data, maxWidth = 220 }: OrgBadgePreviewProps) {
  const { primary, secondary, accent, text, paper, layout, label } = template;
  const dark = paper === "#181818";
  const muted = dark ? "rgba(245,240,220,0.35)" : `${text}33`;
  const live = Boolean(data);

  const photo = (
    <div
      className="flex items-center justify-center overflow-hidden rounded-md"
      style={{
        width: layout === "sidebar" ? (data?.qrUrl || data?.verificationUrl ? "30%" : "55%") : "36%",
        aspectRatio: "3 / 4",
        background: muted,
      }}
    >
      {data?.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.photoUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill={dark ? "#f5f0dc66" : `${text}66`}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
        </svg>
      )}
    </div>
  );

  const details = live ? (
    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
      <div className="break-words text-[13px] font-bold leading-tight">
        {data?.name || "Full Name"}
      </div>
      <div className="break-words text-[10px] leading-tight" style={{ opacity: 0.75 }}>
        {data?.role || "Role / Title"}
      </div>
      {(data?.idNumber || data?.passNumber) && (
        <div className="mt-1 text-[9px] font-semibold tracking-wider" style={{ opacity: 0.6 }}>
          ID {data.passNumber || data.idNumber}
        </div>
      )}
      {data?.validUntil && (
        <div className="text-[9px] tracking-wider" style={{ opacity: 0.6 }}>
          VALID UNTIL {data.validUntil}
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-1 flex-col justify-center gap-2">
      <div className="h-3 w-4/5 rounded" style={{ background: text, opacity: 0.85 }} />
      <div className="h-2 w-3/5 rounded" style={{ background: muted }} />
      <div className="h-2 w-2/5 rounded" style={{ background: muted }} />
    </div>
  );

  const orgLine = live ? (
    <div
      className="truncate text-[10px] font-bold uppercase tracking-widest"
      style={{ color: accent }}
    >
      {data?.organization || "Organization"}
    </div>
  ) : (
    <div className="h-2 w-1/3 rounded" style={{ background: accent }} />
  );

  return (
    <div
      className="mx-auto flex aspect-[3/4] w-full flex-col overflow-hidden rounded-xl shadow-xl"
      style={{ background: paper, color: text, maxWidth }}
      role="img"
      aria-label={`${template.name} badge preview`}
    >
      {layout === "sidebar" ? (
        <div className="flex h-full">
          <div className="flex w-9 items-center justify-center" style={{ background: primary }}>
            <span
              className="whitespace-nowrap text-[10px] font-bold tracking-[0.3em]"
              style={{ color: accent, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {label}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col p-3">
            {orgLine}
            <div className="mt-4 flex justify-center">{photo}</div>
            <div className="mt-4 flex flex-col">{details}</div>
            {data?.qrUrl ? (
              <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                <span className="break-all font-mono text-[9px] font-bold">{data.passNumber}</span>
                <div className="shrink-0 rounded bg-white p-1" style={{ width: "38%", maxWidth: 112 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.qrUrl} alt="Verification QR" className="aspect-square w-full" />
                </div>
              </div>
            ) : live ? (
              <div className="mt-auto flex flex-col items-center gap-1 border-t border-black/10 pt-2 dark:border-white/10">
                <div className="rounded bg-white p-1 shadow-xs">
                  <PassQrCode
                    value={
                      data?.verificationUrl ||
                      `https://passify.app/verify/${encodeURIComponent(data?.idNumber || data?.name || "DEMO-PASS")}`
                    }
                    size={42}
                  />
                </div>
                <span className="text-[7px] font-bold tracking-widest uppercase opacity-60">SCAN TO VERIFY</span>
              </div>
            ) : (
              <div className="mt-auto h-6 rounded-sm" style={{ background: accent, opacity: 0.8 }} />
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className={layout === "banner" ? "px-4 py-5" : "px-4 py-3"}
            style={{
              background: `linear-gradient(135deg, ${primary}, ${secondary})`,
              borderBottom: `3px solid ${accent}`,
            }}
          >
            {orgLine}
            {layout === "banner" && !live && <div className="mt-2 h-1.5 w-1/2 rounded bg-white/40" />}
          </div>
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="flex gap-3">
              {photo}
              {details}
            </div>
            {data?.qrUrl ? (
              <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                <span className="break-all font-mono text-[9px] font-bold">{data.passNumber}</span>
                <div className="shrink-0 rounded bg-white p-1" style={{ width: "38%", maxWidth: 112 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.qrUrl} alt="Verification QR" className="aspect-square w-full" />
                </div>
              </div>
            ) : live ? (
              <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-2 dark:border-white/10">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[8px] font-bold tracking-widest uppercase opacity-75">VERIFICATION</span>
                  <span className="font-mono text-[8px] opacity-60">
                    {data?.passNumber || data?.idNumber || "PASSIFY-SECURE"}
                  </span>
                  <span className="text-[7px] font-bold uppercase tracking-wider text-emerald-500">● ACTIVE PASS</span>
                </div>
                <div className="rounded bg-white p-1 shadow-xs">
                  <PassQrCode
                    value={
                      data?.verificationUrl ||
                      `https://passify.app/verify/${encodeURIComponent(data?.idNumber || data?.name || "DEMO-PASS")}`
                    }
                    size={44}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-auto grid grid-cols-5 gap-[2px]">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-[1px]"
                    style={{ background: text, opacity: i % 3 === 0 ? 0.8 : 0.25 }}
                  />
                ))}
              </div>
            )}
          </div>
          <div
            className="py-1.5 text-center text-[10px] font-bold tracking-[0.35em]"
            style={{ background: primary, color: dark ? accent : "#fff" }}
          >
            {label}
          </div>
        </>
      )}
    </div>
  );
}
