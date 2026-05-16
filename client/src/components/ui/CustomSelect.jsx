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
      background: "#FFFFFF",
      border: "1px solid #E5E5E5",
      borderRadius: "2px",
      zIndex: 99999,
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
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
          background: disabled ? "#F8F8F8" : "#FFFFFF",
          border: "1px solid #E5E5E5",
          borderRadius: "2px",
          color: disabled ? "#999999" : selected ? "#111111" : "#666666",
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
            color: "#C9A227",
            fontSize: "10px",
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
                color: value === opt.value ? "#111111" : "#666666",
                background:
                  value === opt.value
                    ? "#F8F8F8"
                    : "transparent",
                fontWeight: value === opt.value ? "600" : "400",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.2s ease",
                fontSize: "14px",
              }}
              onMouseEnter={(e) => {
                if (value !== opt.value) e.currentTarget.style.background = "#F8F8F8";
                if (value !== opt.value) e.currentTarget.style.color = "#111111";
              }}
              onMouseLeave={(e) => {
                if (value !== opt.value) e.currentTarget.style.background = "transparent";
                if (value !== opt.value) e.currentTarget.style.color = "#666666";
              }}
            >
              <span>{opt.label}</span>
              {value === opt.value && <span style={{ color: "#C9A227" }}>✓</span>}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
