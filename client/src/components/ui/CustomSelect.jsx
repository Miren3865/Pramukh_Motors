"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function CustomSelect({ options, value, onChange, placeholder = "Select...", disabled = false }) {
  const [open, setOpen] = useState(false);
  const [menuStyles, setMenuStyles] = useState({});
  const ref = useRef();
  const buttonRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (
        !ref.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    setMenuStyles({
      position: "absolute",
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      background: "#0d1b2e",
      border: "1px solid rgba(99,179,237,0.3)",
      borderRadius: "8px",
      zIndex: 99999,
      boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
      overflow: "hidden",
      maxHeight: "260px",
      overflowY: "auto",
    });
  }, [open]);

  const selected = options?.find((o) => o.value === value);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => { if (!disabled) setOpen((prev) => !prev) }}
        style={{
          width: "100%",
          height: "44px",
          padding: "0 16px",
          background: disabled ? "#111827" : "#0d1b2e",
          border: disabled ? "1px solid rgba(148,163,184,0.3)" : "1px solid rgba(99,179,237,0.3)",
          borderRadius: "8px",
          color: disabled ? "#94a3b8" : selected ? "white" : "#94a3b8",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          fontSize: "14px",
          zIndex: 10,
          position: "relative",
          opacity: disabled ? 0.7 : 1,
        }}
        disabled={disabled}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <span
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            color: "#06b6d4",
          }}
        >
          ▼
        </span>
      </button>

      {open && !disabled && createPortal(
        <div ref={menuRef} style={menuStyles}>
          {options?.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                color: value === opt.value ? "white" : "#cbd5e1",
                background:
                  value === opt.value
                    ? "linear-gradient(135deg, #3b82f6, #06b6d4)"
                    : "transparent",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (value !== opt.value) e.currentTarget.style.background = "#1e3a5f";
              }}
              onMouseLeave={(e) => {
                if (value !== opt.value) e.currentTarget.style.background = "transparent";
              }}
            >
              <span>{opt.label}</span>
              {value === opt.value && <span>✓</span>}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
