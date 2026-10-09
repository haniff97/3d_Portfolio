import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerUrl from 'react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.js?url';
import { FiArrowUpRight, FiDownload } from 'react-icons/fi';
import { RESUME_URL } from '../../siteConfig';

// Bundle the worker locally so the preview doesn't depend on a third-party CDN.
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export default function ResumeNew() {
  const container = useRef(null);
  const [width, setWidth] = useState(700);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(1, entry.contentRect.width)));
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <section className="page-shell resume-page">
    <div className="section-heading"><div><p className="eyebrow">EXPERIENCE & EXPERTISE</p><h1>My résumé<span className="accent-dot">.</span></h1><p>A closer look at my experience, skills, and journey.</p></div><div className="button-row"><a className="button button-dark" href={RESUME_URL} download="Haniff-Resume.pdf">Download PDF <FiDownload /></a><a className="text-link" href={RESUME_URL} target="_blank" rel="noopener noreferrer">Open PDF <FiArrowUpRight /></a></div></div>
    <div className="pdf-shell"><div ref={container} className="pdf-document"><Document file={RESUME_URL} onLoadSuccess={({ numPages }) => setPages(numPages)} loading={<p className="pdf-message" role="status">Loading résumé…</p>} error={<p className="pdf-message" role="alert">The preview couldn’t load. <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">Open the PDF directly</a>.</p>}>{Array.from({ length: pages }, (_, index) => <Page key={index} pageNumber={index + 1} width={width} renderTextLayer={false} renderAnnotationLayer={false} />)}</Document></div></div>
  </section>;
}
