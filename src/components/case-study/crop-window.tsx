// Static "cropped" hero — drops a tall full-page screenshot into a fixed-height
// box and shows the TOP of it (rest clipped). No browser chrome, no rounded
// corners, no inner scroll — just the image placed flat with a soft shadow.
// Height matches the ScrollWindow hero so variants stay comparable.

import Image from "next/image";

export function CropWindow({
  src,
  alt = "preview",
  width,
  height,
  priority,
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <div className="h-[clamp(380px,58vh,600px)] w-full overflow-hidden bg-white shadow-[0_24px_60px_-22px_rgba(30,50,90,0.28)]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className="block h-auto w-full"
      />
    </div>
  );
}
