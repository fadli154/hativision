"use client";

import Image from "next/image";
import { useRef } from "react";

const ButtonHero = ({ className, children, icon, via, mode, onFileChange }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileChange) {
      onFileChange(file);
    }
  };

  const inputProps = {
    type: "file",
    accept: "image/png, image/jpeg, image/jpg",
    ref: inputRef,
    onChange: handleFileChange,
    style: { display: "none" },
  };

  if (mode === "camera") {
    inputProps.capture = "environment";
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`${className} p-5 rounded-lg backdrop-blur-lg border bg-transparent shadow-md hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 ease-out cursor-pointer group relative overflow-hidden z-10`}
      >
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${via} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out`}></div>
        <div className="relative z-10 flex items-center justify-center gap-1 md:gap-3 2xl:gap-4">
          <Image src={`/icons/${icon}.png`} alt={icon} width={55} height={55} sizes="(max-width: 640px) 24px, (max-width: 768px) 40px, 44px" className="w-auto h-auto" />
          <span className="font-bold transition-colors duration-300 text-xs md:text-sm lg:text-base">{children}</span>
        </div>
      </button>

      <input {...inputProps} />
    </>
  );
};

export default ButtonHero;
