import React from 'react';
import Eyebrow from './Eyebrow';

interface SectionHeaderProps {
  eyebrow?: string;
  heading: React.ReactNode;
  subheading?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  headingClassName?: string;
  subClassName?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  className = '',
  headingClassName = '',
  subClassName = '',
}) => {
  const textAlign = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`${textAlign} ${className}`}>
      {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
      <h2 className={`text-h2 mt-2 ${headingClassName}`}>{heading}</h2>
      {subheading && (
        <p className={`text-lead mt-4 ${subClassName}`}>{subheading}</p>
      )}
    </div>
  );
};

export default SectionHeader;
