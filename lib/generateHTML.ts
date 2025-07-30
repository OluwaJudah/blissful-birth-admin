// lib/generateHtml.ts

import { pdfCSS } from "./tailwind-pdf-css";

export function generateAppointmentHTML(
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
        <img src="${base64Image}" alt="Logo" class="w-1/2 mx-auto mb-4" />
        <h2 class="text-xl font-bold text-center mb-4 underline">APPOINTMENT SCHEDULE</h2>
        <div class="flex flex-col mb-4">
          <p><b>Co Registration:</b> K2017378199</p>
          <p><b>Practice Number:</b> 0834106</p>
          <p><b>SANC No:</b> 11515228</p>
          <p><b>Cell No:</b> +27 064 169 4887</p>
          <p><b>Clinic Address:</b> Medical Suites, Florida Junction</p>
          <p><b>Birth Unit Address:</b> 38 Simmer Street, Selwyn, Roodepoort</p>
          <p class=""><b>Generated on:</b> ${date}</p>
        </div>

        <div class="flex justify-between w-3/4 pr-4 font-bold">${motherInfoStr}</div>

        <table class="border-collapse border my-4 text-sm">
          <thead>
            <tr class="bg-gray-200">
              <th class="border p-2" style="width: 50px;">Week</th>
              <th class="border p-2" style="width: 120px;">Date</th>
              <th class="border p-2" style="width: 70px;">Time</th>
              <th class="border p-2">Notes</th>
            </tr>
          </thead>
          <tbody>${appointmentStr}</tbody>
        </table>

        <p class="font-bold text-sm">Signature: ___________________________</p>
      </body>
    </html>
  `;
}
