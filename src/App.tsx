import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  ExternalLink,
  Info,
  Shield,
  AlertCircle,
  X,
  Loader2,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import logoOg from './assets/logoog.jpeg';

/**
 * Interface representing a delegation group and its itinerary link.
 */
export interface GroupItem {
  id: string;
  name: string;
  modalTitle?: string;
  colorLabel: string;
  hexColor: string;
  badgeBg?: string;
  badgeText?: string;
  cardBg: string;
  borderAccent: string;
  arrowBg: string;
  previewUrl: string;
  externalUrl: string;
  active: boolean;
  isWhite?: boolean;
  sublabel?: string;
  badgeCode?: string;
}

/**
 * Common test Google Drive preview link for in-app iframe viewing.
 */
const SHARED_TEST_PREVIEW_URL = 'https://drive.google.com/file/d/1soYggvRJRnacpKY7lV1Ea8IznYt_U-lI/preview';
const SHARED_TEST_EXTERNAL_URL = 'https://drive.google.com/file/d/1soYggvRJRnacpKY7lV1Ea8IznYt_U-lI/view?usp=sharing';

/**
 * Centralized dataset for delegation itineraries.
 * Edit this array directly to update links, colors, or group statuses.
 * Official colors: Rojo, Verde, Azul, Amarillo, plus Organización.
 */
export const GROUPS_DATA: GroupItem[] = [
  {
    id: 'delegacion-roja',
    name: 'Rojo',
    modalTitle: 'Rojo',
    colorLabel: 'Rojo',
    badgeCode: 'GRUPO 1',
    hexColor: '#DC2626',
    cardBg: 'bg-red-50/85 hover:bg-red-100/80 border-red-200/90',
    borderAccent: 'border-l-red-600',
    arrowBg: 'bg-white/90 border border-red-200/60 text-red-900 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600',
    previewUrl: SHARED_TEST_PREVIEW_URL,
    externalUrl: SHARED_TEST_EXTERNAL_URL,
    active: true,
  },
  {
    id: 'delegacion-verde',
    name: 'Verde',
    modalTitle: 'Verde',
    colorLabel: 'Verde',
    badgeCode: 'GRUPO 2',
    hexColor: '#16A34A',
    cardBg: 'bg-emerald-50/85 hover:bg-emerald-100/80 border-emerald-200/90',
    borderAccent: 'border-l-emerald-600',
    arrowBg: 'bg-white/90 border border-emerald-200/60 text-emerald-900 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600',
    previewUrl: SHARED_TEST_PREVIEW_URL,
    externalUrl: SHARED_TEST_EXTERNAL_URL,
    active: true,
  },
  {
    id: 'delegacion-azul',
    name: 'Azul',
    modalTitle: 'Azul',
    colorLabel: 'Azul',
    badgeCode: 'GRUPO 3',
    hexColor: '#2563EB',
    cardBg: 'bg-blue-50/85 hover:bg-blue-100/80 border-blue-200/90',
    borderAccent: 'border-l-blue-600',
    arrowBg: 'bg-white/90 border border-blue-200/60 text-blue-900 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
    previewUrl: SHARED_TEST_PREVIEW_URL,
    externalUrl: SHARED_TEST_EXTERNAL_URL,
    active: true,
  },
  {
    id: 'delegacion-amarilla',
    name: 'Amarillo',
    modalTitle: 'Amarillo',
    colorLabel: 'Amarillo',
    badgeCode: 'GRUPO 4',
    hexColor: '#CA8A04',
    cardBg: 'bg-amber-50/85 hover:bg-amber-100/80 border-amber-200/90',
    borderAccent: 'border-l-amber-500',
    arrowBg: 'bg-white/90 border border-amber-200/60 text-amber-900 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-500',
    previewUrl: SHARED_TEST_PREVIEW_URL,
    externalUrl: SHARED_TEST_EXTERNAL_URL,
    active: true,
  },
  {
    id: 'organizacion',
    name: 'ORGANIZACIÓN',
    modalTitle: 'ORGANIZACIÓN',
    colorLabel: 'Organización',
    badgeCode: 'STAFF',
    hexColor: '#FFFFFF',
    isWhite: true,
    cardBg: 'bg-white hover:bg-slate-50/90 border-slate-300/90',
    borderAccent: 'border-l-slate-800',
    arrowBg: 'bg-slate-100 border border-slate-200/80 text-slate-700 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900',
    previewUrl: SHARED_TEST_PREVIEW_URL,
    externalUrl: SHARED_TEST_EXTERNAL_URL,
    active: true,
  },
];

