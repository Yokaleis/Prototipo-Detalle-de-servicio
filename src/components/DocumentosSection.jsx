import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function DocumentosSection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(v => !v)}
      >
        <h3 className="text-base font-semibold text-gray-800">Documentos adjuntos</h3>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && (
        <div className="px-5 pb-5 animate-fade-slide">
          <p className="text-sm text-gray-400 italic">No hay documentos adjuntos.</p>
        </div>
      )}
    </section>
  )
}
