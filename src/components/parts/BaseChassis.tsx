import { RoundedBox } from '@react-three/drei'

interface Props {
  width: number
  depth: number
  height: number
  color: string
}

export function BaseChassis({ width, depth, height, color }: Props) {
  return (
    <group>
      {/* Main body */}
      <RoundedBox
        args={[width, height, depth]}
        radius={0.06}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Top plate accent */}
      <RoundedBox
        args={[width * 0.85, 0.04, depth * 0.75]}
        radius={0.01}
        smoothness={2}
        position={[0, height / 2 + 0.02, 0]}
      >
        <meshStandardMaterial
          color="#222"
          metalness={0.9}
          roughness={0.15}
        />
      </RoundedBox>

      {/* Front panel inset */}
      <mesh position={[0, 0, depth / 2 + 0.001]}>
        <planeGeometry args={[width * 0.7, height * 0.6]} />
        <meshStandardMaterial
          color="#111"
          metalness={0.5}
          roughness={0.6}
        />
      </mesh>

      {/* Status LED */}
      <mesh position={[width * 0.25, height * 0.35, depth / 2 + 0.005]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  )
}
