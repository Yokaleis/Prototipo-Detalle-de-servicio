import React, { useState } from 'react'
import { ArrowLeft, Phone, MapPin, AlertTriangle, Eye, Info, ChevronDown, ChevronUp, Plus, Trash2, Bell, LayoutGrid, List, Calculator } from 'lucide-react'
import InfoAfiliado from './InfoAfiliadoSection'
import RecipeSection from './RecipeSection'

export default function AtencionPHD() {
    const [activeTag, setActiveTag] = useState('EMD')
    const [cancelar, setCancelar] = useState(null)
    const [seguimiento, setSeguimiento] = useState(false)
    const [reposo, setReposo] = useState('24hrs, 48hrs, 72hrs')
    return (
        <div className="min-h-screen bg-[#fff]">

            {/* Top bar */}
            <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <div className="text-xs text-gray-400 flex items-center gap-1">
                    <span>Servicios</span>
                    <span>/</span>
                    <span>Listado de servicios</span>
                    <span>/</span>
                    <span className="text-gray-600 font-medium">Servicio PHD #23849596965</span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <List size={14} className="text-gray-500" />
                    </button>
                    <button className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <LayoutGrid size={14} className="text-gray-500" />
                    </button>
                    <button className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <Bell size={14} className="text-gray-500" />
                    </button>
                    <button className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors">
                        SAI
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">

                {/* Header */}
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <ArrowLeft size={14} className="text-gray-500" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">Servicio PHD #23849596965</h1>
                    </div>
                </div>

                {/* Info de afiliado */}
                <InfoAfiliado />

                {/* Divider */}
                <div className="border bottom-1"></div>
                {/* Recipe & medications */}
                <RecipeSection />
                {/* Divider */}
                <div className="border bottom-1"></div>
                {/* Exámenes paraclínicos */}
                <div className="grid gap-1">
                    <label className="block text-xs font-semibold text-black mb-1.5">
                        Exámenes paraclínicos
                    </label>
                    <textarea
                        type="text"
                        placeholder="Indique los exámenes aquí"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white resize-y" />
                    <span className="text-xs flex justify-end">Máximo 3000 caracteres</span>
                </div>
                {/* Divider */}
                <div className="border bottom-1"></div>

                {/* Recomendaciones médicas */}
                <div className="grid gap-1">
                    <label className="block text-xs font-semibold text-black mb-1.5">
                        Recomendaciones médicas
                    </label>
                    <textarea
                        type="text"
                        placeholder="Indique las recomendaciones aquí"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white resize-y" />
                    <span className="text-xs flex justify-end">Máximo 3000 caracteres</span>
                </div>

                {/* Referencias a especialistas */}
                <h3 className="text-base font-semibold text-gray-800">Referencias a especialistas</h3>

                {/* Especialistas selector */}
                <div>
                    <label className="block text-xs font-semibold text-black mb-1.5">Especialidades</label>
                    <div className="relative w-56">
                        <select
                            className="w-100 appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white pr-8 transition-all"
                        >
                            <option value="">Seleccione una especialidad</option>
                            <option>Gastroenterologo</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                {/* Comentarios */}
                <div className="grid gap-1">
                    <label className="block text-xs font-semibold text-black mb-1.5">
                        Comentarios
                    </label>
                    <textarea
                        type="text"
                        placeholder="Ej: 1 tableta diaria en ayunas"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white resize-y" />
                    <span className="text-xs flex justify-end">Máximo 3000 caracteres</span>
                </div>

                {/* Divider */}
                <div className="border bottom-1"></div>

                {/* Añadir servicio sucesivo */}
                <div className="bg-white rounded-xl">
                    <h3 className="text-base font-semibold text-black mb-3">Añadir servicio sucesivo</h3>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="cancelar"
                                checked={cancelar === 'si'}
                                onChange={() => setCancelar('si')}
                                className="accent-teal-600"
                            />
                            <span className="text-sm text-gray-600">Sí</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="cancelar"
                                checked={cancelar === 'no'}
                                onChange={() => setCancelar('no')}
                                className="accent-teal-600"
                            />
                            <span className="text-sm text-gray-600">No</span>
                        </label>
                    </div>
                </div>

                {/* Divider */}
                <div className="border bottom-1"></div>

                {/* Reposo médico */}
                <div className="bg-gray-100 rounded-xl border border-gray-100 shadow-sm p-5">
                    <h3 className="text-base font-semibold text-black mb-1">Reposo médico</h3>
                    <p className="text-xs text-gray-400 mb-3">Una vez guardada esta información se generará un reposo médico.</p>
                    <label className="text-xs font-medium text-gray-600 mb-1.5 block">Selecciona los días de reposo</label>
                    <div className="relative w-48">
                        <select
                            value={reposo}
                            onChange={e => setReposo(e.target.value)}
                            className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white pr-8"
                        >
                            <option>24hrs, 48hrs, 72hrs</option>
                            <option>24hrs</option>
                            <option>48hrs</option>
                            <option>72hrs</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Divider */}
                <div className="border bottom-1"></div>

                {/* Cancelación de servicio */}
                <div className="bg-white rounded-xl">
                    <h3 className="text-base font-semibold text-black mb-3">Cancelación de servicio</h3>
                    <p className="text-sm text-black mb-3">¿Desea cancelar el servicio?</p>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="cancelar"
                                checked={cancelar === 'si'}
                                onChange={() => setCancelar('si')}
                                className="accent-teal-600"
                            />
                            <span className="text-sm text-gray-600">Sí</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="cancelar"
                                checked={cancelar === 'no'}
                                onChange={() => setCancelar('no')}
                                className="accent-teal-600"
                            />
                            <span className="text-sm text-gray-600">No</span>
                        </label>
                    </div>
                </div>
                {/* Divider */}
                <div className="border bottom-1"></div>
            </div>

        </div>
    )
}
