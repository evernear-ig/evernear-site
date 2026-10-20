import { VerticalGuideSection } from "@/components/evernear/sections/VerticalGuideSection";

export function SportGuideSection({ embedded = false }: { embedded?: boolean }) {
  return <VerticalGuideSection verticalSlug="deporte" embedded={embedded} />;
}
