"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// Mide la posición del título y del botón "Contáctanos" en la columna 1
// del bloque "Origin story", y posiciona esta caja (la columna 2) para que
// empiece a la misma altura que el título y termine alineada con el borde
// inferior del botón — igual al enfoque de HeroBodyDivider, necesario
// porque esa altura depende del contenido real, no de un valor fijo.
export function OriginImageFrame({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const [style, setStyle] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    function measure() {
      const row = document.querySelector("[data-origin-row]");
      const title = document.querySelector("[data-origin-title]");
      const button = document.querySelector("[data-origin-button]");

      if (!row || !title || !button) {
        setStyle(null);
        return;
      }

      const rowRect = row.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const top = titleRect.top - rowRect.top;
      const height = buttonRect.bottom - rowRect.top - top;
      setStyle({ top, height });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      className={className}
      style={style ? { top: style.top, height: style.height } : undefined}
    >
      {children}
    </div>
  );
}
