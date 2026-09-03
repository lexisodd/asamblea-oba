import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  ExternalLink,
  Info,
  Shield,
  AlertCircle,
  X,
  Loader2
} from 'lucide-react';

/**
 * Interface representing a delegation group and its itinerary link.
 */
export interface GroupItem {
  id: string;
  name: string;
  colorLabel: string;
  hexColor: string;
  badgeBg: string;
  badgeText: string;
  borderAccent: string;
  softBg: string;
  previewUrl: string;
  externalUrl: string;
  active: boolean;
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
 * Exclusively 4 official colors: Rojo, Verde, Azul y Amarillo.
 */
export const GROUPS_DATA: GroupItem[] = [
  {
    id: 'delegacion-roja',
    name: 'Delegación Roja',
    colorLabel: 'Cinta Roja',
    badgeCode: 'GRUPO 1',
    hexColor: '#DC2626',
    badgeBg: 'bg-red-600 text-white',
    badgeText: 'text-red-700 bg-red-50 border-red-200',
    borderAccent: 'border-l-red-600 hover:border-red-400',
    softBg: 'group-hover:bg-red-50/50',
    previewUrl: SHARED_TEST_PREVIEW_URL,
    externalUrl: SHARED_TEST_EXTERNAL_URL,
    active: true,
    sublabel: 'Comandantes y Oficiales Superiores',
  },
  {
    id: 'delegacion-verde',
    name: 'Delegación Verde',
    colorLabel: 'Cinta Verde',
    badgeCode: 'GRUPO 2',
    hexColor: '#16A34A',
    badgeBg: 'bg-emerald-600 text-white',
    badgeText: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    borderAccent: 'border-l-emerald-600 hover:border-emerald-400',
    softBg: 'group-hover:bg-emerald-50/50',
    previewUrl: SHARED_TEST_PREVIEW_URL,
    externalUrl: SHARED_TEST_EXTERNAL_URL,
    active: true,
    sublabel: 'Equipos Técnicos y Brigadas Especiales',
  },
  {
    id: 'delegacion-azul',
    name: 'Delegación Azul',
    colorLabel: 'Cinta Azul',
    badgeCode: 'GRUPO 3',
    hexColor: '#2563EB',
    badgeBg: 'bg-blue-600 text-white',
    badgeText: 'text-blue-700 bg-blue-50 border-blue-200',
    borderAccent: 'border-l-blue-600 hover:border-blue-400',
    softBg: 'group-hover:bg-blue-50/50',
    previewUrl: SHARED_TEST_PREVIEW_URL,
    externalUrl: SHARED_TEST_EXTERNAL_URL,
    active: true,
    sublabel: 'Jefaturas de Operaciones y Rescate',
  },
  {
    id: 'delegacion-amarilla',
    name: 'Delegación Amarilla',
    colorLabel: 'Cinta Amarilla',
    badgeCode: 'GRUPO 4',
    hexColor: '#CA8A04',
    badgeBg: 'bg-amber-500 text-slate-950',
    badgeText: 'text-amber-800 bg-amber-50 border-amber-200',
    borderAccent: 'border-l-amber-500 hover:border-amber-400',
    softBg: 'group-hover:bg-amber-50/50',
    previewUrl: SHARED_TEST_PREVIEW_URL,
    externalUrl: SHARED_TEST_EXTERNAL_URL,
    active: true,
    sublabel: 'Logística, Prevención y Enlaces',
  },
];

/**
 * High-fidelity vector rendition of the official 20th Anniversary OBA Uruguay Emblem
 * used as an immediate fallback or vector representation if the raster image is unavailable.
 */
function OfficialObaEmblemSvg() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Emblema Oficial Asamblea OBA - 20 años Uruguay"
    >
      {/* Outer Golden Border Rim */}
      <circle cx="100" cy="100" r="96" fill="#D4AF37" stroke="#997A15" strokeWidth="2" />
      <circle cx="100" cy="100" r="92" fill="#FBF7E4" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="88" fill="#0A2540" stroke="#E5C158" strokeWidth="2" />

