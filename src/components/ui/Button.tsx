import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
  showIcon?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  showIcon = false,
  ...props
}: ButtonProps) {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    borderRadius: "50px",
    fontWeight: "500",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  };

  const variantStyles = {
    primary: {
      backgroundColor: "var(--rc-primary)",
      color: "#fff",
      boxShadow: "var(--shadow-sm)",
      border: "1px solid transparent",
    },
    secondary: {
      backgroundColor: "var(--rc-secondary)",
      color: "var(--rc-text-main)",
      boxShadow: "var(--shadow-sm)",
      border: "1px solid transparent",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--rc-primary-dark)",
      border: "2px solid var(--rc-primary)",
    }
  };

  const sizeStyles = {
    sm: { padding: "0.5rem 1rem", fontSize: "0.85rem" },
    md: { padding: "0.75rem 1.5rem", fontSize: "1rem" },
    lg: { padding: "1rem 2rem", fontSize: "1.1rem", fontWeight: "600" as const },
  };

  const combinedStyles = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size]
  };

  const content = (
    <>
      {children}
      {showIcon && <ArrowRight size={size === "lg" ? 20 : 16} />}
    </>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={"hover-lift " + className} 
        style={combinedStyles}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={"hover-lift " + className}
      style={combinedStyles}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
