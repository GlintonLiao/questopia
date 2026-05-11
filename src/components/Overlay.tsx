import { useEffect, useState } from 'react'
import type { Project } from '../data/projects'
import { currentProjects, previousProjects } from '../data/projects'

type OverlayKind = 'none' | 'current' | 'previous'

interface OverlayProps {
  kind: OverlayKind
  onClose: () => void
}

export default function Overlay({ kind, onClose }: OverlayProps) {
  const [renderedKind, setRenderedKind] = useState<Exclude<OverlayKind, 'none'>>('current')

  useEffect(() => {
    if (kind !== 'none') {
      setRenderedKind(kind)
    }
  }, [kind])

  const isCurrent = renderedKind === 'current'
  const isVisible = kind !== 'none'
  const projects = isCurrent ? currentProjects : previousProjects
  const title = isCurrent ? 'Current Projects' : 'Previous Projects'
  const subtitle = isCurrent
    ? 'My present as a programmer'
    : 'My past as an architect'

  return (
    <div className={`overlay ${isVisible ? 'visible' : ''}`}>
      <div className="overlay-header">
        <div className="overlay-title">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <button className="overlay-close-btn" onClick={onClose}>
          <img src="/close.svg" alt="Close" />
        </button>
      </div>

      <div className="overlay-container">
        <div className="layout-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

      <footer>
        <div className="contact">
          <a
            href="/imgs/QR Code.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="wechat-button"
            aria-label="WeChat"
          />
          <a
            href="https://www.linkedin.com/in/glintonliao"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-button"
            aria-label="LinkedIn"
          />
          <a
            href="https://github.com/GlintonLiao"
            target="_blank"
            rel="noopener noreferrer"
            className="github-button"
            aria-label="GitHub"
          />
        </div>

        <span> &copy; Designed &amp; Coded by Guotong Liao </span>
      </footer>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a href={project.href} className="card" target="_blank" rel="noopener noreferrer">
      <img src={project.cover} className="card-img" alt={project.title} />
      <div className="card-description">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </a>
  )
}
