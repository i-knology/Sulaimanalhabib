import React from "react";

const CardWithHeader: React.FC<{
  titleSlot?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}> = ({ titleSlot, children, className = "" }) => {
  return (
    <div className={`rounded-2xl ${className}`}>
      {titleSlot && (
        <div className="flex items-center px-3 py-3 mb-1 rounded-xl text-lg font-semibold">
          {titleSlot}
        </div>
      )}
      <div id="content" className="p-1">
        {children}
      </div>
    </div>
  );
};

export default CardWithHeader;
