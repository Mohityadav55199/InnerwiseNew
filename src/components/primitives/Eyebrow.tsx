import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Orange uppercase section label (styles: `.eyebrow` in index.css). */
const Eyebrow: React.FC<EyebrowProps> = ({ children, className = '', style }) => (
  <p className={`eyebrow ${className}`.trim()} style={style}>{children}</p>
);

export default Eyebrow;
