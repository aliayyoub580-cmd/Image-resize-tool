import type { EditorObject, TextObject } from '../../types/editor'
import { useEditorStore } from '../../stores/editorStore'

function isText(obj: EditorObject): obj is TextObject {
  return obj.type === 'text'
}

export function RightPropertiesPanel() {
  const selectedId = useEditorStore((s) => s.selectedId)
  const objects = useEditorStore((s) => s.objects)
  const updateObject = useEditorStore((s) => s.updateObject)
  const bringForward = useEditorStore((s) => s.bringForward)
  const sendBackward = useEditorStore((s) => s.sendBackward)
  const deleteSelected = useEditorStore((s) => s.deleteSelected)

  const selected = objects.find((o) => o.id === selectedId)

  if (!selected) {
    return (
      <aside className="panel hidden w-[320px] flex-shrink-0 flex-col gap-4 lg:flex">
        <h2 className="text-sm font-semibold">Properties</h2>
        <p className="text-sm text-[#6e688a] dark:text-[#9fa8cf]">Select an object to edit its properties.</p>
      </aside>
    )
  }

  return (
    <aside className="panel hidden w-[320px] flex-shrink-0 flex-col gap-4 lg:flex">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#6e688a] dark:text-[#9fa8cf]">Selected</p>
          <h2 className="text-sm font-semibold">{selected.type}</h2>
        </div>
        <div className="flex gap-1">
          <button type="button" className="btn-secondary h-10 px-3 text-xs" onClick={bringForward}>Up</button>
          <button type="button" className="btn-secondary h-10 px-3 text-xs" onClick={sendBackward}>Down</button>
          <button type="button" className="btn-secondary h-10 px-3 text-xs" onClick={deleteSelected}>Delete</button>
        </div>
      </div>

      {isText(selected) && (
        <div className="space-y-3 rounded-2xl border border-[#ddd9ef] bg-white/70 p-4 dark:border-[#2f3752] dark:bg-[#10182b]">
          <div className="flex items-center justify-between text-sm text-[#403b58] dark:text-[#c6cae6]">
            <span>Text</span>
            <span className="text-xs text-[#6e688a] dark:text-[#9fa8cf]">{selected.text.length} chars</span>
          </div>
          <input
            className="input-base"
            value={selected.text}
            onChange={(event) => updateObject(selected.id, (obj) => ({ ...obj, text: event.target.value }))}
          />
          <label className="block">
            <span className="field-label">Font Size</span>
            <input
              className="input-base"
              type="number"
              min={10}
              max={120}
              value={selected.fontSize}
              onChange={(event) => updateObject(selected.id, (obj) => ({ ...obj, fontSize: Number(event.target.value) }))}
            />
          </label>
          <label className="block">
            <span className="field-label">Color</span>
            <input
              className="input-base"
              type="color"
              value={selected.fill}
              onChange={(event) => updateObject(selected.id, (obj) => ({ ...obj, fill: event.target.value }))}
            />
          </label>
        </div>
      )}

      {!isText(selected) && selected.type !== 'path' && selected.type !== 'arrow' && (
        <div className="space-y-3 rounded-2xl border border-[#ddd9ef] bg-white/70 p-4 dark:border-[#2f3752] dark:bg-[#10182b]">
          <div className="flex items-center justify-between text-sm text-[#403b58] dark:text-[#c6cae6]">
            <span>Fill</span>
          </div>
          <input
            className="input-base"
            type="color"
            value={selected.fill}
            onChange={(event) => updateObject(selected.id, (obj) => ({ ...obj, fill: event.target.value }))}
          />
        </div>
      )}

      {selected.type === 'arrow' && (
        <div className="space-y-3 rounded-2xl border border-[#ddd9ef] bg-white/70 p-4 dark:border-[#2f3752] dark:bg-[#10182b]">
          <div className="flex items-center justify-between text-sm text-[#403b58] dark:text-[#c6cae6]">
            <span>Arrow Width</span>
          </div>
          <input
            className="input-base"
            type="number"
            min={1}
            max={20}
            value={selected.strokeWidth}
            onChange={(event) =>
              updateObject(selected.id, (obj) => ({ ...obj, strokeWidth: Number(event.target.value) }))
            }
          />
        </div>
      )}
    </aside>
  )
}
