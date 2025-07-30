export const pdfCSS = `
  body {
    padding: 2.5rem; /* Tailwind p-10 */
    font-size: 0.875rem; /* Tailwind text-sm */
    font-family: sans-serif;
    color: #000;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0.75rem; /* mb-3 */
    width: 50%; /* w-1/2 */
  }

  h2 {
    font-size: 1.25rem; /* text-xl */
    font-weight: 700;   /* font-bold */
    text-align: center;
    margin-bottom: 1rem; /* mb-4 */
    text-decoration: underline;
  }

  p {
    margin: 0 0 0.25rem 0;
  }

  p.mb-4 {
    margin-bottom: 1rem;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    width: 75%; /* w-3/4 */
    padding-right: 1rem; /* pr-4 */
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 1rem; /* mx-4 */
    font-size: 0.75rem; /* text-xs */
  }

  th, td {
    border: 1px solid #000;
    padding: 0.5rem; /* p-2 */
    text-align: left;
  }

  thead tr {
    background-color: #e5e7eb; /* bg-gray-200 */
  }
`;
