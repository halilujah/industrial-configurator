interface Props {
  color: string
  baseWidth: number
}

export function IntakeValve({ color, baseWidth }: Props) {
  const x = -baseWidth / 2 - 0.3

  return (
    <group position={[x, 0, 0]}>
      {/* Valve body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.5, 16]} />
        <meshStandardMaterial color={color} metalness={0.75} roughness={0.25} />
      </mesh>

      {/* Connector pipe */}
      <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 12]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Handwheel */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <torusGeometry args={[0.15, 0.025, 8, 24]} />
        <meshStandardMaterial color="#cc3333" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
        <meshStandardMaterial color="#cc3333" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}
