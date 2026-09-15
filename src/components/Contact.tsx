import React, { useState } from 'react';
import {
  Mail,
  CheckCircle,
  Copy,
  Linkedin,
  Github,
  Twitter,
  Clock,
  MessageCircle,
  ArrowRight,
  Send,
} from 'lucide-react';
import { PersonalDetails, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';

interface ContactProps {
  personal: PersonalDetails;
  themeColor: ThemeColor;
}

export const Contact: React.FC<ContactProps> = ({ personal, themeColor }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const theme = themeConfigs[themeColor];
  const whatsappPhone = '34613302129';
  const whatsappUrl = `https://wa.me/${whatsappPhone}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contacto" className="py-20 bg-slate-50/60 dark:bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold mb-3 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-xs">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Contacto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            ¿Hablamos?
          </h2>
          <div className="space-y-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-xl mx-auto">
            <p>
              Estoy buscando una oportunidad de prácticas en marketing donde pueda seguir aprendiendo, aportar mi experiencia y formar parte de un equipo profesional.
            </p>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              Si crees que mi perfil puede encajar en tu empresa, estaré encantada de conocernos.
            </p>
          </div>
        </div>

        {/* Contact Cards Grid without exposing raw numbers/emails */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* 1. WhatsApp Direct Priority Card */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-200/90 dark:border-emerald-800/80 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Respuesta Rápida
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                WhatsApp Directo
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Contacta directamente conmigo a través de WhatsApp para concertar una entrevista o realizar cualquier consulta.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Abrir conversación en WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* 2. Email Direct Card */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${theme.accentLight} flex items-center justify-center shadow-xs`}>
                  <Mail className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  Correo Electrónico
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Contacto por Email
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Para propuestas formales, convenios de prácticas con la universidad o información sobre el puesto.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="py-3.5 px-4 rounded-2xl font-semibold text-xs text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="py-3.5 px-4 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Dirección</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Availability info & Social bar */}
        <div className="mt-8 max-w-4xl mx-auto p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Disponibilidad Actual</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                Incorporación inmediata para prácticas en Marketing (Remoto / Híbrido)
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 shrink-0">
            {personal.socialLinks.linkedin && (
              <a
                href={personal.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors shadow-xs"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {personal.socialLinks.github && (
              <a
                href={personal.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors shadow-xs"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {personal.socialLinks.twitter && (
              <a
                href={personal.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-500 transition-colors shadow-xs"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
