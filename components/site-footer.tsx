import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { siteContent } from "@/lib/content";

export function SiteFooter() {
  const footer = siteContent.footer;

  return (
    <footer className="site-footer">
      <span>{footer.location}</span>
      <span>{footer.copyright}</span>
      <Link className="site-footer__back-top" href="/#top" data-cursor-label={siteContent.nav.cursorTop}>
        {footer.backToTop}{" "}
        <span aria-hidden="true">
          <ArrowUp size="1em" strokeWidth={2.2} />
        </span>
      </Link>
    </footer>
  );
}
