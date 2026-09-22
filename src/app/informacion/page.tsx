import { AboutContentPage } from "@/components/ecosystem/AboutContentPage";

export default function InformacionPage() {
  return (
    <AboutContentPage
      layout="fullscreen"
      titleKey="info.page.h"
      leadKey="info.page.lead"
      heroImageKey="info.region"
      blocks={[
        {
          titleKey: "info.region.h",
          bodyKeys: ["info.region.p1", "info.region.p2"],
          imageKey: "info.region",
        },
        {
          titleKey: "info.how.h",
          bodyKeys: ["info.how.p1", "info.how.p2"],
          imageKey: "info.how",
        },
      ]}
      footerLinks={[
        { href: "/terminos", key: "legal.terms" },
        { href: "/privacidad", key: "legal.privacy" },
        { href: "/que-es", key: "nav.vision" },
      ]}
    />
  );
}
