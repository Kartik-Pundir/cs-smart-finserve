import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ size = 'md', showText = true, linkTo = '/', className = '', imgClassName = '', textClassName = '' }) => {
  const configs = {
    xs:  { height: 28,  name: 'text-[10px]', sub: 'text-[7px]' },
    sm:  { height: 36,  name: 'text-xs',     sub: 'text-[8px]' },
    md:  { height: 44,  name: 'text-sm',     sub: 'text-[9px]' },
    lg:  { height: 54,  name: 'text-base',   sub: 'text-[10px]' },
    xl:  { height: 68,  name: 'text-lg',     sub: 'text-xs' },
    nav: { height: 46,  name: 'text-[13px]', sub: 'text-[9px]' },
  };

  const c = configs[size] || configs.md;

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <img
        src="/logo.png"
        alt="CS Smart Finserve Logo"
        style={{ height: `${c.height}px`, width: 'auto' }}
        className={`object-contain transition-transform duration-300 group-hover:scale-105 ${imgClassName}`}
        loading="eager"
      />
      {showText && (
        <div className={`flex flex-col leading-tight ${textClassName}`}>
          <span className={`font-heading font-black tracking-wide ${c.name} uppercase transition-colors`}>
            <span className="text-[#0265c2] group-hover:text-[#004b93]">CS</span>{' '}
            <span className="text-slate-800 dark:text-white">Smart Finserve</span>
          </span>
          <span className={`font-heading font-bold tracking-widest text-emerald-600 dark:text-emerald-400 ${c.sub} uppercase opacity-90`}>
            Private Limited
          </span>
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-flex items-center no-underline group">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
