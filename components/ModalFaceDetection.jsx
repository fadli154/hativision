"use client";

import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function ImagePreviewModal({ imageUrl, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const modalRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const t = useTranslations("ModalFaceDetection");

  useEffect(() => {
    if (!imageUrl) return;

    setIsOpen(true);

    // Delay agar modalRef sudah tersedia di DOM
    setTimeout(() => {
      if (modalRef.current) {
        const rect = modalRef.current.getBoundingClientRect();
        const centerX = (window.innerWidth - rect.width) / 2;
        const centerY = (window.innerHeight - rect.height) / 2;

        setPosition({
          x: Math.max(10, centerX),
          y: Math.max(20, centerY),
        });
      }
    }, 0);
  }, [imageUrl]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    isOpen && (
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()} modal={false}>
        <DialogPortal>
          <div className="fixed inset-0 z-40">
            <DialogOverlay className="bg-black/60 backdrop-blur-sm w-full h-full" />
          </div>

          <div
            ref={modalRef}
            onMouseDown={handleMouseDown}
            style={{
              position: "fixed",
              top: `${position.y}px`,
              left: `${position.x}px`,
              zIndex: 50,
              width: "90vw",
              maxWidth: "600px",
              minWidth: "280px",
            }}
            className="overflow-visible rounded-xl shadow-xl cursor-move neon-border-wrapper animate-float px-4 sm:px-6"
          >
            <div className="rounded-[inherit] p-6 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-md border border-white/10 dark:border-zinc-700 animate-fade-in-up">
              {/* Header */}
              <div className="relative select-none pb-4">
                <h2 className="text-xl text-center w-full font-semibold">{t("title")}</h2>
                <button
                  onClick={handleClose}
                  className="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center rounded-full border border-red-300 bg-white text-red-500 shadow-sm hover:bg-red-500 hover:text-white hover:scale-110 hover:rotate-12 focus:scale-110 active:scale-95 transition-all duration-300 ease-in-out dark:bg-zinc-900 dark:hover:bg-red-600 outline-none"
                  aria-label="Tutup modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Konten */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-start">
                {/* Gambar */}
                <div className="relative w-full flex justify-center items-center">
                  {imageUrl && (
                    <div className="relative w-full max-w-[160px] md:max-w-[240px] transition-transform duration-300 hover:scale-[1.03]">
                      <div className="w-full aspect-[3/4] relative rounded-lg overflow-hidden">
                        <img src={imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-contain rounded-md drop-shadow-xl drop-shadow-violet-500/20" />
                        <div
                          className="absolute border-2 border-violet-500 rounded-sm"
                          style={{ top: "15%", left: "25%", width: "100px", height: "100px" }} // 🔽 diperkecil
                        >
                          <span className="absolute w-fit -top-5 left-0 bg-violet-500 text-white text-xs px-2 py-0.5 rounded">😊 Senang</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dzikir */}
                <div className="flex flex-col justify-center items-center h-full text-center w-full space-y-3">
                  <p className="text-base font-semibold">Ekspresi: 😊 Senang</p>
                  <p className="text-sm text-muted-foreground">Rekomendasi Dzikir:</p>
                  <p dir="rtl" className="text-xl font-semibold text-violet-700 dark:text-violet-400 leading-relaxed drop-shadow-md dark:drop-shadow-[0_0_10px_#a855f7] transition-all duration-300">
                    ٱلْـحَـمْـدُ لِلّٰهِ
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 italic">Segala puji bagi Allah</p>
                </div>
              </div>
            </div>
          </div>
        </DialogPortal>
      </Dialog>
    )
  );
}
