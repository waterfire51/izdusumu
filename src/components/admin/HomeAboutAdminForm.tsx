"use client";

import { useState } from "react";
import { Lightbulb } from "@phosphor-icons/react";
import {
  FormField,
  SaveForm,
  TextArea,
  TextInput,
} from "@/components/admin/AdminForm";
import { saveHomeAbout } from "@/lib/admin-actions";

type WhyUsCard = {
  id?: string;
  text: string;
  color: string;
};

type HomeAboutData = {
  badgeLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  commitmentTitle: string;
  commitmentText: string;
  whyUsCards: WhyUsCard[];
};

function CardPreview({ text, color }: { text: string; color: string }) {
  return (
    <div
      className="rounded-xl border-2 border-slate-900 px-3 py-2.5 text-white shadow-[3px_3px_0_#0f172a]"
      style={{ backgroundColor: color }}
    >
      <p className="text-xs font-bold leading-snug sm:text-sm">
        {text || "Kart metni..."}
      </p>
    </div>
  );
}

export default function HomeAboutAdminForm({ data }: { data: HomeAboutData }) {
  const [badgeLabel, setBadgeLabel] = useState(data.badgeLabel);
  const [sectionTitle, setSectionTitle] = useState(data.sectionTitle);
  const [sectionDescription, setSectionDescription] = useState(
    data.sectionDescription
  );
  const [commitmentTitle, setCommitmentTitle] = useState(data.commitmentTitle);
  const [commitmentText, setCommitmentText] = useState(data.commitmentText);
  const [cards, setCards] = useState(data.whyUsCards);

  function updateCardText(index: number, text: string) {
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, text } : c))
    );
  }

  function updateCardColor(index: number, color: string) {
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, color } : c))
    );
  }

  return (
    <SaveForm action={saveHomeAbout} successMessage="Neden Biz bölümü kaydedildi!">
      <input type="hidden" name="cardCount" value={cards.length} />

      {/* 1 — Bölüm metinleri */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3c50e0] text-xs font-bold text-white">
            1
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Bölüm Başlığı ve Açıklama
            </h3>
            <p className="text-xs text-slate-500">
              &quot;Neden Biz&quot; etiketi, ana başlık ve açıklama paragrafı
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <FormField label="Üst Etiket">
              <TextInput
                name="badgeLabel"
                value={badgeLabel}
                onChange={(e) => setBadgeLabel(e.target.value)}
              />
            </FormField>
            <FormField label="Ana Başlık">
              <TextInput
                name="sectionTitle"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
              />
            </FormField>
            <FormField label="Açıklama Metni">
              <TextArea
                name="sectionDescription"
                rows={4}
                value={sectionDescription}
                onChange={(e) => setSectionDescription(e.target.value)}
              />
            </FormField>
          </div>

          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Anasayfa önizlemesi
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-700">
              <Lightbulb size={16} weight="duotone" className="text-amber-500" />
              {badgeLabel || "Neden Biz"}
            </div>
            <h4 className="mt-3 text-xl font-bold leading-tight text-slate-900">
              {sectionTitle || "Başlık..."}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {sectionDescription || "Açıklama metni..."}
            </p>
          </div>
        </div>
      </div>

      {/* 2 — 4 kart */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3c50e0] text-xs font-bold text-white">
            2
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Neden Biz Kartları (4 adet)
            </h3>
            <p className="text-xs text-slate-500">
              Anasayfada 2 sütunlu grid olarak görünen renkli kartlar
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card, i) => (
            <div
              key={card.id ?? i}
              className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4"
            >
              {card.id ? (
                <input type="hidden" name={`card_${i}_id`} value={card.id} />
              ) : null}

              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Kart {i + 1}
              </span>

              <CardPreview text={card.text} color={card.color} />

              <FormField label="Metin">
                <TextInput
                  name={`card_${i}_title`}
                  value={card.text}
                  onChange={(e) => updateCardText(i, e.target.value)}
                />
              </FormField>

              <FormField label="Renk">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={card.color}
                    onChange={(e) => updateCardColor(i, e.target.value)}
                    className="h-9 w-12 cursor-pointer rounded-lg border border-slate-300 bg-white p-0.5"
                  />
                  <TextInput
                    name={`card_${i}_color`}
                    value={card.color}
                    onChange={(e) => updateCardColor(i, e.target.value)}
                    className="font-mono text-xs"
                  />
                </div>
              </FormField>
            </div>
          ))}
        </div>
      </div>

      {/* 3 — Taahhüdümüz */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3c50e0] text-xs font-bold text-white">
            3
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Taahhüdümüz</h3>
            <p className="text-xs text-slate-500">
              Kartların altındaki mor kutuda görünen bölüm
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <FormField label="Başlık">
              <TextInput
                name="commitmentTitle"
                value={commitmentTitle}
                onChange={(e) => setCommitmentTitle(e.target.value)}
              />
            </FormField>
            <FormField label="Metin">
              <TextArea
                name="commitmentText"
                rows={4}
                value={commitmentText}
                onChange={(e) => setCommitmentText(e.target.value)}
              />
            </FormField>
          </div>

          <div
            className="flex h-fit gap-4 rounded-xl border-2 border-slate-900 p-5 text-white shadow-[4px_4px_0_#0f172a]"
            style={{ backgroundColor: "#A855F7" }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/30 bg-black/10">
              <Lightbulb size={24} weight="duotone" />
            </div>
            <div>
              <p className="font-bold">{commitmentTitle || "Taahhüdümüz"}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/90">
                {commitmentText || "Taahhüt metni..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SaveForm>
  );
}
