import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Madura Pattern Background */}
      <div className="relative bg-[#B11226] overflow-hidden">
        {/* Batik Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Geometric Lines */}
        <div className="absolute top-0 left-0 w-full h-2 bg-white/20" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-white/20" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <span className="text-white/90">Aplikasi Akademik Linguistik Komputasi</span>
              </div>
              <h1 className="text-white mb-6 text-4xl md:text-6xl leading-tight">
                Penerjemah Bahasa Madura ke Bahasa Indonesia
              </h1>
              <p className="text-white/90 text-xl md:text-2xl mb-4">
                Berbasis EBNF & Context-Free Grammar
              </p>
              <p className="text-white/80 max-w-2xl mx-auto">
                Sistem penerjemah otomatis dengan analisis sintaksis menggunakan metode Extended Backus-Naur Form untuk penelitian linguistik komputasi
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => onNavigate('translator')}
                className="bg-white text-[#B11226] hover:bg-gray-100 px-8 py-6 group"
                size="lg"
              >
                Mulai Terjemahkan
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => onNavigate('grammar')}
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6"
                size="lg"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Lihat Grammar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#B11226]">
              <div className="w-12 h-12 bg-[#B11226]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#B11226]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mb-2 text-[#1a1a1a]">Syntax Analyzer</h3>
              <p className="text-gray-600">Analisis struktur kalimat menggunakan metode EBNF dan Context-Free Grammar</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#B11226]">
              <div className="w-12 h-12 bg-[#B11226]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#B11226]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="mb-2 text-[#1a1a1a]">Parsing Tree</h3>
              <p className="text-gray-600">Visualisasi pohon parsing untuk memahami struktur gramatikal kalimat</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#B11226]">
              <div className="w-12 h-12 bg-[#B11226]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#B11226]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="mb-2 text-[#1a1a1a]">Validasi Otomatis</h3>
              <p className="text-gray-600">Sistem validasi kalimat berdasarkan aturan tata bahasa Madura</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
