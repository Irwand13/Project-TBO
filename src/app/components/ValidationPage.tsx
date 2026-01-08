import { CheckCircle2, XCircle, FileText } from "lucide-react";
import { Card } from "./ui/card";
import { getExampleSentences } from "../utils/madureseParser";

export function ValidationPage() {
  const examples = getExampleSentences();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-[#B11226]/10 rounded-full mb-4">
            <span className="text-[#B11226]">Grammar Validation</span>
          </div>
          <h1 className="mb-3 text-[#1a1a1a]">Validasi Kalimat</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Contoh kalimat yang valid dan invalid berdasarkan aturan grammar EBNF Bahasa Madura
          </p>
        </div>

        {/* Validation Table */}
        <Card className="bg-white shadow-lg border-t-4 border-[#B11226] overflow-hidden mb-8">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#B11226]/10 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#B11226]" />
              </div>
              <div>
                <h2 className="text-[#1a1a1a]">Tabel Validasi</h2>
                <p className="text-gray-600">Daftar lengkap contoh kalimat dan status validasinya</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#B11226] text-white">
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Kalimat Bahasa Madura</th>
                  <th className="px-6 py-4 text-left">Struktur</th>
                  <th className="px-6 py-4 text-left">Arti</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((example, index) => (
                  <tr
                    key={index}
                    className={`
                      border-b border-gray-200 transition-colors
                      ${
                        example.isValid
                          ? "bg-green-50/30 hover:bg-green-50"
                          : "bg-red-50/30 hover:bg-red-50"
                      }
                    `}
                  >
                    {/* Status Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {example.isValid ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              VALID
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-red-600" />
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                              INVALID
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Sentence Column */}
                    <td className="px-6 py-4">
                      <code className="text-[#B11226] font-mono">
                        {example.sentence}
                      </code>
                    </td>

                    {/* Structure Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 flex-wrap">
                        {example.structure.split(' - ').map((part, i, arr) => (
                          <span key={i} className="flex items-center gap-1">
                            <span
                              className={`
                                px-2 py-1 rounded text-xs font-mono
                                ${part === 'S' ? 'bg-blue-100 text-blue-800' :
                                  part === 'P' ? 'bg-purple-100 text-purple-800' :
                                  part === 'O' ? 'bg-green-100 text-green-800' :
                                  part === 'K' ? 'bg-orange-100 text-orange-800' :
                                  'bg-gray-100 text-gray-800'}
                              `}
                            >
                              {part}
                            </span>
                            {i < arr.length - 1 && (
                              <span className="text-gray-400">→</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Meaning Column */}
                    <td className="px-6 py-4 text-gray-700">
                      {example.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Validation Rules */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <h3 className="text-[#1a1a1a]">Kalimat Valid</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Kalimat dianggap valid jika memenuhi kriteria berikut:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span className="text-gray-600">
                  Memiliki <strong>Subjek (S)</strong> dan <strong>Predikat (P)</strong> sebagai komponen wajib
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span className="text-gray-600">
                  Objek (O) dan Keterangan (K) bersifat opsional
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span className="text-gray-600">
                  Semua kata ada dalam kamus Bahasa Madura
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span className="text-gray-600">
                  Urutan kata mengikuti pola SPOK (Subjek-Predikat-Objek-Keterangan)
                </span>
              </li>
            </ul>
          </Card>

          <Card className="bg-white shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
              <h3 className="text-[#1a1a1a]">Kalimat Invalid</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Kalimat dianggap invalid jika:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <span className="text-gray-600">
                  Tidak memiliki <strong>Subjek</strong> (hanya ada Predikat atau lainnya)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <span className="text-gray-600">
                  Tidak memiliki <strong>Predikat</strong> (hanya ada Subjek atau lainnya)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <span className="text-gray-600">
                  Mengandung kata yang tidak ada dalam kamus
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <span className="text-gray-600">
                  Urutan kata tidak sesuai dengan grammar yang telah didefinisikan
                </span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Structure Legend */}
        <Card className="bg-white shadow-sm p-6 mt-6">
          <h3 className="mb-4 text-[#1a1a1a]">Legenda Struktur</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono">
                S
              </span>
              <span className="text-gray-600">Subjek</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm font-mono">
                P
              </span>
              <span className="text-gray-600">Predikat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-mono">
                O
              </span>
              <span className="text-gray-600">Objek</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded text-sm font-mono">
                K
              </span>
              <span className="text-gray-600">Keterangan</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
