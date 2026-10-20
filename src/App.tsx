import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  ExternalLink,
  Info,
  Shield,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  Compass,
} from 'lucide-react';
import logoOg from './assets/logoog.jpeg';
import { PdfViewerModal } from './components/PdfViewerModal';

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
  isEmbeddedPdf?: boolean;
  sublabel?: string;
  badgeCode?: string;
}

/**
 * Official Google Drive PDF link for the Organización delegation itinerary.
 * Automatically converted to Google Drive embed/preview format.
 */
export const ORGANIZACION_DRIVE_PDF_URL =
  'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/preview';

/**
 * Official registration link for recreational activities.
 */
const RECREATIONAL_ACTIVITIES_URL = 'https://inscripciondnb.github.io/formulariosdnb/';

/**
 * Official WhatsApp support link.
 */
const WHATSAPP_URL = 'https://wa.me/59899379851';

/**
 * Centralized dataset for delegation itineraries.
 * Main buttons in exact requested order:
 * 1. Representante Académico (Rojo)
 * 2. Representante Asambleario (Azul)
 * 3. Miembro Adherente (Azul oscuro / petróleo)
 * 4. Patrocinadores (Rojo)
 * 5. Representante de la CEPIGD (Violeta / morado)
 * 6. Visita (Amarillo / ocre)
 * 7. ORGANIZACIÓN (Blanco - PDF embebido de Google Drive)
 */
export const GROUPS_DATA: GroupItem[] = [
  {
    id: 'representante-academico',
    name: 'Representante Académico',
    modalTitle: 'Representante Académico',
    colorLabel: 'Rojo',
    badgeCode: 'ACADÉMICO',
    hexColor: '#DC2626',
    cardBg: 'bg-red-50/90 hover:bg-red-100/90 border-red-200/90',
    borderAccent: 'border-l-red-600',
    arrowBg: 'bg-white/90 border border-red-200/60 text-red-900 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600',
    previewUrl: 'https://tftsep2024.my.canva.site/representante-acad-mico',
    externalUrl: 'https://tftsep2024.my.canva.site/representante-acad-mico',
    active: true,
  },
  {
    id: 'representante-asambleario',
    name: 'Representante Asambleario',
    modalTitle: 'Representante Asambleario',
    colorLabel: 'Azul',
    badgeCode: 'ASAMBLEA',
    hexColor: '#2563EB',
    cardBg: 'bg-blue-50/90 hover:bg-blue-100/90 border-blue-200/90',
    borderAccent: 'border-l-blue-600',
    arrowBg: 'bg-white/90 border border-blue-200/60 text-blue-900 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
    previewUrl: 'https://tftsep2024.my.canva.site/representante-asambleario',
    externalUrl: 'https://tftsep2024.my.canva.site/representante-asambleario',
    active: true,
  },
  {
    id: 'miembro-adherente',
    name: 'Miembro Adherente',
    modalTitle: 'Miembro Adherente',
    colorLabel: 'Azul oscuro / Petróleo',
    badgeCode: 'ADHERENTE',
    hexColor: '#0E4D64',
    cardBg: 'bg-cyan-50/90 hover:bg-cyan-100/90 border-cyan-200/90',
    borderAccent: 'border-l-[#0E4D64]',
    arrowBg: 'bg-white/90 border border-cyan-200/60 text-[#0E4D64] group-hover:bg-[#0E4D64] group-hover:text-white group-hover:border-[#0E4D64]',
    previewUrl: 'https://tftsep2024.my.canva.site/miembro-adherente',
    externalUrl: 'https://tftsep2024.my.canva.site/miembro-adherente',
    active: true,
  },
  {
    id: 'patrocinadores',
    name: 'Patrocinadores',
    modalTitle: 'Patrocinadores',
    colorLabel: 'Rojo',
    badgeCode: 'PATROCINADORES',
    hexColor: '#DC2626',
    cardBg: 'bg-red-50/90 hover:bg-red-100/90 border-red-200/90',
    borderAccent: 'border-l-red-600',
    arrowBg: 'bg-white/90 border border-red-200/60 text-red-900 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600',
    previewUrl: 'https://tftsep2024.my.canva.site/patrocinadores',
    externalUrl: 'https://tftsep2024.my.canva.site/patrocinadores',
    active: true,
  },
  {
    id: 'representante-cepigd',
    name: 'Representante de la CEPIGD',
    modalTitle: 'Representante de la CEPIGD',
    colorLabel: 'Violeta / Morado',
    badgeCode: 'CEPIGD',
    hexColor: '#7C3AED',
    cardBg: 'bg-purple-50/90 hover:bg-purple-100/90 border-purple-200/90',
    borderAccent: 'border-l-purple-600',
    arrowBg: 'bg-white/90 border border-purple-200/60 text-purple-900 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600',
    previewUrl: 'https://tftsep2024.my.canva.site/cepigd',
    externalUrl: 'https://tftsep2024.my.canva.site/cepigd',
    active: true,
  },
  {
    id: 'visita',
    name: 'Visita',
    modalTitle: 'Visita',
    colorLabel: 'Amarillo / Ocre',
    badgeCode: 'VISITA',
    hexColor: '#D97706',
    cardBg: 'bg-amber-50/90 hover:bg-amber-100/90 border-amber-200/90',
    borderAccent: 'border-l-amber-500',
    arrowBg: 'bg-white/90 border border-amber-200/60 text-amber-950 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-500',
    previewUrl: 'https://tftsep2024.my.canva.site/visita',
    externalUrl: 'https://tftsep2024.my.canva.site/visita',
    active: true,
  },
  {
    id: 'organizacion',
    name: 'ORGANIZACIÓN',
    modalTitle: 'ORGANIZACIÓN',
    colorLabel: 'Blanco',
    badgeCode: 'ORGANIZACIÓN',
    hexColor: '#FFFFFF',
    isWhite: true,
    isEmbeddedPdf: true,
    cardBg: 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm',
    borderAccent: 'border-l-white',
    arrowBg: 'bg-slate-100 border border-slate-200/80 text-slate-700 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900',
    previewUrl: ORGANIZACION_DRIVE_PDF_URL,
    externalUrl: ORGANIZACION_DRIVE_PDF_URL,
    active: true,
  },
];

