import { NextResponse } from "next/server";
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import fs from "fs";
import { getMotherAppointments } from "@/data/appointment";

const css = fs.readFileSync("./pdf-template.css", "utf8");
const base64Image = fs.readFileSync("./public/blissfulLogo2.svg", "base64");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const appointments = await getMotherAppointments(id);

  const appointmentStr = appointments.reduce((acc, appointment) => {
    const date = new Date(appointment.date);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return (
      acc +
      `<tr>
        <td class="border p-2">${appointment.pregnancyWeeks}</td>
        <td class="border p-2">${formattedDate}</td>
        <td class="border p-2">${appointment.time}</td>
        <td class="border p-2">${appointment.note}</td>
      </tr>`
    );
  }, "");

  try {
    const executablePath = await chromium.executablePath;

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: executablePath || undefined,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Appointment Report</title>
          <style>${css}</style>
        </head>
        <body class="p-10 text-sm">
          <img src="data:image/svg+xml;base64,${base64Image}" alt="Logo" class="w-1/2 mx-auto mb-3" />
          <h2 class="text-xl font-bold text-center mb-4 underline">Appointment Schedule</h2>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
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

    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="appointment-report.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return new NextResponse("Failed to generate PDF", { status: 500 });
  }
}
