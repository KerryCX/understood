"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routeTitles, titleFromSlug } from "./routeTitles";
import styles from "./SiteHeader.module.css";

const sections = [
  { label: "Problems", href: "/problems" },
  { label: "Concepts", href: "/concepts" },
];

type Crumb = {
  label: string;
  href: string;
};

// Turns "/concepts/binary" into Understood / Concepts / Binary,
// building up the path one segment at a time.
const buildCrumbs = (pathname: string): Crumb[] => {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [{ label: "Understood", href: "/" }];
  let path = "";
  segments.forEach((segment) => {
    path = `${path}/${segment}`;
    crumbs.push({
      label: routeTitles[path] ?? titleFromSlug(segment),
      href: path,
    });
  });
  return crumbs;
};

export default function SiteHeader() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  // A section counts as current on its own page and on any page inside it,
  // so /concepts/binary still highlights Concepts.
  const isInSection = (href: string): boolean =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={styles.header}>
      <a href='#main-content' className={styles.skipLink}>
        Skip to content
      </a>
      <div className={styles.inner}>
        <nav aria-label='Breadcrumb'>
          <ol className={styles.crumbs}>
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              const isHome = index === 0;
              return (
                <li key={crumb.href} className={styles.crumb}>
                  {isLast ? (
                    <span
                      aria-current='page'
                      className={isHome ? styles.home : styles.currentCrumb}
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className={isHome ? styles.home : styles.crumbLink}
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <nav aria-label='Main'>
          <ul className={styles.links}>
            {sections.map((section) => (
              <li key={section.href}>
                <Link
                  href={section.href}
                  className={styles.link}
                  aria-current={isInSection(section.href) ? "true" : undefined}
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
