import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, FileText, Loader2, RefreshCw } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
  externalUrl?: string;
}

/**
 * Converts standard Google Drive URLs to the preview/embed format.
 * - /view -> /preview
 * - /edit -> /preview
 * - sharing link with id param -> /file/d/{id}/preview
 */
export function formatGoogleDrivePreviewUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // If already a preview URL
  if (trimmed.includes('/preview')) {
    return trimmed;
  }

  // Handle standard /file/d/{id}/*
  const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }

  // Handle id={id} query param
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
  }

  // If it's a standard URL, return it or wrap if needed
  return trimmed;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  pdfUrl,
  externalUrl,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const embedUrl = formatGoogleDrivePreviewUrl(pdfUrl);
  const directLink = externalUrl || pdfUrl;

  // Handle Esc key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, pdfUrl]);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="pdf-modal-portal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl h-[92vh] sm:h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <header className="px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3 min-w-0 pr-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/20 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h2
                    id="pdf-modal-title"
                    className="text-sm sm:text-base font-bold text-white truncate leading-tight"
                  >
                    {title}
                  </h2>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    Itinerario en PDF embebido • Google Drive
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleReload}
                  title="Recargar documento"
                  aria-label="Recargar documento"
                  className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <a
                  href={directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir en pestaña nueva"
                  aria-label="Abrir en pestaña nueva"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  <span className="hidden sm:inline">Abrir en Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  title="Cerrar visor"
                  aria-label="Cerrar visor"
                  className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-red-600/80 transition-colors cursor-pointer ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Iframe Viewport Area */}
            <div className="flex-1 relative bg-slate-100 overflow-hidden">
              {/* Loading State Spinner */}
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 gap-3">
                  <Loader2 className="w-8 h-8 text-slate-700 animate-spin" />
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Cargando documento de Google Drive...
                  </p>
                </div>
              )}

              {/* Embedded PDF iframe */}
              <iframe
                key={iframeKey}
                src={embedUrl}
                title={title}
                className="w-full h-full border-0"
                allow="autoplay"
                onLoad={() => setIsLoading(false)}
              />
            </div>

            {/* Modal Bottom Footer / Quick Bar */}
            <footer className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span className="truncate pr-2">
                ¿Problemas para visualizar? Utiliza el botón &quot;Abrir en Drive&quot;.
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-900 hover:text-blue-600 underline underline-offset-2 cursor-pointer"
                >
                  Abrir enlace directo
                </a>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
