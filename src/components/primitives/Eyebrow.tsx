import React from 'react';

interface EyebrowProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
}

const Eyebrow: React.FC<EyebrowProps> = ({ children, text, className = '' }) => (
  <p className={`text-eyebrow ${className}`}>{children || text}</p>
);

export default Eyebrow;
