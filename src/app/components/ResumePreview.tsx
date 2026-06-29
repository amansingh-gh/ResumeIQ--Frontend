// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// // import "react-pdf/dist/Page/TextLayer.css";
// // import "react-pdf/dist/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// let url;
// export default function ResumePreview({ url }) {
//   const [numPages, setNumPages] = useState(0);

//   return (
//     <Document
//       file={url}
//       onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//     >
//       {Array.from({ length: numPages }, (_, i) => (
//         <Page
//           key={i}
//           pageNumber={i + 1}
//           width={350}
//         />
//       ))}
//     </Document>
//   );
// }