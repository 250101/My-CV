+import React from 'react'
+import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'
+import { PersonalInfo } from '@/lib/types'
+
+interface PersonalInfoSectionProps {
+  personalInfo: PersonalInfo
+  className?: string
+  showPhoto?: boolean
+  showQR?: boolean
+  layout?: 'horizontal' | 'vertical' | 'compact'
+  colorTheme?: {
+    primary: string
+    text: string
+  }
+}
+
+export default function PersonalInfoSection({
+  personalInfo,
+  className = '',
+  showPhoto = true,
+  showQR = false,
+  layout = 'horizontal',
+  colorTheme = { primary: 'text-blue-600', text: 'text-gray-700' }
+}: PersonalInfoSectionProps) {
+  const contactItems = [
+    { icon: Mail, value: personalInfo.email, href: `mailto:${personalInfo.email}` },
+    { icon: Phone, value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
+    { icon: MapPin, value: personalInfo.location, href: null },
+    { icon: Globe, value: personalInfo.website, href: personalInfo.website },
+    { icon: Linkedin, value: personalInfo.linkedin, href: personalInfo.linkedin },
+    { icon: Github, value: personalInfo.github, href: personalInfo.github }
+  ].filter(item => item.value)
+
+  if (layout === 'compact') {
+    return (
+      <div className={`${className}`}>
+        <div className="text-center">
+          <h1 className={`text-2xl font-bold ${colorTheme.text}`}>{personalInfo.name}</h1>
+          <h2 className={`text-lg ${colorTheme.primary} mb-2`}>{personalInfo.title}</h2>
+          <div className="flex flex-wrap justify-center gap-4 text-sm">
+            {contactItems.slice(0, 3).map((item, index) => {
+              const IconComponent = item.icon
+              return (
+                <div key={index} className="flex items-center gap-1">
+                  <IconComponent className="h-3 w-3" />
+                  {item.href ? (
+                    <a href={item.href} className="hover:underline">{item.value}</a>
+                  ) : (
+                    <span>{item.value}</span>
+                  )}
+                </div>
+              )
+            })}
+          </div>
+        </div>
+      </div>
+    )
+  }
+
+  if (layout === 'vertical') {
+    return (
+      <div className={`${className}`}>
+        {showPhoto && personalInfo.profilePhoto && (
+          <div className="text-center mb-6">
+            <img
+              src={personalInfo.profilePhoto}
+              alt="Profile"
+              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200"
+            />
+          </div>
+        )}
+        <div className="text-center mb-6">
+          <h1 className={`text-3xl font-bold ${colorTheme.text} mb-2`}>{personalInfo.name}</h1>
+          <h2 className={`text-xl ${colorTheme.primary} mb-4`}>{personalInfo.title}</h2>
+        </div>
+        <div className="space-y-2">
+          {contactItems.map((item, index) => {
+            const IconComponent = item.icon
+            return (
+              <div key={index} className="flex items-center gap-3">
+                <IconComponent className={`h-4 w-4 ${colorTheme.primary}`} />
+                {item.href ? (
+                  <a href={item.href} className="text-sm hover:underline">{item.value}</a>
+                ) : (
+                  <span className="text-sm">{item.value}</span>
+                )}
+              </div>
+            )
+          })}
+        </div>
+        {showQR && personalInfo.qrCodeImage && (
+          <div className="mt-6 text-center">
+            <img src={personalInfo.qrCodeImage} alt="QR Code" className="w-20 h-20 mx-auto" />
+          </div>
+        )}
+      </div>
+    )
+  }
+
+  // Default horizontal layout
+  return (
+    <div className={`flex items-center gap-6 ${className}`}>
+      {showPhoto && personalInfo.profilePhoto && (
+        <img
+          src={personalInfo.profilePhoto}
+          alt="Profile"
+          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
+        />
+      )}
+      <div className="flex-1">
+        <h1 className={`text-3xl font-bold ${colorTheme.text} mb-1`}>{personalInfo.name}</h1>
+        <h2 className={`text-xl ${colorTheme.primary} mb-3`}>{personalInfo.title}</h2>
+        <div className="grid grid-cols-2 gap-2">
+          {contactItems.map((item, index) => {
+            const IconComponent = item.icon
+            return (
+              <div key={index} className="flex items-center gap-2">
+                <IconComponent className={`h-4 w-4 ${colorTheme.primary}`} />
+                {item.href ? (
+                  <a href={item.href} className="text-sm hover:underline">{item.value}</a>
+                ) : (
+                  <span className="text-sm">{item.value}</span>
+                )}
+              </div>
+            )
+          })}
+        </div>
+      </div>
+      {showQR && personalInfo.qrCodeImage && (
+        <img src={personalInfo.qrCodeImage} alt="QR Code" className="w-20 h-20" />
+      )}
+    </div>
+  )
+}