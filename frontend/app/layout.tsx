import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Canac Weather Dashboard',
  description: 'Consulte informações meteorológicas em tempo real de qualquer cidade do mundo',
  keywords: ['clima', 'tempo', 'meteorologia', 'previsão', 'weather'],
  authors: [{ name: 'Canac Team' }],
  openGraph: {
    title: 'Canac Weather Dashboard',
    description: 'Consulte informações meteorológicas em tempo real',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {/* Background gradiente animado */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
          {/* Bolhas decorativas animadas */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-gray-200/50 bg-white/80 backdrop-blur-md sticky top-0">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo e título */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 p-2 rounded-xl">
                    <svg 
                      className="w-8 h-8 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-poppins">
                    Canac Weather
                  </h1>
                  <p className="text-xs text-gray-600">Dashboard Meteorológico</p>
                </div>
              </div>

              {/* Status indicator */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-xs font-medium text-green-700">Sistema Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="relative z-10 min-h-[calc(100vh-180px)]">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-gray-200/50 bg-white/80 backdrop-blur-md mt-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-600">
                  Desenvolvido para <span className="font-semibold text-blue-600">CANAC</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Dados fornecidos por Open-Meteo API
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <a 
                  href="https://open-meteo.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-gray-600 hover:text-blue-600 transition-colors"
                >
                  📡 API Open-Meteo
                </a>
                <div className="w-px h-4 bg-gray-300"></div>
                <span className="text-xs text-gray-500">
                  © 2024 Canac Weather
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}