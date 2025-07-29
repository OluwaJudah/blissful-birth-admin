// app/api/generate-pdf/route.ts
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { getMotherAppointments } from "@/data/appointment";

const css = `
  body.p-10 { padding: 2.5rem; font-size: 0.875rem; }
  img.w-1\\/2 { width: 50%; }
  img.mx-auto { margin-left: auto; margin-right: auto; }
  img.mb-3 { margin-bottom: 0.75rem; }
  h2.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  h2.font-bold { font-weight: 700; }
  h2.text-center { text-align: center; }
  h2.mb-4 { margin-bottom: 1rem; }
  h2.underline { text-decoration: underline; }
  p.mb-4 { margin-bottom: 1rem; }
  div.flex { display: flex; }
  div.justify-between { justify-content: space-between; }
  div.w-3\\/4 { width: 75%; }
  div.pr-4 { padding-right: 1rem; }
  table.w-full { width: 100%; }
  table.border-collapse { border-collapse: collapse; }
  table.border { border: 1px solid #d1d5db; }
  table.mx-4 { margin-left: 1rem; margin-right: 1rem; }
  table.text-xs { font-size: 0.75rem; line-height: 1rem; }
  thead tr.bg-gray-200 { background-color: #e5e7eb; }
  th.border, td.border { border: 1px solid #d1d5db; }
  th.p-2, td.p-2 { padding: 0.5rem; }
`;