      {/* Outer Text: ASAMBLEA ANUAL OBA */}
      <path
        id="text-path-oba"
        d="M 28 100 A 72 72 0 0 1 172 100"
        fill="none"
      />
      <text fill="#FFFFFF" fontSize="11" fontWeight="800" letterSpacing="2">
        <textPath href="#text-path-oba" startOffset="50%" textAnchor="middle">
          ★ ASAMBLEA ANUAL OBA ★
        </textPath>
      </text>

      {/* Inner White Field */}
      <circle cx="100" cy="100" r="70" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="2" />

      {/* Waving Uruguay Flags in Background */}
      <path d="M 40 85 Q 55 78 70 85 Q 85 92 100 85 L 100 115 Q 85 122 70 115 Q 55 108 40 115 Z" fill="#0038A8" opacity="0.15" />
      <path d="M 100 85 Q 115 78 130 85 Q 145 92 160 85 L 160 115 Q 145 122 130 115 Q 115 108 100 115 Z" fill="#0038A8" opacity="0.15" />

      {/* Top Inner Medallion: OBA Firefighters Badge */}
      <circle cx="100" cy="65" r="28" fill="#0A2540" stroke="#D4AF37" strokeWidth="2" />
      <circle cx="100" cy="65" r="26" fill="#FFFFFF" />
      <circle cx="100" cy="65" r="22" fill="#0A2540" />

      {/* Crossed Golden Fire Axes & Ladder */}
      <line x1="88" y1="77" x2="112" y2="53" stroke="#E5C158" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="112" y1="77" x2="88" y2="53" stroke="#E5C158" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="97" y1="50" x2="97" y2="80" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="103" y1="50" x2="103" y2="80" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="97" y1="56" x2="103" y2="56" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="97" y1="62" x2="103" y2="62" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="97" y1="68" x2="103" y2="68" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="97" y1="74" x2="103" y2="74" stroke="#D4AF37" strokeWidth="1.5" />

      {/* Map of Americas silhouette */}
      <path d="M 96 56 Q 102 55 104 59 Q 102 65 99 68 Q 97 72 101 75" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.8" />

      {/* Sol de Mayo (Sun of Uruguay) on left */}
      <circle cx="58" cy="85" r="7" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
      <path d="M58 74 L58 77 M58 93 L58 96 M47 85 L50 85 M66 85 L69 85 M50 77 L52 79 M64 91 L66 93 M50 93 L52 91 M64 79 L66 77" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />

