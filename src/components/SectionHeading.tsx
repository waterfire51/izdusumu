import clsx from "clsx";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center,
}: SectionHeadingProps) {
  return (
    <div className={clsx(center && "text-center", "space-y-3")}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className={clsx("text-base text-slate-600", center && "mx-auto max-w-2xl")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
