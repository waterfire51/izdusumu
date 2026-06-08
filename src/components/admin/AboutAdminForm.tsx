"use client";

import { useState } from "react";
import {
  FormField,
  SaveForm,
  TextArea,
  TextInput,
} from "@/components/admin/AdminForm";
import { saveAboutPage } from "@/lib/admin-actions";

type AboutPageData = {
  heroBadgeLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  missionText: string;
  visionText: string;
  educationModelText: string;
  storyBadgeLabel: string;
  storyTitle: string;
  storyText: string;
};

function SectionHeader({
  num,
  title,
  desc,
}: {
  num: number;
  title: string;
  desc: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3c50e0] text-xs font-bold text-white">
        {num}
      </span>
      <div>
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

function truncate(text: string, len = 120) {
  return text.length > len ? `${text.slice(0, len)}…` : text;
}

export default function AboutAdminForm({ page }: { page: AboutPageData }) {
  const [heroBadgeLabel, setHeroBadgeLabel] = useState(page.heroBadgeLabel);
  const [heroTitle, setHeroTitle] = useState(page.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(page.heroSubtitle);

  const [missionText, setMissionText] = useState(page.missionText);
  const [visionText, setVisionText] = useState(page.visionText);
  const [educationModelText, setEducationModelText] = useState(
    page.educationModelText
  );

  const [storyBadgeLabel, setStoryBadgeLabel] = useState(page.storyBadgeLabel);
  const [storyTitle, setStoryTitle] = useState(page.storyTitle);
  const [storyText, setStoryText] = useState(page.storyText);

  return (
    <SaveForm action={saveAboutPage} successMessage="Hakkımızda sayfası kaydedildi!">
      {/* 1 — Hero */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          num={1}
          title="Üst Hero Bölümü"
          desc="Mor arka planlı sayfa girişi"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <FormField label="Üst Etiket">
              <TextInput
                name="heroBadgeLabel"
                value={heroBadgeLabel}
                onChange={(e) => setHeroBadgeLabel(e.target.value)}
              />
            </FormField>
            <FormField label="Ana Başlık">
              <TextInput
                name="heroTitle"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
              />
            </FormField>
            <FormField label="Alt Başlık">
              <TextArea
                name="heroSubtitle"
                rows={3}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
              />
            </FormField>
          </div>
          <div
            className="rounded-xl p-6 text-center text-white"
            style={{ backgroundColor: "#8A4FFF" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-white/90">
              {heroBadgeLabel || "Kurumsal"}
            </p>
            <h4 className="mt-3 text-xl font-bold leading-tight">
              {heroTitle || "Başlık..."}
            </h4>
            <p className="mt-2 text-sm text-white/90">
              {heroSubtitle || "Alt başlık..."}
            </p>
          </div>
        </div>
      </div>

      {/* 2 — Misyon & Vizyon */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          num={2}
          title="Misyon ve Vizyon"
          desc="Yan yana turuncu ve mor kartlar"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <FormField label="Misyon Metni">
              <TextArea
                name="missionText"
                rows={8}
                value={missionText}
                onChange={(e) => setMissionText(e.target.value)}
              />
            </FormField>
            <div className="rounded-xl border-2 border-slate-900 bg-orange-500 p-4 text-white shadow-[4px_4px_0_#0f172a]">
              <p className="font-bold">Misyonumuz</p>
              <p className="mt-2 text-xs leading-relaxed text-white/95">
                {truncate(missionText, 180) || "Misyon metni..."}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <FormField label="Vizyon Metni">
              <TextArea
                name="visionText"
                rows={8}
                value={visionText}
                onChange={(e) => setVisionText(e.target.value)}
              />
            </FormField>
            <div className="rounded-xl border-2 border-slate-900 bg-[#A855F7] p-4 text-white shadow-[4px_4px_0_#0f172a]">
              <p className="font-bold">Vizyonumuz</p>
              <p className="mt-2 text-xs leading-relaxed text-white/95">
                {truncate(visionText, 180) || "Vizyon metni..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 — Eğitim anlayışı */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          num={3}
          title="Eğitim Anlayışımız"
          desc="Yeşil tam genişlik kart"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <FormField label="Eğitim Anlayışı Metni">
            <TextArea
              name="educationModelText"
              rows={8}
              value={educationModelText}
              onChange={(e) => setEducationModelText(e.target.value)}
            />
          </FormField>
          <div className="rounded-xl border-2 border-slate-900 bg-emerald-500 p-4 text-white shadow-[4px_4px_0_#0f172a]">
            <p className="font-bold">Eğitim Anlayışımız</p>
            <p className="mt-2 text-xs leading-relaxed text-white/95">
              {truncate(educationModelText, 220) || "Eğitim metni..."}
            </p>
          </div>
        </div>
      </div>

      {/* 4 — Hikayemiz */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          num={4}
          title="Hikayemiz"
          desc="Sarı arka planlı hikaye kartı"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <FormField label="Üst Etiket">
              <TextInput
                name="storyBadgeLabel"
                value={storyBadgeLabel}
                onChange={(e) => setStoryBadgeLabel(e.target.value)}
              />
            </FormField>
            <FormField label="Hikaye Başlığı">
              <TextInput
                name="storyTitle"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
              />
            </FormField>
            <FormField label="Hikaye Metni">
              <TextArea
                name="storyText"
                rows={8}
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
              />
            </FormField>
          </div>
          <div className="rounded-xl border-2 border-slate-900 bg-amber-50 p-5 shadow-[4px_4px_0_#0f172a]">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-700">
              {storyBadgeLabel || "Hikayemiz"}
            </p>
            <h4 className="mt-2 font-bold text-slate-900">
              {storyTitle || "Hikaye başlığı..."}
            </h4>
            <p className="mt-3 text-xs leading-relaxed text-slate-700">
              {truncate(storyText, 220) || "Hikaye metni..."}
            </p>
          </div>
        </div>
      </div>
    </SaveForm>
  );
}