      {/* Laurel Wreath */}
      <path d="M 60 120 Q 55 100 68 85" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 140 120 Q 145 100 132 85" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Golden "20" Display */}
      <text
        x="100"
        y="126"
        textAnchor="middle"
        fontSize="36"
        fontWeight="900"
        fontFamily="serif"
        fill="url(#goldGradient)"
        stroke="#855800"
        strokeWidth="1"
        style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.25))' }}
      >
        20
      </text>
      <text
        x="100"
        y="138"
        textAnchor="middle"
        fontSize="9"
        fontWeight="800"
        letterSpacing="2"
        fill="#0A2540"
      >
        — AÑOS —
      </text>

      {/* Lower Navy Blue Ribbon with URUGUAY */}
      <path
        d="M 35 152 L 52 144 L 148 144 L 165 152 L 152 166 L 142 160 L 100 163 L 58 160 L 48 166 Z"
        fill="#0A2540"
        stroke="#D4AF37"
        strokeWidth="2"
      />
      <text
        x="100"
        y="157"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        letterSpacing="3"
        fill="#FFFFFF"
      >
        ★ URUGUAY ★
      </text>

      {/* Bottom Rim: 2006 - 2026 */}
      <text
        x="100"
        y="180"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        letterSpacing="2"
        fill="#0A2540"
      >
        2006 - 2026
      </text>

      {/* Gradients */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF1B0" />
          <stop offset="35%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function App() {
  const currentYear = new Date().getFullYear();
  const [imageError, setImageError] = useState(false);

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
                className="relative inline-flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-lg ring-2 ring-slate-200/80 bg-white p-1 overflow-hidden"
              >
                {!imageError ? (
                  <img
                    src="/logo.jpeg"
                    alt="Logo Oficial Asamblea OBA - 20 años"
                    className="w-full h-full object-contain rounded-full"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <OfficialObaEmblemSvg />
                )}
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
                  className={`group relative w-full min-h-[68px] rounded-xl bg-white border border-slate-200/90 border-l-[6px] ${group.borderAccent} shadow-[0_4px_14px_rgba(15,23,42,0.09),0_1px_3px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_22px_rgba(15,23,42,0.13),0_2px_6px_rgba(15,23,42,0.06)] active:scale-[0.98] transition-all duration-150 p-3.5 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 cursor-pointer ${group.softBg}`}
                >
                  {/* Left Side: Color Badge Swatch + Text Content */}
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {/* Visual Color Pill / Ribbon indicator */}
                    <div
                      className="relative w-11 h-11 rounded-lg flex items-center justify-center shrink-0 shadow-inner ring-1 ring-black/10 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: group.hexColor }}
                      aria-hidden="true"
                    >
                      <FileText className="w-5 h-5 text-white drop-shadow-sm" />
                      {/* Lanyard eyelet accent dot */}
                      <div className="absolute top-1 w-1.5 h-1.5 rounded-full bg-white/70" />
                    </div>

                    {/* Information */}
                    <div className="text-left truncate">
                      <span className="font-bold text-slate-900 text-base leading-snug tracking-tight block">
                        {group.name}
                      </span>
                      {group.sublabel && (
                        <p className="text-xs text-slate-500 mt-0.5 truncate leading-tight">
                          {group.sublabel}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Action Indicator with Document Icon and 'Ir a ver itinerario' */}
                  <div className="shrink-0 pl-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white group-active:bg-slate-950 transition-colors shadow-2xs">
                      <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-slate-500 group-hover:text-amber-300 transition-colors" />
                      <span className="text-xs font-semibold whitespace-nowrap">
                        Ir a ver itinerario
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.section>
        </div>

        {/* Footer Section */}
        <footer id="footer-oba" className="pt-8 pb-4 text-center mt-6">
          {/* Logistics Assistance Notice */}
          <div
            id="assistance-message"
            className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100/90 border border-slate-200 text-left text-xs text-slate-600 leading-relaxed"
          >
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p>
              En caso de dudas, acércate a la{' '}
              <strong className="text-slate-800 font-semibold">mesa de acreditación</strong> o a los
              coordinadores del evento.
            </p>
          </div>

          {/* Institutional Copyright & Metadata */}
          <div className="mt-5 space-y-1 text-slate-500 text-xs">
            <p className="font-semibold text-slate-700 tracking-wide uppercase text-[11px]">
              Dirección Nacional de Bomberos
            </p>
            <p>© {currentYear} Todos los derechos reservados.</p>
            <p className="text-[11px] text-slate-400">
              Plataforma optimizada para smartphones y redes de bajo ancho de banda.
            </p>
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
                  className="w-3.5 h-3.5 rounded-full shrink-0 ring-2 ring-white/30"
                  style={{ backgroundColor: activeModalGroup.hexColor }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <h2
                    id="modal-group-title"
                    className="text-sm sm:text-base font-bold text-white truncate leading-tight"
                  >
                    {activeModalGroup.name}
                  </h2>
                  <p className="text-[11px] text-slate-400 truncate leading-tight">
                    Itinerario Semanal Oficial
                  </p>
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
                title={`Itinerario - ${activeModalGroup.name}`}
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
