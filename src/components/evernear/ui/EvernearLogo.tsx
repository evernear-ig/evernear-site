import Image from "next/image";
import { MASCOT_POSE_SRC } from "@/lib/mascot-poses";

type EvernearLogoProps = {
  showText?: boolean;
};

export function EvernearLogo({ showText = true }: EvernearLogoProps) {
  return (
    <>
      <span className="logo-mark" aria-hidden="true">
        <Image
          src={MASCOT_POSE_SRC.welcome}
          alt=""
          width={40}
          height={48}
          priority
        />
      </span>
      {showText ? "Evernear" : null}
    </>
  );
}
