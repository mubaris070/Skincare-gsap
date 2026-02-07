import React, { useState } from "react";

function Zoomimage({
  src,
  zoom = 2,
  lensSize = 120,
  containerHeight = 420,
}) {
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);

  return (
    <div
      className="relative bg-white flex items-center justify-center overflow-hidden border rounded-lg"
      style={{ height: containerHeight }}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setLensPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      <img
        src={src}
        alt="Product"
        className="object-contain h-full"
      />

      {showLens && (
        <div
          className="absolute pointer-events-none border border-gray-400 rounded-full"
          style={{
            width: lensSize,
            height: lensSize,
            top: lensPos.y - lensSize / 2,
            left: lensPos.x - lensSize / 2,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${zoom * 1000}px ${zoom * 1000}px`,
            backgroundPosition: `-${lensPos.x * zoom}px -${lensPos.y * zoom}px`,
          }}
        />
      )}
    </div>
  );
}

export default Zoomimage;
