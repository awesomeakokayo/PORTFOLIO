import React from "react";
import { RoundedBox, SoftShadow } from "../scene/primitives.jsx";
import { LabelPlane } from "../scene/labels.jsx";
import BoardPlane from "./boards.jsx";
import { useWorld } from "./shell.jsx";
import { WORKSHOP } from "./content.js";

/**
 * The Workshop — "how the work is made": a joinery-style worktable with the
 * experience timeline, toolkit wall and about-board around it. Everything on
 * the boards is drawn from the classic site's verified copy.
 */
export default function Workshop() {
  const { materials, shadowTexture } = useWorld();

  return (
    <group>
      <LabelPlane
        position={[-13.5, 3.5, -7.39]}
        size={[3.2, 0.72]}
        kicker="ROOM 04 / HOW THE WORK IS MADE"
        title="The Workshop"
        subtitle="EXPERIENCE / TOOLKIT / CURRENT STACK"
        variant="title"
      />

      <ExperienceBoard />
      <ToolkitBoard />
      <AboutBoard />

      {/* Worktable — the room's centre of gravity. */}
      <group position={[-13.5, 0, 0]}>
        <SoftShadow position={[0, 0.012, 0]} scale={[2.5, 1.7]} opacity={0.44} texture={shadowTexture} />
        <RoundedBox size={[1.72, 0.09, 0.86]} radius={0.02} segments={3} position={[0, 0.92, 0]} castShadow receiveShadow>
          <primitive object={materials.wood} attach="material" />
        </RoundedBox>
        {[-0.78, 0.78].map((x) =>
          [-0.36, 0.36].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.44, z]} castShadow>
              <boxGeometry args={[0.09, 0.88, 0.09]} />
              <primitive object={materials.woodDark} attach="material" />
            </mesh>
          ))
        )}
        <RoundedBox size={[1.66, 0.06, 0.8]} radius={0.01} segments={2} position={[0, 0.44, 0]}>
          <primitive object={materials.woodDark} attach="material" />
        </RoundedBox>

        {/* A quiet toolkit still life on top. */}
        <RoundedBox size={[0.3, 0.05, 0.2]} radius={0.008} segments={2} position={[-0.45, 0.99, 0.05]} rotation={[0, 0.3, 0]} castShadow>
          <primitive object={materials.stoneDark} attach="material" />
        </RoundedBox>
        <mesh position={[-0.44, 1.03, 0.05]} rotation={[-Math.PI / 2, 0, 0.3]}>
          <planeGeometry args={[0.24, 0.14]} />
          <meshStandardMaterial color="#f4f3ef" roughness={0.85} />
        </mesh>
        <mesh position={[0.15, 0.99, 0.14]} rotation={[0, -0.2, Math.PI / 2]}>
          <cylinderGeometry args={[0.014, 0.014, 0.34, 10]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <RoundedBox size={[0.26, 0.03, 0.18]} radius={0.006} segments={2} position={[0.42, 0.98, -0.08]} rotation={[0, 0.12, 0]} castShadow>
          <primitive object={materials.blackMetal} attach="material" />
        </RoundedBox>
      </group>

      {/* Two stools at the table's short ends, like a workshop bench. */}
      {[
        { x: -14.95, z: 0 },
        { x: -12.16, z: 0 },
      ].map((seat) => (
        <group key={seat.x} position={[seat.x, 0, seat.z]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.21, 0.24, 0.5, 14]} />
            <primitive object={materials.fabric} attach="material" />
          </mesh>
          <mesh position={[0, 0.26, 0]}>
            <cylinderGeometry args={[0.235, 0.235, 0.03, 14]} />
            <primitive object={materials.brassDark} attach="material" />
          </mesh>
        </group>
      ))}

      {/* Wall hooks left of the boards, a workshop cue. */}
      {[-0.75, -0.45, -0.15].map((x, index) => (
        <group key={index} position={[-10.4, 1.85, -2.6]} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            <boxGeometry args={[0.07, 0.03, 0.16]} />
            <primitive object={materials.brass} attach="material" />
          </mesh>
          <mesh position={[0, index % 2 ? -0.04 : 0.04, 0.08]}>
            <boxGeometry args={[0.05, 0.2, 0.03]} />
            <primitive object={materials.woodDark} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ExperienceBoard() {
  const rows = WORKSHOP.experience.map((entry) => ({
    label: `${entry.role} — ${entry.company}`,
    body: `${entry.meta} · ${entry.stack}`,
  }));

  return (
    <BoardPlane
      position={[-13.5, 2.5, -7.4]}
      size={[3.4, 2.24]}
      kicker="EXPERIENCE"
      title="Built across the stack"
      rows={rows}
      footer="VERIFY THE FULL STORY IN THE CLASSIC PORTFOLIO"
      accent="#ff5c00"
    />
  );
}

function ToolkitBoard() {
  const rows = WORKSHOP.toolkit.map((group) => ({
    label: group.label,
    body: group.items,
  }));

  return (
    <BoardPlane
      position={[-17.2, 2.5, -3.4]}
      rotation={[0, Math.PI / 2, 0]}
      size={[3.4, 2.24]}
      kicker="TOOLKIT"
      title="Tools, daily"
      rows={rows}
      footer="ROOM 04 / THE WORKSHOP"
      accent="#9fe0c1"
    />
  );
}

function AboutBoard() {
  return (
    <BoardPlane
      position={[-13.5, 2.5, 7.4]}
      rotation={[0, Math.PI, 0]}
      size={[3.4, 2.0]}
      kicker="ABOUT"
      title="Awesome Akokayo"
      rows={[
        { label: "The practice", body: WORKSHOP.intro },
        { label: "Products on view", body: "OpenBooks · TechSkillHub · Southwest Flood Monitor · Elroi — Room 02" },
        { label: "Heritage interest", body: "Benin/Edo court art research — Room 03" },
      ]}
      footer="3D MUSEUM / FULL-STACK ENGINEER"
      accent="#c9a26a"
    />
  );
}
