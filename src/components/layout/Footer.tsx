
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
    href: "/expertise",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Get Start",
    href: "/get-start",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
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

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-lg font-medium">
              Contact
            </h4>

            <div className="space-y-3 text-white/60">
              <p>hello@company.com</p>
              <p>+880 1234 567890</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40 sm:mt-16 sm:pt-8 sm:text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
