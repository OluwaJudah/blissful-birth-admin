// lib/generateHtml.ts

import { pdfCSS } from './tailwind-pdf-css';

export function generateAppointmentHTML(base64Image: string, appointmentStr: string) {
  const date = new Date().toLocaleDateString();

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${pdfCSS}</style>
      </head>
      <body class="p-10 text-sm">
        <img src="${base64Image}" alt="Logo" class="w-1/2 mx-auto mb-3" />
        <h2 class="text-xl font-bold text-center mb-4 underline">Appointment Schedule</h2>
        <p>Co Registration: K2017378199</p>
        <p>Practice Number: 0834106</p>
        <p>SANC No: 11515228</p>
        <p>Cell No: +27 064 169 4887</p>
        <p>Clinic Address: Medical Suites, Florida Junction</p>
        <p>Birth Unit Address: 38 Simmer Street, Selwyn, Roodepoort</p>
        <p class="mb-4">Generated on: ${date}</p>

        <div class="flex justify-between w-3/4 pr-4">
          <p>Name:</p>
          <p>Tel No:</p>
          <p>EDD:</p>
        </div>

        <table class="w-full border-collapse border mx-4 text-xs">
          <thead>
            <tr class="bg-gray-200">
              <th class="border p-2">Week</th>
              <th class="border p-2">Date</th>
              <th class="border p-2">Time</th>
              <th class="border p-2">Notes</th>
            </tr>
          </thead>
          <tbody>${appointmentStr}</tbody>
        </table>
      </body>
    </html>
  `;
}
