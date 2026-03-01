import { useConfigStore, FINISH_COLORS, type MaterialFinish } from '../store'

const PANEL_STYLE: React.CSSProperties = {
  width: 310,
  minWidth: 310,
  height: '100%',
  overflowY: 'auto',
  background: '#111118',
  borderRight: '1px solid #1e1e2e',
  padding: '20px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
}

const SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#888',
}

const SLIDER_STYLE: React.CSSProperties = {
  width: '100%',
  accentColor: '#4a9eff',
  cursor: 'pointer',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={SECTION_STYLE}>
      <div style={LABEL_STYLE}>{title}</div>
      {children}
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
        <span style={{ color: '#ccc' }}>{label}</span>
        <span style={{ color: '#4a9eff', fontVariantNumeric: 'tabular-nums' }}>
          {value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={SLIDER_STYLE}
      />
    </div>
  )
}

function ToggleSwitch({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 13,
        color: '#ccc',
        cursor: 'pointer',
        padding: '4px 0',
      }}
    >
      {label}
      <div
        onClick={onChange}
        style={{
          width: 38,
          height: 20,
          borderRadius: 10,
          background: checked ? '#4a9eff' : '#333',
          position: 'relative',
          transition: 'background 0.2s',
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            background: '#fff',
            position: 'absolute',
            top: 2,
            left: checked ? 20 : 2,
            transition: 'left 0.2s',
          }}
        />
      </div>
    </label>
  )
}

export function ConfigPanel() {
  const store = useConfigStore()

  const finishes: MaterialFinish[] = ['steel', 'copper', 'matte-black', 'industrial-blue']
  const finishLabels: Record<MaterialFinish, string> = {
    steel: 'Steel',
    copper: 'Copper',
    'matte-black': 'Matte Black',
    'industrial-blue': 'Industrial Blue',
  }

  const moduleLabels: Record<keyof typeof store.modules, string> = {
    intakeValve: 'Intake Valve',
    exhaustPort: 'Exhaust Port',
    pressureGauge: 'Pressure Gauge',
    coolingFins: 'Cooling Fins',
  }

  return (
    <div style={PANEL_STYLE}>
      <div>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>
          Industrial Configurator
        </h1>
        <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          Configure your modular assembly
        </p>
      </div>

      <div style={{ height: 1, background: '#1e1e2e' }} />

      <Section title="Dimensions">
        <Slider
          label="Base Width"
          value={store.baseWidth}
          min={1}
          max={3.5}
          step={0.1}
          onChange={store.setBaseWidth}
        />
        <Slider
          label="Base Depth"
          value={store.baseDepth}
          min={0.5}
          max={2.5}
          step={0.1}
          onChange={store.setBaseDepth}
        />
        <Slider
          label="Base Height"
          value={store.baseHeight}
          min={0.5}
          max={2}
          step={0.1}
          onChange={store.setBaseHeight}
        />
        <Slider
          label="Pipe Radius"
          value={store.pipeRadius}
          min={0.1}
          max={0.5}
          step={0.05}
          onChange={store.setPipeRadius}
        />
        <Slider
          label="Pipe Segments"
          value={store.pipeSegments}
          min={1}
          max={6}
          step={1}
          onChange={store.setPipeSegments}
        />
      </Section>

      <div style={{ height: 1, background: '#1e1e2e' }} />

      <Section title="Material Finish">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {finishes.map((f) => (
            <button
              key={f}
              onClick={() => store.setFinish(f)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
                border: store.finish === f ? '1px solid #4a9eff' : '1px solid #2a2a3a',
                borderRadius: 6,
                background: store.finish === f ? '#1a2a3f' : '#151520',
                color: '#ccc',
                fontSize: 12,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  background: FINISH_COLORS[f],
                  border: '1px solid #444',
                  flexShrink: 0,
                }}
              />
              {finishLabels[f]}
            </button>
          ))}
        </div>
      </Section>

      <div style={{ height: 1, background: '#1e1e2e' }} />

      <Section title="Modules">
        {(Object.keys(store.modules) as (keyof typeof store.modules)[]).map((key) => (
          <ToggleSwitch
            key={key}
            label={moduleLabels[key]}
            checked={store.modules[key].enabled}
            onChange={() => store.toggleModule(key)}
          />
        ))}
      </Section>

      <div style={{ height: 1, background: '#1e1e2e' }} />

      <Section title="View">
        <ToggleSwitch
          label="Auto-rotate"
          checked={store.autoRotate}
          onChange={() => store.setAutoRotate(!store.autoRotate)}
        />
      </Section>

      <div style={{ flex: 1 }} />

      <button
        onClick={store.resetConfig}
        style={{
          padding: '10px 16px',
          border: '1px solid #2a2a3a',
          borderRadius: 6,
          background: '#151520',
          color: '#888',
          fontSize: 12,
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#ff4a4a'
          e.currentTarget.style.color = '#ff4a4a'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#2a2a3a'
          e.currentTarget.style.color = '#888'
        }}
      >
        Reset to Default
      </button>
    </div>
  )
}
