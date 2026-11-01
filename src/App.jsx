import React, { Suspense, lazy, useCallback, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AtelierSite from "./site/AtelierSite.jsx";
import MuseumErrorBoundary from "./museum/MuseumErrorBoundary.jsx";
import MuseumLoading from "./museum/MuseumLoading.jsx";

const MuseumExperience = lazy(() => import("./museum/MuseumExperience.jsx"));

function shouldOpenMuseum() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("museum") === "1";
}

function App() {
  const [museumOpen, setMuseumOpen] = useState(shouldOpenMuseum);
  const museumEntryRef = useRef(null);

  const openMuseum = useCallback(() => {
    setMuseumOpen(true);
  }, []);

  const closeMuseum = useCallback(() => {
    setMuseumOpen(false);

    const url = new URL(window.location.href);
    if (url.searchParams.has("museum")) {
      url.searchParams.delete("museum");
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }

    window.requestAnimationFrame(() => museumEntryRef.current?.focus());
  }, []);

  return (
    <>
      <AtelierSite
        onEnterMuseum={openMuseum}
        museumEntryRef={museumEntryRef}
        museumOpen={museumOpen}
      />
      <Suspense fallback={museumOpen ? <MuseumLoading /> : null}>
        {museumOpen && (
          <MuseumErrorBoundary onExit={closeMuseum}>
            <MuseumExperience onExit={closeMuseum} />
          </MuseumErrorBoundary>
        )}
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
