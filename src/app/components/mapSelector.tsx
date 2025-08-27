"use client";

import React from "react";
import styles from "./css/mapSelector.module.css";

type MapItem = { id: string; name: string };

export default function mapSelector({
  maps = [
    { id: "lotus", name: "Lotus" },
    { id: "sunset", name: "Sunset" },
    { id: "haven", name: "Haven" },
    { id: "breeze", name: "Breeze" },
    { id: "ascent", name: "Ascent" },
  ],
  selected,
  onSelect,
}: {
  maps?: MapItem[];
  selected?: string | null;
  onSelect?: (id: string | null) => void;
}) {
  return (
    <div className={styles.container} role="list" aria-label="Map selector">
      <button
        type="button"
        className={`${styles.tile} ${selected === null ? styles.selected : ""}`}
        onClick={() => onSelect?.(null)}
        aria-pressed={selected === null}
        title="Mostrar todos"
      >
        <span className={styles.label}>All</span>
      </button>

      {maps.map((m) => {
        const isSelected = selected === m.id;
        return (
          <button
            key={m.id}
            type="button"
            className={`${styles.tile} ${isSelected ? styles.selected : ""}`}
            onClick={() => onSelect?.(m.id)}
            aria-pressed={isSelected}
            title={m.name}
          >
            <span className={styles.label}>{m.name}</span>
          </button>
        );
      })}
    </div>
  );
}
