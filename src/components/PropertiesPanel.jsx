export default function PropertiesPanel({ circuit }) {
  const comp = circuit.propertiesComp

  return (
    <aside className="w-[280px] bg-[#11141c] border-l border-white/[0.07] shrink-0 flex flex-col overflow-y-auto scrollbar-thin" aria-label="Properties">
      <div className="px-[18px] py-4 border-b border-white/[0.07] sticky top-0 bg-[#11141c] z-[1]">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6b7794]">Properties</h3>
      </div>
      <div className="p-[18px] flex-1">
        {!comp ? (
          <p className="text-[13px] text-[#6b7794] text-center py-8 px-2 leading-relaxed border border-dashed border-white/[0.07] rounded-[12px] bg-white/[0.015]">
            Select a component to edit its properties.
          </p>
        ) : (
          <div key={comp.id}>
            <PropGroup label="Label">
              <input
                type="text"
                defaultValue={comp.label}
                key={comp.id + '-label'}
                onInput={(e) => { comp.label = e.target.value; circuit.triggerRender() }}
                className="w-full px-2.5 py-[9px] bg-[#0f1218] border border-white/[0.07] rounded-[8px] text-[13px] text-[#f4f6fb] font-inherit outline-none transition-all duration-[180ms] focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.18)]"
              />
            </PropGroup>

            {comp.type === 'clock' && (
              <PropGroup label="Clock Speed (Hz)">
                <input
                  type="number"
                  defaultValue={comp.clockFreq}
                  key={comp.id + '-freq'}
                  min="0.1"
                  max="100"
                  step="0.1"
                  onInput={(e) => {
                    const f = parseFloat(e.target.value)
                    if (!isNaN(f) && f > 0) {
                      comp.clockFreq = f
                      if (comp.clockRunning) {
                        if (comp.clockTimer) clearInterval(comp.clockTimer)
                        const tick = () => {
                          if (!comp.clockRunning) return
                          comp.value = comp.value ? 0 : 1
                          circuit.propagateFromComponent(comp)
                          circuit.triggerRender()
                        }
                        const interval = Math.max(50, Math.round(1000 / comp.clockFreq / 2))
                        comp.clockTimer = setInterval(tick, interval)
                      }
                    }
                  }}
                  className="w-full px-2.5 py-[9px] bg-[#0f1218] border border-white/[0.07] rounded-[8px] text-[13px] text-[#f4f6fb] font-inherit outline-none transition-all duration-[180ms] focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.18)]"
                />
              </PropGroup>
            )}

            {comp.type === 'toggle-switch' && (
              <PropGroup label="Initial Value">
                <select
                  defaultValue={comp.initialValue}
                  key={comp.id + '-init'}
                  onChange={(e) => {
                    comp.initialValue = parseInt(e.target.value)
                    comp.value = comp.initialValue
                    circuit.propagateFromComponent(comp)
                    circuit.triggerRender()
                  }}
                  className="w-full px-2.5 py-[9px] bg-[#0f1218] border border-white/[0.07] rounded-[8px] text-[13px] text-[#f4f6fb] font-inherit outline-none transition-all duration-[180ms] focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.18)]"
                >
                  <option value="0">LOW (0)</option>
                  <option value="1">HIGH (1)</option>
                </select>
              </PropGroup>
            )}

            {(comp.type === 'led' || comp.type === 'lamp') && (
              <PropGroup label="Color">
                <input
                  type="color"
                  defaultValue={comp.color || (comp.type === 'lamp' ? '#22C55E' : '#EF4444')}
                  key={comp.id + '-color'}
                  onInput={(e) => {
                    comp.color = e.target.value
                    circuit.triggerRender()
                  }}
                  className="w-full h-[38px] p-[3px] bg-[#0f1218] border border-white/[0.07] rounded-[8px] cursor-pointer outline-none transition-all duration-[180ms] focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.18)]"
                />
              </PropGroup>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}

function PropGroup({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] font-semibold text-[#6b7794] uppercase tracking-[0.06em] mb-[7px]">
        {label}
      </label>
      {children}
    </div>
  )
}
