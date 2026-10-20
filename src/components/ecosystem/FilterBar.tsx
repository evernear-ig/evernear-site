"use client";

import { useI18n } from "@/components/evernear/providers/I18nProvider";
import { T } from "@/components/evernear/ui/T";

type FilterOption = { value: string; labelKey: string; label?: string };

type FilterBarProps = {
  filters: {
    id: string;
    labelKey: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
};

export function FilterBar({ filters }: FilterBarProps) {
  const { t } = useI18n();

  return (
    <div className="eco-filters">
      {filters.map((filter) => (
        <label key={filter.id} className="eco-filter">
          <span>
            <T k={filter.labelKey} />
          </span>
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
          >
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label ?? String(t(opt.labelKey))}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}
