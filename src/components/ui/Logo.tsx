import Image from "next/image";

export function Logo({ variant = "white", className = "h-10 w-auto", priority }: { variant?: "white" | "color"; className?: string; priority?: boolean }) {
  return (
    <Image
      src={variant === "white" ? "/brand/dm-logo-white.png" : "/brand/dm-logo.png"}
      alt="DM Empresarial"
      width={933}
      height={572}
      className={className}
      priority={priority}
    />
  );
}
