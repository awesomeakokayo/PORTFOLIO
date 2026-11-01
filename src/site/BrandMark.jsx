import React from "react";

export default function BrandMark({ className = "", size = 44, standalone = false }) {
  return (
    <span
      className={"rb-mark" + (standalone ? " is-standalone" : "") + (className ? " " + className : "")}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        {/* Bold faceted compass needle with directional contrast */}
        <path
          d="M16 2.8 L25.5 28.2 L16 22.4 Z"
          fill="currentColor"
        />
        <path
          d="M16 2.8 L6.5 28.2 L16 22.4 Z"
          fill="currentColor"
          opacity="0.68"
        />
        <circle className="rb-mark-dot" cx="16" cy="18.5" r="1.8" />
      </svg>
    </span>
  );
}
