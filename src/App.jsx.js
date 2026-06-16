import React, { useState } from 'react';

// --- BASE DE DATOS DE COMIDAS (Basada en tus instrucciones) ---
const MENU_OPTIONS = {
  desayuno: [
    "Fruta fresca (Sandía, melón, uva) + Yogur natural",
    "Tostada + Queso + Leche entera (Avena papá)",
    "Plátano + Manzana + Vasito de Leche",
    "Fruta picada (Arándanos, albaricoques) + Babybel"
  ],
  comida: [
    "Arroz con verduras y pollo a la plancha",
    "Lentejas con verduras + Ensalada",
    "Sopa de fideos + Pescado al vapor",
    "Crema de verduras + Carne a la plancha",
    "Ensalada completa + Garbanzos"
  ],
  merienda: [
    "Fruta variada (Pera, manzana, plátano)",
    "Bocadillito de fuet + Arándanos",
    "Bocadillito de jamón serrano",
    "Yogur natural + Uva",
    "Queso Babybel + Albaricoques"
  ],
  cena: [
    "Crema de verduras (calabacín/zanahoria) + Pescado plancha",
    "Sopa suave + Tortilla y ensalada de tomate",
    "Verdura al vapor (brócoli/judías) + Pescado al vapor",
    "Ensalada ligera + Carne magra"
  ]
};

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function FamilyMenuPWA() {
  const [tipoDia, setTipoDia] = useState('laborable'); // 'laborable' o 'finde'
  const [menus, setMenus] = useState({});

  // Manejar cambio manual en los desplegables
  const handleSelectChange = (dia, comida, valor) => {
    setMenus(prev => ({
      ...prev,
      [dia]: { ...prev[dia], [comida]: valor }
    }));
  };

  // NUEVA FUNCIÓN: Autocompletar aleatoriamente los días que se muestran en pantalla
  const handleRandomAutofill = () => {
    const diasAModificar = tipoDia === 'laborable' ? DIAS.slice(0, 5) : DIAS.slice(5, 7);
    const nuevoMenu = { ...menus };

    diasAModificar.forEach(dia => {
      nuevoMenu[dia] = {};
      ['desayuno', 'comida', 'merienda', 'cena'].forEach(comida => {
        const opciones = MENU_OPTIONS[comida];
        const indiceAleatorio = Math.floor(Math.random() * opciones.length);
        nuevoMenu[dia][comida] = opciones[indiceAleatorio];
      });
    });

    setMenus(nuevoMenu);
  };

  // Limpiar el menú de los días que están visibles
  const handleClearMenu = () => {
    const diasAModificar = tipoDia === 'laborable' ? DIAS.slice(0, 5) : DIAS.slice(5, 7);
    const nuevoMenu = { ...menus };
    diasAModificar.forEach(dia => {
      nuevoMenu[dia] = { desayuno: "", comida: "", merienda: "", cena: "" };
    });
    setMenus(nuevoMenu);
  };

  const diasAMostrar = tipoDia === 'laborable' ? DIAS.slice(0, 5) : DIAS.slice(5, 7);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 font-sans">
      <header className="max-w-4xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-bold text-emerald-600 mb-2">🍽️ Menú Familiar Inteligente</h1>
        <p className="text-sm text-slate-500">2 Adultos y 2 peques (5 y 2 años) • Dieta Mediterránea</p>
      </header>

      {/* Selectores de Bloque de Días (Laborables vs Fin de semana) */}
      <div className="max-w-4xl mx-auto mb-4 flex justify-center gap-3">
        <button 
          onClick={() => setTipoDia('laborable')}
          className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all ${tipoDia === 'laborable' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}
        >
          📅 Días Laborables
        </button>
        <button 
          onClick={() => setTipoDia('finde')}
          className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all ${tipoDia === 'finde' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}
        >
          🎉 Fin de Semana
        </button>
      </div>

      {/* Botones de acción rápida sin teclado */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-center gap-3">
        <button 
          onClick={handleRandomAutofill}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
        >
          🎲 ¡Sugerir Menú Aleatorio!
        </button>
        <button 
          onClick={handleClearMenu}
          className="bg-slate-300 hover:bg-slate-400 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
        >
          🗑️ Limpiar
        </button>
      </div>

      {/* Grid de tarjetas por día (Responsive para móvil y tablet) */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {diasAMostrar.map(dia => (
          <div key={dia} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>{dia}</span>
                <span className="text-xs text-slate-400 font-normal">
                  {tipoDia === 'laborable' ? 'Laborable' : 'Finde'}
                </span>
              </h2>
              
              {['desayuno', 'comida', 'merienda', 'cena'].map(comida => (
                <div key={comida} className="mb-4">
                  <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                    {comida}
                  </label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer appearance-none touch-manipulation"
                    value={menus[dia]?.[comida] || ""}
                    onChange={(e) => handleSelectChange(dia, comida, e.target.value)}
                  >
                    <option value="">Toca para elegir...</option>
                    {MENU_OPTIONS[comida].map((opcion, index) => (
                      <option key={index} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}