import Link from "next/link";
import { siteContent } from "@/lib/content";

export function SiteFooter() {
  const footer = siteContent.footer;

  return (
    <footer className="site-footer">
      <span>{footer.location}</span>
      <span>{footer.copyright}</span>
      <Link className="site-footer__back-top" href="#top" data-cursor-label={siteContent.nav.cursorTop}>
        {footer.backToTop} <span aria-hidden="true">↑</span>
      </Link>
    </footer>
  );
}
