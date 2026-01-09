import { Sparkles, Layers, Network, BookOpen } from "lucide-react";
import { Card } from "./ui/card";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-[#B11226]/10 rounded-full mb-4">
            <span className="text-[#B11226]">Tentang Sistem</span>
          </div>
          <h1 className="mb-3 text-[#1a1a1a]">Sistem Penerjemah Bahasa Madura</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Platform akademik untuk tugas akhir mata kuliah Teori Bahasa dan Automata.
          </p>
        </div>

        {/* Main Description */}
        <Card className="bg-white shadow-lg border-t-4 border-[#B11226] p-8 mb-8">
          <h2 className="mb-4 text-[#1a1a1a]">Deskripsi Sistem</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Sistem penerjemah Bahasa Madura ke Bahasa Indonesia ini dikembangkan sebagai aplikasi akademik 
            yang mengimplementasikan konsep linguistik komputasi. Sistem menggunakan pendekatan 
            <strong> Syntax Analyzer</strong> berbasis <strong>Extended Backus-Naur Form (EBNF)</strong> 
            dan <strong>Context-Free Grammar (CFG)</strong> untuk menganalisis dan menerjemahkan kalimat 
            dari Bahasa Madura.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Aplikasi ini dirancang khusus untuk mahasiswa, peneliti, dan akademisi yang tertarik dalam 
            bidang pemrosesan bahasa alami (Natural Language Processing), linguistik komputasi, dan 
            teori automata. Sistem ini memberikan visualisasi yang jelas tentang bagaimana sebuah kalimat 
            diparsing dan dianalisis strukturnya.
          </p>
        </Card>

        {/* Core Technologies */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm p-6">
            <div className="w-14 h-14 bg-[#B11226]/10 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-7 w-7 text-[#B11226]" />
            </div>
            <h3 className="mb-3 text-[#1a1a1a]">EBNF</h3>
            <p className="text-gray-600 mb-4">
              Extended Backus-Naur Form untuk mendefinisikan grammar formal Bahasa Madura
            </p>
            <div className="bg-gray-50 p-3 rounded font-mono text-xs text-gray-700">
              Kalimat = Subjek, Predikat, [Objek], [Keterangan];
            </div>
          </Card>

          <Card className="bg-white shadow-sm p-6">
            <div className="w-14 h-14 bg-[#B11226]/10 rounded-lg flex items-center justify-center mb-4">
              <Layers className="h-7 w-7 text-[#B11226]" />
            </div>
            <h3 className="mb-3 text-[#1a1a1a]">Context-Free Grammar</h3>
            <p className="text-gray-600 mb-4">
              Framework teoritis untuk parsing dan analisis struktur bahasa
            </p>
            <div className="bg-gray-50 p-3 rounded text-xs text-gray-700">
              <div className="font-mono mb-1">G = (V, Σ, R, S)</div>
              <div className="text-gray-500">4-tuple formal grammar</div>
            </div>
          </Card>

          <Card className="bg-white shadow-sm p-6">
            <div className="w-14 h-14 bg-[#B11226]/10 rounded-lg flex items-center justify-center mb-4">
              <Network className="h-7 w-7 text-[#B11226]" />
            </div>
            <h3 className="mb-3 text-[#1a1a1a]">Finite State Automata</h3>
            <p className="text-gray-600 mb-4">
              Model komputasi untuk tokenisasi dan analisis leksikal
            </p>
            <div className="bg-gray-50 p-3 rounded text-xs text-gray-700">
              Token → Type → Validation
            </div>
          </Card>
        </div>

        {/* Key Features */}
        <Card className="bg-white shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-[#B11226]" />
            <h2 className="text-[#1a1a1a]">Fitur Utama Sistem</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#B11226] text-white rounded-lg flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="mb-2 text-[#1a1a1a]">Syntax Analyzer</h3>
                <p className="text-gray-600">
                  Menganalisis struktur gramatikal kalimat Bahasa Madura berdasarkan aturan EBNF yang telah 
                  didefinisikan. Sistem dapat mengidentifikasi komponen Subjek (S), Predikat (P), Objek (O), 
                  dan Keterangan (K) dalam sebuah kalimat.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#B11226] text-white rounded-lg flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="mb-2 text-[#1a1a1a]">Parse Tree Visualization</h3>
                <p className="text-gray-600">
                  Menampilkan representasi visual dari struktur hierarki kalimat dalam bentuk pohon parsing. 
                  Visualisasi ini membantu memahami bagaimana kalimat dipecah menjadi komponen-komponen 
                  gramatikal yang lebih kecil.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#B11226] text-white rounded-lg flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="mb-2 text-[#1a1a1a]">Automatic Translation</h3>
                <p className="text-gray-600">
                  Menerjemahkan kalimat Bahasa Madura ke Bahasa Indonesia berdasarkan kamus yang telah 
                  didefinisikan. Proses terjemahan dilakukan setelah validasi sintaksis berhasil.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#B11226] text-white rounded-lg flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="mb-2 text-[#1a1a1a]">Grammar Validation</h3>
                <p className="text-gray-600">
                  Memvalidasi kalimat berdasarkan aturan Context-Free Grammar. Sistem memberikan feedback 
                  yang jelas apakah sebuah kalimat valid atau invalid beserta alasannya.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#B11226] text-white rounded-lg flex items-center justify-center">
                5
              </div>
              <div>
                <h3 className="mb-2 text-[#1a1a1a]">Token Analysis</h3>
                <p className="text-gray-600">
                  Melakukan analisis leksikal dengan memecah kalimat menjadi token-token dan 
                  mengidentifikasi jenis masing-masing kata (kata ganti, kata benda, kata kerja, dll).
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Technical Implementation */}
        <Card className="bg-white shadow-sm p-8 mb-8">
          <h2 className="mb-6 text-[#1a1a1a]">Implementasi Teknis</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-[#1a1a1a]">Arsitektur Sistem</h3>
              <p className="text-gray-600 mb-3">
                Sistem ini dibangun menggunakan arsitektur modular dengan pemisahan antara:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span><strong>Lexical Analyzer:</strong> Tokenisasi dan identifikasi jenis kata</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span><strong>Syntax Analyzer:</strong> Validasi struktur gramatikal</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span><strong>Parse Tree Generator:</strong> Pembangunan pohon parsing</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span><strong>Translator:</strong> Konversi ke Bahasa Indonesia</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="mb-2 text-[#1a1a1a]">Grammar Rules</h3>
              <p className="text-gray-600 mb-3">
                Aturan grammar yang diimplementasikan:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="text-sm font-mono text-gray-700 leading-relaxed">
{`Kalimat     → Subjek Predikat [Objek] [Keterangan]
Subjek      → KataGanti | KataBenda
Predikat    → KataKerja | KataSifat
Objek       → KataBenda
Keterangan  → KataKeterangan | KataTempat | KataWaktu`}
                </pre>
              </div>
            </div>
          </div>
        </Card>

        {/* Use Cases */}
        <Card className="bg-white shadow-sm p-8">
          <h2 className="mb-6 text-[#1a1a1a]">Kasus Penggunaan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="mb-3 text-[#B11226]">Untuk Mahasiswa</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Pembelajaran linguistik komputasi</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Praktik teori automata dan formal language</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Tugas akhir / skripsi NLP</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Studi kasus parsing dan compiler design</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-[#B11226]">Untuk Peneliti</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Penelitian bahasa daerah Indonesia</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Pengembangan NLP untuk bahasa lokal</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Analisis struktur gramatikal Bahasa Madura</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Dokumentasi linguistik komputasional</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
