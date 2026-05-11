import { Html } from '@react-three/drei'
import * as THREE from 'three'

const HOVER_POSITIONS = [
  { position: new THREE.Vector3(-1.1, 0.8, 0.3), className: 'current' },
  { position: new THREE.Vector3(-0.4, 1.2, 0), className: 'previous' },
]

const LABEL_TEXTS = [
  { title: 'Current Projects', subtitle: 'My present as a programmer' },
  { title: 'Previous Projects', subtitle: 'My past as an architect' },
]

export default function HoverLabels() {
  return (
    <>
      {LABEL_TEXTS.map((label, i) => (
        <Html
          key={label.title}
          position={HOVER_POSITIONS[i].position}
          center
          className={`hover-label hover-label-${HOVER_POSITIONS[i].className}`}
        >
          <h3 className="hover-label-text">{label.title}</h3>
          <p className="hover-label-text">{label.subtitle}</p>
        </Html>
      ))}
    </>
  )
}
