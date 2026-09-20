import Link from "next/link";
import { T } from "@/components/trinexus/ui/T";
import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";

export function VerticalNavStrip({ activeSlug }: { activeSlug: string }) {
  return (
    <section className="tint eco-nav-strip">
      <div className="wrap">
        <p className="eco-nav-label">
          <T k="eco.explore" />
        </p>
        <ul className="eco-nav-links">
          {ECOSYSTEM_VERTICALS.map((vertical) => (
            <li key={vertical.slug}>
              <Link
                href={vertical.href}
                className={vertical.slug === activeSlug ? "active" : undefined}
                aria-current={
                  vertical.slug === activeSlug ? "page" : undefined
                }
              >
                <T k={vertical.navKey} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
