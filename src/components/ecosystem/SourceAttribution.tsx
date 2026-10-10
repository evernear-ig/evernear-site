import { T } from "@/components/trinexus/ui/T";
import type { TourismSourceStatus } from "@/lib/ecosystem/types";

export function SourceAttribution({
  status,
  officialName,
  officialUrl,
}: {
  status: TourismSourceStatus;
  officialName?: string;
  officialUrl?: string;
}) {
  const statusKey =
    status === "candidate"
      ? "tourism.status.candidate"
      : status === "confirmed"
        ? "tourism.status.confirmed"
        : "tourism.status.unavailable";

  return (
    <div className="source-attribution">
      <span className={`eco-badge eco-badge--${status}`}>
        <T k={statusKey} />
      </span>
      {officialName && officialUrl && (
        <p>
          <T k="tourism.source" />:{" "}
          <a href={officialUrl} target="_blank" rel="noopener noreferrer">
            {officialName}
          </a>
        </p>
      )}
      {status === "candidate" && (
        <p className="source-note">
          <T k="tourism.permission.note" />
        </p>
      )}
    </div>
  );
}
