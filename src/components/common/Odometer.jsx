import { useMemo } from "react";

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

function Digit({ value }) {
  return (
    <div className="odometer-digit">
      <div
        className="odometer-digit-inner"
        style={{ transform: `translateY(-${value * 1.2}em)` }}
      >
        {DIGITS.map((d) => (
          <div key={d} className="odometer-number">
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Odometer({ value, format }) {
  const safeValue = Number.isFinite(value) ? value : 0;

  const formatted = useMemo(
    () => (format ? format(safeValue) : safeValue.toString()),
    [safeValue, format]
  );

  const chars = formatted.split("");

  return (
    <span className="odometer">
      {chars.map((char, i) =>
        /\d/.test(char) ? (
          <Digit key={i} value={Number(char)} />
        ) : (
          <span key={i} className="odometer-separator">
            {char}
          </span>
        )
      )}
    </span>
  );
}
