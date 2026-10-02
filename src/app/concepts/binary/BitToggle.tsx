"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import styles from "./BitToggle.module.css";

const COLUMN_VALUES = [128, 64, 32, 16, 8, 4, 2, 1];
const MAX_VALUE = 255;

// A column is "on" when dividing by its value leaves an odd number,
// the same idea as n % 2 reading the rightmost bit.
const isColumnOn = (value: number, columnValue: number): boolean =>
  Math.floor(value / columnValue) % 2 === 1;

export default function BitToggle() {
  const [value, setValue] = useState(11);
  const [inputText, setInputText] = useState("11");

  const updateValue = (next: number): void => {
    setValue(next);
    setInputText(String(next));
  };

  const toggleColumn = (columnValue: number): void => {
    updateValue(
      isColumnOn(value, columnValue) ? value - columnValue : value + columnValue,
    );
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const raw = event.target.value;
    setInputText(raw);
    const next = Number(raw);
    if (raw !== "" && Number.isInteger(next) && next >= 0 && next <= MAX_VALUE) {
      setValue(next);
    }
  };

  const binaryString = COLUMN_VALUES.map((columnValue) =>
    isColumnOn(value, columnValue) ? "1" : "0",
  ).join("");

  const onColumns = COLUMN_VALUES.filter((columnValue) =>
    isColumnOn(value, columnValue),
  );
  // Show the sum only when there's something to add up.
  const sum =
    onColumns.length > 1 ? `${onColumns.join(" + ")} = ${value}` : `${value}`;

  return (
    <div className={styles.widget}>
      <p className={styles.instructions}>
        Click a column to flip it between 0 and 1. Try +1 from 7, or −1 from
        8, and watch which bits change.
      </p>

      <div className={styles.bits} role='group' aria-label='The 8 bits of a byte'>
        {COLUMN_VALUES.map((columnValue) => {
          const on = isColumnOn(value, columnValue);
          return (
            <button
              key={columnValue}
              type='button'
              className={`${styles.bit} ${on ? styles.bitOn : ""}`}
              aria-pressed={on}
              aria-label={`${columnValue} column`}
              onClick={() => toggleColumn(columnValue)}
            >
              <span className={styles.bitDigit} aria-hidden='true'>
                {on ? 1 : 0}
              </span>
              <span className={styles.bitValue} aria-hidden='true'>
                {columnValue}
              </span>
            </button>
          );
        })}
      </div>

      <output className={styles.result} aria-live='polite'>
        <span className={styles.resultLine}>
          <span className={styles.resultLabel}>Binary</span>
          <span className={styles.resultValue}>{binaryString}</span>
        </span>
        <span className={styles.resultLine}>
          <span className={styles.resultLabel}>Decimal</span>
          <span className={styles.resultValue}>{sum}</span>
        </span>
      </output>

      <div className={styles.controls}>
        <button
          type='button'
          className={styles.control}
          onClick={() => updateValue(value - 1)}
          disabled={value === 0}
        >
          −1
        </button>
        <button
          type='button'
          className={styles.control}
          onClick={() => updateValue(value + 1)}
          disabled={value === MAX_VALUE}
        >
          +1
        </button>
        <button
          type='button'
          className={styles.control}
          onClick={() => updateValue(0)}
        >
          Clear
        </button>
        <label className={styles.inputLabel}>
          Set a number (0 to 255)
          <input
            className={styles.input}
            type='number'
            inputMode='numeric'
            min={0}
            max={MAX_VALUE}
            value={inputText}
            onChange={handleInput}
            onBlur={() => setInputText(String(value))}
          />
        </label>
      </div>
    </div>
  );
}
