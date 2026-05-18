import React from 'react'
import { ArrowLeft, Phone, MapPin, AlertTriangle, Eye, Info, ChevronDown, ChevronUp, Plus, Trash2, Bell, LayoutGrid, List, Calculator } from 'lucide-react'

export default function AtencionTLD() {
  return (
    <div className="min-h-screen bg-[#fff]">

            {/* Top bar */}
            <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <div className="text-xs text-gray-400 flex items-center gap-1">
                    <span>Servicios</span>
                    <span>/</span>
                    <span>Listado de servicios</span>
                    <span>/</span>
                    <span className="text-gray-600 font-medium">Servicio TLD #132849596050</span>
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
                        <h1 className="text-2xl font-bold text-gray-800">Servicio TLD #132849596050</h1>
                    </div>
                </div>
            </div>

        </div>
  )
}
