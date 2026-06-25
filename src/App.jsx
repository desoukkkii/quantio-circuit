import { useState } from 'react'
import useCircuit from './hooks/useCircuit'
import Toolbar from './components/Toolbar'
import Sidebar from './components/Sidebar'
import Workspace from './components/Workspace'
import PropertiesPanel from './components/PropertiesPanel'
import SaveModal from './components/SaveModal'
import LoadModal from './components/LoadModal'

export default function App() {
  const circuit = useCircuit()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [propertiesOpen, setPropertiesOpen] = useState(false)

  return (
    <div className="relative flex flex-col h-dvh z-[1] bg-ambient-gradient">
      <Toolbar
        circuit={circuit}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        onToggleProperties={() => setPropertiesOpen(o => !o)}
      />
      <main className="flex flex-1 overflow-hidden min-h-0">
        <div className="hidden lg:flex shrink-0">
          <Sidebar circuit={circuit} />
        </div>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="absolute inset-0 bg-black/50 animate-overlay-in" onClick={() => setSidebarOpen(false)} />
            <div className="relative max-h-full overflow-y-auto animate-modal-in">
              <Sidebar circuit={circuit} onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}
        <Workspace circuit={circuit} />
        <div className="hidden xl:flex shrink-0">
          <PropertiesPanel circuit={circuit} />
        </div>
        {propertiesOpen && (
          <div className="fixed inset-0 z-50 flex justify-end xl:hidden">
            <div className="absolute inset-0 bg-black/50 animate-overlay-in" onClick={() => setPropertiesOpen(false)} />
            <div className="relative max-h-full overflow-y-auto animate-modal-in">
              <PropertiesPanel circuit={circuit} onClose={() => setPropertiesOpen(false)} />
            </div>
          </div>
        )}
      </main>
      {circuit.showSaveModal && <SaveModal circuit={circuit} />}
      {circuit.showLoadModal && <LoadModal circuit={circuit} />}
    </div>
  )
}
