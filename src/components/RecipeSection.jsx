import { useState } from 'react'
import { AlertTriangle, Eye, ChevronDown, Plus, Trash2, Calculator, Info, FileText } from 'lucide-react'

const SEDES = [
  'Sede Central - Caracas',
  'Sede Este - Miranda',
  'Sede Oeste - Carabobo',
  'Sede Norte - Vargas',
]

const PRINCIPIOS = [
  'Ibuprofeno', 'Paracetamol', 'Amoxicilina', 'Metformina',
  'Atorvastatina', 'Omeprazol', 'Losartán', 'Amlodipino'
]

const PRESENTACIONES = [
  'Tabletas', 'Cápsulas', 'Jarabe', 'Suspensión', 'Inyectable', 'Crema', 'Gotas'
]

const emptyForm = {
  principioActivo: '',
  presentacion: '',
  cantidad: '',
  indicaciones: '',
}

export default function RecipeSection() {
  const [sede, setSede] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [medicamentos, setMedicamentos] = useState([])
  const [error, setError] = useState('')

  // Otros medicamentos
  const [otroNombre, setOtroNombre] = useState('')
  const [otroIndicaciones, setOtroIndicaciones] = useState('')
  const [otroError, setOtroError] = useState('')
  const [otrosMedicamentos, setOtrosMedicamentos] = useState([])

  const sedeSelected = sede !== ''

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const handleAgregar = () => {
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
    setForm(emptyForm)
    setError('')
  }

  const handleEliminar = (id) => {
    setMedicamentos(prev => prev.filter(m => m.id !== id))
  }

  const handleAgregarOtro = () => {
    if (!otroNombre.trim()) {
      setOtroError('Por favor escribe el nombre del medicamento.')
      return
    }
    setOtrosMedicamentos(prev => [
      ...prev,
      {
        id: Date.now(),
        recipe: otroNombre.trim() + (otroIndicaciones.trim() ? ` — ${otroIndicaciones.trim()}` : ''),
        nombre: otroNombre.trim(),
        indicaciones: otroIndicaciones.trim(),
      }
    ])
    setOtroNombre('')
    setOtroIndicaciones('')
    setOtroError('')
  }

  const handleEliminarOtro = (id) => {
    setOtrosMedicamentos(prev => prev.filter(m => m.id !== id))
  }

  return (
    <section className="bg-white rounded-xl">
      {/* Section header */}
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-base font-semibold text-gray-800">Récipe y medicamentos</h3>
        <button className="flex items-center gap-1.5 text-xs font-medium text-teal-600 border border-teal-200 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors">
          <Calculator size={13} />
          Calcular dosis
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Exclusiones warning */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-red-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-600">Consulte las exclusiones médicas para este paciente</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
            <Eye size={13} />
            Ver resumen
          </button>
        </div>

        {/* Sede selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Sede</label>
          <div className="relative w-56">
            <select
              value={sede}
              onChange={e => setSede(e.target.value)}
              className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white pr-8 transition-all"
            >
              <option value="">Sede</option>
              {SEDES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Info hint when no sede selected */}
        {!sedeSelected && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
            <Info size={16} className="text-emerald-500 mt-0.5 shrink-0" />
            <p className="text-xs text-emerald-700 leading-relaxed">
              Antes de continuar con los medicamentos, selecciona primero la sede así aseguramos que los afiliados puedan retirar sus medicamentos en la ubicación correcta.
            </p>
          </div>
        )}

        {/* Medication form - appears when sede is selected */}
        {sedeSelected && (
          <div className="animate-fade-slide space-y-4">
            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Principio activo */}
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
                    {PRINCIPIOS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Presentación */}
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
                    {PRESENTACIONES.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Cantidad */}
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

              {/* Indicaciones */}
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

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 font-medium">{error}</p>
            )}

            {/* Agregar button */}
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

        {/* Medication list table */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Listado de medicamentos</h4>
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Compuesto activo
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Medicamento
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">
                    Cantidad
                  </th>
                  <th className="w-12 px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {medicamentos.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-sm text-gray-400 italic">
                      Agregue un medicamento al listado
                    </td>
                  </tr>
                ) : (
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

        {/* Insumos/Equipo table */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Listado de insumos</h4>
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Equipo
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">
                    Cantidad
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2} className="text-center py-8 text-sm text-gray-400 italic">
                    Añada un insumo a la lista
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Otros medicamentos ── visible only when sede is selected */}
        {sedeSelected && (
          <div className="animate-fade-slide space-y-4 pt-2 border-t border-gray-100">
            {/* Header */}
            <div className="flex items-center gap-2 pt-1">
              <FileText size={15} className="text-teal-600" />
              <h4 className="text-sm font-semibold text-gray-800">Otros medicamentos</h4>
            </div>

            {/* Nombre del medicamento */}
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

            {/* Indicaciones */}
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

            {/* Error */}
            {otroError && (
              <p className="text-xs text-red-500 font-medium">{otroError}</p>
            )}

            {/* Agregar button */}
            <div className="flex justify-end">
              <button
                onClick={handleAgregarOtro}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm active:scale-95"
              >
                <Plus size={15} />
                Agregar
              </button>
            </div>

            {/* Listado otros medicamentos */}
            <div>
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Récipe
                      </th>
                      <th className="w-12 px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {otrosMedicamentos.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="text-center py-8 text-sm text-gray-400 italic">
                          Agregue un medicamento al listado
                        </td>
                      </tr>
                    ) : (
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
  )
}
