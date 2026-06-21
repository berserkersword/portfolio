"use client";

import { useRouter } from "next/navigation";
import { useGlitchTrigger } from "./useGlitch";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function TransitionLink({ href, children, className, style, onClick }: Props) {
  const router = useRouter();
  const triggerTransition = useGlitchTrigger();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();

    triggerTransition(() => {
      router.push(href);
    });
  };

  return (
    <a href={href} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
}