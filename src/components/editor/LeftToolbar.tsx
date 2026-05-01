import type { ToolType } from '../../types/editor'
import { useEditorStore } from '../../stores/editorStore'

const tools: { id: ToolType; label: string }[] = [
  { id: 'select', label: 'Select' },
  { id: 'text', label: 'Text' },
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'ellipse', label: 'Ellipse' },
  { id: 'arrow', label: 'Arrow' },
]

export function LeftToolbar() {
  const tool = useEditorStore((s) => s.tool)
  const setTool = useEditorStore((s) => s.setTool)

  return (
    <aside className="panel hidden w-[240px] flex-shrink-0 flex-col gap-2 lg:flex">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Tools</h2>
        <span className="text-xs text-[#6e688a] dark:text-[#9fa8cf]">Studio</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {tools.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setTool(entry.id)}
            className={`btn-secondary h-11 text-xs ${tool === entry.id ? 'border-[#7a5cff] text-[#4f2fd2] dark:border-[#8f7bff]' : ''}`}
          >
            {entry.label}
          </button>
        ))}
      </div>
    </aside>
  )
}
