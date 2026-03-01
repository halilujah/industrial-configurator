interface Props {
  radius: number
  segments: number
  color: string
  baseWidth: number
  baseDepth: number
  baseHeight: number
}

function Pipe({
  position,
  rotation,
  length,
  radius,
  color,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  length: number
  radius: number
  color: string
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <cylinderGeometry args={[radius, radius, length, 16]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

function PipeJoint({
  position,
  radius,
  color,
}: {
  position: [number, number, number]
  radius: number
  color: string
}) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius * 1.3, 16, 16]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

export function PipeNetwork({ radius, segments, color, baseWidth, baseDepth, baseHeight }: Props) {
  const topY = baseHeight / 2 + 0.15
  const pipeLength = 0.8
  const headerLength = baseWidth * 0.7
  const pipeZ = -baseDepth * 0.25
  // Evenly distribute risers along the header, symmetrically centered
  const spacing = headerLength / (segments + 1)

  return (
    <group>
      {/* Horizontal header pipe along the top */}
      <Pipe
        position={[0, topY + pipeLength / 2, pipeZ]}
        rotation={[0, 0, Math.PI / 2]}
        length={headerLength}
        radius={radius * 0.6}
        color={color}
      />

      {/* Vertical risers */}
      {Array.from({ length: segments }).map((_, i) => {
        const x = -headerLength / 2 + spacing * (i + 1)
        return (
          <group key={i}>
            <Pipe
              position={[x, topY + pipeLength / 2, pipeZ]}
              rotation={[0, 0, 0]}
              length={pipeLength}
              radius={radius}
              color={color}
            />
            <PipeJoint
              position={[x, topY + pipeLength, pipeZ]}
              radius={radius}
              color={color}
            />
            {/* Flange ring at base */}
            <mesh position={[x, topY, pipeZ]} castShadow>
              <torusGeometry args={[radius * 1.2, radius * 0.2, 8, 16]} />
              <meshStandardMaterial color="#333" metalness={0.9} roughness={0.15} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
