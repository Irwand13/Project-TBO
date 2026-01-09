import { Book, Code2 } from "lucide-react";
import { Card } from "./ui/card";
import { getEBNFGrammar } from "../utils/madureseParser";

export function GrammarPage() {
  const ebnfGrammar = getEBNFGrammar();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-[#B11226]/10 rounded-full mb-4">
            <span className="text-[#B11226]">Context-Free Grammar</span>
          </div>
          <h1 className="mb-3 text-[#1a1a1a]">Grammar EBNF</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Extended Backus-Naur Form (EBNF) untuk struktur tata bahasa Madura
          </p>
        </div>

        {/* EBNF Grammar Card */}
        <Card className="bg-white shadow-lg border-t-4 border-[#B11226] p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#B11226]/10 rounded-lg flex items-center justify-center">
              <Code2 className="h-6 w-6 text-[#B11226]" />
            </div>
            <div>
              <h2 className="text-[#1a1a1a]">Notasi EBNF Grammar</h2>
              <p className="text-gray-600">Formal grammar untuk Bahasa Madura</p>
            </div>
          </div>

          {/* Code Block */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 overflow-x-auto">
            <pre className="text-white font-mono text-sm leading-relaxed">
              <code>
                {ebnfGrammar.split('\n').map((line, index) => {
                  // Highlight non-terminals in red
                  const parts = line.split(/(\w+\s*=)/);
                  return (
                    <div key={index} className="mb-1">
                      {parts.map((part, i) => {
                        if (part.includes('=')) {
                          return (
                            <span key={i} className="text-[#FF6B6B]">
                              {part}
                            </span>
                          );
                        }
                        return <span key={i}>{part}</span>;
                      })}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>

          {/* EBNF Notation Guide */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="mb-4 text-[#1a1a1a]">Notasi EBNF</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-[#B11226] font-mono">[ ... ]</code>
                <p className="text-sm text-gray-600 mt-1">Opsional (0 atau 1 kali)</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-[#B11226] font-mono">|</code>
                <p className="text-sm text-gray-600 mt-1">Alternatif (pilihan)</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-[#B11226] font-mono">,</code>
                <p className="text-sm text-gray-600 mt-1">Concatenation (urutan)</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-[#B11226] font-mono">"..."</code>
                <p className="text-sm text-gray-600 mt-1">Terminal (kata konkret)</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Grammar Rules Explanation */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white shadow-sm p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-mono">S</span>
              </div>
              <div>
                <h3 className="text-[#1a1a1a] mb-2">Subjek</h3>
                <p className="text-gray-600 mb-3">
                  Pelaku atau topik dalam kalimat
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Contoh:</p>
                  <code className="text-sm text-[#B11226]">sengko, vio, guru, anak</code>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white shadow-sm p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-mono">P</span>
              </div>
              <div>
                <h3 className="text-[#1a1a1a] mb-2">Predikat</h3>
                <p className="text-gray-600 mb-3">
                  Tindakan atau keadaan subjek
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Contoh:</p>
                  <code className="text-sm text-[#B11226]">makan, ngaji, laju, apek</code>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white shadow-sm p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-mono">O</span>
              </div>
              <div>
                <h3 className="text-[#1a1a1a] mb-2">Objek (Opsional)</h3>
                <p className="text-gray-600 mb-3">
                  Sasaran dari tindakan predikat
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Contoh:</p>
                  <code className="text-sm text-[#B11226]">buku, nase, lesson</code>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white shadow-sm p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-mono">K</span>
              </div>
              <div>
                <h3 className="text-[#1a1a1a] mb-2">Keterangan (Opsional)</h3>
                <p className="text-gray-600 mb-3">
                  Informasi tambahan (waktu, tempat, cara)
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Contoh:</p>
                  <code className="text-sm text-[#B11226]">e romah, sateya, baramma</code>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CFG Explanation */}
        <Card className="bg-white shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#B11226]/10 rounded-lg flex items-center justify-center">
              <Book className="h-6 w-6 text-[#B11226]" />
            </div>
            <div>
              <h3 className="text-[#1a1a1a]">Context-Free Grammar (CFG)</h3>
              <p className="text-gray-600">Dasar teoritis sistem parsing</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-[#1a1a1a]">Definisi Formal</h4>
              <p className="text-gray-600 mb-3">
                Context-Free Grammar G didefinisikan sebagai 4-tuple:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                G = (V, Σ, R, S)
              </div>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-[#B11226] font-mono flex-shrink-0">V:</span>
                  <span>Himpunan non-terminal symbols (Kalimat, Subjek, Predikat, ...)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226] font-mono flex-shrink-0">Σ:</span>
                  <span>Himpunan terminal symbols (kata-kata Bahasa Madura)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226] font-mono flex-shrink-0">R:</span>
                  <span>Himpunan production rules (aturan produksi)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226] font-mono flex-shrink-0">S:</span>
                  <span>Start symbol (Kalimat)</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="mb-2 text-[#1a1a1a]">Karakteristik CFG</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Setiap aturan produksi memiliki tepat satu non-terminal di sisi kiri</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Dapat merepresentasikan struktur rekursif dan nested</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Lebih ekspresif daripada Regular Grammar</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
