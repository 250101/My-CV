import { Mail, Phone, MapPin, Globe, Calendar, Award, Code, Languages, Heart, QrCode } from "lucide-react"

export default function PlantillaCurriculum() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none">
      {/* Sección Header */}
      <div className="bg-gradient-to-r from-slate-50 to-teal-50 p-8 print:bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Foto de Perfil */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden border-4 border-white shadow-lg">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Foto de Perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Nombre e Información de Contacto */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Martín Moore</h1>
            <h2 className="text-xl text-teal-600 font-medium mb-4">Cocinero Profesional & Analista de Procesos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-500" />
                <span className="text-sm">martin.alejandro.moore@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-500" />
                <span className="text-sm">+34 607 156 015</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-500" />
                <span className="text-sm">Barcelona, España</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-500" />
                <span className="text-sm">LinkedIn · GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Resumen Profesional */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">Resumen Profesional</h3>
          <p className="text-gray-700 leading-relaxed">
            Apasionado de la cocina con experiencia práctica en cocina de bar y organización de eventos gastronómicos
            para grupos grandes. Profesional administrativo con sólida trayectoria en gestión de procesos,
            automatización y capacitación de equipos. Busco integrar mi creatividad culinaria con mis habilidades
            analíticas y de gestión para aportar valor en entornos dinámicos.
          </p>
        </section>

        {/* Experiencia Laboral */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">Experiencia Laboral</h3>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Analista de Procesos y Formador</h4>
                  <p className="text-teal-600 font-medium">Conexión Salud</p>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Septiembre 2021 – Marzo 2025
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  Gestión administrativa y atención a afiliados, optimizando procesos mediante automatización con Python
                  y Power BI
                </li>
                <li>
                  Lideré proyectos clave de digitalización como desarrollo de chatbot y creación de dashboards en tiempo
                  real
                </li>
                <li>Capacité equipos comerciales y otros departamentos, impulsando el uso de nuevas herramientas</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Cocinero y Organizador de Eventos Gastronómicos
                  </h4>
                  <p className="text-teal-600 font-medium">Freelance y Bar Runa Avellaneda</p>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Junio 2021 – Sept 2021 (Bar) / Desde entonces (Eventos)
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Preparación y servicio de platos con atención a calidad y tiempos</li>
                <li>
                  Diseño y ejecución de menús personalizados para eventos privados, cocinando para grupos de hasta 31
                  personas
                </li>
                <li>Gestión integral de logística y coordinación gastronómica</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Layout de Dos Columnas para Educación, Habilidades, Idiomas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Educación */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">Educación</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900">Diploma de Educación Secundaria</h4>
              <p className="text-teal-600 font-medium">Instituto French — Buenos Aires, Argentina</p>
              <p className="text-gray-500 text-sm">2012 - 2018</p>
              <p className="text-gray-700 mt-2">Especialización en Economía</p>
            </div>
          </section>

          {/* Habilidades */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
              <Code className="inline w-6 h-6 mr-2" />
              Habilidades
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Habilidades Técnicas</h4>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Power BI", "Excel Avanzado", "Chatbots", "Automatización", "Análisis de Datos"].map(
                    (skill) => (
                      <span key={skill} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Habilidades Culinarias</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Cocina Profesional",
                    "Planificación de Menús",
                    "Eventos Gastronómicos",
                    "Gestión de Logística",
                  ].map((skill) => (
                    <span key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Idiomas e Intereses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
              <Languages className="inline w-6 h-6 mr-2" />
              Idiomas
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">Español</span>
                <span className="text-gray-600">Nativo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">Inglés</span>
                <span className="text-gray-600">Conversacional</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
              <Heart className="inline w-6 h-6 mr-2" />
              Intereses
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Gastronomía Creativa",
                "Desarrollo Web",
                "Proyectos Culinarios",
                "Tecnología",
                "Automatización",
                "Innovación",
              ].map((interest) => (
                <span key={interest} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Showcase Culinario */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
            <Award className="inline w-6 h-6 mr-2" />
            Creaciones Culinarias
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Creación Culinaria 1"
                className="w-full h-32 object-cover"
              />
              <p className="p-2 text-sm text-gray-700 text-center">[Nombre del Plato 1]</p>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Creación Culinaria 2"
                className="w-full h-32 object-cover"
              />
              <p className="p-2 text-sm text-gray-700 text-center">[Nombre del Plato 2]</p>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Creación Culinaria 3"
                className="w-full h-32 object-cover"
              />
              <p className="p-2 text-sm text-gray-700 text-center">[Nombre del Plato 3]</p>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Creación Culinaria 4"
                className="w-full h-32 object-cover"
              />
              <p className="p-2 text-sm text-gray-700 text-center">[Nombre del Plato 4]</p>
            </div>
          </div>
        </section>

        {/* Sección Código QR */}
        <section className="bg-teal-50 p-6 rounded-lg print:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Portfolio y Más</h3>
              <p className="text-gray-700">Escanea para ver mi portfolio completo y blog culinario</p>
              <p className="text-sm text-teal-600 mt-1">[tu-web-portfolio.com]</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                <QrCode className="w-12 h-12 text-gray-500" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
