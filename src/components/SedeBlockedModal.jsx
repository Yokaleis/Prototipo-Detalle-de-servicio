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
    // ── Overlay oscuro con blur suave ──
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(2px)' }}
      // Clic fuera del modal → cerrar
      onClick={onClose}
    >
      {/* ── Panel del modal ── */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-slide overflow-hidden"
        // Evita que el clic dentro del panel cierre el overlay
        onClick={e => e.stopPropagation()}
      >
        {/* ── Cabecera con ícono de advertencia ── */}
        <div className="bg-amber-50 px-6 pt-6 pb-5 flex items-start gap-4">
          {/* Ícono circular */}
          <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle size={20} className="text-amber-500" />
          </div>

          <div className="flex-1">
            {/* Título principal */}
            <h2 className="text-base font-bold text-gray-800 leading-snug">
              No puedes cambiar de sede ahora
            </h2>
            {/* Subtítulo con contexto */}
            <p className="text-xs text-amber-700 font-medium mt-1">
              Tienes {totalItems} {totalItems === 1 ? 'ítem agregado' : 'ítems agregados'} en{' '}
              <span className="font-bold">{sedeActual}</span>
            </p>
          </div>

          {/* Botón de cerrar (X) */}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-amber-100 transition-colors"
          >
            <X size={15} />
          </button>
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
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Mantener sede actual
          </button>

          {/* Acción destructiva: borrar y cambiar */}
          <button
            onClick={onClearAndSwitch}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors shadow-sm active:scale-95"
          >
            Eliminar todo y cambiar la sede
          </button>
        </div>
      </div>
    </div>
  )
}
