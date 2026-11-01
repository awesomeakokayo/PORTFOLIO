import React, { useCallback, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { getThemeName } from "./theme.js";

export default function ThemeSlider({
  level,
  onChange,
  wide = false,
  className = "",
  id,
}) {
  const trackRef = useRef(null);
  const dragging = useRef(false);
  const name = getThemeName(level);

  const updateFromClientX = useCallback(
    (clientX) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      if (!rect.width) return;
      const next = Math.round(((clientX - rect.left) / rect.width) * 100);
      onChange(Math.min(100, Math.max(0, next)));
    },
    [onChange]
  );

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging.current = true;
    trackRef.current?.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event) => {
    if (!dragging.current) return;
    updateFromClientX(event.clientX);
  };

  const endDrag = (event) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event) => {
    const step = event.shiftKey ? 10 : 4;
    let next = level;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") next = level + step;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = level - step;
    else if (event.key === "PageUp") next = level + 20;
    else if (event.key === "PageDown") next = level - 20;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 100;
    else return;

    event.preventDefault();
    onChange(Math.min(100, Math.max(0, next)));
  };

  return (
    <div
      id={id}
      className={"rb-theme" + (wide ? " is-wide" : "") + (className ? " " + className : "")}
    >
      <div className="rb-theme-readout" aria-hidden="true">
        <span>
          <Sun size={11} strokeWidth={1.6} />
        </span>
        <span className="rb-theme-name">{name}</span>
        <span>
          <Moon size={10} strokeWidth={1.6} />
        </span>
      </div>

      <div
        ref={trackRef}
        className="rb-theme-track"
        role="slider"
        tabIndex={0}
        aria-label="Appearance, from light to dark"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={level}
        aria-valuetext={name}
        style={{ "--level": level / 100 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={() => {
          dragging.current = false;
        }}
        onKeyDown={handleKeyDown}
      >
        <span className="rb-theme-sheen" aria-hidden="true" />
        <span className="rb-theme-thumb" aria-hidden="true">
          <span className="rb-theme-thumb-gloss" />
        </span>
      </div>
    </div>
  );
}
