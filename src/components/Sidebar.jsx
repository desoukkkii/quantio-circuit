const sections = [
  {
    title: 'Inputs',
    items: [
      { type: 'toggle-switch', label: 'Toggle Switch' },
      { type: 'push-button', label: 'Push Button' },
      { type: 'clock', label: 'Clock' },
    ],
  },
  {
    title: 'Outputs',
    items: [
      { type: 'led', label: 'LED' },
      { type: 'lamp', label: 'Lamp' },
      { type: 'seven-segment', label: '7-Segment Display' },
    ],
  },
  {
    title: 'Logic Gates',
    items: [
      { type: 'and', label: 'AND' },
      { type: 'or', label: 'OR' },
      { type: 'not', label: 'NOT' },
      { type: 'nand', label: 'NAND' },
      { type: 'nor', label: 'NOR' },
      { type: 'xor', label: 'XOR' },
      { type: 'xnor', label: 'XNOR' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { type: 'half-adder', label: 'Half Adder' },
      { type: 'full-adder', label: 'Full Adder' },
      { type: 'multiplexer', label: 'Multiplexer' },
      { type: 'decoder', label: 'Decoder' },
      { type: 'encoder', label: 'Encoder' },
    ],
  },
  {
    title: 'Examples',
    items: [
      { example: 'half-adder', label: 'Half Adder' },
      { example: 'full-adder', label: 'Full Adder' },
      { example: 'xor-gate', label: 'XOR Gate' },
      { example: 'sr-latch', label: 'SR Latch' },
      { example: '4bit-counter', label: '4-bit Counter' },
    ],
  },
]

export default function Sidebar({ circuit, onClose }) {
  return (
    <aside className="w-[240px] bg-[#11141c] border-r border-white/[0.07] overflow-y-auto overscroll-contain shrink-0 pt-3.5 pb-5 flex flex-col scrollbar-thin" aria-label="Component library">
      {onClose && (
        <div className="flex items-center justify-between px-[18px] pb-3 border-b border-white/[0.07] mb-3 mx-2">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7794]">Components</h3>
          <button onClick={onClose} className="p-1 rounded-[6px] text-[#6b7794] hover:text-[#f4f6fb] hover:bg-white/[0.05] transition-all" aria-label="Close component library">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
      {sections.map((section) => (
        <div key={section.title} className="mb-3.5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7794] px-[18px] py-[6px_18px_8px]">
            {section.title}
          </h3>
          <div className="flex flex-col gap-0.5 px-2">
            {section.items.map((item) => {
              const isExample = 'example' in item
              return (
                <div
                  key={item.label}
                  tabIndex={0}
                  role="button"
                  onClick={() => {
                    if (isExample) {
                      circuit.loadExample(item.example)
                    } else {
                      if (circuit.activeType === item.type) {
                        circuit.setActiveType(null)
                      } else {
                        circuit.setActiveType(item.type)
                      }
                    }
                  }}
                  className={`relative px-3 py-[9px] text-[13px] cursor-pointer rounded-[6px] select-none transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white/[0.04] hover:translate-x-[2px] active:translate-y-[1px] before:content-[''] before:absolute before:left-1 before:top-1/2 before:w-[3px] before:h-0 before:rounded-[2px] before:-translate-y-1/2 before:transition-all before:duration-[180ms] hover:before:h-[60%] ${
                    isExample
                      ? 'text-green-400 hover:text-green-300 before:bg-gradient-to-b before:from-green-500 before:to-green-600'
                      : circuit.activeType === item.type
                        ? 'text-blue-400 bg-blue-400/10 before:h-[70%] before:bg-gradient-to-b before:from-blue-400 before:to-violet-600'
                        : 'text-[#93a0bb] hover:text-[#f4f6fb] before:bg-gradient-to-b before:from-blue-400 before:to-violet-600'
                  }`}
                >
                  {item.label}
                </div>
              )
            })}
          </div>
        </div>
      ))}
      <div className="mt-auto pt-3.5 border-t border-white/[0.07] mx-2">
        <p className="text-[11.5px] text-[#6b7794] leading-relaxed px-4">
          Tip: click a component, then click the canvas to place it. Drag from an output pin to wire it up.
        </p>
      </div>
    </aside>
  )
}
