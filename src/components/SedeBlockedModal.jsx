// ─────────────────────────────────────────────────────────────
// SedeBlockedModal.jsx
// Modal que aparece cuando el usuario intenta cambiar de sede
// teniendo medicamentos o insumos ya agregados en la lista.
// ─────────────────────────────────────────────────────────────

import { AlertTriangle, Trash2, X } from 'lucide-react'

export default function SedeBlockedModal({
  isOpen,          // boolean — controla visibilidad
  sedeActual,      // string  — nombre de la sede actualmente bloqueada
  totalItems,      // number  — cuántos ítems tiene el usuario agregados
  onClose,         // fn      — cierra el modal sin hacer nada
  onClearAndSwitch // fn      — borra todo y cambia de sede
}) {
  // No renderiza nada si el modal está cerrado
  if (!isOpen) return null

  return (
    <div
  className="fixed inset-0  z-50 flex items-center justify-center px-4"
  style={{ backgroundColor: 'rgba(15, 23, 42, 0)', backdropFilter: 'blur(0)' }}
  // Clic fuera del modal → cerrar
  onClick={onClose}
>
  {/* ── Panel del modal ── */}
  <div
    className="bg-white rounded-md shadow-2xl border-amber-400 border-2 w-full max-w-lg animate-fade-slide overflow-hidden"
    // Evita que el clic dentro del panel cierre el overlay
    onClick={e => e.stopPropagation()}
  >
    {/* ── Cabecera centrada (Relativa para posicionar la X) ── */}
    <div className="relative text-center px-6 pt-8 pb-5 flex flex-col items-center justify-center">
      
      {/* Botón de cerrar (X) - Posicionado absoluto arriba a la derecha */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-amber-100 transition-colors"
      >
        <X size={15} />
      </button>

      {/* Ícono circular centrado */}
      <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-7">
        <AlertTriangle size={45} className="text-amber-500" />
      </div>

      {/* Título principal centrado */}
      <h2 className="text-base font-bold text-gray-800 leading-snug max-w-sm">
        No puedes cambiar de sede ahora
      </h2>
    </div>

    {/* ── Cuerpo del mensaje ── */}
    <div className="px-6 py-5 space-y-4">
      {/* Explicación principal */}
      <p className="text-sm text-gray-600 leading-relaxed">
        Los medicamentos e insumos están vinculados a una sede específica para garantizar
        que ser retirados en el lugar correcto.
      </p>

      {/* Separador visual con opción destructiva */}
      <div className="">
        <p className="text-xs font-semibold text-red-600 mb-1">
          ¿Quieres cambiar de sede de todas formas?
        </p>
        <p className="text-xs text-red-400 leading-relaxed">
          Tendrás que eliminar todos los medicamentos e insumos actuales.
          Esta acción no se puede deshacer.
        </p>
      </div>
    </div>

    {/* ── Pie de acciones ── */}
    <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
      {/* Acción segura: quedarse */}
      <button
        onClick={onClose}
        className="w-full sm:w-auto px-5 py-2.5 rounded-sm border bg-gray-200 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
      >
        Mantener sede actual
      </button>

      {/* Acción destructiva: borrar y cambiar */}
      <button
        onClick={onClearAndSwitch}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors shadow-sm active:scale-95"
      >
        Eliminar todo y cambiar la sede
      </button>
    </div>
  </div>
</div>
  )
}
