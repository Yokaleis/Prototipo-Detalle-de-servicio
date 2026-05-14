import { useState } from 'react'
import { ArrowLeft, Phone, MapPin, AlertTriangle, Eye, Info, ChevronDown, ChevronUp, Plus, Trash2, Bell, LayoutGrid, List, Calculator } from 'lucide-react'
import RecipeSection from './RecipeSection'
import ExamenesSection from './ExamenesSection'
import DocumentosSection from './DocumentosSection'
import InfoAfiliado from './InfoAfiliadoSection'

const TAGS = ['EMD', 'OMV', 'LAB', 'EMD', 'TLD', 'CAV', 'ATZ', 'SRC', 'PHD']

export default function AtencionDetail() {
  const [activeTag, setActiveTag] = useState('PHD')
  const [cancelar, setCancelar] = useState(null)
  const [seguimiento, setSeguimiento] = useState(false)
  const [reposo, setReposo] = useState('24hrs, 48hrs, 72hrs')

  return (
    <div className="min-h-screen bg-[#fff]">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="text-xs text-gray-400 flex items-center gap-1">
          <span>Atenciones</span>
          <span>/</span>
          <span>Listado de atenciones</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Atenciones #0001122</span>
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
            <h1 className="text-2xl font-bold text-gray-800">Servicio PHD-1 #26051097175</h1>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 ml-10">
            <Phone size={13} />
            <span>0212 123 22 33</span>
            <span className="text-gray-300">·</span>
            <span>0414 123 25 33</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 ml-10">
            {TAGS.map((tag, i) => (
              <button
                key={i}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  activeTag === tag && i === TAGS.length - 1
                    ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                    : 'border-gray-300 text-gray-600 hover:border-teal-400 hover:text-teal-600'
                }`}
              >
                {tag}
              </button>
            ))}
            <button className="px-3 py-1 rounded-full text-xs font-semibold border bg-teal-600 border-teal-600 text-white shadow-sm">
              Aplicación Móvil
            </button>
          </div>
        </div>

        {/* Patient name */}
        {/* <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Laura Gutiérrez Ríos</h2>
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <MapPin size={13} className="mt-0.5 shrink-0" />
            <span>
              Avenida Francisco de Miranda, Edificio Torre Phelps, Piso 9, Oficina 9-B, Urbanización Los Ruices,
              Municipio Sucre, Zona Metropolitana de Caracas, Estado Miranda, Código Postal 1071
            </span>
          </div>
        </div> */}

        {/* Info de afiliado */}
        <InfoAfiliado/>
        {/* Recipe & medications */}
        <RecipeSection />

        {/* Examenes */}
        <ExamenesSection />

        {/* Documentos */}
        <DocumentosSection />

        {/* Reposo médico */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Reposo médico</h3>
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

        {/* Cancelación de servicio */}
        <div className="bg-white rounded-xl">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Cancelación de servicio</h3>
          <p className="text-sm text-gray-500 mb-3">¿Desea cancelar el servicio?</p>
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

        {/* Seguimiento */}
        <div className="bg-white rounded-xl">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-gray-800">Seguimiento</span>
            <button
              onClick={() => setSeguimiento(v => !v)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${seguimiento ? 'bg-teal-600' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${seguimiento ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">Active esta opción para indicar síntomas relacionados al Covid.</p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pb-8">
          <button className="px-6 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors shadow-sm">
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
