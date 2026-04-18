import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type LogoProps = {
  className?: string;
  /** Footer için `logo-footer.png`, aksi halde `logo.png` */
  footer?: boolean;
};

export default function Logo({ className, footer }: LogoProps) {
  const src = footer ? "/logo-footer.png" : "/logo.png";

  return (
    <Link
      href="/"
      className={clsx(
        "relative inline-flex shrink-0 items-center",
        footer ? "h-12 sm:h-14" : "h-10 sm:h-11",
        className
      )}
    >
      <Image
        src={src}
        alt="Özel İzdüşümü Anaokulu"
        width={footer ? 220 : 200}
        height={footer ? 56 : 44}
        className="h-full w-auto object-contain object-left"
        priority={!footer}
        sizes={footer ? "(max-width: 1024px) 180px, 220px" : "(max-width: 1024px) 160px, 200px"}
      />
    </Link>
  );
}
