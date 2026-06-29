import { useState } from "react";

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle: React.CSSProperties = {
  display: "flex",
};

interface StarRatingProps {
  maxRating?: number;
  defaultRating?: number;
  color?: string;
  size?: number;
  messages?: string[];
  className?: string;
  locked?: boolean;
  onSetRating?: (rating: number) => void;
}

export default function StarRating({
  maxRating = 5,
  size = 48,
  className = "",
  defaultRating = 0,
  locked = false,
  onSetRating,
}: StarRatingProps) {
  const [rating, setRating] = useState<number>(defaultRating);
  const [tempRating, setTempRating] = useState<number>(0);

  function handleRating(rating: number) {
    if (locked) return;
    setRating(rating);
    if (onSetRating) onSetRating(rating);
  }

  function handleHoverIn(value: number) {
    if (locked) return;
    setTempRating(value);
  }

  function handleHoverOut() {
    if (locked) return;
    setTempRating(0);
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => handleHoverIn(i + 1)}
            onHoverOut={handleHoverOut}
            size={size}
            locked={locked}
          />
        ))}
      </div>
    </div>
  );
}

interface StarProps {
  onRate?: () => void;
  full?: boolean;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  size?: number;
  locked?: boolean;
}

export function Star({
  onRate,
  full,
  onHoverIn,
  onHoverOut,
  size = 24,
  locked,
}: StarProps) {
  const starStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: locked ? "initial" : "pointer",
  };

  return (
    <div
      style={starStyle}
      onClick={locked ? undefined : onRate}
      onMouseEnter={locked ? undefined : onHoverIn}
      onMouseLeave={locked ? undefined : onHoverOut}
    >
      {full ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 39 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4966 0L24.0991 14.5106H38.9932L26.9436 23.4787L31.5462 37.9894L19.4966 29.0213L7.44698 37.9894L12.0495 23.4787L-7.62939e-05 14.5106H14.894L19.4966 0Z"
            fill="#FFB743"
          />
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 41 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.4478 0L25.2748 15.8926H40.8955L28.2581 25.7148L33.0851 41.6074L20.4478 31.7852L7.81037 41.6074L12.6374 25.7148L3.8147e-05 15.8926H15.6207L20.4478 0Z"
            fill="#D9D9D9"
          />
        </svg>
      )}
    </div>
  );
}
