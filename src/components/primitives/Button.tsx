import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'creamText';
  size?: 'default' | 'nav';
  children?: React.ReactNode;
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  showChevron?: boolean;
}

const Chevron = () => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" aria-hidden="true">
    <path d="M1 1L4 4.5L1 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  children,
  label,
  href,
  onClick,
  className = '',
  showChevron = false,
}) => {
  const content = children || label;
  const variantClass =
    variant === 'outline' ? 'btn-outline' :
    variant === 'creamText' ? 'btn-cream-text' :
    'btn-primary';

  const sizeClass = size === 'nav' ? 'btn-nav' : '';
  const classes = `btn ${variantClass} ${sizeClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
        {showChevron && <Chevron />}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
      {showChevron && <Chevron />}
    </button>
  );
};

export default Button;
