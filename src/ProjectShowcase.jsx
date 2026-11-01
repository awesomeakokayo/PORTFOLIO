import React from "react";
import { ArrowUpRight } from "lucide-react";
import CurtainReveal from "./CurtainReveal.jsx";
import { projects } from "./data/projects.js";

const display = { fontFamily: "'Ojuju', sans-serif" };
const mono = { fontFamily: "'Space Mono', monospace" };

function ProjectMedia({ project, featured = false }) {
  const image = (
    <img
      src={project.image}
      alt={project.imageAlt}
      loading={project.featured ? "eager" : "lazy"}
      decoding="async"
      className={"project-image project-image-" + project.imageMode}
    />
  );

  return (
    <div className={"project-media" + (featured ? " project-media-featured" : "")}>
      {project.featured ? (
        <CurtainReveal className="project-media-content">{image}</CurtainReveal>
      ) : (
        <div className="project-media-content">{image}</div>
      )}
      <div className="project-media-meta" style={mono}>
        <span>{project.number} / 04</span>
        <span>{project.category}</span>
      </div>
      {project.url && <span className="project-media-corner" aria-hidden="true"><ArrowUpRight size={18} /></span>}
    </div>
  );
}

function ProjectLinks({ project }) {
  if (project.url) {
    return (
      <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
        {project.linkLabel} <ArrowUpRight size={16} />
      </a>
    );
  }
  return <span className="project-no-link">Built project · Details on request</span>;
}

function ProjectCard({ project, featured = false }) {
  return (
    <article className={"project-card motion-reveal" + (featured ? " project-card-featured" : "")}>
      <ProjectMedia project={project} featured={featured} />
      <div className="project-card-copy">
        <div className="project-title-block">
          <p className="project-role" style={mono}>{project.role}</p>
          <h3 style={display}>{project.name}<span className="heading-period">.</span></h3>
          <p className="project-description">{project.description}</p>
        </div>
        <div className="project-card-bottom">
          <div className="project-tags" aria-label="Relevant technologies or areas">
            {project.tags.map((tag) => <span key={tag} style={mono}>{tag}</span>)}
          </div>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export default function ProjectShowcase() {
  const [featured, ...remaining] = projects;

  return (
    <div className="project-showcase">
      <ProjectCard project={featured} featured />
      <div className="project-grid">
        {remaining.map((project) => <ProjectCard key={project.name} project={project} />)}
      </div>
    </div>
  );
}
