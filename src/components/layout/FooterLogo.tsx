import Image from "next/image";
import Link from "next/link";

export default function FooterLogo() {
  return (
    <div
      className="relative"
      style={{ backgroundImage: "linear-gradient(to top, rgb(187 255 0 / 3%), transparent 4rem)" }}
    >
      <Link
        href="/"
        aria-label="Relvo Home"
        className="relative flex w-full items-center justify-center pb-12 pt-15"
      >
        <span aria-hidden="true" className="absolute left-0 top-0 h-15 w-full rounded-t-[40px] bg-linear-to-b from-primary/3 to-transparent" />
        <Image
          src="/img/elements/logo.webp"
          alt="Relvo"
          width={4356}
          height={1215}
          sizes="(max-width: 1600px) calc(100vw - 3rem), 1400px"
          className="h-auto w-[min(70vw,980px)] sm:w-[min(60vw,980px)]"
        />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-15 w-full rounded-b-[40px] bg-linear-to-t from-primary/3 to-transparent" />
      </Link>
    </div>
  );
}
