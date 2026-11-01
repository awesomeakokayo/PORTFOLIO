import React, { useMemo } from "react";
import { RoundedBox, SoftShadow } from "../scene/primitives.jsx";
import { LabelPlane } from "../scene/labels.jsx";
import { useWorld } from "./shell.jsx";
import { HERITAGE } from "./content.js";
import { HERITAGE_CASES } from "./plan.js";

/**
 * The Collection — three vitrines about one researched object: the Met's
 * "Plaque with Warrior and Attendants" record. The centre case shows an
 * interpretive stand-in made of exhibition materials (never a replica, and
 * never presented as the artefact); the flanking cases carry the documented
 * context and the source list. Rich detail lives in the HTML exhibit panel.
 */

function ExhibitStandIn({ materials }) {
  return (
    <group position={[0, 1.52, 0.08]} rotation={[-0.12, 0, -0.015]}>
      <RoundedBox size={[0.78, 0.58, 0.05]} radius={0.012} segments={2} castShadow>
        <primitive object={materials.brassDark} attach="material" />
      </RoundedBox>

      {/* Abstract court geometry — border rings, a centre boss, quiet bars. */}
      <group position={[0, 0, 0.034]}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.225, 0.009, 10, 40]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh>
          <torusGeometry args={[0.155, 0.009, 10, 40]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh>
          <torusGeometry args={[0.09, 0.01, 10, 40]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <sphereGeometry args={[0.05, 14, 12]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        {[
          [0, 0.27],
          [0, -0.27],
          [-0.27, 0],
          [0.27, 0],
        ].map(([x, y], index) => (
          <mesh key={index} position={[x, y, 0.008]}>
            <boxGeometry args={[0.05, 0.1, 0.016]} />
            <primitive object={materials.brassDark} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Easel stand */}
      <group position={[0, -0.33, 0.16]} rotation={[0.34, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.03, 0.09]} />
          <primitive object={materials.woodDark} attach="material" />
        </mesh>
      </group>
    </group>
  );
}

function RecordCards({ materials, count = 3 }) {
  return (
    <group position={[0, 1.32, 0.05]}>
      {Array.from({ length: count }, (_, index) => (
        <RoundedBox
          key={index}
          size={[0.62 - index * 0.03, 0.014, 0.44]}
          radius={0.006}
          segments={2}
          position={[0.02 * index, 0.012 * (count - index), 0.015 * index]}
          rotation={[0, 0.06 * (index - 1), 0]}
          castShadow
        >
          <primitive object={materials.blackMetal} attach="material" />
        </RoundedBox>
      ))}
      <mesh position={[-0.18, 0.07, -0.14]} rotation={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.018, 0.024, 0.09, 10]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>
    </group>
  );
}

function BookletStack({ materials }) {
  return (
    <group position={[0, 1.3, 0.06]}>
      <RoundedBox size={[0.58, 0.05, 0.42]} radius={0.01} segments={2} castShadow>
        <primitive object={materials.stoneDark} attach="material" />
      </RoundedBox>
      <group position={[-0.05, 0.05, 0]} rotation={[0, 0.18, 0]}>
        <RoundedBox size={[0.3, 0.045, 0.4]} radius={0.008} segments={2}>
          <primitive object={materials.brassDark} attach="material" />
        </RoundedBox>
        <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.26, 0.36]} />
          <meshStandardMaterial color="#f4f3ef" roughness={0.9} />
        </mesh>
      </group>
      <RoundedBox size={[0.34, 0.03, 0.24]} radius={0.006} segments={2} position={[0.22, 0.05, 0.05]} rotation={[0, -0.3, 0]}>
        <primitive object={materials.wood} attach="material" />
      </RoundedBox>
    </group>
  );
}

function HeritageCase({ item, interactive }) {
  const { materials, shadowTexture } = useWorld();
  const center = item.center;

  return (
    <group position={[center[0], 0, center[1]]}>
      <SoftShadow position={[-0.4, 0.011, 0]} scale={[2.1, 1.7]} opacity={0.46} texture={shadowTexture} />

      {/* Pedestal */}
      <RoundedBox size={[1.24, 0.16, 1.14]} radius={0.02} segments={3} position={[0, 0.08, 0]} castShadow receiveShadow>
        <primitive object={materials.stone} attach="material" />
      </RoundedBox>
      <mesh position={[0, 0.24, 0]} castShadow>
        <boxGeometry args={[1.16, 0.74, 1.06]} />
        <primitive object={materials.woodDark} attach="material" />
      </mesh>
      <mesh position={[0, 0.635, 0]}>
        <boxGeometry args={[1.18, 0.05, 1.08]} />
        <primitive object={materials.brassDark} attach="material" />
      </mesh>

      {/* Glass hood */}
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[1.1, 0.64, 1.02]} />
        <meshStandardMaterial
          color="#bfd3ce"
          transparent
          opacity={0.16}
          roughness={0.08}
          metalness={0.1}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 1.68, 0]}>
        <boxGeometry args={[1.16, 0.05, 1.08]} />
        <primitive object={materials.brassDark} attach="material" />
      </mesh>

      {item.kind === "exhibit" ? <ExhibitStandIn materials={materials} /> : null}
      {item.kind === "context" ? <RecordCards materials={materials} count={4} /> : null}
      {item.kind === "sources" ? <BookletStack materials={materials} /> : null}
    </group>
  );
}

