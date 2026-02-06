"use client";

import { cn } from "@/lib/utils/cn";

interface HeadingProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  text?: string;
}

export default function Heading({
  children,
  className,
  style,
  level = 2,
  text = "Heading",
}: HeadingProps) {
  const defaultSizes: Record<number, string> = {
    1: "2.5rem",
    2: "2rem",
    3: "1.75rem",
    4: "1.5rem",
    5: "1.25rem",
    6: "1rem",
  };

  const headingStyle = { fontSize: defaultSizes[level], ...style };
  const headingClassName = cn("font-bold", className);
  const content = children || text;

  switch (level) {
    case 1:
      return (
        <h1 className={headingClassName} style={headingStyle}>
          {content}
        </h1>
      );
    case 2:
      return (
        <h2 className={headingClassName} style={headingStyle}>
          {content}
        </h2>
      );
    case 3:
      return (
        <h3 className={headingClassName} style={headingStyle}>
          {content}
        </h3>
      );
    case 4:
      return (
        <h4 className={headingClassName} style={headingStyle}>
          {content}
        </h4>
      );
    case 5:
      return (
        <h5 className={headingClassName} style={headingStyle}>
          {content}
        </h5>
      );
    case 6:
      return (
        <h6 className={headingClassName} style={headingStyle}>
          {content}
        </h6>
      );
    default:
      return (
        <h2 className={headingClassName} style={headingStyle}>
          {content}
        </h2>
      );
  }
}
