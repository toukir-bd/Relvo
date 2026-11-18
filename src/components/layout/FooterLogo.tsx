import Image from "next/image";
import Link from "next/link";

export default function FooterLogo() {
  return (
    <div className="relative rounded-[10px] overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.1] [background-size:4px_4px] [background-image:linear-gradient(rgba(187,255,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(187,255,0,0.15)_1px,transparent_1px)]" />
      <Link href="/" aria-label="Relvo Home" className="relative flex w-full items-center justify-center pb-10 pt-12">
        <span aria-hidden="true" className="absolute left-0 top-0 h-15 w-full bg-linear-to-b from-primary/3 to-transparent"/>
        <Image src="/img/elements/logo.webp" alt="Relvo" width={4356} height={1215}
          sizes="(max-width: 1800px) calc(100vw - 3rem), 1600px"
          className="h-auto w-[min(70vw,980px)] sm:w-[min(60vw,1280px)]"
        />
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-15 w-full bg-linear-to-t from-primary/3 to-transparent"/>
      </Link>
    </div>
  );
}
