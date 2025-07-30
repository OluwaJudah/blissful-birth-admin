export const pdfCSS = `
  body {
    padding: 2.5rem; /* p-10 */
    font-size: 0.875rem; /* text-sm */
    font-family: sans-serif;
    color: #000;
  }

  img {
    width: 50%; /* w-1/2 */
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0.75rem; /* mb-3 */
  }

  h2 {
    font-size: 1.25rem; /* text-xl */
    font-weight: 700; /* font-bold */
    text-align: center; /* text-center */
    margin-top: 1rem; /* my-4 */
    margin-bottom: 1rem;
    text-decoration: underline; /* underline */
  }

  p {
    margin: 0 0 0.25rem 0;
  }

  mb-4 {
    margin-bottom: 1rem;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .justify-between {
    justify-content: space-between;
  }

  .w-3\\/4 {
    width: 75%;
  }

  .pr-4 {
    padding-right: 1rem;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .font-bold {
    font-weight: 700;
  }

  .text-sm {
    font-size: 0.875rem;
  }

  .text-xs {
    font-size: 0.75rem;
  }

  .underline {
    text-decoration: underline;
  }

  .my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  table {
    width: 90%; /* w-3/4 */
    border-collapse: collapse;
    margin-top: 1rem; /* my-4 */
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }

  th, td {
    border: 1px solid #000;
    padding: 0.5rem; /* p-2 */
    text-align: left;
    vertical-align: top;
  }

  thead tr {
    background-color: #e5e7eb; /* bg-gray-200 */
  }

  /* Gap utility using inline style workaround */
  .flex[style*="gap"] > * + * {
    margin-top: 2px;
  }
`;
