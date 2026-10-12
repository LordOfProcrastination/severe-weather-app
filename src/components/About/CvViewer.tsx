import { useEffect, useRef } from "react";
import "./CvViewer.css";

const cvUrl = `${import.meta.env.BASE_URL}documents/Oppdatert_CV.pdf`;

interface CvViewerProps {
  onClose: () => void;
}

export default function CvViewer({ onClose }: CvViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement;
    const { scrollX, scrollY } = window;
    const body = document.body;
    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    // The native modal makes the page inert and keeps keyboard focus in the dialog.
    dialog.showModal();
    closeRef.current?.focus();
    Object.assign(body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: `-${scrollX}px`,
      width: "100%",
      overflow: "hidden",
    });

    return () => {
      dialog.close();
      Object.assign(body.style, previousStyles);
      window.scrollTo(scrollX, scrollY);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="cv-viewer"
      aria-modal="true"
      aria-labelledby="cv-viewer-title"
      aria-describedby="cv-viewer-help"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) {
          onClose();
        }
      }}
    >
      <div className="cv-viewer__content">
        <header className="cv-viewer__header">
          <div>
            <p className="cv-viewer__eyebrow">Curriculum vitae · PDF</p>
            <h2 id="cv-viewer-title">Henrik Aulie</h2>
          </div>
          <button ref={closeRef} className="cv-viewer__close" onClick={onClose} aria-label="Close CV viewer">
            Close <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className="cv-viewer__toolbar">
          <a className="cv-viewer__download" href={cvUrl} download="Henrik_Aulie_CV.pdf">Download CV</a>
          <a href={cvUrl} target="_blank" rel="noopener noreferrer">Open PDF in New Tab <span aria-hidden="true">↗</span></a>
          <p id="cv-viewer-help">If the embedded viewer is unavailable, open the PDF in a new tab or download it.</p>
        </div>
        <object className="cv-viewer__pdf" data={`${cvUrl}#view=FitH`} type="application/pdf" aria-label="Henrik Aulie's CV PDF">
          <div className="cv-viewer__fallback">
            <p>Your browser cannot display the PDF here.</p>
            <a href={cvUrl} target="_blank" rel="noopener noreferrer">Open Henrik Aulie’s CV in a new tab</a>
          </div>
        </object>
      </div>
    </dialog>
  );
}
