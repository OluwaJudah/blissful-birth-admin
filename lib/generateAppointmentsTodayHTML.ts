// lib/generateHtml.ts

import { pdfCSS } from "./tailwind-pdf-css";

export function generateAppointmentsTodayHTML(
  base64Image: string,
  appointmentStr: string,
  motherInfoStr: string
) {
  const date = new Date().toLocaleDateString();

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${pdfCSS}</style>
      </head>
      <body class="p-10 text-sm">
        <div className="flex flex-col gap-2">
        
        </div>
      </body>
    </html>
  `;
}
