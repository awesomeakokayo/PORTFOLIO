import type { ReactNode } from "react";
import type { Project } from "@/lib/content";

function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mockup-device">
      <span className="mockup-device__notch" />
      <div className="mockup-device__screen">{children}</div>
    </div>
  );
}

function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mockup-laptop">
      <div className="mockup-laptop__screen">
        <div className="mockup-laptop__sidebar">
          <span className="mockup-bar mockup-bar--accent" />
          <span className="mockup-bar mockup-bar--long" />
          <span className="mockup-bar mockup-bar--medium" />
          <span className="mockup-bar mockup-bar--short" />
        </div>
        <div className="mockup-laptop__main">{children}</div>
      </div>
    </div>
  );
}

function PhoneMockup({ orbit = false }: { orbit?: boolean }) {
  if (orbit) {
    return (
      <DeviceFrame>
        <span className="mockup-bar mockup-bar--short" />
        <div className="mockup-orbit">
          <span className="mockup-orbit__core" />
        </div>
        <span className="mockup-bar mockup-bar--medium" />
        <div className="mockup-row">
          <span className="mockup-block" />
          <span className="mockup-block mockup-block--accent" />
        </div>
      </DeviceFrame>
    );
  }

  return (
    <DeviceFrame>
      <span className="mockup-bar mockup-bar--short" />
      <div className="mockup-block mockup-block--dark" />
      <span className="mockup-bar mockup-bar--medium" />
      <div className="mockup-row">
        <span className="mockup-block mockup-block--accent" />
        <span className="mockup-block" />
      </div>
      <span className="mockup-bar mockup-bar--long" />
      <div className="mockup-block" />
    </DeviceFrame>
  );
}

function DesktopMockup({ ledger = false }: { ledger?: boolean }) {
  return (
    <LaptopFrame>
      <span className="mockup-bar mockup-bar--long" />
      {ledger ? (
        <>
          <div className="mockup-row">
            <span className="mockup-block mockup-block--dark" />
            <span className="mockup-block mockup-block--accent" />
          </div>
          <div className="mockup-ledger">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="mockup-ledger__row" key={index}>
                <span />
                <span />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mockup-row">
            <span className="mockup-block mockup-block--accent" />
            <span className="mockup-block" />
            <span className="mockup-block" />
          </div>
          <div className="mockup-grid">
            <span />
            <span />
            <span />
            <span />
          </div>
        </>
      )}
    </LaptopFrame>
  );
}

export function ProjectMockup({ project }: { project: Project }) {
  if (project.image?.src) {
    return (
      <div className="mockup-stage mockup-stage--image">
        {/* User-supplied product screenshots replace this CSS composition. */}
        <img
          className="project-screenshot"
          src={project.image.src}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  if (project.kind === "openbooks" || project.kind === "techskills") {
    return (
      <div className="mockup-stage">
        <DesktopMockup ledger={project.kind === "openbooks"} />
        <div className="mockup-stage__phone-float">
          <PhoneMockup />
        </div>
      </div>
    );
  }

  if (project.kind === "flood") {
    return (
      <div className="mockup-stage">
        <DesktopMockup />
      </div>
    );
  }

  if (project.kind === "blancquake") {
    return (
      <div className="mockup-stage">
        <PhoneMockup />
      </div>
    );
  }

  return (
    <div className="mockup-stage">
      <PhoneMockup orbit />
      <div className="mockup-stage__orbit-float" aria-hidden="true">
        <span className="mockup-orbit">
          <span className="mockup-orbit__core" />
        </span>
      </div>
    </div>
  );
}
