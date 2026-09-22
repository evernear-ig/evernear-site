import { AboutContentPage } from "@/components/ecosystem/AboutContentPage";

export default function QueEsPage() {
  return (
    <AboutContentPage
      layout="fullscreen"
      titleKey="about.page.h"
      leadKey="about.page.lead"
      heroImageKey="about.vision"
      blocks={[
        {
          titleKey: "about.vision.h",
          bodyKeys: ["about.vision.p1", "about.vision.p2"],
          imageKey: "about.vision",
        },
        {
          titleKey: "about.mission.h",
          bodyKeys: ["about.mission.p1", "about.mission.p2"],
          imageKey: "about.mission",
        },
        {
          titleKey: "about.goals.h",
          bodyKeys: ["about.goals.p1", "about.goals.p2", "about.goals.p3"],
          imageKey: "about.goals",
          list: true,
        },
      ]}
      footerLinks={[
        { href: "/informacion", key: "nav.information" },
        { href: "/#join", key: "nav.join.cta" },
      ]}
    />
  );
}
