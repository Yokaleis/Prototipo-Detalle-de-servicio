import { useState } from 'react'
import { AlertTriangle, Eye, ChevronDown, Plus, Trash2, Calculator, Info, FileText, Send, Pencil, } from 'lucide-react'



/* export default function InfoAfiliadoSection() {
  return (
<section className="bg-white rounded-xl">
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-base font-semibold text-gray-800">Información de Afiliado</h3>
      </div> 
      
      </section>  )
}
 */


// ── Readonly field ────────────────────────────────────────────
function ReadField({ label, value, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
      )}
      <div className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white min-h-[40px] flex items-center">
        {value}
      </div>
    </div>
  )
}

// ── Dropdown field ────────────────────────────────────────────
function SelectField({ label, options, value, onChange }) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white pr-8 transition-all"
        >
          {options.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────
export default function InfoAfiliado() {
  const [email, setEmail] = useState('laurarios77@gmail.com')
  const [editingEmail, setEditingEmail] = useState(false)
  const [editingDir, setEditingDir] = useState(false)
  const [direccion, setDireccion] = useState('Avenida Francisco de Miranda, Edificio Torre Phelps, Piso 9, Oficina 9-B, Urbanización Los Ruices, Municipio Sucre, Zona Metropolitana de Caracas, Estado Miranda, Código Postal 1071')

  // Tripulación
  const [vehiculo, setVehiculo]     = useState('AlfaAmbulancia24')
  const [medico, setMedico]         = useState('Marcos Isaac Flores')
  const [tripulante, setTripulante] = useState('Andreína Farias')
  const [conductor, setConductor]   = useState('Carlos Quintero')

  const vehiculos   = ['AlfaAmbulancia24', 'AlfaAmbulancia12', 'BetaUnidad08', 'GammaMovil03']
  const medicos     = ['Marcos Isaac Flores', 'Ana Sofía Rojas', 'Luis Emilio Peña', 'Carmen Díaz']
  const tripulantes = ['Andreína Farias', 'José Ramírez', 'Mariela Torres', 'Pedro González']
  const conductores = ['Carlos Quintero', 'Roberto Medina', 'Yolanda Soto', 'Edwin Fuentes']

  return (
    <section className="bg-white rounded-xl overflow-hidden">

      {/* ── Section title ── */}
      <div className="px-5 py-4">
        <h3 className="text-base font-semibold text-gray-800">Información del afiliado</h3>
      </div>

      <div className="p-5 space-y-5">

        {/* Row 1: Nombre · Sexo · Cédula · Fecha nacimiento · Edad */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4">
            <ReadField label="Nombres y Apellidos" value="Laura Gutiérrez Ríos" />
          </div>
          <div className="col-span-2">
            <ReadField label="Sexo" value="Femenino" />
          </div>
          <div className="col-span-2">
            <ReadField label="Cédula de identidad" value="20398456" />
          </div>
          <div className="col-span-2">
            <ReadField label="Fecha de nacimiento" value="01/02/1989" />
          </div>
          <div className="col-span-2">
            <ReadField label="Edad" value="36" />
          </div>
        </div>

        {/* Row 2: Plan · Banner póliza */}
        <div className="grid grid-cols-12 gap-3 items-start">
          <div className="col-span-3">
            <ReadField label="Plan" value="PSEM" />
          </div>
          <div className="col-span-9">
            <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 flex items-center gap-4">
              <p className="flex-1 text-sm font-semibold text-red-500">
                Consulte las Condiciones de la Póliza
              </p>
              <button className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                <Eye size={13} />
                Ver condiciones
              </button>
            </div>
          </div>
        </div>

        {/* Ramo / Contratante */}
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Ramo:</span> Accidentes Personales Colectivos
          <span className="mx-3 text-gray-300">|</span>
          <span className="font-semibold">Contratante:</span> Grupo Venemergencia
        </p>

        {/* Row 3: Teléfono · Teléfono · Email + reenviar */}
        <div className="grid grid-cols-12 gap-3 items-end">
          <div className="col-span-3">
            <ReadField label="Teléfono" value="04123564544" />
          </div>
          <div className="col-span-3">
            <ReadField label="Teléfono" value="02123456768" />
          </div>
          <div className="col-span-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
              Correo electrónico
              <button
                onClick={() => setEditingEmail(v => !v)}
                className="ml-1 text-gray-400 hover:text-teal-600 transition-colors"
              >
                <Pencil size={11} />
              </button>
            </label>
            {editingEmail ? (
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setEditingEmail(false)}
                autoFocus
                className="w-full border border-teal-400 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition-all"
              />
            ) : (
              <div className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white">
                {email}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <button className="w-full flex items-center justify-center gap-1.5 border border-teal-500 text-teal-600 hover:bg-teal-50 text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors">
              <Send size={12} />
              Reenviar informe
            </button>
          </div>
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
            Dirección
            <button
              onClick={() => setEditingDir(v => !v)}
              className="ml-1 text-gray-400 hover:text-teal-600 transition-colors"
            >
              <Pencil size={11} />
            </button>
          </label>
          {editingDir ? (
            <input
              type="text"
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
              onBlur={() => setEditingDir(false)}
              autoFocus
              className="w-full border border-teal-400 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
            />
          ) : (
            <div className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 bg-white">
              {direccion}
            </div>
          )}
        </div>

        {/* Sede */}
        <div className="w-48">
          <ReadField label="Sede" value="UC - Acarigua" />
        </div>

        {/* ── Tripulación ── */}
        <div className="pt-3 border-t border-gray-100">
          <h4 className="text-base font-semibold text-gray-800 mb-4">Tripulación</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SelectField
              label="Vehículo"
              options={vehiculos}
              value={vehiculo}
              onChange={setVehiculo}
            />
            <SelectField
              label="Médico"
              options={medicos}
              value={medico}
              onChange={setMedico}
            />
            <SelectField
              label="Tripulante"
              options={tripulantes}
              value={tripulante}
              onChange={setTripulante}
            />
            <SelectField
              label="Conductor"
              options={conductores}
              value={conductor}
              onChange={setConductor}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
