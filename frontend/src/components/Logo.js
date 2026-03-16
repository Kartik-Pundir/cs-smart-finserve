import React from 'react';
import { Link } from 'react-router-dom';

const CSIcon = ({ size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top-left bracket arm */}
    <rect x="10" y="10" width="14" height="42" rx="2" fill="#cc2200" />
    <rect x="10" y="10" width="38" height="14" rx="2" fill="#cc2200" />

    {/* Top-right bracket arm */}
    <rect x="96" y="10" width="14" height="42" rx="2" fill="#cc2200" />
    <rect x="72" y="10" width="38" height="14" rx="2" fill="#cc2200" />

    {/* Bottom chevron / diamond */}
    <polygon points="60,100 30,72 42,72 60,88 78,72 90,72" fill="#cc2200" />

    {/* C shape */}
    <path
      d="M44 38 C36 38 30 44 30 54 C30 64 36 70 44 70 L44 62 C40 62 38 58 38 54 C38 50 40 46 44 46 Z"
      fill="#cc2200"
    />

    {/* S shape */}
    <path
      d="M52 38 L72 38 L72 46 L58 46 L58 50 L70 50 C73 50 76 53 76 58 L76 62 C76 67 73 70 68 70 L50 70 L50 62 L66 62 L66 58 L54 58 C51 58 48 55 48 50 L48 44 C48 40 50 38 52 38 Z"
      fill="#cc2200"
    />
  </svg>
);

const Logo = ({ size = 'md', showText = true, linkTo = '/' }) => {
  const configs = {
    sm:  { iconSize: 36, name: 'text-[11px]', sub: 'text-[8px]'  },
    md:  { iconSize: 48, name: 'text-sm',     sub: 'text-[9px]'  },
    lg:  { iconSize: 60, name: 'text-base',   sub: 'text-[11px]' },
    xl:  { iconSize: 72, name: 'text-lg',     sub: 'text-xs'     },
    nav: { iconSize: 44, name: 'text-[13px]', sub: 'text-[9px]'  },
  };

  const c = configs[size] || configs.md;

  return (
    <Link to={linkTo} className="flex items-center gap-2 no-underline select-none group">
      <CSIcon size={c.iconSize} />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={`font-heading font-black tracking-wide text-[#cc2200] ${c.name} uppercase group-hover:text-[#aa1800] transition-colors`}
          >
            CS Smart Finserve
          </span>
          <span
            className={`font-heading font-bold tracking-widest text-[#cc2200] ${c.sub} uppercase opacity-80`}
          >
            Private Limited
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
