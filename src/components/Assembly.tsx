import { useRef } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { useConfigStore, FINISH_COLORS } from '../store'
import { BaseChassis } from './parts/BaseChassis'
import { PipeNetwork } from './parts/PipeNetwork'
import { IntakeValve } from './parts/IntakeValve'
import { ExhaustPort } from './parts/ExhaustPort'
import { PressureGauge } from './parts/PressureGauge'
import { CoolingFins } from './parts/CoolingFins'

export function Assembly() {
  const groupRef = useRef<Group>(null)
  const config = useConfigStore()
  const color = FINISH_COLORS[config.finish]

  // Gentle idle hover animation — keep bottom at ground level
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        config.baseHeight / 2 + Math.sin(state.clock.elapsedTime * 0.6) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={[0, config.baseHeight / 2, 0]}>
      <BaseChassis
        width={config.baseWidth}
        depth={config.baseDepth}
        height={config.baseHeight}
        color={color}
      />

      <PipeNetwork
        radius={config.pipeRadius}
        segments={config.pipeSegments}
        color={color}
        baseWidth={config.baseWidth}
        baseDepth={config.baseDepth}
        baseHeight={config.baseHeight}
      />

      {config.modules.intakeValve.enabled && (
        <IntakeValve color={color} baseWidth={config.baseWidth} />
      )}

      {config.modules.exhaustPort.enabled && (
        <ExhaustPort color={color} baseWidth={config.baseWidth} />
      )}

      {config.modules.pressureGauge.enabled && (
        <PressureGauge color={color} baseHeight={config.baseHeight} baseDepth={config.baseDepth} />
      )}

      {config.modules.coolingFins.enabled && (
        <CoolingFins color={color} baseWidth={config.baseWidth} baseDepth={config.baseDepth} />
      )}
    </group>
  )
}
