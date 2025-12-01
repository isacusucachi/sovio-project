import { useEffect, useState } from "react";
import { useVocationalTests } from "../context/vocationalTestContext";
import { useAuth } from "../context/authContext";
import carreras_por_tipos_vocacionales from "../data/carreras_por_tipos_vocacionales.json";

// ============================================
// CONSTANTS & HELPER FUNCTIONS
// ============================================

const VOCATIONAL_TYPE_NAMES = {
  leaderShip: "Liderazgo",
  mechanicalTechnician: "Técnico - Mecánico",
  social: "Social",
  organized: "Organizado",
  artistic: "Artístico",
  entrepreneur: "Emprendedor",
  investigative: "Investigativo",
};

const VOCATIONAL_TYPE_ICONS = {
  leaderShip: "👔",
  mechanicalTechnician: "🔧",
  social: "🤝",
  organized: "📋",
  artistic: "🎨",
  entrepreneur: "💼",
  investigative: "🔬",
};

const SKILL_AREAS = [
  { id: "attentionSkills", name: "Atención", icon: "👁️", description: "Capacidad de atención y concentración a detalles" },
  { id: "numericalSkills", name: "Habilidad Numérica", icon: "🔢", description: "Capacidad de raciocinio y cálculo numérico" },
  { id: "reasoningSkills", name: "Razonamiento", icon: "🧠", description: "Capacidad para discriminar conceptos y encontrar relaciones" },
  { id: "vocabularySkills", name: "Vocabulario", icon: "📚", description: "Bagaje verbal e identificación de sinónimos" },
  { id: "spatialSkills", name: "Habilidad Espacial", icon: "🧊", description: "Capacidad para ubicarse en el espacio y manipular imágenes" },
];

const VOCATIONAL_TYPES_INFO = [
  { id: "leaderShip", name: "Liderazgo", icon: "👔", description: "Personas dominantes, ambiciosas y seguras de sí mismas con habilidades para organizar y dirigir." },
  { id: "mechanicalTechnician", name: "Técnico-Mecánico", icon: "🔧", description: "Interés en manipulación de objetos, instrumentos y máquinas con habilidades manuales y mecánicas." },
  { id: "social", name: "Social", icon: "🤝", description: "Personas cooperativas y sociables con interés en educar, curar o servir a otras personas." },
  { id: "organized", name: "Organizado", icon: "📋", description: "Personas organizadas con capacidad para sistematizar datos, materiales y documentos." },
  { id: "artistic", name: "Artístico", icon: "🎨", description: "Personas creativas y originales con habilidades artísticas en diversas expresiones." },
  { id: "investigative", name: "Investigativo", icon: "🔬", description: "Personas intelectuales, metódicas y curiosas con capacidad de observación y análisis." },
  { id: "entrepreneur", name: "Emprendedor", icon: "💼", description: "Interés en iniciar nuevas empresas y negocios con capacidad para vender y negociar." },
];

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getVocationalTypeName = (type) => VOCATIONAL_TYPE_NAMES[type] || type;

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Navigation Tabs
const NavigationTabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 print:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300
            ${activeTab === tab.id
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }
          `}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.name}
        </button>
      ))}
    </div>
  );
};

// User Info Card
const UserInfoCard = ({ user, vocationalTestReport }) => {
  return (
    <div className="bg-blue-600 rounded-2xl p-6 mb-6 text-white shadow-lg print:bg-white print:text-black print:shadow-none print:border print:border-gray-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center print:bg-gray-100">
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-bold print:text-black">
              {user?.names} {user?.surnames}
            </h2>
            <p className="text-blue-100 text-sm print:text-gray-600">
              {user?.typeOfIdentityDocument}: {user?.identityDocumentNumber}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/10 rounded-xl p-2 print:bg-gray-50">
            <p className="text-xs text-blue-100 print:text-gray-500">Edad</p>
            <p className="font-bold">{user?.age} años</p>
          </div>
          <div className="bg-white/10 rounded-xl p-2 print:bg-gray-50">
            <p className="text-xs text-blue-100 print:text-gray-500">Género</p>
            <p className="font-bold">{user?.gender}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-2 print:bg-gray-50">
            <p className="text-xs text-blue-100 print:text-gray-500">Grado</p>
            <p className="font-bold text-sm">
              {vocationalTestReport?.userId?.personalInformation?.cycle}{" "}
              {vocationalTestReport?.userId?.personalInformation?.academicLevel}
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-2 print:bg-gray-50">
            <p className="text-xs text-blue-100 print:text-gray-500">F. Evaluación</p>
            <p className="font-bold text-sm">{formatDate(vocationalTestReport?.evaluationDate)}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/20 print:border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <p>
            <span className="text-blue-100 print:text-gray-500">Institución:</span>{" "}
            <span className="font-semibold">{vocationalTestReport?.userId?.personalInformation?.institutionName}</span>
          </p>
          <p>
            <span className="text-blue-100 print:text-gray-500">Evaluador(a):</span>{" "}
            <span className="font-semibold">{vocationalTestReport?.evaluator?.fullname}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Skill Level Badge - Solo 3 colores: verde, ámbar, rojo
const SkillLevelBadge = ({ level }) => {
  const config = {
    BAJO: { color: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800", bar: "bg-red-500", width: "33%" },
    MEDIO: { color: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800", bar: "bg-amber-500", width: "66%" },
    ALTO: { color: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800", bar: "bg-green-500", width: "100%" },
  };
  const cfg = config[level] || config.MEDIO;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
        <div className={`h-full ${cfg.bar} rounded-full transition-all duration-500`} style={{ width: cfg.width }} />
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${cfg.color}`}>
        {level}
      </span>
    </div>
  );
};

