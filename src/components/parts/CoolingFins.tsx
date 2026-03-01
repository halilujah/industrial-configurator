interface Props {
  color: string
  baseWidth: number
  baseDepth: number
}

export function CoolingFins({ color, baseWidth, baseDepth }: Props) {
  const finCount = 6
  const finSpacing = (baseWidth * 0.6) / finCount

  return (
    <group position={[0, 0, -(baseDepth / 2 + 0.1)]}>
      {Array.from({ length: finCount }).map((_, i) => (
        <mesh
          key={i}
          position={[-baseWidth * 0.3 + finSpacing * (i + 0.5), 0.1, 0]}
          castShadow
        >
          <boxGeometry args={[0.02, 0.6, 0.35]} />
          <meshStandardMaterial
            color={color}
            metalness={0.75}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* Mounting bracket */}
      <mesh position={[0, -0.22, 0.05]} castShadow>
        <boxGeometry args={[baseWidth * 0.65, 0.04, 0.4]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  )
}
