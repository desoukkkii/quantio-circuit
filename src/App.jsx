import useCircuit from './hooks/useCircuit'
import Toolbar from './components/Toolbar'
import Sidebar from './components/Sidebar'
import Workspace from './components/Workspace'
import PropertiesPanel from './components/PropertiesPanel'
import SaveModal from './components/SaveModal'
import LoadModal from './components/LoadModal'

export default function App() {
  const circuit = useCircuit()

  return (
    <div className="relative flex flex-col h-dvh z-[1] bg-ambient-gradient">
      <Toolbar circuit={circuit} />
      <main className="flex flex-1 overflow-hidden min-h-0">
        <Sidebar circuit={circuit} />
        <Workspace circuit={circuit} />
        <PropertiesPanel circuit={circuit} />
      </main>
      {circuit.showSaveModal && <SaveModal circuit={circuit} />}
      {circuit.showLoadModal && <LoadModal circuit={circuit} />}
    </div>
  )
}
