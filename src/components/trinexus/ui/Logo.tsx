export function Logo({ href = "#top" }: { href?: string }) {
  return (
    <a href={href} className="logo" aria-label="TRINEXUS, inicio">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M20 5 L35 31 L5 31 Z"
          fill="none"
          stroke="#F6F7FB"
          strokeWidth="1.5"
        />
        <circle cx="20" cy="5" r="3" fill="#F6F7FB" />
        <circle cx="35" cy="31" r="3" fill="#F6F7FB" />
        <circle cx="5" cy="31" r="3" fill="#F6F7FB" />
        <circle cx="20" cy="22" r="3.5" fill="#2EE59D" />
      </svg>
      TRINEXUS
    </a>
  );
}

export function LogoWithA11y({ href = "#top" }: { href?: string }) {
  return (
    <a href={href} className="logo" aria-label="TRINEXUS, inicio">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M20 5 L35 31 L5 31 Z"
          fill="none"
          stroke="#F6F7FB"
          strokeWidth="1.5"
        />
        <circle cx="20" cy="5" r="3" fill="#F6F7FB" />
        <circle cx="35" cy="31" r="3" fill="#F6F7FB" />
        <circle cx="5" cy="31" r="3" fill="#F6F7FB" />
        <circle cx="20" cy="22" r="3.5" fill="#2EE59D" />
      </svg>
      TRINEXUS
    </a>
  );
}
