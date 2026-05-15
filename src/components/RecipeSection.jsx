// ─────────────────────────────────────────────────────────────
// RecipeSection.jsx
// Sección principal de Récipe y medicamentos.
// Contiene:
//   - Alerta de exclusiones médicas
//   - Selector de sede (con validación de bloqueo)
//   - Formulario de medicamentos (visible al seleccionar sede)
//   - Tabla de medicamentos agregados
//   - Tabla de insumos/equipo
//   - Sección de Otros medicamentos
//   - Modal SedeBlockedModal (se activa al intentar cambiar sede con ítems)
// ─────────────────────────────────────────────────────────────

import { useState, useRef } from 'react'
import {
  AlertTriangle, Eye, ChevronDown, Plus,
  Trash2, Calculator, Info, FileText
} from 'lucide-react'
import SedeBlockedModal from './SedeBlockedModal'

// ── Constantes de datos ──────────────────────────────────────

const SEDES = [
  'Sede Central - Caracas',
  'Sede Este - Miranda',
  'Sede Oeste - Carabobo',
  'Sede Norte - Vargas',
]

const PRINCIPIOS = [
  'Ibuprofeno', 'Paracetamol', 'Amoxicilina', 'Metformina',
  'Atorvastatina', 'Omeprazol', 'Losartán', 'Amlodipino',
]

const PRESENTACIONES = [
  'Tabletas', 'Cápsulas', 'Jarabe', 'Suspensión',
  'Inyectable', 'Crema', 'Gotas',
]

// Estado vacío del formulario de medicamentos
const emptyForm = {
  principioActivo: '',
  presentacion: '',
  cantidad: '',
  indicaciones: '',
}

// ── Componente principal ─────────────────────────────────────

