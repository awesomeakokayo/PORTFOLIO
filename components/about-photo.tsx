import Image from "next/image";
import { siteContent } from "@/lib/content";

export function AboutPhoto({
  priority = false,
  sizes = "(max-width: 900px) 90vw, 460px",
}: {
  priority?: boolean;
  sizes?: string;
}) {
  const about = siteContent.about;

  return (
    <div className="about-photo" data-cursor="photo" data-cursor-label="HI">
      <span className="about-photo__block" aria-hidden="true" />
      <div className="about-photo__frame">
        <Image
          className="about-photo__image"
          src={about.photo}
          alt={about.photoAlt}
          fill
          priority={priority}
          sizes={sizes}
        />
      </div>
    </div>
  );
}
