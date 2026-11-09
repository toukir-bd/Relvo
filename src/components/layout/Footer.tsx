
import Image from "next/image";
import Link from "next/link";
const menus = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Expertise",
    href: "/services",
  },
  {
    title: "Projects",
    href: "/#cases",
  },
  {
    title: "Get Started",
    href: "/#contact",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 text-white">
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <h2 className="mb-4 text-3xl font-semibold">
              Lets build something exceptional.
            </h2>
            <p className="max-w-sm text-white/60">
              We craft modern digital experiences with design,
              strategy and development.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-medium">
              Navigation
            </h4>
            <ul className="space-y-3">
              {menus.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 transition hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-medium">
              Contact
            </h4>

            <a href="mailto:partner@bytetown.agency" className="text-white/60 transition hover:text-primary">
              partner@bytetown.agency
            </a>
          </div>

        </div>

        <Link
          href="/"
          aria-label="Relvo home"
          className="mx-auto mt-16 block w-full max-w-[1450px] px-3 sm:mt-20 sm:px-6 lg:px-8"
        >
          <Image
            src="/img/elements/logo.webp"
            alt="Relvo"
            width={4356}
            height={1215}
            sizes="(max-width: 1600px) calc(100vw - 3rem), 1400px"
            className="h-auto w-full object-contain"
          />
        </Link>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40 sm:mt-12 sm:pt-8 sm:text-sm">
          © {new Date().getFullYear()} Relvo. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
