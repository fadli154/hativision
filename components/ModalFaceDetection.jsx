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
    setIsOpen(!!imageUrl);

    const modalWidth = Math.min(window.innerWidth * 0.9, 768);
    const modalHeight = window.innerWidth < 768 ? 300 : 400;
    const offsetY = window.innerWidth < 768 ? 120 : 0; // 🔼 lebih tinggi di mobile
    const centerX = (window.innerWidth - modalWidth) / 2;
    const centerY = (window.innerHeight - modalHeight) / 2 - offsetY;
    setPosition({ x: centerX, y: Math.max(20, centerY) }); // minimal top 20px
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
              maxWidth: "768px",
              minWidth: "300px",
            }}
            className="overflow-visible rounded-xl border border-border shadow-2xl p-8 bg-white dark:bg-zinc-950 cursor-move"
          >
            {/* Header */}
            <div className="relative select-none pb-4">
              <h2 className="text-xl text-center w-full font-semibold">{t("title")}</h2>
              <button
                onClick={handleClose}
                className="absolute -top-5 -right-5 w-7 h-7 flex items-center justify-center rounded-full border border-red-300 bg-white text-red-500 shadow-sm hover:bg-red-500 hover:text-white hover:scale-110 hover:rotate-12 focus:bg-red-500 focus:text-white focus:scale-110 focus:rotate-12 active:scale-95 transition-all duration-300 ease-in-out dark:bg-zinc-900 dark:hover:bg-red-600 dark:focus:bg-red-600 cursor-pointer outline-none"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Konten */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 items-start">
              {/* Gambar */}
              <div className="relative w-full flex justify-center items-center">
                {imageUrl && (
                  <div className="relative w-full max-w-[200px] md:max-w-[300px]">
                    <div className="w-full aspect-[3/4] relative">
                      <img src={imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-contain rounded-md border shadow-sm" />
                      <div className="absolute border-2 border-blue-500 rounded-sm" style={{ top: "10%", left: "25%", width: "100px", height: "100px" }}>
                        <span className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">😊 Senang</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dzikir */}
              <div className="flex flex-col justify-center items-center h-full text-center w-full space-y-4">
                <p className="text-lg font-semibold">Ekspresi: 😊 Senang</p>
                <p className="text-sm text-muted-foreground">Rekomendasi Dzikir:</p>
                <p dir="rtl" className="text-2xl font-semibold text-blue-700 dark:text-blue-400 leading-relaxed">
                  ٱلْـحَـمْـدُ لِلّٰهِ
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 italic">Segala puji bagi Allah</p>
              </div>
            </div>
          </div>
        </DialogPortal>
      </Dialog>
    )
  );
}
