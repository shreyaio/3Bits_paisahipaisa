import { ReactNode } from "react";

interface BentoBoxProps {
  children: ReactNode;
  className?: string;
}

const BentoBox = ({ children, className = "" }: BentoBoxProps) => {
  return (
    <div 
      className={`
        bg-lime-light border border-lime/20 rounded-xl p-4
        hover:shadow-lg hover:border-lime/40 
        transition-all duration-300 ease-out
        hover:scale-[1.02]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default BentoBox;