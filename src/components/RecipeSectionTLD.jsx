import { useState, useRef } from 'react'
import {
    AlertTriangle, Eye, ChevronDown, Plus,
    Trash2, Calculator, Info, FileText
} from 'lucide-react'
import SedeBlockedModal from './SedeBlockedModal'

// ── Constantes de datos ──────────────────────────────────────

const SEDES = [
    'Caracas',
    'La Candelaria',
    'Lechería',
    'Valencia',
    'Maracay',
    'Maracaibo'
]

// Catálogo de insumos/equipo médico disponibles para seleccionar
const INSUMOS = [
    'Tensiómetro', 'Oxímetro de pulso', 'Glucómetro', 'Estetoscopio',
    'Termómetro digital', 'Nebulizador', 'Silla de ruedas', 'Muletas',
    'Camilla portátil', 'Desfibrilador portátil', 'Bomba de infusión',
    'Monitor de signos vitales',
]

// Estado vacío del formulario de medicamentos
const emptyForm = {
    principioActivo: '',
    presentacion: '',
    cantidad: '',
    indicaciones: '',
}

export default function RecipeSectionTLD() {

    // ── Estado: Sede ──
    const [sede, setSede] = useState('')
    // Guarda temporalmente la nueva sede mientras el modal está abierto
    const pendingSedeRef = useRef('')

    // ── Estado: Modal de bloqueo de sede ──
    const [modalOpen, setModalOpen] = useState(false)

    // ── Estado: Formulario de medicamentos ──
    const [form, setForm] = useState(emptyForm)
    const [error, setError] = useState('')
    const [otroError, setOtroError] = useState('')

    // ── Estado: Formulario de insumos/equipo ──
    const [insumoSeleccionado, setInsumoSeleccionado] = useState('')
    const [insumoCantidad, setInsumoCantidad] = useState('')
    const [insumoError, setInsumoError] = useState('')

    // ── Estado: Listado de insumos agregados ──
    const [insumos, setInsumos] = useState([])

    // ── Computed ──────────────────────────────────────────────

    // ¿Hay alguna sede seleccionada?
    const sedeSelected = sede !== ''

    // Total de ítems agregados (medicamentos + otros medicamentos + insumos)
    // Se usa para mostrar cuántos tiene el usuario en el modal
    const totalItems = insumos.length

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

        setForm(emptyForm)          // limpiar formulario
        setError('')
        setOtroError('')
        setInsumoError('')
        setInsumoSeleccionado('')
        setInsumoCantidad('')
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


    // ── Handlers: Insumos/equipo ──────────────────────────────

    /**
     * handleAgregarInsumo
     * Valida y agrega un insumo al listado de equipo.
     */
    const handleAgregarInsumo = () => {
        if (!insumoSeleccionado) {
            setInsumoError('Selecciona un insumo antes de agregar.')
            return
        }
        if (!insumoCantidad || Number(insumoCantidad) < 1) {
            setInsumoError('Indica una cantidad válida.')
            return
        }
        setInsumos(prev => [
            ...prev,
            {
                id: Date.now(),
                equipo: insumoSeleccionado,
                cantidad: insumoCantidad,
            },
        ])
        // Resetear formulario de insumos
        setInsumoSeleccionado('')
        setInsumoCantidad('')
        setInsumoError('')
    }

    /** Elimina un insumo del listado por id */
    const handleEliminarInsumo = (id) => {
        setInsumos(prev => prev.filter(i => i.id !== id))
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
            <section>

                {/* ── Cabecera de sección ── */}
                <div className="flex items-center justify-between ">
                    <h3 className="text-base font-semibold text-black">Insumos médicos</h3>
                </div>

                <div className="p-5 space-y-5">

                    {/* ── Alerta de exclusiones médicas ── */}
                    <div className="bg-red-50 border border-red-100 rounded-md p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-md bg-red-100 flex items-center justify-center shrink-0">
                            <AlertTriangle size={18} className="text-red-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-red-600">
                                Consulte las exclusiones médicas para este paciente
                            </p>
                        </div>
                        <button className="flex items-center gap-1.5 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm transition-colors whitespace-nowrap">
                            <Eye size={13} />
                            Ver resumen
                        </button>
                    </div>

                    {/* ── Selector de sede ──────────────────────────────
              onChange → handleSedeChange que gestiona el bloqueo.
              Si hay ítems y el usuario cambia, abre el modal. */}
                    <div>
                        <label className="block text-xs font-semibold text-black mb-1.5">Sede</label>
                        <div className="relative w-56">
                            <select
                                value={sede}
                                onChange={handleSedeChange}
                                className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white pr-8 transition-all"
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
                        <div className="bg-emerald-50 border border-emerald-100 rounded-md p-4 flex items-start gap-3">
                            <Info size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                            <p className="text-xs text-emerald-700 leading-relaxed">
                                Antes de continuar con los medicamentos, selecciona primero la sede
                                así aseguramos que los afiliados puedan retirar sus medicamentos
                                en la ubicación correcta.
                            </p>
                        </div>
                    )}


                    {/* ── Insumos/equipo: formulario + tabla ───────────────
              El formulario (select + cantidad + botón) aparece
              sólo cuando hay sede seleccionada, igual que el
              formulario de medicamentos. La tabla siempre se
              muestra para que el usuario vea el listado. */}
                    <div>


                        {/* ── Formulario de insumos: visible con sede seleccionada ── */}
                        {sedeSelected && (
                            <div className="animate-fade-slide">
                                <h3 className="text-base font-semibold text-black mb-2">Insumos médicos</h3>

                                {/* ── Formulario de insumos ── */}
                                <div className="mb-4 space-y-3">
                                    <div className="flex flex-col sm:flex-row gap-3 items-end">
                                        {/* Select: insumo/equipo */}
                                        <div className="flex-1">
                                            <label className="block text-xs font-semibold text-black mb-1.5">
                                                Insumo / Equipo <span className="text-red-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={insumoSeleccionado}
                                                    onChange={e => { setInsumoSeleccionado(e.target.value); if (insumoError) setInsumoError('') }}
                                                    className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white pr-8 transition-all"
                                                >
                                                    <option value="">Seleccionar insumo</option>
                                                    {INSUMOS.map(ins => (
                                                        <option key={ins} value={ins}>{ins}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Input: cantidad */}
                                        <div className="w-full sm:w-28">
                                            <label className="block text-xs font-semibold text-black mb-1.5">
                                                Cantidad <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={insumoCantidad}
                                                onChange={e => { setInsumoCantidad(e.target.value); if (insumoError) setInsumoError('') }}
                                                placeholder="Ej: 2"
                                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition-all"
                                            />
                                        </div>

                                        {/* Botón agregar insumo */}
                                        <button
                                            onClick={handleAgregarInsumo}
                                            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm active:scale-95 whitespace-nowrap"
                                        >
                                            Agregar
                                        </button>
                                    </div>

                                    {/* Error de validación de insumos */}
                                    {insumoError && (
                                        <p className="text-xs text-red-500 font-medium">{insumoError}</p>
                                    )}
                                </div>

                                {/* ── Tabla de insumos agregados ── */}
                                <h4 className="text-sm font-semibold text-black mb-3">Listado de insumos</h4>
                                <div className="border border-gray-100 rounded-xl overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100">
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-black uppercase tracking-wide">Equipo</th>
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-black uppercase tracking-wide w-24">Cantidad</th>
                                                <th className="w-12 px-4 py-3" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {insumos.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3} className="text-center py-8 text-sm text-gray-400 italic">
                                                        Añada un insumo a la lista
                                                    </td>
                                                </tr>
                                            ) : (
                                                insumos.map((ins, idx) => (
                                                    <tr
                                                        key={ins.id}
                                                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors animate-fade-slide ${idx === insumos.length - 1 ? 'border-b-0' : ''}`}
                                                    >
                                                        <td className="px-4 py-3 text-black font-medium">{ins.equipo}</td>
                                                        <td className="px-4 py-3 text-black">{ins.cantidad}</td>
                                                        <td className="px-4 py-3">
                                                            <button
                                                                onClick={() => handleEliminarInsumo(ins.id)}
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
                        )}


                    </div>
                </div>
            </section>
        </>
    )
}

