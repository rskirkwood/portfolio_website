type Props = {
  github?: string;
  linkedin?: string;
  size?: number;
  className?: string;
};

export default function SocialIcons({ github, linkedin, size = 20, className }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      {github && (
        <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-zinc-700 hover:text-zinc-900"
          >
            <path d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.23 3.4 9.67 8.13 11.24.6.1.82-.27.82-.58v-2.02c-3.31.73-4-1.6-4-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.78.08-.76.08-.76 1.22.09 1.86 1.28 1.86 1.28 1.08 1.9 2.84 1.35 3.53 1.03.11-.8.42-1.35.76-1.66-2.64-.31-5.42-1.36-5.42-6.06 0-1.34.47-2.43 1.25-3.29-.13-.31-.54-1.57.12-3.27 0 0 1.02-.33 3.34 1.25a11.5 11.5 0 0 1 6.08 0c2.32-1.58 3.34-1.25 3.34-1.25.66 1.7.25 2.96.12 3.27.78.86 1.25 1.95 1.25 3.29 0 4.71-2.79 5.74-5.45 6.05.43.37.82 1.1.82 2.22v3.29c0 .31.21.69.83.57A11.5 11.5 0 0 0 23.5 12.3 11.5 11.5 0 0 0 12 .5Z" />
          </svg>
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-zinc-700 hover:text-zinc-900"
          >
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zM8.5 8h3.8v2.2h.1c.5-1 1.7-2.2 3.6-2.2 3.8 0 4.5 2.5 4.5 5.7V24h-4v-6.7c0-1.6 0-3.7-2.2-3.7-2.2 0-2.5 1.7-2.5 3.5V24h-4V8z" />
          </svg>
        </a>
      )}
    </span>
  );
}
