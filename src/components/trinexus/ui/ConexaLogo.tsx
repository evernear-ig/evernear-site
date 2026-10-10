import Image from "next/image";
import { MASCOT_POSE_SRC } from "@/lib/mascot-poses";

type ConexaLogoProps = {
  showText?: boolean;
};

export function ConexaLogo({ showText = true }: ConexaLogoProps) {
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
      {showText ? "CONEXA" : null}
    </>
  );
}
