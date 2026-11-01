import React, { useEffect, useMemo, useRef } from "react";
import {
  ArrowUpRight,
  DoorOpen,
  Info,
  Map,
  Move,
  MousePointer,
  X,
} from "lucide-react";
import { TRAVEL_LABELS, TRAVELS, roomAt } from "./world/plan.js";

const display = { fontFamily: "'Ojuju', sans-serif" };
const mono = { fontFamily: "'Space Mono', monospace" };

const TRAVEL_KICKERS = {
  atrium: "MAIN HALL",
  works: "ROOM 02",
  heritage: "ROOM 03",
  workshop: "ROOM 04",
  contact: "ROOM 05",
};

const PROMPTS = {
  project: "Open the exhibit",
  heritage: "Open the exhibit record",
  workshop: "Open the workshop file",
  contact: "Open contact actions",
  exit: "Leave to the classic portfolio",
};

function labelForNear(interactive) {
  if (!interactive) return null;
  if (interactive.kind === "project") {
    return PROMPTS.project;
  }
  return PROMPTS[interactive.kind] || "Interact";
}

/* ------------------------------------------------------------------ */
/* Touch joystick                                                       */
/* ------------------------------------------------------------------ */

function Joystick({ onJoystick }) {
  const baseRef = useRef(null);
  const knobRef = useRef(null);
  const activeRef = useRef(-1);
  const radius = 52;

  const setKnob = (x, y) => {
    const knob = knobRef.current;
    if (knob) knob.style.transform = `translate(${x * radius}px, ${y * radius}px)`;
  };

  const updateFromEvent = (event) => {
    const base = baseRef.current;
    if (!base) return;
    const rect = base.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let dx = event.clientX - centerX;
    let dy = event.clientY - centerY;
    const distance = Math.hypot(dx, dy);
    if (distance > radius) {
      dx = (dx / distance) * radius;
      dy = (dy / distance) * radius;
    }
    setKnob(dx / radius, dy / radius);
    onJoystick(dx / radius, dy / radius, true);
  };

  return (
    <div
      ref={baseRef}
      className="museum-joystick"
      aria-label="Touch joystick"
      role="group"
      onPointerDown={(event) => {
        event.preventDefault();
        activeRef.current = event.pointerId;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        updateFromEvent(event);
      }}
      onPointerMove={(event) => {
        if (activeRef.current !== event.pointerId) return;
        updateFromEvent(event);
      }}
      onPointerUp={(event) => {
        if (activeRef.current !== event.pointerId) return;
        activeRef.current = -1;
        setKnob(0, 0);
        onJoystick(0, 0, false);
      }}
      onPointerCancel={() => {
        activeRef.current = -1;
        setKnob(0, 0);
        onJoystick(0, 0, false);
      }}
    >
      <span className="museum-joystick-ring" aria-hidden="true" />
      <span ref={knobRef} className="museum-joystick-knob" aria-hidden="true" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HUD                                                                  */
/* ------------------------------------------------------------------ */

export default function MuseumHud({
  room,
  locked,
  menu,
  panel,
  nearInteractive,
  hoverProject,
  showHint,
  onInteract,
  onTravel,
  onApproachExhibit,
  onClosePanel,
  onToggleMenu,
  onExit,
  onJoystick,
}) {
  const closeButtonRef = useRef(null);
  const menuCloseRef = useRef(null);

  const currentRoom = useMemo(() => room || roomAt(0, 4.75), [room]);
  const roomTitle = currentRoom?.label || "Arrival Court";

  useEffect(() => {
    if (panel) closeButtonRef.current?.focus();
  }, [panel?.kind, panel?.id]);

  useEffect(() => {
    if (menu) menuCloseRef.current?.focus();
  }, [menu]);

  const promptLabel = labelForNear(nearInteractive);

  return (
    <div className="museum-hud">
      <header className="museum-topbar">
        <div className="museum-brand">
          <span className="museum-brand-mark" aria-hidden="true">A</span>
          <div>
            <p className="museum-kicker" style={mono}>
              AWESOME AKOKAYO / 3D MUSEUM
            </p>
            <h2
              id="museum-title"
              className="museum-title"
              style={display}
              tabIndex={-1}
              data-museum-heading
            >
              {roomTitle}
              <span className="heading-period">.</span>
            </h2>
          </div>
          <span className="museum-preview-badge" style={mono}>
            {currentRoom?.kicker || "ROOM 01"}
          </span>
        </div>

        <button
          type="button"
          className="museum-top-button"
          onClick={onToggleMenu}
          aria-expanded={menu}
          aria-controls="museum-menu"
        >
          <Map size={16} aria-hidden="true" />
          <span>Directory</span>
        </button>

        <button type="button" className="museum-exit" onClick={onExit} aria-label="Leave the museum and open the classic portfolio">
          <span>Leave museum</span>
          <X size={16} aria-hidden="true" />
        </button>
      </header>

      <p className="museum-room-chip" style={mono} aria-live="polite">
        YOU ARE IN: <span>{roomTitle.toUpperCase()}</span>
      </p>

      <div className="museum-side-label" style={mono} aria-hidden="true">
        <span>CONNECTED GALLERIES</span>
        <span>WALK / LOOK / READ</span>
      </div>

      {locked ? (
        <div className="museum-lock-note" style={mono} aria-hidden="true">
          LOOK MODE · ESC TO RELEASE
        </div>
      ) : null}

      <div className="museum-reticle" aria-hidden="true">
        <span />
      </div>

      {hoverProject && !panel && !menu && (
        <div className="museum-hover-card" role="status">
          <strong style={mono}>{hoverProject.name.toUpperCase()}</strong>
          <small>
            {nearInteractive?.id === hoverProject.slug
              ? "Click or press E to open the exhibit"
              : "Click to walk to the exhibit"}
          </small>
        </div>
      )}

      {promptLabel && !panel && !menu && (
        <div className="museum-prompt" role="status" aria-live="polite">
          <span className="museum-prompt-key" style={mono} aria-hidden="true">
            E
          </span>
          <span className="museum-prompt-text">
            <strong style={mono}>{promptLabel.toUpperCase()}</strong>
            <small>
              {nearInteractive.kind === "exit"
                ? "This leaves the 3D museum on purpose"
                : "Press E, tap, or click to interact"}
            </small>
          </span>
          <button type="button" className="museum-prompt-button" onClick={() => onInteract(nearInteractive)}>
            Interact <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
      )}

      {showHint && !panel && !menu && (
        <div className="museum-instructions" role="status">
          <p className="museum-instructions-title" style={mono}>
            EXPLORE THE MUSEUM ON FOOT
          </p>
          <p className="museum-instructions-desktop">
            <span>WASD</span> / <span>arrows</span> move · <span>click</span> engages
            look mode, then mouse steers
            <br />
            <span>E</span> reads what is in front of you · <span>Esc</span> opens this
            directory
          </p>
          <p className="museum-instructions-touch">
            Drag anywhere to look · left thumbpad to walk · tap <span>E</span> prompts to
            read exhibits
          </p>
        </div>
      )}

      <Joystick onJoystick={onJoystick} />

      {panel && (
        <aside className="museum-panel" aria-labelledby="exhibit-title">
          <button
            ref={closeButtonRef}
            type="button"
            className="museum-panel-close"
            onClick={onClosePanel}
            aria-label="Close the exhibit panel and return to exploring"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className="museum-panel-inner">
            {panel.kind === "project" ? (
              <ProjectPanel project={panel.project} />
            ) : null}
            {panel.kind === "heritage" ? <HeritagePanel content={panel.content} /> : null}
            {panel.kind === "workshop" ? <WorkshopPanel content={panel.content} /> : null}
            {panel.kind === "contact" ? <ContactPanel content={panel.content} /> : null}
            {panel.kind === "exit" ? (
              <ExitPanel onExit={onExit} onClose={onClosePanel} />
            ) : null}
          </div>
        </aside>
      )}

      {menu && (
        <div
          className="museum-menu"
          id="museum-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="museum-menu-title"
        >
          <div className="museum-menu-card">
            <button
              ref={menuCloseRef}
              type="button"
              className="museum-panel-close"
              onClick={onToggleMenu}
              aria-label="Close the directory and return to exploring"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="museum-menu-inner">
              <p className="museum-panel-eyebrow" style={mono}>
                GALLERY DIRECTORY / FLOOR PLAN
              </p>
              <h2 id="museum-menu-title" style={display}>
                Where would you like to go?<span className="heading-period">.</span>
              </h2>

              <ul className="museum-menu-travels" aria-label="Travel between rooms">
                {Object.keys(TRAVELS).map((roomId) => (
                  <li key={roomId}>
                    <button
                      type="button"
                      className={"museum-menu-travel" + (room?.id === roomId ? " is-current" : "")}
                      onClick={() => onTravel(roomId)}
                    >
                      <span style={mono} className="museum-menu-travel-kicker">
                        {TRAVEL_KICKERS[roomId]}
                      </span>
                      <span style={display}>{TRAVEL_LABELS[roomId]}</span>
                      <footer style={mono}>
                        {TRAVEL_DESCRIPTIONS[roomId]}
                      </footer>
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="museum-menu-columns">
                <div className="museum-menu-column">
                  <h3 style={display}>Controls</h3>
                  <ul style={mono}>
                    <li>
                      <Move size={13} aria-hidden="true" /> WASD / arrows / left thumbpad to walk
                    </li>
                    <li>
                      <MousePointer size={13} aria-hidden="true" /> Click into look mode · drag to steer
                    </li>
                    <li>
                      <Info size={13} aria-hidden="true" /> E / tap reads what is near you
                    </li>
                    <li>
                      <DoorOpen size={13} aria-hidden="true" /> Esc opens or closes this directory
                    </li>
                  </ul>
                </div>
                <div className="museum-menu-column">
                  <h3 style={display}>About</h3>
                  <p>
                    A walkable portfolio museum. Project exhibits live in Room 02; the
                    heritage vitrine researches one documented object with its sources.
                  </p>
                  <p className="museum-menu-credit" style={mono}>
                    HERITAGE RECORD: THE MET (316393) · DIGITAL BENIN · NMS · SMITHSONIAN NMAA
                  </p>
                </div>
              </div>

              <button type="button" className="museum-panel-back" onClick={onToggleMenu}>
                Back to exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const TRAVEL_DESCRIPTIONS = {
  atrium: "Start here — all four wings are signed around the court",
  works: "Room 02 — the four project exhibits",
  heritage: "Room 03 — the researched Benin/Edo vitrine",
  workshop: "Room 04 — experience, toolkit, current stack",
  contact: "Room 05 — email and WhatsApp at the desk",
};

function ProjectPanel({ project }) {
  return (
    <>
      <p className="museum-panel-eyebrow" style={mono}>
        {project.number} / SELECTED WORK
      </p>
      <h2 id="exhibit-title" style={display}>
        {project.name}
        <span className="heading-period">.</span>
      </h2>
      <p className="museum-panel-category" style={mono}>
        {project.category}
      </p>
      <figure className={`museum-panel-figure is-${project.imageMode || "cover"}`}>
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
      </figure>
      <p className="museum-panel-description">{project.description}</p>

      <dl className="museum-panel-facts">
        <div>
          <dt style={mono}>ROLE</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt style={mono}>BUILT WITH</dt>
          <dd>{project.tags.join(" · ")}</dd>
        </div>
      </dl>

      {project.url && (
        <a className="museum-panel-link" href={project.url} target="_blank" rel="noreferrer">
          {project.linkLabel} <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      )}

      <p className="museum-panel-note" style={mono}>
        ROOM 02 / THE WORKS GALLERY.
      </p>
    </>
  );
}

function HeritagePanel({ content }) {
  const exhibit = content.exhibit;
  return (
    <>
      <p className="museum-panel-eyebrow" style={mono}>
        ROOM 03 / BENIN KINGDOM — EDO PEOPLES
      </p>
      <h2 id="exhibit-title" style={display}>
        {exhibit.title}
        <span className="heading-period">.</span>
      </h2>
      <p className="museum-panel-category" style={mono}>
        {exhibit.culture.toUpperCase()} · {exhibit.period.toUpperCase()} · {exhibit.medium.toUpperCase()}
      </p>
      <p className="museum-panel-description">{exhibit.summary}</p>

      <dl className="museum-panel-facts">
        <div>
          <dt style={mono}>OBJECT</dt>
          <dd>{exhibit.dimensions}</dd>
        </div>
        <div>
          <dt style={mono}>ARTIST (AS DOCUMENTED)</dt>
          <dd>{exhibit.artist}</dd>
        </div>
        <div>
          <dt style={mono}>HELD AT</dt>
          <dd>
            {exhibit.department} · {exhibit.accession} · {exhibit.credit}
          </dd>
        </div>
        <div>
          <dt style={mono}>RIGHTS</dt>
          <dd>{exhibit.rights}</dd>
        </div>
      </dl>

      <div className="museum-panel-callout">
        <strong style={mono}>ABOUT THE CASE YOU STOOD AT</strong>
        <p>{content.viewer.interpretive}</p>
      </div>

      <h3 className="museum-panel-subheading" style={display}>
        Where this record comes from
      </h3>
      <ul className="museum-panel-sources">
        {content.sources.items.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noreferrer">
              <strong>{source.label}</strong>
              <small>{source.detail}</small>
            </a>
          </li>
        ))}
      </ul>

      <p className="museum-panel-note" style={mono}>
        CONTEXT AND PROVENANCE REST WITH THE SOURCE INSTITUTIONS — THIS EXHIBIT LINKS, IT
        DOES NOT RESTATE.
      </p>
    </>
  );
}

function WorkshopPanel({ content }) {
  return (
    <>
      <p className="museum-panel-eyebrow" style={mono}>
        ROOM 04 / HOW THE WORK IS MADE
      </p>
      <h2 id="exhibit-title" style={display}>
        The Workshop<span className="heading-period">.</span>
      </h2>
      <p className="museum-panel-description">{content.intro}</p>

      <h3 className="museum-panel-subheading" style={display}>
        Experience
      </h3>
      <ul className="museum-panel-experience">
        {content.experience.map((entry) => (
          <li key={entry.company}>
            <strong>{entry.role} — {entry.company}</strong>
            <small style={mono}>{entry.meta.toUpperCase()}</small>
            <p>{entry.detail}</p>
            <p className="museum-panel-stack" style={mono}>
              {entry.stack}
            </p>
          </li>
        ))}
      </ul>

      <h3 className="museum-panel-subheading" style={display}>
        Toolkit
      </h3>
      <ul className="museum-panel-toolkit">
        {content.toolkit.map((group) => (
          <li key={group.label}>
            <strong style={mono}>{group.label.toUpperCase()}</strong>
            <p>{group.items}</p>
          </li>
        ))}
      </ul>

      <p className="museum-panel-note" style={mono}>
        THE CLASSIC PORTFOLIO HOLDS THE SCANNABLE VERSION OF THIS PAGE.
      </p>
    </>
  );
}

function ContactPanel({ content }) {
  return (
    <>
      <p className="museum-panel-eyebrow" style={mono}>
        ROOM 05 / CONTACT STUDIO
      </p>
      <h2 id="exhibit-title" style={display}>
        Let's talk<span className="heading-period">.</span>
      </h2>
      <p className="museum-panel-description">{content.intro}</p>

      <div className="museum-contact-actions">
        <a className="museum-contact-action is-email" href={`mailto:${content.email}`}>
          <strong style={mono}>EMAIL</strong>
          <span>{content.email}</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <a
          className="museum-contact-action is-whatsapp"
          href={content.whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          <strong style={mono}>WHATSAPP</strong>
          <span>{content.whatsappNumber}</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      <p className="museum-panel-note" style={mono}>
        {content.location.toUpperCase()}
      </p>
    </>
  );
}

function ExitPanel({ onExit, onClose }) {
  const confirmRef = useRef(null);

  useEffect(() => {
    confirmRef.current?.focus();
  }, []);

  return (
    <>
      <p className="museum-panel-eyebrow" style={mono}>
        THE LABELLED EXIT / CLASSIC PORTFOLIO
      </p>
      <h2 id="exhibit-title" style={display}>
        Open the classic portfolio?<span className="heading-period">.</span>
      </h2>
      <p className="museum-panel-description">
        That door leaves the 3D museum for the regular website — the same projects,
        experience and contact, in a scannable page. The 3D museum stays here and your
        spot is kept.
      </p>
      <div className="museum-exit-actions">
        <button type="button" className="museum-exit-stay" onClick={onClose}>
          Stay in the museum
        </button>
        <button
          ref={confirmRef}
          type="button"
          className="museum-exit-leave"
          onClick={onExit}
        >
          Open the classic portfolio <DoorOpen size={16} aria-hidden="true" />
        </button>
      </div>
      <p className="museum-panel-note" style={mono}>
        YOU CAN RETURN ANY TIME VIA THE 3D MUSEUM ENTRY AGAIN.
      </p>
    </>
  );
}
