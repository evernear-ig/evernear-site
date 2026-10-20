import { EcoSectionFrame } from "@/components/evernear/ui/EcoSectionFrame";
import { JoinButton } from "@/components/evernear/ui/JoinButton";
import { Reveal } from "@/components/evernear/ui/Reveal";
import { T } from "@/components/evernear/ui/T";

export function NextSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <EcoSectionFrame embedded={embedded} className="dark" id="next">
        <Reveal>
          <h2 className="h-xl">
            <T k="next.h" />
          </h2>
        </Reveal>
        <Reveal className="event">
          <div className="code">
            001
            <small>
              <T k="next.name" />
            </small>
          </div>
          <div className="stack">
            <div className="status">
              <i />
              <span>
                <T k="next.status" />
              </span>
            </div>
            <h3>Evernear 001</h3>
            <p>
              <T k="next.p" />
            </p>
            <div className="btns">
              <JoinButton className="btn btn-ghost" labelKey="cta.updates" />
            </div>
          </div>
        </Reveal>
    </EcoSectionFrame>
  );
}
