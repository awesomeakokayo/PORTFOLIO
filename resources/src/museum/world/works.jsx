import React, { useMemo } from "react";
import { EXHIBITS } from "./plan.js";
import { projects } from "../../data/projects.js";
import ExhibitScene from "../scene/exhibits.jsx";
import { LabelPlane } from "../scene/labels.jsx";
import { useWorld } from "./shell.jsx";

export const WORKS_EXHIBITS = EXHIBITS.map((exhibit) => {
  const project = projects.find((entry) => entry.slug === exhibit.slug);
  if (!project) return null;
  return {
    ...exhibit,
    project,
  };
}).filter(Boolean);

/**
 * The Works Gallery — the four project exhibits relocated from the original
 * Arrival Court into Room 02, honouring the established plinth, artifact and
 * spotlight system with the gallery's lower ceiling.
 */
export default function WorksGallery({
  hoverProject,
  nearInteractive,
  onHoverProject,
  onSelectProject,
}) {
  const { materials, shadowTexture, quality } = useWorld();
  const ceilingY = useMemo(() => 4.44, []);

  return (
    <group>
      <LabelPlane
        position={[0, 3.55, -17.19]}
        size={[3.4, 0.78]}
        kicker="ROOM 02 / SELECTED WORK"
        title="The Works Gallery"
        subtitle="FOUR PROJECTS / INTERACT TO READ"
        variant="title"
      />

      {WORKS_EXHIBITS.map((exhibit) => (
        <ExhibitScene
          key={exhibit.project.slug}
          exhibit={exhibit}
          hovered={hoverProject?.slug === exhibit.project.slug}
          near={nearInteractive?.id === exhibit.project.slug}
          onHover={onHoverProject}
          onSelect={onSelectProject}
          materials={materials}
          shadowTexture={shadowTexture}
          quality={quality}
          lightY={ceilingY}
        />
      ))}
    </group>
  );
}
