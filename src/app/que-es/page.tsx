import { AboutContentPage } from "@/components/ecosystem/AboutContentPage";

export default function QueEsPage() {
  return (
    <AboutContentPage
      layout="slides"
      titleKey="about.page.h"
      leadKey="about.page.lead"
      blocks={[
        {
          titleKey: "about.vision.h",
          bodyKeys: ["about.vision.p1"],
          imageKey: "about.vision",
        },
        {
          titleKey: "about.mission.h",
          bodyKeys: ["about.mission.p1"],
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
