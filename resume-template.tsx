import { Mail, Phone, MapPin, Globe, Calendar, Award, Code, Languages, Heart, QrCode } from "lucide-react"

export default function ResumeTemplate() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-50 to-teal-50 p-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden border-4 border-white shadow-lg">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Profile Photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Contact Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Sarah Johnson</h1>
            <h2 className="text-xl text-teal-600 font-medium mb-4">Senior Data Analyst & Culinary Enthusiast</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-500" />
                <span className="text-sm">sarah.johnson@email.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-500" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-500" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-500" />
                <span className="text-sm">linkedin.com/in/sarahjohnson</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Experienced data analyst with 5+ years in tech industry, specializing in machine learning and business
            intelligence. Passionate about transforming complex data into actionable insights. Also an avid culinary
            artist who combines analytical thinking with creative cooking techniques.
          </p>
        </section>

        {/* Work Experience */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">Work Experience</h3>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Senior Data Analyst</h4>
                  <p className="text-teal-600 font-medium">TechCorp Solutions</p>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  2021 - Present
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Led data-driven initiatives that increased revenue by 25%</li>
                <li>Developed machine learning models for customer segmentation</li>
                <li>Collaborated with cross-functional teams to optimize business processes</li>
                <li>Mentored junior analysts and established best practices</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Data Analyst</h4>
                  <p className="text-teal-600 font-medium">StartupXYZ</p>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  2019 - 2021
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Built automated reporting dashboards using Python and SQL</li>
                <li>Analyzed user behavior data to improve product features</li>
                <li>Reduced data processing time by 40% through optimization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Two Column Layout for Education, Skills, Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Education */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">Education</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900">Master of Science in Data Science</h4>
              <p className="text-teal-600 font-medium">University of California, Berkeley</p>
              <p className="text-gray-500 text-sm">2017 - 2019</p>
              <p className="text-gray-700 mt-2">GPA: 3.8/4.0</p>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
              <Code className="inline w-6 h-6 mr-2" />
              Skills
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {["Python", "SQL", "R", "Tableau", "Power BI", "Machine Learning"].map((skill) => (
                    <span key={skill} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Culinary Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {["French Cuisine", "Pastry", "Food Photography", "Recipe Development"].map((skill) => (
                    <span key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Languages and Interests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
              <Languages className="inline w-6 h-6 mr-2" />
              Languages
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">English</span>
                <span className="text-gray-600">Native</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">Spanish</span>
                <span className="text-gray-600">Fluent</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">French</span>
                <span className="text-gray-600">Intermediate</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
              <Heart className="inline w-6 h-6 mr-2" />
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Cooking", "Food Photography", "Hiking", "Data Visualization", "Wine Tasting", "Travel"].map(
                (interest) => (
                  <span key={interest} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {interest}
                  </span>
                ),
              )}
            </div>
          </section>
        </div>

        {/* Culinary Showcase */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
            <Award className="inline w-6 h-6 mr-2" />
            Culinary Creations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Culinary Creation 1"
                className="w-full h-32 object-cover"
              />
              <p className="p-2 text-sm text-gray-700 text-center">Truffle Pasta</p>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Culinary Creation 2"
                className="w-full h-32 object-cover"
              />
              <p className="p-2 text-sm text-gray-700 text-center">Berry Tart</p>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Culinary Creation 3"
                className="w-full h-32 object-cover"
              />
              <p className="p-2 text-sm text-gray-700 text-center">Sourdough Bread</p>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Culinary Creation 4"
                className="w-full h-32 object-cover"
              />
              <p className="p-2 text-sm text-gray-700 text-center">Garden Salad</p>
            </div>
          </div>
        </section>

        {/* QR Code Section */}
        <section className="bg-teal-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Portfolio & More</h3>
              <p className="text-gray-700">Scan to view my complete portfolio and culinary blog</p>
              <p className="text-sm text-teal-600 mt-1">www.sarahjohnson-portfolio.com</p>
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
