import { cn } from "../lib/utils";

export const Logo = ({ className, uniColor }) => {
  return (
    <svg viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("text-foreground h-6 w-auto", className)}>
      {/* Heart Shape */}
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 
             8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 
             2.09C13.09 3.81 14.76 3 16.5 3 19.58 
             3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
             11.54L12 21.35z"
        fill={uniColor ? "currentColor" : "url(#logo-gradient)"}
      />
      {/* Text "hatiVision" */}
      <text x="28" y="17" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="600">
        hatiVision
      </text>
      <defs>
        <linearGradient id="logo-gradient" x1="12" y1="3" x2="12" y2="21.35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9B99FE" />
          <stop offset="1" stopColor="#2BC8B7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LogoIcon = ({ className, uniColor }) => {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("size-5", className)}>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 
             8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 
             2.09C13.09 3.81 14.76 3 16.5 3 19.58 
             3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
             11.54L12 21.35z"
        fill={uniColor ? "currentColor" : "url(#logo-gradient)"}
      />
      <defs>
        <linearGradient id="logo-gradient" x1="12" y1="3" x2="12" y2="21.35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9B99FE" />
          <stop offset="1" stopColor="#2BC8B7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LogoStroke = ({ className }) => {
  return (
    <svg className={cn("size-7 w-7", className)} viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 
             8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 
             2.09C13.09 3.81 14.76 3 16.5 3 19.58 
             3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
             11.54L12 21.35z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
      />
    </svg>
  );
};