export default function HeritageGallery() {
  const exhibit = HERITAGE.exhibit;

  return (
    <group>
      <LabelPlane
        position={[17.18, 3.4, -3.4]}
        rotation={[0, -Math.PI / 2, 0]}
        size={[3.3, 0.8]}
        kicker="ROOM 03 / BENIN KINGDOM / EDO PEOPLES"
        title="The Collection"
        subtitle="ONE RESEARCHED OBJECT / SOURCES ADJACENT"
        variant="title"
      />

      {HERITAGE_CASES.map((item) => {
        const interactive = item.kind === "exhibit" || item.kind === "sources";
        return (
          <group key={item.id}>
            <HeritageCase item={item} interactive={item.kind === "exhibit"} />
            {/* Case labels read from the room (west face of the case). */}
            <LabelPlane
              position={[15.83, 0.78, item.center[1]]}
              rotation={[0, Math.PI / 2, 0]}
              size={[0.92, 0.36]}
              kicker={
                item.kind === "exhibit"
                  ? `${exhibit.culture.toUpperCase()} / ${exhibit.period.toUpperCase()}`
                  : item.kind === "context"
                    ? "CONTEXT"
                    : "SOURCES"
              }
              title={
                item.kind === "exhibit"
                  ? "Plaque with Warrior and Attendants"
                  : item.kind === "context"
                    ? "The court at Benin City"
                    : "Where this record comes from"
              }
              subtitle={
                item.kind === "exhibit"
                  ? "BRASS / MET ACCESSION 1990.332 / ÌGÙN Ẹ́RỌ̀NWWỌ̀N ARTISTS"
                  : item.kind === "context"
                    ? "RESEARCH SUMMARY"
                    : "DIGITAL BENIN / MET / NMS / NMAA"
              }
              footer={
                interactive
                  ? "NEAR CASE — OPEN THE EXHIBIT PANEL (E)"
                  : "ROOM 03"
              }
              variant="plaque"
              accent={item.kind === "exhibit" ? "#c9a26a" : "#8f8a80"}
              lit={interactive}
            />
          </group>
        );
      })}

      {/* Wall text: the exhibition's cultural guardrails, stated plainly. */}
      <LabelPlane
        position={[15.9, 2.35, 2.2]}
        rotation={[0, Math.PI / 2, 0]}
        size={[2.2, 0.52]}
        kicker="EXHIBITION NOTE"
        title="Interpretive stand-in"
        subtitle="NO ARTEFACT PHOTOGRAPHY IS REPRINTED — AUTHORISED RECORDS ARE LINKED"
        variant="panel"
        accent="#8f8a80"
        lit
      />
    </group>
  );
}
