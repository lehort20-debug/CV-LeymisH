import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  X,
  Download,
  Copy,
  Check,
  Share2,
  ExternalLink,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  themeColor: ThemeColor;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  data,
  themeColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [downloading, setDownloading] = useState(false);

  const theme = themeConfigs[themeColor];

  // Initialize with current URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use clean URL without query params or hash if present
      const currentUrl = window.location.origin + window.location.pathname;
      setCustomUrl(currentUrl);
    }
  }, [isOpen]);

  // Generate QR code whenever URL changes or modal opens
  useEffect(() => {
    if (!isOpen || !canvasRef.current || !customUrl) return;

    QRCode.toCanvas(
      canvasRef.current,
      customUrl,
      {
        width: 280,
        margin: 2,
        color: {
          dark: '#0f172a', // Slate 900
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      },
      (error) => {
        if (error) console.error('Error generating QR code:', error);
      }
    );
  }, [isOpen, customUrl]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(customUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleDownloadQR = () => {
    if (!canvasRef.current) return;
    setDownloading(true);

    try {
      // Create a high-res canvas with border & branding
      const mainCanvas = canvasRef.current;
      const exportCanvas = document.createElement('canvas');
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) return;

      const padding = 40;
      const headerHeight = 80;
      const footerHeight = 60;
      exportCanvas.width = mainCanvas.width + padding * 2;
      exportCanvas.height = mainCanvas.height + padding * 2 + headerHeight + footerHeight;

      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

      // Border outline
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.strokeRect(8, 8, exportCanvas.width - 16, exportCanvas.height - 16);

      // Header text
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(data.personal.fullName, exportCanvas.width / 2, 50);

      ctx.fillStyle = '#64748b';
      ctx.font = '14px system-ui, -apple-system, sans-serif';
      ctx.fillText('Estudiante de Marketing Estratégico · Prácticas', exportCanvas.width / 2, 75);

      // Draw QR Code
      ctx.drawImage(mainCanvas, padding, padding + headerHeight);

      // Footer text
      ctx.fillStyle = '#334155';
      ctx.font = '600 13px system-ui, -apple-system, sans-serif';
      ctx.fillText('Escanea para ver mi portafolio online', exportCanvas.width / 2, exportCanvas.height - 35);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px system-ui, -apple-system, sans-serif';
      ctx.fillText(customUrl.replace(/^https?:\/\//, ''), exportCanvas.width / 2, exportCanvas.height - 18);

      const link = document.createElement('a');
      link.download = `QR-Landing-${data.personal.fullName.replace(/\s+/g, '-')}.png`;
      link.href = exportCanvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const shareWhatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `¡Hola! Te comparto el enlace a mi landing page y portafolio profesional de Marketing: ${customUrl}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-white animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl text-white ${theme.accentBg}`}>
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Código QR de mi Landing</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Comparte tu perfil fácilmente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col items-center text-center">
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 max-w-xs leading-relaxed">
            Cualquier persona puede escanear este código con la cámara de su móvil para acceder directamente a tu landing page y ver tu currículum.
          </p>

          {/* QR Code Canvas Frame */}
          <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-inner flex flex-col items-center justify-center relative">
            <canvas ref={canvasRef} className="rounded-lg max-w-full h-auto" />
            <div className="mt-2 text-[11px] font-bold text-slate-800 tracking-wide uppercase">
              {data.personal.fullName}
            </div>
          </div>

          {/* URL Input with copy button */}
          <div className="w-full mt-5">
            <label className="block text-left text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Enlace de tu landing page:
            </label>
            <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-200 px-2 py-1 outline-hidden font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={handleDownloadQR}
              disabled={downloading}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-indigo-500" />
              <span>Descargar PNG</span>
            </button>

            <a
              href={shareWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Compartir WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Modal Footer Tips */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center">
          💡 Puedes incluir este QR impreso en tu currículum físico o en tarjetas de visita.
        </div>
      </div>
    </div>
  );
};