export default function App() {
  const currentYear = new Date().getFullYear();
  const [selectedPdfGroup, setSelectedPdfGroup] = useState<GroupItem | null>(null);

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
              Selecciona tu rol o credencial para ver tu itinerario semanal
            </p>
          </header>

          {/* Groups Listing (Itinerary In-App Buttons) */}
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

              if (group.isEmbeddedPdf) {
                return (
                  <motion.button
                    key={group.id}
                    id={`btn-${group.id}`}
                    type="button"
                    onClick={() => setSelectedPdfGroup(group)}
                    aria-label={`Ver itinerario de ${group.name} en PDF`}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.38, ease: 'easeOut' },
                      },
                    }}
                    className={`group relative w-full min-h-[68px] rounded-xl ${group.cardBg} border border-l-[8px] ${group.borderAccent} shadow-[0_4px_14px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_22px_rgba(15,23,42,0.12),0_2px_6px_rgba(15,23,42,0.06)] active:scale-[0.98] transition-all duration-150 p-3.5 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 cursor-pointer text-left`}
                  >
                    {/* Left Side: Color Badge Swatch + Text Content */}
                    <div className="flex items-center gap-3.5 min-w-0 pr-2 flex-1">
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

                      {/* Information: Role / Credential Name */}
                      <div className="text-left min-w-0 flex-1">
                        <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug tracking-tight block">
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
              }

              return (
                <motion.a
                  key={group.id}
                  id={`btn-${group.id}`}
                  href={group.externalUrl || group.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  <div className="flex items-center gap-3.5 min-w-0 pr-2 flex-1">
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

                    {/* Information: Role / Credential Name */}
                    <div className="text-left min-w-0 flex-1">
                      <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug tracking-tight block">
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
                </motion.a>
              );
            })}
          </motion.section>
        </div>

        {/* Footer Section */}
        <footer id="footer-oba" className="pt-8 pb-16 sm:pb-8 text-center mt-6">
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
                href={WHATSAPP_URL}
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

      {/* Botón flotante de Actividades Recreativas abajo a la izquierda, fijo independientemente del scroll */}
      <motion.a
        id="btn-floating-actividades"
        href={RECREATIONAL_ACTIVITIES_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: -16, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Actividades Recreativas"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 h-12 sm:h-14 group inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 rounded-full bg-slate-900/95 hover:bg-slate-800 active:bg-slate-950 text-white shadow-[0_4px_20px_rgba(15,23,42,0.35)] hover:shadow-[0_6px_24px_rgba(15,23,42,0.5)] border border-slate-700/80 transition-all duration-150 backdrop-blur-md select-none cursor-pointer"
      >
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-500 flex items-center justify-center shrink-0 ring-1 ring-white/20">
          <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
        <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-100 group-hover:text-white whitespace-nowrap">
          Actividades Recreativas
        </span>
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-0.5" />
      </motion.a>

      {/* Botón flotante de WhatsApp abajo a la derecha, solo icono original sin texto, misma altura para coherencia visual */}
      <motion.a
        id="btn-floating-whatsapp"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Contactar por WhatsApp"
        title="Contactar por WhatsApp"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45),0_2px_8px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_26px_rgba(37,211,102,0.65),0_4px_12px_rgba(0,0,0,0.22)] border-2 border-white/30 transition-shadow duration-150 cursor-pointer select-none"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-white drop-shadow-xs"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.77 7.85 19.02L7.55 18.84L4.43 19.66L5.26 16.62L5.06 16.31C4.24 15 3.8 13.48 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.45C16.32 14.33 15.1 13.73 14.88 13.65C14.65 13.57 14.48 13.53 14.32 13.77C14.15 14.02 13.68 14.57 13.53 14.73C13.39 14.9 13.24 14.92 12.99 14.8C12.75 14.67 11.96 14.41 11.03 13.58C10.3 12.93 9.81 12.13 9.67 11.88C9.52 11.64 9.65 11.5 9.77 11.38C9.88 11.27 10.02 11.09 10.14 10.95C10.27 10.8 10.31 10.69 10.39 10.53C10.47 10.36 10.43 10.22 10.37 10.1C10.31 9.97 9.81 8.76 9.61 8.26C9.41 7.78 9.2 7.84 9.05 7.84C8.91 7.83 8.74 7.83 8.58 7.83C8.41 7.83 8.15 7.89 7.92 8.14C7.7 8.39 7.07 8.98 7.07 10.18C7.07 11.39 7.95 12.55 8.07 12.72C8.2 12.88 9.8 15.35 12.25 16.41C12.83 16.66 13.29 16.81 13.64 16.92C14.22 17.11 14.76 17.08 15.18 17.02C15.65 16.95 16.62 16.43 16.83 15.85C17.03 15.28 17.03 14.79 16.97 14.69C16.91 14.58 16.75 14.52 16.57 14.45Z" />
        </svg>
      </motion.a>

      {/* Modal visor de PDF embebido para Organización */}
      <PdfViewerModal
        isOpen={!!selectedPdfGroup}
        onClose={() => setSelectedPdfGroup(null)}
        title={selectedPdfGroup ? selectedPdfGroup.name : 'ORGANIZACIÓN'}
        pdfUrl={selectedPdfGroup ? (selectedPdfGroup.previewUrl || selectedPdfGroup.externalUrl) : ''}
        externalUrl={selectedPdfGroup ? selectedPdfGroup.externalUrl : ''}
      />

    </div>
  );
}
