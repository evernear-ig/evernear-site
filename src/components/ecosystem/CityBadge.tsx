import { T } from "@/components/trinexus/ui/T";
import type { CityId } from "@/lib/ecosystem/cities";

export function CityBadge({ cityId }: { cityId: CityId }) {
  return (
    <span className={`city-badge city-badge--${cityId}`}>
      <T k={`city.${cityId}.b`} />
    </span>
  );
}
