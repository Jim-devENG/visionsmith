"use client";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div className={`vs-marquee ${className ?? ""}`}>
      <div className="vs-marquee-track">
        {loop.map((item, index) => (
          <span className="vs-marquee-item" key={`${item}-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
