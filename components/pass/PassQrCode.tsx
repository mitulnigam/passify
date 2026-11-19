"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

type PassQrCodeProps = {
  value: string;
  size?: number;
  colorDark?: string;
  colorLight?: string;
  className?: string;
  alt?: string;
};

export function PassQrCode({
  value,
  size = 96,
  colorDark = "#000000",
  colorLight = "#ffffff",
  className = "",
  alt = "Pass Verification QR Code",
}: PassQrCodeProps) {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!value) {
      setDataUrl("");
      return;
    }

    QRCode.toDataURL(value, {
      width: size * 2, // render at 2x for retina crispness
      margin: 1,
      color: {
        dark: colorDark,
        light: colorLight,
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (isMounted) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("QR Code generation error:", err);
          setError("Failed to generate QR code");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [value, size, colorDark, colorLight]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-rose-950/40 text-[9px] text-rose-300 ${className}`}
        style={{ width: size, height: size }}
      >
        QR Error
      </div>
    );
  }

  if (!dataUrl) {
    return (
      <div
        className={`flex animate-pulse items-center justify-center rounded bg-slate-800/40 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={dataUrl}
      alt={alt}
      width={size}
      height={size}
      className={`rounded ${className}`}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
