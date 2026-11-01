import React from "react";
import { RoundedBox, SoftShadow } from "../scene/primitives.jsx";
import { LabelPlane } from "../scene/labels.jsx";
import BoardPlane from "./boards.jsx";
import { useWorld } from "./shell.jsx";
import { STUDIO } from "./content.js";

/**
 * The Contact Studio — a small consulting room rather than a billboard: the
 * desk carries the contact plaque (E opens the contact panel with live
 * mailto/WhatsApp links), the wall art carries the same numbers plainly.
 */
export default function ContactStudio() {
  const { materials, shadowTexture } = useWorld();

  return (
    <group>
      <LabelPlane
        position={[0, 3.4, 14.59]}
        rotation={[0, Math.PI, 0]}
        size={[3.2, 0.72]}
        kicker="ROOM 05 / IF YOU'D LIKE TO WORK TOGETHER"
        title="Contact Studio"
        subtitle="EMAIL / WHATSAPP / RESPONSE BY EMAIL"
        variant="title"
      />

      <ContactWallBoard />

      {/* Desk — the S-interaction anchor. */}
      <group position={[0, 0, 12.92]}>
        <SoftShadow position={[0, 0.012, 0]} scale={[2.4, 1.6]} opacity={0.46} texture={shadowTexture} />
        <RoundedBox size={[2.6, 0.08, 1.0]} radius={0.02} segments={3} position={[0, 0.86, 0]} castShadow receiveShadow>
          <primitive object={materials.wood} attach="material" />
        </RoundedBox>
        {[-1.2, 1.2].map((x) => (
          <mesh key={x} position={[x, 0.42, 0]} castShadow>
            <boxGeometry args={[0.1, 0.84, 0.92]} />
            <primitive object={materials.woodDark} attach="material" />
          </mesh>
        ))}
        <RoundedBox size={[1.15, 0.03, 0.7]} radius={0.008} segments={2} position={[0.55, 0.92, 0.04]} castShadow>
          <primitive object={materials.blackMetal} attach="material" />
        </RoundedBox>
        <RoundedBox size={[0.62, 0.02, 0.4]} radius={0.006} segments={2} position={[-0.75, 0.92, 0.02]} rotation={[0, 0.06, 0]} castShadow>
          <primitive object={materials.stoneDark} attach="material" />
        </RoundedBox>
        <mesh position={[-0.75, 0.945, 0.02]} rotation={[-Math.PI / 2, 0, 0.06]}>
          <planeGeometry args={[0.52, 0.32]} />
          <meshStandardMaterial color="#f4f3ef" roughness={0.88} />
        </mesh>
        <SoftShadow position={[0, 0.935, 0]} scale={[0.9, 0.6]} opacity={0.3} texture={shadowTexture} />
      </group>

      {/* Seating clusters flanking the door. */}
      {[
        { x: -2.12, z: 10.52 },
        { x: 2.12, z: 10.52 },
      ].map((seat) => (
        <group key={seat.x} position={[seat.x, 0, seat.z]}>
          <SoftShadow position={[0, 0.011, 0]} scale={[1.15, 0.95]} opacity={0.4} texture={shadowTexture} />
          <RoundedBox size={[1.05, 0.3, 0.85]} radius={0.05} segments={4} position={[0, 0.2, 0]} castShadow receiveShadow>
            <primitive object={materials.fabric} attach="material" />
          </RoundedBox>
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.4, 0.44, 0.05, 12]} />
            <primitive object={materials.brassDark} attach="material" />
          </mesh>
        </group>
      ))}

      {/* A plant on the west side keeps the room from feeling like a form. */}
      <group position={[-4.6, 0, 13.6]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.16, 0.34, 12]} />
          <primitive object={materials.stoneDark} attach="material" />
        </mesh>
        {[-0.3, 0, 0.35].map((angle, index) => (
          <mesh key={index} position={[Math.sin(angle) * 0.09, 0.52, Math.cos(angle) * 0.09]} rotation={[0.5 * Math.sin(angle), angle, 0.4 * Math.cos(angle)]} castShadow>
            <boxGeometry args={[0.05, 0.42, 0.02]} />
            <meshStandardMaterial color="#3d5a44" roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function ContactWallBoard() {
  return (
    <BoardPlane
      position={[0, 2.55, 14.58]}
      rotation={[0, Math.PI, 0]}
      size={[3.4, 2.1]}
      kicker={STUDIO.location.toUpperCase()}
      title="Let's talk"
      rows={[
        { label: "Email", body: STUDIO.email },
        { label: "WhatsApp", body: `${STUDIO.whatsappNumber} — direct message link in the panel` },
        { label: "The desk", body: "Approach the desk and press E for live email + WhatsApp actions" },
        { label: "Forms", body: STUDIO.formNote },
      ]}
      footer="CONTACT STUDIO / ROOM 05"
      accent="#9fe0c1"
    />
  );
}
