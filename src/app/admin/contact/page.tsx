import AdminLayout from "@/components/admin/AdminLayout";
import {
  AdminCard,
  FormField,
  SaveForm,
  TextArea,
  TextInput,
} from "@/components/admin/AdminForm";
import { saveContactSettings } from "@/lib/admin-actions";
import { getSiteSettings } from "@/lib/content";

export default async function AdminContactPage() {
  const settings = await getSiteSettings();

  return (
    <AdminLayout
      title="İletişim Bilgileri"
      description="Adres, telefon, e-posta ve sosyal medya"
    >
      <AdminCard>
        <SaveForm action={saveContactSettings}>
          <FormField label="Adres">
            <TextArea name="address" rows={2} defaultValue={settings.address} />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Telefon">
              <TextInput name="phone" defaultValue={settings.phone} />
            </FormField>
            <FormField label="WhatsApp (ülke kodu ile)">
              <TextInput name="whatsapp" defaultValue={settings.whatsapp} />
            </FormField>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="E-posta">
              <TextInput name="email" type="email" defaultValue={settings.email} />
            </FormField>
            <FormField label="Çalışma Saatleri">
              <TextInput name="hours" defaultValue={settings.hours} />
            </FormField>
          </div>
          <FormField label="Footer Açıklaması">
            <TextArea
              name="footerTagline"
              rows={2}
              defaultValue={settings.footerTagline ?? ""}
            />
          </FormField>
          <FormField label="Harita Embed URL">
            <TextInput
              name="mapEmbedUrl"
              defaultValue={settings.mapEmbedUrl ?? ""}
            />
          </FormField>
          <h3 className="text-sm font-bold text-slate-800">Sosyal Medya</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField label="Instagram">
              <TextInput name="instagram" defaultValue={settings.instagram ?? ""} />
            </FormField>
            <FormField label="Facebook">
              <TextInput name="facebook" defaultValue={settings.facebook ?? ""} />
            </FormField>
            <FormField label="YouTube">
              <TextInput name="youtube" defaultValue={settings.youtube ?? ""} />
            </FormField>
          </div>
        </SaveForm>
      </AdminCard>
    </AdminLayout>
  );
}
