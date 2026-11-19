import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export type ExportOptions = {
  pixelRatio?: number;
  filename?: string;
  pdfOrientation?: "portrait" | "landscape";
  badgeWidthMm?: number;
};

/**
 * Downloads the specified DOM element as a high-resolution PNG image.
 */
export async function exportToPng(
  element: HTMLElement,
  filename = "pass.png",
  pixelRatio = 2.5
): Promise<string> {
  const dataUrl = await toPng(element, {
    pixelRatio,
    cacheBust: true,
    filter: (node) => {
      // Exclude elements marked with data-no-export
      if (node instanceof HTMLElement && node.getAttribute("data-no-export") === "true") {
        return false;
      }
      return true;
    },
  });

  const link = document.createElement("a");
  link.download = filename.endsWith(".png") ? filename : `${filename}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return dataUrl;
}

/**
 * Exports the specified DOM element to a cleanly formatted PDF document.
 */
export async function exportToPdf(
  element: HTMLElement,
  filename = "pass.pdf",
  options?: ExportOptions
): Promise<void> {
  const pixelRatio = options?.pixelRatio ?? 2.5;
  const dataUrl = await toPng(element, {
    pixelRatio,
    cacheBust: true,
    filter: (node) => {
      if (node instanceof HTMLElement && node.getAttribute("data-no-export") === "true") {
        return false;
      }
      return true;
    },
  });

  const rect = element.getBoundingClientRect();
  const isLandscape = rect.width > rect.height;
  const orientation = options?.pdfOrientation ?? (isLandscape ? "landscape" : "portrait");

  // Standard A4 dimensions in mm: 210 x 297
  const pdf = new jsPDF({
    orientation,
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Desired printable badge width in mm (e.g. 85mm for standard credit card/ID width, or scaled to page)
  const maxContentWidth = Math.min(pageWidth - 40, isLandscape ? 140 : 100);
  const elementAspect = rect.height / rect.width;
  const pdfImgWidth = maxContentWidth;
  const pdfImgHeight = pdfImgWidth * elementAspect;

  const x = (pageWidth - pdfImgWidth) / 2;
  const y = (pageHeight - pdfImgHeight) / 2;

  // Add header text
  pdf.setFontSize(10);
  pdf.setTextColor(100, 116, 139);
  pdf.text("Passify - Verified Digital Pass", pageWidth / 2, y - 8, { align: "center" });

  // Add pass badge image
  pdf.addImage(dataUrl, "PNG", x, y, pdfImgWidth, pdfImgHeight, undefined, "FAST");

  // Add cut guide / instructions at bottom
  pdf.setFontSize(8);
  pdf.setTextColor(148, 163, 184);
  pdf.text("Cut along edges or fold for standard ID lanyard holder.", pageWidth / 2, y + pdfImgHeight + 10, {
    align: "center",
  });

  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}

/**
 * Triggers clean browser printing for the pass by rendering the badge in an isolated iframe.
 * Prevents website backgrounds, arcade styling, and UI controls from appearing on paper.
 */
export async function printPass(element: HTMLElement): Promise<void> {
  const dataUrl = await toPng(element, {
    pixelRatio: 2.5,
    cacheBust: true,
    filter: (node) => {
      if (node instanceof HTMLElement && node.getAttribute("data-no-export") === "true") {
        return false;
      }
      return true;
    },
  });

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.top = "-9999px";
  iframe.style.left = "-9999px";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    throw new Error("Unable to create print window.");
  }

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Pass - Passify</title>
        <style>
          @page {
            size: auto;
            margin: 15mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #ffffff;
            font-family: system-ui, -apple-system, sans-serif;
          }
          .pass-container {
            max-width: 90mm;
            width: 100%;
            text-align: center;
          }
          img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border-radius: 8px;
          }
          .guide {
            margin-top: 10mm;
            font-size: 11px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="pass-container">
          <img src="${dataUrl}" alt="Pass Printout" onload="window.focus(); window.print();" />
          <p class="guide">Passify Verified Pass · Cut along border</p>
        </div>
      </body>
    </html>
  `);
  doc.close();

  // Clean up iframe after printing dialog closes
  setTimeout(() => {
    if (document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
  }, 3000);
}
