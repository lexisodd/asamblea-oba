import React from 'react';
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
 * Official shared URL for delegation itineraries (interactive Canva web embed).
 */
const SHARED_CANVA_URL = 'https://tftsep2024.my.canva.site/representante-asambleario';

/**
 * Official registration link for recreational activities.
 */
const RECREATIONAL_ACTIVITIES_URL = 'https://inscripciondnb.github.io/formulariosdnb/';

/**
 * Centralized dataset for delegation itineraries.
 * Main buttons in exact requested order:
 * 1. Representante Académico (Rojo)
 * 2. Representante Asambleario (Azul)
 * 3. Miembro Adherente (Azul oscuro / petróleo)
 * 4. Patrocinador (Rojo)
 * 5. Representante de la CEPIGD (Violeta / morado)
 * 6. Staff (Verde)
 * 7. Visita (Amarillo / ocre)
 * 8. ORGANIZACIÓN (Blanco)
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
    previewUrl: SHARED_CANVA_URL,
    externalUrl: SHARED_CANVA_URL,
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
    previewUrl: SHARED_CANVA_URL,
    externalUrl: SHARED_CANVA_URL,
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
    previewUrl: SHARED_CANVA_URL,
    externalUrl: SHARED_CANVA_URL,
    active: true,
  },
  {
    id: 'patrocinador',
    name: 'Patrocinador',
    modalTitle: 'Patrocinador',
    colorLabel: 'Rojo',
    badgeCode: 'PATROCINADOR',
    hexColor: '#DC2626',
    cardBg: 'bg-red-50/90 hover:bg-red-100/90 border-red-200/90',
    borderAccent: 'border-l-red-600',
    arrowBg: 'bg-white/90 border border-red-200/60 text-red-900 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600',
    previewUrl: SHARED_CANVA_URL,
    externalUrl: SHARED_CANVA_URL,
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
    previewUrl: SHARED_CANVA_URL,
    externalUrl: SHARED_CANVA_URL,
    active: true,
  },
  {
    id: 'staff',
    name: 'Staff',
    modalTitle: 'Staff',
    colorLabel: 'Verde',
    badgeCode: 'STAFF',
    hexColor: '#16A34A',
    cardBg: 'bg-emerald-50/90 hover:bg-emerald-100/90 border-emerald-200/90',
    borderAccent: 'border-l-emerald-600',
    arrowBg: 'bg-white/90 border border-emerald-200/60 text-emerald-900 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600',
    previewUrl: SHARED_CANVA_URL,
    externalUrl: SHARED_CANVA_URL,
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
    previewUrl: SHARED_CANVA_URL,
    externalUrl: SHARED_CANVA_URL,
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
    cardBg: 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm',
    borderAccent: 'border-l-white',
    arrowBg: 'bg-slate-100 border border-slate-200/80 text-slate-700 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900',
    previewUrl: SHARED_CANVA_URL,
    externalUrl: SHARED_CANVA_URL,
    active: true,
  },
];

export default function App() {
  const currentYear = new Date().getFullYear();

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

            {/* Botón ACTIVIDADES RECREATIVAS con redirección directa */}
            <motion.a
              id="btn-actividades-recreativas"
              href={RECREATIONAL_ACTIVITIES_URL}
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
              className="group relative w-full min-h-[68px] rounded-xl bg-orange-50/90 hover:bg-orange-100/90 border border-orange-200/90 border-l-[8px] border-l-orange-500 shadow-[0_4px_14px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_22px_rgba(15,23,42,0.12),0_2px_6px_rgba(15,23,42,0.06)] active:scale-[0.98] transition-all duration-150 p-3.5 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer text-slate-800"
            >
              {/* Left Side: Color Badge Swatch + Text Content */}
              <div className="flex items-center gap-3.5 min-w-0 pr-2 flex-1">
                {/* Visual Color Pill / Ribbon indicator */}
                <div
                  className="relative w-11 h-11 rounded-lg flex items-center justify-center shrink-0 shadow-inner ring-1 ring-black/10 bg-orange-500 transition-transform group-hover:scale-105"
                  aria-hidden="true"
                >
                  <Compass className="w-5 h-5 drop-shadow-sm text-white" />
                  {/* Lanyard eyelet accent dot */}
                  <div className="absolute top-1 w-1.5 h-1.5 rounded-full bg-white/70" />
                </div>

                {/* Information: Title */}
                <div className="text-left min-w-0 flex-1">
                  <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug tracking-tight block">
                    ACTIVIDADES RECREATIVAS
                  </span>
                </div>
              </div>

              {/* Right Side: Action Indicator (External Link) */}
              <div className="shrink-0 pl-2">
                <div className="w-10 h-10 rounded-xl bg-white/90 border border-orange-200/60 text-orange-950 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 flex items-center justify-center transition-all duration-150 shadow-2xs group-hover:scale-105 active:scale-95">
                  <ExternalLink className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.a>
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
    </div>
  );
}