const base64Image =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDQiIGZpbGw9Im5vbmUiPjxnIHN0eWxlPSJmaWxsOiByZ2IoMCwgMCwgMCk7Ij48ZyBzdHlsZT0iZmlsbDogcmdiKDAsIDAsIDApOyI+PHBhdGggZD0iTTU3LjkwNSw1LjAyN0M1Ny45MDUsMi4yNTEsNTkuOTcwLDAuMDAwLDYyLjUxNiwwLjAwMEM2NS4wNjIsMC4wMDAsNjcuMTI2LDIuMjUxLDY3LjEyNiw1LjAyN0M2Ny4xMjYsNy44MDMsNjUuMDYyLDEwLjA1NCw2Mi41MTYsMTAuMDU0QzU5Ljk3MCwxMC4wNTQsNTcuOTA1LDcuODAzLDU3LjkwNSw1LjAyN1paIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoNjEsIDE0NSwgMTU2KTsgZmlsbC1vcGFjaXR5OiAxOyIgY2xhc3M9ImZpbGxzIi8+PGcgc3R5bGU9ImZpbGw6IHJnYigwLCAwLCAwKTsiPjxwYXRoIGQ9Ik01NS4yNzEsMjEuOTAzQzU1LjI3MSwxNy4zNDIsNTguNjYyLDEzLjY0NSw2Mi44NDUsMTMuNjQ1QzY3LjAyOSwxMy42NDUsNzAuNDIwLDE3LjM0Miw3MC40MjAsMjEuOTAzQzcwLjQyMCwyNi40NjQsNjcuMDI5LDMwLjE2Miw2Mi44NDUsMzAuMTYyQzU4LjY2MiwzMC4xNjIsNTUuMjcxLDI2LjQ2NCw1NS4yNzEsMjEuOTAzWloiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3R5bGU9ImZpbGw6IHJnYig2MSwgMTQ1LCAxNTYpOyBmaWxsLW9wYWNpdHk6IDE7IiBjbGFzcz0iZmlsbHMiLz48cGF0aCBkPSJNNTcuMjQ3LDIxLjkwM0M1Ny4yNDcsMTguNTMyLDU5Ljc1MywxNS43OTksNjIuODQ1LDE1Ljc5OUM2NS45MzcsMTUuNzk5LDY4LjQ0NCwxOC41MzIsNjguNDQ0LDIxLjkwM0M2OC40NDQsMjUuMjc1LDY1LjkzNywyOC4wMDgsNjIuODQ1LDI4LjAwOEM1OS43NTMsMjguMDA4LDU3LjI0NywyNS4yNzUsNTcuMjQ3LDIxLjkwM1paIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7IiBjbGFzcz0iZmlsbHMiLz48ZyBzdHlsZT0iZmlsbDogcmdiKDAsIDAsIDApOyI+PHBhdGggZD0iTTYyLjg0NSwyNS4xMzVMNTkuNTUyLDIwLjM5NUw2Ni4xMzgsMjAuMzk1TDYyLjg0NSwyNS4xMzVaWiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHlsZT0iZmlsbDogcmdiKDIyNSwgNjEsIDc5KTsiIGNsYXNzPSJmaWxscyIvPjxwYXRoIGQ9Ik01OS41NTIsMjAuMDcyQzU5LjU1MiwxOS4yOTksNjAuMzEyLDE4LjY3Miw2MS4yNDksMTguNjcyQzYyLjE4NSwxOC42NzIsNjIuOTQ1LDE5LjI5OSw2Mi45NDUsMjAuMDcyQzYyLjk0NSwyMC44NDUsNjIuMTg1LDIxLjQ3Miw2MS4yNDksMjEuNDcyQzYwLjMxMiwyMS40NzIsNTkuNTUyLDIwLjg0NSw1OS41NTIsMjAuMDcyWloiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3R5bGU9ImZpbGw6IHJnYigyMjUsIDYxLCA3OSk7IiBjbGFzcz0iZmlsbHMiLz48cGF0aCBkPSJNNjIuNzQ2LDIwLjA3MkM2Mi43NDYsMTkuMjk5LDYzLjUwNSwxOC42NzIsNjQuNDQyLDE4LjY3MkM2NS4zNzksMTguNjcyLDY2LjEzOSwxOS4yOTksNjYuMTM5LDIwLjA3MkM2Ni4xMzksMjAuODQ1LDY1LjM3OSwyMS40NzIsNjQuNDQyLDIxLjQ3MkM2My41MDUsMjEuNDcyLDYyLjc0NiwyMC44NDUsNjIuNzQ2LDIwLjA3MlpaIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoMjI1LCA2MSwgNzkpOyIgY2xhc3M9ImZpbGxzIi8+PC9nPjwvZz48ZyBzdHlsZT0iZmlsbDogcmdiKDAsIDAsIDApOyI+PHJlY3Qgd2lkdGg9IjIuNjM1IiBoZWlnaHQ9IjEzLjY0NSIgeD0iNTguNTY0IiB0cmFuc2Zvcm09Im1hdHJpeCgxLjAwMDAwMCwgMC4wMDAwMDAsIDAuMDAwMDAwLCAxLjAwMDAwMCwgMC4wMDAwMDAsIDAuMDAwMDAwKSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHlsZT0iZmlsbDogcmdiKDYxLCAxNDUsIDE1Nik7IGZpbGwtb3BhY2l0eTogMTsiIHJ5PSIwIiByeD0iMCIgeT0iMjguNzI2IiBjbGFzcz0iZmlsbHMiLz48cmVjdCB3aWR0aD0iMi42MzUiIGhlaWdodD0iMTMuNjQ1IiB4PSI2NC40OTIiIHRyYW5zZm9ybT0ibWF0cml4KDEuMDAwMDAwLCAwLjAwMDAwMCwgMC4wMDAwMDAsIDEuMDAwMDAwLCAwLjAwMDAwMCwgMC4wMDAwMDApIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoNjEsIDE0NSwgMTU2KTsgZmlsbC1vcGFjaXR5OiAxOyIgcnk9IjAiIHJ4PSIwIiB5PSIyOC43MjYiIGNsYXNzPSJmaWxscyIvPjwvZz48ZyBzdHlsZT0iZmlsbDogcmdiKDAsIDAsIDApOyI+PHBhdGggZD0iTTYyLjczMyw5LjI1Mkw3Ni40MjIsMTcuODcwTDc0LjU1NSwyMS4zOTZMNjAuODY1LDEyLjc3OEw2Mi43MzMsOS4yNTJaWiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHlsZT0iZmlsbDogcmdiKDYxLCAxNDUsIDE1Nik7IGZpbGwtb3BhY2l0eTogMTsiIGNsYXNzPSJmaWxscyIvPjxwYXRoIGQ9Ik02NC45MDAsMTIuNzc4TDUxLjIxMSwyMS4zOTZMNDkuMzQ0LDE3Ljg2OUw2My4wMzMsOS4yNTJMNjQuOTAwLDEyLjc3OFpaIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoNjEsIDE0NSwgMTU2KTsgZmlsbC1vcGFjaXR5OiAxOyIgY2xhc3M9ImZpbGxzIi8+PC9nPjwvZz48ZyBzdHlsZT0iZmlsbDogcmdiKDAsIDAsIDApOyI+PGcgc3R5bGU9ImZpbGw6IHJnYigwLCAwLCAwKTsiPjxyZWN0IHdpZHRoPSIzOC45MDYiIGhlaWdodD0iMjcuMzUxIiB4PSI4OS4zODUiIHRyYW5zZm9ybT0ibWF0cml4KDEuMDAwMDAwLCAwLjAwMDAwMCwgMC4wMDAwMDAsIDEuMDAwMDAwLCAwLjAwMDAwMCwgMC4wMDAwMDApIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoNjEsIDE0NSwgMTU2KTsgZmlsbC1vcGFjaXR5OiAxOyIgcnk9IjAiIHJ4PSIwIiB5PSIxNi42NDkiIGNsYXNzPSJmaWxscyIvPjxnIHN0eWxlPSJmaWxsOiByZ2IoMCwgMCwgMCk7Ij48cGF0aCBkPSJNMTAzLjE3NSwzMC4zMjRDMTAzLjE3NSwyNi41NDgsMTA1LjcxMCwyMy40ODYsMTA4LjgzOCwyMy40ODZDMTExLjk2NiwyMy40ODYsMTE0LjUwMiwyNi41NDgsMTE0LjUwMiwzMC4zMjRDMTE0LjUwMiwzNC4xMDEsMTExLjk2NiwzNy4xNjIsMTA4LjgzOCwzNy4xNjJDMTA1LjcxMCwzNy4xNjIsMTAzLjE3NSwzNC4xMDEsMTAzLjE3NSwzMC4zMjRaWiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHlsZT0iZmlsbDogcmdiKDYxLCAxNDUsIDE1Nik7IGZpbGwtb3BhY2l0eTogMTsiIGNsYXNzPSJmaWxscyIvPjxwYXRoIGQ9Ik0xMDQuNjUyLDMwLjMyNEMxMDQuNjUyLDI3LjUzMywxMDYuNTI2LDI1LjI3MCwxMDguODM4LDI1LjI3MEMxMTEuMTUwLDI1LjI3MCwxMTMuMDI0LDI3LjUzMywxMTMuMDI0LDMwLjMyNEMxMTMuMDI0LDMzLjExNiwxMTEuMTUwLDM1LjM3OCwxMDguODM4LDM1LjM3OEMxMDYuNTI2LDM1LjM3OCwxMDQuNjUyLDMzLjExNiwxMDQuNjUyLDMwLjMyNFpaIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7IiBjbGFzcz0iZmlsbHMiLz48ZyBzdHlsZT0iZmlsbDogcmdiKDAsIDAsIDApOyI+PHBhdGggZD0iTTEwOC44MzgsMzMuMDAwTDEwNi4zNzYsMjkuMDc2TDExMS4zMDEsMjkuMDc2TDEwOC44MzgsMzMuMDAwWloiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3R5bGU9ImZpbGw6IHJnYigyMjUsIDYxLCA3OSk7IiBjbGFzcz0iZmlsbHMiLz48cGF0aCBkPSJNMTA2LjM3NiwyOC44MDhDMTA2LjM3NiwyOC4xNjgsMTA2Ljk0NCwyNy42NDksMTA3LjY0NCwyNy42NDlDMTA4LjM0NSwyNy42NDksMTA4LjkxMywyOC4xNjgsMTA4LjkxMywyOC44MDhDMTA4LjkxMywyOS40NDgsMTA4LjM0NSwyOS45NjgsMTA3LjY0NCwyOS45NjhDMTA2Ljk0NCwyOS45NjgsMTA2LjM3NiwyOS40NDgsMTA2LjM3NiwyOC44MDhaWiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHlsZT0iZmlsbDogcmdiKDIyNSwgNjEsIDc5KTsiIGNsYXNzPSJmaWxscyIvPjxwYXRoIGQ9Ik0xMDguNzY0LDI4LjgwOEMxMDguNzY0LDI4LjE2OCwxMDkuMzMyLDI3LjY0OSwxMTAuMDMyLDI3LjY0OUMxMTAuNzMzLDI3LjY0OSwxMTEuMzAxLDI4LjE2OCwxMTEuMzAxLDI4LjgwOEMxMTEuMzAxLDI5LjQ0OCwxMTAuNzMzLDI5Ljk2OCwxMTAuMDMyLDI5Ljk2OEMxMDkuMzMyLDI5Ljk2OCwxMDguNzY0LDI5LjQ0OCwxMDguNzY0LDI4LjgwOFpaIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoMjI1LCA2MSwgNzkpOyIgY2xhc3M9ImZpbGxzIi8+PC9nPjwvZz48L2c+PHBhdGggZD0iTTEwOC44MzgsMC4wMDBMMTMxLjAwMCwxNy4yNDNMODYuNjc3LDE3LjI0M0wxMDguODM4LDAuMDAwWloiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3R5bGU9ImZpbGw6IHJnYig2MSwgMTQ1LCAxNTYpOyBmaWxsLW9wYWNpdHk6IDE7IiBjbGFzcz0iZmlsbHMiLz48cmVjdCB3aWR0aD0iNS40MTciIGhlaWdodD0iMTQuMjciIHg9IjExOS42NzMiIHRyYW5zZm9ybT0ibWF0cml4KDEuMDAwMDAwLCAwLjAwMDAwMCwgMC4wMDAwMDAsIDEuMDAwMDAwLCAwLjAwMDAwMCwgMC4wMDAwMDApIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoNjEsIDE0NSwgMTU2KTsgZmlsbC1vcGFjaXR5OiAxOyIgcnk9IjAiIHJ4PSIwIiB5PSIyLjM3OCIgY2xhc3M9ImZpbGxzIi8+PC9nPjxnIHN0eWxlPSJmaWxsOiByZ2IoMCwgMCwgMCk7Ij48ZyBzdHlsZT0iZmlsbDogcmdiKDAsIDAsIDApOyI+PHJlY3Qgd2lkdGg9IjM4LjkwNiIgaGVpZ2h0PSIyNy4zNTEiIHg9Ii4xODMiIHRyYW5zZm9ybT0ibWF0cml4KDEuMDAwMDAwLCAwLjAwMDAwMCwgMC4wMDAwMDAsIDEuMDAwMDAwLCAwLjAwMDAwMCwgMC4wMDAwMDApIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoNjEsIDE0NSwgMTU2KTsgZmlsbC1vcGFjaXR5OiAxOyIgcnk9IjAiIHJ4PSIwIiB5PSIxMS4wODgiIGNsYXNzPSJmaWxscyIvPjxnIHN0eWxlPSJmaWxsOiByZ2IoMCwgMCwgMCk7Ij48cGF0aCBkPSJNMTMuOTcyLDI0Ljc2NEMxMy45NzIsMjAuOTg3LDE2LjUwOCwxNy45MjYsMTkuNjM2LDE3LjkyNkMyMi43NjQsMTcuOTI2LDI1LjMwMCwyMC45ODcsMjUuMzAwLDI0Ljc2NEMyNS4zMDAsMjguNTQwLDIyLjc2NCwzMS42MDIsMTkuNjM2LDMxLjYwMkMxNi41MDgsMzEuNjAyLDEzLjk3MiwyOC41NDAsMTMuOTcyLDI0Ljc2NFpaIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoNjEsIDE0NSwgMTU2KTsgZmlsbC1vcGFjaXR5OiAxOyIgY2xhc3M9ImZpbGxzIi8+PHBhdGggZD0iTTE1LjQ1MCwyNC43NjRDMTUuNDUwLDIxLjk3MiwxNy4zMjQsMTkuNzEwLDE5LjYzNiwxOS43MTBDMjEuOTQ4LDE5LjcxMCwyMy44MjIsMjEuOTcyLDIzLjgyMiwyNC43NjRDMjMuODIyLDI3LjU1NSwyMS45NDgsMjkuODE4LDE5LjYzNiwyOS44MThDMTcuMzI0LDI5LjgxOCwxNS40NTAsMjcuNTU1LDE1LjQ1MCwyNC43NjRaWiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyIgY2xhc3M9ImZpbGxzIi8+PGcgc3R5bGU9ImZpbGw6IHJnYigwLCAwLCAwKTsiPjxwYXRoIGQ9Ik0xOS42MzYsMjcuNDM5TDE3LjE3NCwyMy41MTVMMjIuMDk4LDIzLjUxNUwxOS42MzYsMjcuNDM5WloiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3R5bGU9ImZpbGw6IHJnYigyMjUsIDYxLCA3OSk7IiBjbGFzcz0iZmlsbHMiLz48cGF0aCBkPSJNMTcuMTc0LDIzLjI0OEMxNy4xNzQsMjIuNjA3LDE3Ljc0MSwyMi4wODgsMTguNDQyLDIyLjA4OEMxOS4xNDMsMjIuMDg4LDE5LjcxMSwyMi42MDcsMTkuNzExLDIzLjI0OEMxOS43MTEsMjMuODg4LDE5LjE0MywyNC40MDcsMTguNDQyLDI0LjQwN0MxNy43NDEsMjQuNDA3LDE3LjE3NCwyMy44ODgsMTcuMTc0LDIzLjI0OFpaIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0eWxlPSJmaWxsOiByZ2IoMjI1LCA2MSwgNzkpOyIgY2xhc3M9ImZpbGxzIi8+PHBhdGggZD0iTTE5LjU2MiwyMy4yNDhDMTkuNTYyLDIyLjYwNywyMC4xMzAsMjIuMDg4LDIwLjgzMCwyMi4wODhDMjEuNTMxLDIyLjA4OCwyMi4wOTksMjIuNjA3LDIyLjA5OSwyMy4yNDhDMjIuMDk5LDIzLjg4OCwyMS41MzEsMjQuNDA3LDIwLjgzMCwyNC40MDdDMjAuMTMwLDI0LjQwNywxOS41NjIsMjMuODg4LDE5LjU2MiwyMy4yNDhaWiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHlsZT0iZmlsbDogcmdiKDIyNSwgNjEsIDc5KTsiIGNsYXNzPSJmaWxscyIvPjwvZz48L2c+PC9nPjxyZWN0IHdpZHRoPSI1LjkxIiBoZWlnaHQ9IjIuOTczIiB4PSI5LjA0OCIgdHJhbnNmb3JtPSJtYXRyaXgoMS4wMDAwMDAsIDAuMDAwMDAwLCAwLjAwMDAwMCwgMS4wMDAwMDAsIDAuMDAwMDAwLCAwLjAwMDAwMCkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3R5bGU9ImZpbGw6IHJnYig2MSwgMTQ1LCAxNTYpOyBmaWxsLW9wYWNpdHk6IDE7IiByeT0iMCIgcng9IjAiIHk9IjguMTE1IiBjbGFzcz0iZmlsbHMiLz48cmVjdCB3aWR0aD0iNy4zODciIGhlaWdodD0iNC4xNjIiIHg9IjIyLjgzNyIgdHJhbnNmb3JtPSJtYXRyaXgoMS4wMDAwMDAsIDAuMDAwMDAwLCAwLjAwMDAwMCwgMS4wMDAwMDAsIDAuMDAwMDAwLCAwLjAwMDAwMCkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3R5bGU9ImZpbGw6IHJnYig2MSwgMTQ1LCAxNTYpOyBmaWxsLW9wYWNpdHk6IDE7IiByeT0iMCIgcng9IjAiIHk9IjYuOTI2IiBjbGFzcz0iZmlsbHMiLz48L2c+PC9nPjwvc3ZnPg==";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body class="p-10 text-sm">
          <img src="${base64Image}" alt="Logo" class="w-1/2 mx-auto mb-3" />
          <h2 class="text-xl font-bold text-center mb-4 underline">Appointment Schedule</h2>
          <p>Co Registration: K2017378199</p>
          <p>Practice Number: 0834106</p>
          <p>SANC No: 11515228</p>
          <p>Cell No: + 27 064 169 4887</p>
          <p>Clinic Address: Medical Suites, Florida Junction</p>
          <p>Birth Unit Address: 38 Simmer Street, Selwyn, Roodepoort</p>
          <p class="mb-4">Generated on: ${new Date().toLocaleDateString()}</p>

          <div class="flex justify-between w-3/4 pr-4">
            <p>Name:</p>
            <p>Tel No: </p>
            <p>EDD: </p>
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

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // works on Vercel or Railway
    });

    const page = await browser.newPage();
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
