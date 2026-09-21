import { AboutContentPage } from "@/components/ecosystem/AboutContentPage";

export default function InformacionPage() {
  return (
    <AboutContentPage
      titleKey="info.page.h"
      leadKey="info.page.lead"
      blocks={[
        {
          titleKey: "info.role.h",
          bodyKeys: ["info.role.p1", "info.role.p2"],
        },
        {
          titleKey: "info.region.h",
          bodyKeys: ["info.region.p1", "info.region.p2"],
        },
        {
          titleKey: "info.how.h",
          bodyKeys: ["info.how.p1", "info.how.p2"],
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