export default function RecipeSection() {

  // ── Estado: Sede ──
  const [sede, setSede]                   = useState('')
  // Guarda temporalmente la nueva sede mientras el modal está abierto
  const pendingSedeRef                    = useRef('')

  // ── Estado: Modal de bloqueo de sede ──
  const [modalOpen, setModalOpen]         = useState(false)

  // ── Estado: Formulario de medicamentos ──
  const [form, setForm]                   = useState(emptyForm)
  const [error, setError]                 = useState('')

  // ── Estado: Listado de medicamentos ──
  const [medicamentos, setMedicamentos]   = useState([])

  // ── Estado: Sección "Otros medicamentos" ──
  const [otroNombre, setOtroNombre]               = useState('')
  const [otroIndicaciones, setOtroIndicaciones]   = useState('')
  const [otroError, setOtroError]                 = useState('')
  const [otrosMedicamentos, setOtrosMedicamentos] = useState([])

  // ── Computed ──────────────────────────────────────────────

  // ¿Hay alguna sede seleccionada?
  const sedeSelected = sede !== ''

  // Total de ítems agregados (medicamentos + otros medicamentos)
  // Se usa para mostrar cuántos tiene el usuario en el modal
  const totalItems = medicamentos.length + otrosMedicamentos.length

  // ── Handlers: Sede ───────────────────────────────────────

  /**
   * handleSedeChange
   * Se dispara cuando el usuario intenta cambiar de sede.
   * Si ya hay ítems agregados → abre el modal de advertencia.
   * Si no hay ítems → cambia directamente.
   */
  const handleSedeChange = (e) => {
    const nuevaSede = e.target.value

    // Si no hay cambio real, ignorar
    if (nuevaSede === sede) return

    // Si hay ítems y el usuario ya tenía una sede → bloquear con modal
    if (totalItems > 0 && sede !== '') {
      pendingSedeRef.current = nuevaSede // guardar la sede que quería elegir
      setModalOpen(true)                 // abrir modal
      return
    }

    // Sin ítems: cambio libre
    setSede(nuevaSede)
  }

  /**
   * handleModalClose
   * El usuario decide mantener la sede actual.
   * Cierra el modal sin hacer ningún cambio.
   */
  const handleModalClose = () => {
    pendingSedeRef.current = ''
    setModalOpen(false)
  }

  /**
   * handleClearAndSwitch
   * El usuario acepta borrar todo y cambiar de sede.
   * Limpia todos los listados y aplica la sede pendiente.
   */
  const handleClearAndSwitch = () => {
    setMedicamentos([])         // borrar listado de medicamentos
    setOtrosMedicamentos([])    // borrar listado de otros medicamentos
    setForm(emptyForm)          // limpiar formulario
    setError('')
    setOtroError('')
    setSede(pendingSedeRef.current) // aplicar la nueva sede
    pendingSedeRef.current = ''
    setModalOpen(false)
  }

  // ── Handlers: Formulario medicamentos ────────────────────

  /** Actualiza un campo del formulario y limpia el error */
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  /**
   * handleAgregar
   * Valida y agrega un medicamento a la tabla.
   */
  const handleAgregar = () => {
    // Validación de campos obligatorios
    if (!form.principioActivo || !form.presentacion || !form.cantidad) {
      setError('Por favor completa Principio activo, Presentación y Cantidad.')
      return
    }
    const med = {
      id: Date.now(),
      compuestoActivo: form.principioActivo,
      medicamento: `${form.principioActivo} ${form.presentacion}`,
      cantidad: form.cantidad,
      indicaciones: form.indicaciones,
    }
    setMedicamentos(prev => [...prev, med])
    setForm(emptyForm) // resetear formulario
    setError('')
  }

  /** Elimina un medicamento del listado por id */
  const handleEliminar = (id) => {
    setMedicamentos(prev => prev.filter(m => m.id !== id))
  }

  // ── Handlers: Otros medicamentos ─────────────────────────

  /**
   * handleAgregarOtro
   * Valida y agrega un ítem a la tabla de Otros medicamentos.
   */
  const handleAgregarOtro = () => {
    if (!otroNombre.trim()) {
      setOtroError('Por favor escribe el nombre del medicamento.')
      return
    }
    setOtrosMedicamentos(prev => [
      ...prev,
      {
        id: Date.now(),
        nombre: otroNombre.trim(),
        indicaciones: otroIndicaciones.trim(),
      },
    ])
    setOtroNombre('')
    setOtroIndicaciones('')
    setOtroError('')
  }

  /** Elimina un ítem de otros medicamentos por id */
  const handleEliminarOtro = (id) => {
    setOtrosMedicamentos(prev => prev.filter(m => m.id !== id))
  }

  // ── Render ───────────────────────────────────────────────

  return (
    <>
      {/* ── Modal de bloqueo de sede ──────────────────────────
          Se monta siempre pero sólo es visible cuando modalOpen=true.
          Está fuera del <section> para que el z-index funcione bien. */}
      <SedeBlockedModal
        isOpen={modalOpen}
        sedeActual={sede}
        totalItems={totalItems}
        onClose={handleModalClose}
        onClearAndSwitch={handleClearAndSwitch}
      />

      {/* ── Sección principal ─────────────────────────────── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm">

        {/* ── Cabecera de sección ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">Récipe y medicamentos</h3>
          <button className="flex items-center gap-1.5 text-xs font-medium text-teal-600 border border-teal-200 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors">
            <Calculator size={13} />
            Calcular dosis
          </button>
        </div>

        <div className="p-5 space-y-5">

          {/* ── Alerta de exclusiones médicas ── */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle size={18} className="text-red-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-600">
                Consulte las exclusiones médicas para este paciente
              </p>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
              <Eye size={13} />
              Ver resumen
            </button>
          </div>

          {/* ── Selector de sede ──────────────────────────────
              onChange → handleSedeChange que gestiona el bloqueo.
              Si hay ítems y el usuario cambia, abre el modal. */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Sede</label>
            <div className="relative w-56">
              <select
                value={sede}
                onChange={handleSedeChange}
                className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white pr-8 transition-all"
              >
                <option value="">Sede</option>
                {SEDES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Chip que muestra cuántos ítems tiene la sede actual
                Solo visible cuando hay sede Y hay ítems agregados */}
            {sedeSelected && totalItems > 0 && (
              <p className="mt-2 text-xs text-teal-600 font-medium animate-fade-slide">
                🔒 {totalItems} {totalItems === 1 ? 'ítem vinculado' : 'ítems vinculados'} a esta sede
              </p>
            )}
          </div>

          {/* ── Hint informativo cuando NO hay sede seleccionada ── */}
          {!sedeSelected && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
              <Info size={16} className="text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-xs text-emerald-700 leading-relaxed">
                Antes de continuar con los medicamentos, selecciona primero la sede
                así aseguramos que los afiliados puedan retirar sus medicamentos
                en la ubicación correcta.
              </p>
            </div>
          )}

          {/* ── Formulario de medicamentos ────────────────────
              Solo visible cuando se ha seleccionado una sede */}
          {sedeSelected && (
            <div className="animate-fade-slide space-y-4">

              {/* Grid de campos del formulario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Campo: Principio activo */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Principio activo <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.principioActivo}
                      onChange={e => handleChange('principioActivo', e.target.value)}
                      className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white pr-8 transition-all"
                    >
                      <option value="">Seleccionar principio activo</option>
                      {PRINCIPIOS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Campo: Presentación */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Presentación <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.presentacion}
                      onChange={e => handleChange('presentacion', e.target.value)}
                      className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white pr-8 transition-all"
                    >
                      <option value="">Seleccionar presentación</option>
                      {PRESENTACIONES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Campo: Cantidad */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Cantidad <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.cantidad}
                    onChange={e => handleChange('cantidad', e.target.value)}
                    placeholder="Ej: 30"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition-all"
                  />
                </div>

                {/* Campo: Indicaciones */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Indicaciones
                  </label>
                  <input
                    type="text"
                    value={form.indicaciones}
                    onChange={e => handleChange('indicaciones', e.target.value)}
                    placeholder="Ej: 1 tableta cada 8 horas"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition-all"
                  />
                </div>
              </div>

              {/* Mensaje de error del formulario */}
              {error && (
                <p className="text-xs text-red-500 font-medium">{error}</p>
              )}

              {/* Botón Agregar medicamento */}
              <div className="flex justify-end">
                <button
                  onClick={handleAgregar}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm active:scale-95"
                >
                  <Plus size={15} />
                  Agregar
                </button>
              </div>
            </div>
          )}

          {/* ── Tabla: Listado de medicamentos ── */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Listado de medicamentos</h4>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Compuesto activo</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Medicamento</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">Cantidad</th>
                    <th className="w-12 px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {/* Estado vacío */}
                  {medicamentos.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-sm text-gray-400 italic">
                        Agregue un medicamento al listado
                      </td>
                    </tr>
                  ) : (
                    // Fila por cada medicamento agregado
                    medicamentos.map((med, idx) => (
                      <tr
                        key={med.id}
                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors animate-fade-slide ${idx === medicamentos.length - 1 ? 'border-b-0' : ''}`}
                      >
                        <td className="px-4 py-3 text-gray-700 font-medium">{med.compuestoActivo}</td>
                        <td className="px-4 py-3 text-gray-600">
                          <div>{med.medicamento}</div>
                          {med.indicaciones && (
                            <div className="text-xs text-gray-400 mt-0.5">{med.indicaciones}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{med.cantidad}</td>
                        <td className="px-4 py-3">
                          {/* Botón eliminar fila */}
                          <button
                            onClick={() => handleEliminar(med.id)}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Tabla: Listado de insumos/equipo ── */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Listado de insumos</h4>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Equipo</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Estado vacío estático (sin funcionalidad de agregar por ahora) */}
                  <tr>
                    <td colSpan={2} className="text-center py-8 text-sm text-gray-400 italic">
                      Añada un insumo a la lista
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Sección: Otros medicamentos ───────────────────
              Aparece sólo cuando hay una sede seleccionada,
              igual que el formulario principal. */}
          {sedeSelected && (
            <div className="animate-fade-slide space-y-4 pt-2 border-t border-gray-100">

              {/* Encabezado de la sección */}
              <div className="flex items-center gap-2 pt-1">
                <h4 className="text-sm font-semibold text-gray-800">Otros medicamentos</h4>
              </div>

              {/* Campo: Nombre del medicamento */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Nombre del medicamento <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={otroNombre}
                  onChange={e => { setOtroNombre(e.target.value); if (otroError) setOtroError('') }}
                  placeholder="Ej: Vitamina C 500mg"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition-all"
                />
              </div>

              {/* Campo: Indicaciones del otro medicamento */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Indicaciones
                </label>
                <input
                  type="text"
                  value={otroIndicaciones}
                  onChange={e => setOtroIndicaciones(e.target.value)}
                  placeholder="Ej: 1 tableta diaria en ayunas"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition-all"
                />
              </div>

              {/* Error de validación de otros medicamentos */}
              {otroError && (
                <p className="text-xs text-red-500 font-medium">{otroError}</p>
              )}

              {/* Botón Agregar otro medicamento */}
              <div className="flex justify-end">
                <button
                  onClick={handleAgregarOtro}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm active:scale-95"
                >
                  <Plus size={15} />
                  Agregar
                </button>
              </div>

              {/* Tabla: Récipe de otros medicamentos */}
              <div>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Récipe</th>
                        <th className="w-12 px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {/* Estado vacío */}
                      {otrosMedicamentos.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="text-center py-8 text-sm text-gray-400 italic">
                            Agregue un medicamento al listado
                          </td>
                        </tr>
                      ) : (
                        // Fila por cada otro medicamento
                        otrosMedicamentos.map((med, idx) => (
                          <tr
                            key={med.id}
                            className={`border-b border-gray-50 hover:bg-gray-50 transition-colors animate-fade-slide ${idx === otrosMedicamentos.length - 1 ? 'border-b-0' : ''}`}
                          >
                            <td className="px-4 py-3">
                              <div className="text-gray-700 font-medium">{med.nombre}</div>
                              {med.indicaciones && (
                                <div className="text-xs text-gray-400 mt-0.5">{med.indicaciones}</div>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {/* Botón eliminar fila */}
                              <button
                                onClick={() => handleEliminarOtro(med.id)}
                                className="w-7 h-7 rounded-md flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
