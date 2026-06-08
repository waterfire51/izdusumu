import JsonLd from "@/components/seo/JsonLd";
import {
  buildOrganizationJsonLd,
  buildPreschoolJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo";

type Settings = {
  phone: string;
  email: string;
  address: string;
  hours: string;
  whatsapp: string;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
};

export default function GlobalSeoJsonLd({ settings }: { settings: Settings }) {
  return (
    <JsonLd
      data={[
        buildPreschoolJsonLd(settings),
        buildWebSiteJsonLd(),
        buildOrganizationJsonLd(settings),
      ]}
    />
  );
}
