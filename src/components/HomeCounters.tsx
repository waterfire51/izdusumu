import {
  ChalkboardTeacher,
  GraduationCap,
  Student,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

const counters = [
  {
    label: "Eğitim Kurumu",
    value: "10",
    color: "#86c779",
    icon: ChalkboardTeacher,
  },
  {
    label: "Saat Ders",
    value: "70000",
    color: "#3f84c3",
    icon: GraduationCap,
  },
  {
    label: "Aktif Öğrenci",
    value: "3341",
    color: "#f0ba45",
    icon: Student,
  },
  {
    label: "Mezun Öğrenci",
    value: "25675",
    color: "#d96a66",
    icon: UsersThree,
  },
];

export default function HomeCounters() {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto grid w-full max-w-4xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {counters.map((counter) => {
          const Icon = counter.icon;

          return (
            <div
              key={counter.label}
              className="flex min-h-36 flex-col items-center justify-center border border-slate-100 bg-white p-6 text-center shadow-sm shadow-slate-200/70"
            >
              <Icon size={38} weight="duotone" style={{ color: counter.color }} />
              <strong
                className="mt-4 text-2xl font-extrabold tracking-wide"
                style={{ color: counter.color }}
              >
                {counter.value}
              </strong>
              <span className="mt-1 text-sm font-medium text-slate-500">{counter.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
