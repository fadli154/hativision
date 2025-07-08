import Image from "next/image";

const ButtonHero = ({ className, children, icon, via }) => {
  return (
    <button className={`${className} p-5 rounded-lg backdrop-blur-lg border bg-transparent shadow-md hover:shadow-md  hover:scale-105 active:scale-95 transition-all duration-300 ease-out cursor-pointer group relative overflow-hidden !z-3`}>
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${via} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out`}></div>
      <div className="relative z-10 flex items-center justify-center gap-1 md:gap-3 2xl:gap-4">
        <Image src={`/icons/${icon}.png`} alt={icon} width={55} height={55} sizes="(max-width: 640px) 24px, (max-width: 768px) 40px, 44px" className="w-auto h-auto" />
        <span className=" font-bold transition-colors duration-300 text-xs md:text-sm lg:text-base">{children}</span>
      </div>
    </button>
  );
};

export default ButtonHero;
