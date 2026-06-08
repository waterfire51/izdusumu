import AdminLayout from "@/components/admin/AdminLayout";
import {
  AdminCard,
  FormField,
  SaveForm,
  TextArea,
  TextInput,
} from "@/components/admin/AdminForm";
import HeroVideoPanel from "@/components/admin/HeroVideoPanel";
import { saveHero } from "@/lib/admin-actions";
import { getHeroSection } from "@/lib/content";

export default async function AdminHeroPage() {
  const hero = await getHeroSection();

  return (
    <AdminLayout
      title="Tanıtım Filmi"
      description="Ana sayfa hero bölümü ve tanıtım videosu"
    >
      <AdminCard className="mb-6">
        <HeroVideoPanel initialVideoUrl={hero.videoUrl} />
      </AdminCard>

      <AdminCard>
        <h3 className="mb-5 text-sm font-bold text-slate-800">Metin Ayarları</h3>
        <SaveForm action={saveHero}>
          <FormField label="Ana Başlık">
            <TextInput name="headline" defaultValue={hero.headline} required />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Vurgu 1 (sarı)">
              <TextInput
                name="headlineHighlight1"
                defaultValue={hero.headlineHighlight1}
              />
            </FormField>
            <FormField label="Vurgu 2 (sarı)">
              <TextInput
                name="headlineHighlight2"
                defaultValue={hero.headlineHighlight2}
              />
            </FormField>
          </div>
          <FormField label="Alt Başlık">
            <TextArea name="subtitle" rows={3} defaultValue={hero.subtitle} />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Buton Metni">
              <TextInput name="ctaText" defaultValue={hero.ctaText} />
            </FormField>
            <FormField label="Buton Linki">
              <TextInput name="ctaHref" defaultValue={hero.ctaHref} />
            </FormField>
          </div>
        </SaveForm>
      </AdminCard>
    </AdminLayout>
  );
}
