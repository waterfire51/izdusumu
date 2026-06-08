export type RegistrationFieldType = "text" | "email" | "tel" | "number" | "textarea";

export type RegistrationFieldConfig = {
  key: string;
  label: string;
  type: RegistrationFieldType;
  required: boolean;
};

export const REGISTRATION_FIELD_TEMPLATES: Omit<
  RegistrationFieldConfig,
  "required"
>[] = [
  { key: "student_first_name", label: "Öğrenci Adı", type: "text" },
  { key: "student_last_name", label: "Öğrenci Soyadı", type: "text" },
  { key: "student_age", label: "Öğrenci Yaşı", type: "number" },
  { key: "birth_date", label: "Doğum Tarihi", type: "text" },
  { key: "father_name", label: "Baba Adı", type: "text" },
  { key: "mother_name", label: "Anne Adı", type: "text" },
  { key: "father_phone", label: "Baba Telefon No", type: "tel" },
  { key: "mother_phone", label: "Anne Telefon No", type: "tel" },
  { key: "email", label: "E-posta", type: "email" },
  { key: "address", label: "Adres", type: "textarea" },
  { key: "emergency_contact", label: "Acil Durum İletişim", type: "tel" },
  { key: "notes", label: "Ek Notlar", type: "textarea" },
];

export function parseFormFields(raw: unknown): RegistrationFieldConfig[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (f): f is RegistrationFieldConfig =>
      typeof f === "object" &&
      f !== null &&
      typeof (f as RegistrationFieldConfig).key === "string" &&
      typeof (f as RegistrationFieldConfig).label === "string"
  );
}