export default function App() {
  const currentYear = new Date().getFullYear();

  // In-App PDF Modal state
  const [activeModalGroup, setActiveModalGroup] = useState<GroupItem | null>(null);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Handle opening modal for a group
  const handleOpenModal = (group: GroupItem) => {
    setActiveModalGroup(group);
    setIsIframeLoading(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setActiveModalGroup(null);
    setIsIframeLoading(true);
  };

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    if (activeModalGroup) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleCloseModal();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModalGroup]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between py-6 px-4 sm:px-6">
      {/* Container restricted to mobile-first max-width max-w-md */}
      <main
        id="main-container"
        className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between"
      >
        <div>
          {/* Header Section */}
          <header id="header-oba" className="text-center pt-2 pb-6">
            {/* Event Official Emblem / Logo */}
            <div className="flex justify-center mb-4">
              <div
                id="brand-logo-container"
                className="relative inline-flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-2xl shadow-md ring-1 ring-slate-200/90 bg-white p-2 overflow-hidden"
              >
                <img
                  src={logoOg}
                  alt="Logo Oficial Asamblea OBA - 20 años"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = './logoog.jpeg';
                  }}
                />
              </div>
            </div>

            {/* Institution Badge: Dirección Nacional de Bomberos */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-600 text-white border border-red-700 text-xs font-bold shadow-sm mb-2.5">
              <Shield className="w-3.5 h-3.5 text-white" />
              <span>Dirección Nacional de Bomberos</span>
            </div>

            {/* H1 Title with 2026 Chip */}
            <div className="flex items-center justify-center gap-2 flex-wrap px-2">
              <h1
                id="heading-oba-title"
                className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
              >
                Asamblea OBA - 20 años
              </h1>
              <span
                id="chip-year-2026"
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white border border-red-700 shadow-sm tracking-wide"
              >
                2026
              </span>
            </div>

            {/* Instructional Subtitle */}
            <p
              id="subheading-instruction"
              className="mt-2.5 text-sm text-slate-600 max-w-xs mx-auto leading-relaxed"
            >
              Selecciona el color asignado a tu credencial para ver tu itinerario semanal
            </p>
          </header>

          {/* Groups Listing (Itinerary In-App Buttons: 4 Colors - Rojo, Verde, Azul, Amarillo) */}
          <motion.section
            id="itineraries-list"
            aria-label="Listado de Itinerarios por Delegación"
            className="space-y-3.5 pt-1 pb-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.09,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {GROUPS_DATA.map((group) => {
              const isDisabled = !group.active;

              if (isDisabled) {
                return (
                  <motion.div
                    key={group.id}
                    id={`btn-${group.id}`}
                    aria-disabled="true"
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: {
                        opacity: 0.6,
                        y: 0,
                        transition: { duration: 0.35, ease: 'easeOut' },
                      },
                    }}
                    className="w-full min-h-[66px] rounded-xl bg-slate-100/90 border border-slate-200 p-3.5 flex items-center justify-between opacity-60 cursor-not-allowed select-none shadow-sm"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-black/10 shadow-sm"
                        style={{ backgroundColor: group.hexColor }}
                      >
                        <FileText className="w-5 h-5 text-white/90" />
                      </div>
                      <div className="text-left truncate">
                        <span className="font-semibold text-slate-800 text-base leading-tight block">
                          {group.name}
                        </span>
                        <span className="text-xs text-slate-500 block mt-0.5">
                          Itinerario en preparación
                        </span>
                      </div>
                    </div>
                    <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
                  </motion.div>
                );
              }

              return (
                <motion.button
                  key={group.id}
                  id={`btn-${group.id}`}
                  type="button"
                  onClick={() => handleOpenModal(group)}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.38, ease: 'easeOut' },
                    },
                  }}
                  className={`group relative w-full min-h-[68px] rounded-xl ${group.cardBg} border border-l-[8px] ${group.borderAccent} shadow-[0_4px_14px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_22px_rgba(15,23,42,0.12),0_2px_6px_rgba(15,23,42,0.06)] active:scale-[0.98] transition-all duration-150 p-3.5 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 cursor-pointer`}
                >
                  {/* Left Side: Color Badge Swatch + Text Content */}
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    {/* Visual Color Pill / Ribbon indicator */}
                    <div
                      className={`relative w-11 h-11 rounded-lg flex items-center justify-center shrink-0 shadow-inner ring-1 transition-transform group-hover:scale-105 ${
                        group.isWhite
                          ? 'bg-white ring-slate-300 border border-slate-200'
                          : 'ring-black/10'
                      }`}
                      style={group.isWhite ? undefined : { backgroundColor: group.hexColor }}
                      aria-hidden="true"
                    >
                      <FileText
                        className={`w-5 h-5 drop-shadow-sm ${
                          group.isWhite ? 'text-slate-800' : 'text-white'
                        }`}
                      />
                      {/* Lanyard eyelet accent dot */}
                      <div
                        className={`absolute top-1 w-1.5 h-1.5 rounded-full ${
                          group.isWhite ? 'bg-slate-400' : 'bg-white/70'
                        }`}
                      />
                    </div>

                    {/* Information: Color Name or ORGANIZACIÓN */}
                    <div className="text-left truncate">
                      <span className="font-bold text-slate-900 text-base sm:text-lg leading-tight tracking-tight block">
                        {group.name}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Action Arrow Indicator without text */}
                  <div className="shrink-0 pl-2">
                    <div
                      className={`w-10 h-10 rounded-xl ${group.arrowBg} flex items-center justify-center transition-all duration-150 shadow-2xs group-hover:scale-105 active:scale-95`}
                    >
                      <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.section>
        </div>

        {/* Footer Section */}
        <footer id="footer-oba" className="pt-8 pb-4 text-center mt-6">
          {/* Logistics Assistance Notice & WhatsApp Contact */}
          <div
            id="assistance-message"
            className="p-4 rounded-xl bg-slate-100/90 border border-slate-200 text-left text-xs text-slate-700 leading-relaxed shadow-xs space-y-3"
          >
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-slate-700 leading-relaxed">
                En caso de dudas, acércate a uno de los Oficiales identificados como parte de la organización o contacta por whatsapp
              </p>
            </div>

            <div className="pt-0.5">
              <a
                id="btn-whatsapp-support"
                href="https://wa.me/59899379851"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-xs shadow-sm hover:shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-100 shrink-0" />
                <span>Contactar por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Institutional Copyright & Metadata */}
          <div className="mt-5 space-y-1 text-slate-500 text-xs">
            <p className="font-semibold text-slate-700 tracking-wide uppercase text-[11px]">
              Dirección Nacional de Bomberos
            </p>
            <p>© {currentYear} Todos los derechos reservados.</p>
          </div>
        </footer>
      </main>

      {/* Fullscreen In-App PDF Viewer Modal */}
      {activeModalGroup && (
        <div
          id="pdf-modal-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-group-title"
          className="fixed inset-0 z-50 flex flex-col bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
        >
          {/* Main Modal Window */}
          <div className="flex flex-col w-full h-full bg-white sm:max-w-5xl sm:h-[94vh] sm:my-auto sm:mx-auto sm:rounded-2xl sm:overflow-hidden sm:shadow-2xl sm:ring-1 sm:ring-slate-900/10">
            {/* Fixed Top Bar */}
            <header
              id="modal-header-bar"
              className="w-full bg-slate-900 text-white px-3 sm:px-5 py-3 flex items-center justify-between shadow-md shrink-0 border-b border-slate-800 gap-2"
            >
              {/* Left: Group Identifier & Color Chip */}
              <div className="flex items-center gap-2.5 min-w-0 pr-1">
                {/* Color Dot Swatch */}
                <span
                  className={`w-3.5 h-3.5 rounded-full shrink-0 ring-2 ring-white/30 ${
                    activeModalGroup.isWhite ? 'bg-white border border-slate-400' : ''
                  }`}
                  style={activeModalGroup.isWhite ? undefined : { backgroundColor: activeModalGroup.hexColor }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <h2
                    id="modal-group-title"
                    className="text-sm sm:text-base font-bold text-white truncate leading-tight"
                  >
                    {activeModalGroup.modalTitle || activeModalGroup.name}
                  </h2>
                </div>
              </div>

              {/* Right: Controls (External Link & Close Button) */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Secondary Button: Open in External Browser */}
                <a
                  id="btn-open-external-browser"
                  href={activeModalGroup.externalUrl || activeModalGroup.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 hover:text-white transition-colors border border-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                  title="Abrir documento en pestaña o navegador externo"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span className="text-[11px] sm:text-xs font-medium leading-tight">
                    <span className="hidden sm:inline text-slate-300">¿Problema para visualizar? </span>
                    <span className="sm:hidden text-slate-300">¿Problemas? </span>
                    <span className="text-amber-300 font-bold underline">Click aquí</span>
                  </span>
                </a>

                {/* Primary Close Button (X) */}
                <button
                  id="btn-close-modal"
                  type="button"
                  onClick={handleCloseModal}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer shrink-0"
                  aria-label="Cerrar visor de itinerario"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Modal Body with subtle loader & Google Drive Iframe Viewer */}
            <div className="relative flex-1 w-full bg-slate-100 overflow-hidden flex flex-col items-center justify-center">
              {/* Subtle Loading State */}
              {isIframeLoading && (
                <div
                  id="iframe-loading-indicator"
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50/95 gap-3 p-4 transition-opacity duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md border border-slate-200">
                    <Loader2 className="w-6 h-6 text-slate-700 animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-800">
                      Cargando itinerario en PDF...
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Conectando con el visor seguro de documentos
                    </p>
                  </div>
                </div>
              )}

              {/* In-App PDF Viewer Iframe */}
              <iframe
                id="pdf-document-iframe"
                key={activeModalGroup.id}
                src={activeModalGroup.previewUrl}
                title={`Itinerario - ${activeModalGroup.modalTitle || activeModalGroup.name}`}
                className="w-full h-full border-0 flex-1 bg-white"
                allow="autoplay"
                onLoad={() => setIsIframeLoading(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
