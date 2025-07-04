import Image from "next/image";

const ButtonHero = ({ className, children, icon, color }) => {
  return (
    <button
      className={`${className} p-5 rounded-lg backdrop-blur-lg border border-${color}-500/20 bg-transparent shadow-lg hover:shadow-2xl hover:shadow-${color}-500/30 hover:scale-110 active:scale-95 transition-all duration-300 ease-out cursor-pointer hover:border-${color}-500/50 group relative overflow-hidden z-20`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${color}-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out`}></div>
      <div className="relative z-10 flex items-center gap-3">
        <Image src={`/icons/${icon}.png`} width="40" height="40" alt={icon} />
        <span className=" font-bold transition-colors duration-300">{children}</span>
      </div>
    </button>
  );
};

export default ButtonHero;
