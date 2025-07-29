// lib/tailwind-pdf-css.ts
export const pdfCSS = `
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add only classes you actually use (from inspection) */
body { @apply p-10 text-sm; }
img { @apply w-1/2 mx-auto mb-3; }
h2 { @apply text-xl font-bold text-center mb-4 underline; }
p { @apply mb-1; }
.mb-4 { @apply mb-4; }
table { @apply w-full border-collapse border mx-4 text-xs; }
thead tr { @apply bg-gray-200; }
th, td { @apply border p-2; }
.flex-between { @apply flex justify-between w-3/4 pr-4; }
`;