// Skill Card - Diseño neutro con ícono
const SkillCard = ({ skill, result }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
          {skill.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-800 dark:text-white">{skill.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{skill.description}</p>
        </div>
      </div>
      <SkillLevelBadge level={result?.skillLevel} />
    </div>
  );
};

// Vocational Type Card - Diseño neutro
const VocationalTypeCard = ({ type, result, isTopType }) => {
  const typeInfo = VOCATIONAL_TYPES_INFO.find(t => t.id === type.id);
  
  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-2xl p-4 border transition-all duration-300
      ${isTopType 
        ? "border-blue-400 ring-2 ring-blue-100 dark:ring-blue-900" 
        : "border-gray-200 dark:border-gray-700 hover:shadow-md"
      }
    `}>
      {isTopType && (
        <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-bold mb-2">
          <span>⭐</span> Tipo Predominante
        </div>
      )}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
          {typeInfo?.icon || "📊"}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-800 dark:text-white">{type.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{typeInfo?.description}</p>
        </div>
      </div>
      <SkillLevelBadge level={result?.correspondenceLevel} />
    </div>
  );
};

// TEPE Result Card - Simplificado
const TepeResultCard = ({ result }) => {
  const getTepeConfig = (resultText) => {
    if (resultText?.includes("muy elevado")) {
      return { icon: "🚀", label: "Muy Elevado", levelColor: "text-green-600 dark:text-green-400" };
    } else if (resultText?.includes("elevado")) {
      return { icon: "📈", label: "Elevado", levelColor: "text-green-600 dark:text-green-400" };
    } else if (resultText?.includes("relativo")) {
      return { icon: "📊", label: "Relativo", levelColor: "text-amber-600 dark:text-amber-400" };
    } else {
      return { icon: "📉", label: "Por Desarrollar", levelColor: "text-red-600 dark:text-red-400" };
    }
  };

  const config = getTepeConfig(result);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-4xl">
          {config.icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Potencial Empresarial</p>
          <h3 className={`text-2xl font-bold ${config.levelColor}`}>{config.label}</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
        {result}
      </p>
    </div>
  );
};

// Careers Recommendation Card - Simplificado
const CareersCard = ({ vocationalType, careers }) => {
  const typeName = getVocationalTypeName(vocationalType);
  const icon = VOCATIONAL_TYPE_ICONS[vocationalType] || "📋";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tipo Vocacional</p>
            <h4 className="font-bold text-gray-800 dark:text-white">{typeName}</h4>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Carreras sugeridas:</p>
        <div className="flex flex-wrap gap-2">
          {careers?.map((career, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {career}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section Title
const SectionTitle = ({ icon, title, subtitle }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 ml-10">{subtitle}</p>
      )}
    </div>
  );
};

// Collapsible Section
const CollapsibleSection = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 print:mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors print:hidden"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="font-semibold text-gray-700 dark:text-gray-200">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`mt-2 ${isOpen ? "block" : "hidden"} print:block`}>
        {children}
      </div>
      <div className="hidden print:block font-bold text-base mb-2">
        {icon} {title}
      </div>
    </div>
  );
};

// Observations Card
const ObservationsCard = ({ observations }) => {
  if (!observations) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">📝</span>
        <div>
          <h4 className="font-bold text-gray-800 dark:text-white mb-1">Observaciones</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{observations}</p>
        </div>
      </div>
    </div>
  );
};

// Action Buttons
const ActionButtons = ({ onPrint }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mt-8 print:hidden">
      <button
        onClick={onPrint}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        IMPRIMIR
      </button>
      <a
        href="/main"
        className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        VOLVER
      </a>
    </div>
  );
};

// Loading Skeleton
const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-6" />
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        ))}
      </div>
    </div>
  );
};

// Quick Stat Card - Diseño neutro
const QuickStatCard = ({ icon, label, value, isCompleted }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 text-center">
      <span className="text-3xl">{icon}</span>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{label}</p>
      <p className="font-bold text-gray-800 dark:text-white">
        {isCompleted ? (
          <span className="text-green-600 dark:text-green-400">Completado ✓</span>
        ) : (
          value
        )}
      </p>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const FinalVocationalTestReport = () => {
  const { user } = useAuth();
  const { vocationalTestReport, getVocationalTestReport } = useVocationalTests();
  const [activeTab, setActiveTab] = useState("resumen");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getVocationalTestReport();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Build navigation tabs based on available results
  const tabs = [
    { id: "resumen", name: "Resumen", icon: "📊" },
    ...(vocationalTestReport?.phbTestResult ? [{ id: "habilidades", name: "Habilidades", icon: "🧠" }] : []),
    ...(vocationalTestReport?.ieppoTestResult ? [{ id: "vocacional", name: "Vocacional", icon: "🎯" }] : []),
    ...(vocationalTestReport?.tepeTestResult ? [{ id: "emprendimiento", name: "Emprendimiento", icon: "💼" }] : []),
    { id: "carreras", name: "Carreras", icon: "🎓" },
  ];

  // Get top 2 vocational types
  const getTopVocationalTypes = () => {
    return [
      vocationalTestReport?.vocationalTypes?.vocationalTypes1,
      vocationalTestReport?.vocationalTypes?.vocationalTypes2,
    ].filter(Boolean);
  };

  const topTypes = getTopVocationalTypes();

  return (
    <>
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 px-4 print:bg-white print:p-0">
        <div className="max-w-4xl mx-auto mt-16 print:mt-0">
          
          {/* Header */}
          <div className="text-center mb-6 print:mb-4">
            <div className="flex justify-between items-center gap-4 mb-4 print:mb-2">
              <img src="./PCM-Trabajo.png" className="h-12 print:h-10" alt="PCM" />
              <img src="./Mtpe.webp" className="h-12 print:h-10" alt="MTPE" />
            </div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4 print:hidden">
              <span className="text-3xl">📋</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 print:text-xl">
              Informe Confidencial SOVIO
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm print:hidden">
              Sistema de Orientación Vocacional e Información Ocupacional
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 print:shadow-none print:p-4">
            
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {/* User Info */}
                <UserInfoCard user={user} vocationalTestReport={vocationalTestReport} />

                {/* Navigation Tabs */}
                <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

                {/* Tab Content */}
                <div className="animate-fadeIn">
                  
                  {/* RESUMEN TAB */}
                  {activeTab === "resumen" && (
                    <div className="space-y-6">
                      <SectionTitle 
                        icon="📊" 
                        title="Resumen de Resultados" 
                        subtitle="Vista general de tu perfil vocacional"
                      />

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {vocationalTestReport?.phbTestResult && (
                          <QuickStatCard icon="🧠" label="Test PHB" isCompleted={true} />
                        )}
                        {vocationalTestReport?.ieppoTestResult && (
                          <QuickStatCard icon="🎯" label="Test IEPPO" isCompleted={true} />
                        )}
                        {vocationalTestReport?.tepeTestResult && (
                          <QuickStatCard icon="💼" label="Test TEPE" isCompleted={true} />
                        )}
                        {topTypes.length > 0 && (
                          <QuickStatCard 
                            icon={VOCATIONAL_TYPE_ICONS[topTypes[0]]} 
                            label="Tipo Principal" 
                            value={getVocationalTypeName(topTypes[0])} 
                          />
                        )}
                      </div>

                      {/* Top Vocational Types */}
                      {topTypes.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
                          <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <span>⭐</span> Tus Tipos Vocacionales Predominantes
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {topTypes.map((type, index) => (
                              <div key={type} className={`flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border ${index === 0 ? "border-blue-300 dark:border-blue-700" : "border-gray-200 dark:border-gray-600"}`}>
                                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                                  {VOCATIONAL_TYPE_ICONS[type]}
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {index === 0 ? "🥇 Principal" : "🥈 Secundario"}
                                  </p>
                                  <p className="font-bold text-gray-800 dark:text-white">
                                    {getVocationalTypeName(type)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Observations */}
                      <ObservationsCard observations={vocationalTestReport?.observations} />
                    </div>
                  )}

                  {/* HABILIDADES TAB */}
                  {activeTab === "habilidades" && vocationalTestReport?.phbTestResult && (
                    <div className="space-y-6">
                      <SectionTitle 
                        icon="🧠" 
                        title="Habilidades Básicas" 
                        subtitle="Resultados del Test PHB"
                      />

                      <CollapsibleSection title="¿Qué mide cada área?" icon="📖" defaultOpen={false}>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                          {SKILL_AREAS.map((skill) => (
                            <p key={skill.id}>
                              <strong>{skill.icon} {skill.name}:</strong> {skill.description}
                            </p>
                          ))}
                        </div>
                      </CollapsibleSection>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {SKILL_AREAS.map((skill) => (
                          <SkillCard
                            key={skill.id}
                            skill={skill}
                            result={vocationalTestReport.phbTestResult[skill.id]}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* VOCACIONAL TAB */}
                  {activeTab === "vocacional" && vocationalTestReport?.ieppoTestResult && (
                    <div className="space-y-6">
                      <SectionTitle 
                        icon="🎯" 
                        title="Tipificación Vocacional" 
                        subtitle="Estilo personal y preferencia ocupacional"
                      />

                      <CollapsibleSection title="¿Qué significa cada tipo?" icon="📖" defaultOpen={false}>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-300 space-y-3">
                          {VOCATIONAL_TYPES_INFO.map((type) => (
                            <p key={type.id}>
                              <strong>{type.icon} {type.name}:</strong> {type.description}
                            </p>
                          ))}
                        </div>
                      </CollapsibleSection>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: "leaderShip", name: "Liderazgo" },
                          { id: "mechanicalTechnician", name: "Técnico-Mecánico" },
                          { id: "social", name: "Social" },
                          { id: "organized", name: "Organizado" },
                          { id: "artistic", name: "Artístico" },
                          { id: "entrepreneur", name: "Emprendedor" },
                          { id: "investigative", name: "Investigativo" },
                        ].map((type) => (
                          <VocationalTypeCard
                            key={type.id}
                            type={type}
                            result={vocationalTestReport.ieppoTestResult[type.id]}
                            isTopType={topTypes.includes(type.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* EMPRENDIMIENTO TAB */}
                  {activeTab === "emprendimiento" && vocationalTestReport?.tepeTestResult && (
                    <div className="space-y-6">
                      <SectionTitle 
                        icon="💼" 
                        title="Potencial Empresarial" 
                        subtitle="Resultados del Test TEPE"
                      />

                      <CollapsibleSection title="¿Qué significan los niveles?" icon="📖" defaultOpen={false}>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-300 space-y-3">
                          <p><strong>🚀 Muy Elevado:</strong> Perfil muy similar al empresario exitoso. Alta probabilidad de crear y hacer crecer un negocio.</p>
                          <p><strong>📈 Elevado:</strong> Perfil bastante similar al empresario exitoso. Probabilidad elevada de éxito empresarial.</p>
                          <p><strong>📊 Relativo:</strong> Tiene aspectos favorables y desfavorables. Probabilidad relativa de éxito.</p>
                          <p><strong>📉 Bajo:</strong> Perfil diferente al empresario exitoso. Se recomienda desarrollar habilidades empresariales.</p>
                        </div>
                      </CollapsibleSection>

                      <TepeResultCard result={vocationalTestReport.tepeTestResult.result} />
                    </div>
                  )}

                  {/* CARRERAS TAB */}
                  {activeTab === "carreras" && (
                    <div className="space-y-6">
                      <SectionTitle 
                        icon="🎓" 
                        title="Carreras Recomendadas" 
                        subtitle="Basadas en tus tipos vocacionales predominantes"
                      />

                      {vocationalTestReport?.careersOption ? (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
                          <h3 className="font-bold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
                            <span>✅</span> Carreras Seleccionadas
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 bg-green-600 text-white rounded-xl font-bold">
                              {vocationalTestReport.careersOption.careersOption1}
                            </span>
                            <span className="px-4 py-2 bg-green-600 text-white rounded-xl font-bold">
                              {vocationalTestReport.careersOption.careersOption2}
                            </span>
                          </div>
                        </div>
                      ) : topTypes.length > 0 ? (
                        <div className="space-y-4">
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
                            <p className="text-blue-800 dark:text-blue-200 text-sm">
                              <strong>💡 Nota:</strong> Estas son carreras preliminares basadas en tus tipos vocacionales. 
                              Consulta con tu orientador para una recomendación personalizada.
                            </p>
                          </div>
                          {topTypes.map((type) => (
                            <CareersCard
                              key={type}
                              vocationalType={type}
                              careers={carreras_por_tipos_vocacionales[type]}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <span className="text-4xl">📭</span>
                          <p className="mt-2">No hay carreras recomendadas aún</p>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Signature */}
                {vocationalTestReport?.evaluator?.signature?.secure_url && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                    <img
                      src={vocationalTestReport.evaluator.signature.secure_url}
                      alt="Firma del evaluador"
                      className="mx-auto w-48"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {vocationalTestReport.evaluator.fullname}
                    </p>
                    <p className="text-xs text-gray-400">Evaluador(a)</p>
                  </div>
                )}

                {/* Action Buttons */}
                <ActionButtons onPrint={() => window.print()} />
              </>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6 print:hidden">
            Este informe es confidencial y de uso exclusivo para orientación vocacional.
          </p>
        </div>
      </div>
    </>
  );
};

export default FinalVocationalTestReport;