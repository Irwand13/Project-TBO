import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { parseMadurese } from "../utils/madureseParser";

export function TranslatorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof parseMadurese> | null>(null);

  const handleTranslate = () => {
    if (!input.trim()) return;
    const parseResult = parseMadurese(input);
    setResult(parseResult);
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-[#B11226]/10 rounded-full mb-4">
            <span className="text-[#B11226]">Syntax Analyzer</span>
          </div>
          <h1 className="mb-3 text-[#1a1a1a]">Penerjemah Bahasa Madura</h1>
          <p className="text-gray-600">
            Masukkan kalimat dalam Bahasa Madura untuk diterjemahkan dan dianalisis struktur sintaksisnya
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-white shadow-lg border-t-4 border-[#B11226] p-8 mb-8">
          {/* Input Section */}
          <div className="mb-6">
            <label className="block mb-3 text-[#1a1a1a]">
              Input Kalimat Bahasa Madura
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Contoh: sengko makan nase dhibi"
              className="min-h-[120px] border-gray-300 focus:border-[#B11226] focus:ring-[#B11226]/20"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleTranslate();
                }
              }}
            />
            <p className="text-sm text-gray-500 mt-2">
              Tekan Ctrl + Enter untuk menerjemahkan
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <Button
              onClick={handleTranslate}
              className="bg-[#B11226] hover:bg-[#8d0e1e] text-white flex-1 py-6"
              disabled={!input.trim()}
            >
              Terjemahkan & Analisis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 py-6"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-6 pt-6 border-t border-gray-200">
              {/* Spell Check Suggestions */}
              {result.suggestions.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-yellow-900 mb-2">Saran Perbaikan Ejaan</h3>
                      <div className="space-y-2">
                        {result.suggestions.map((sugg, index) => (
                          <div key={index} className="text-sm">
                            <span className="text-yellow-800">
                              Kata <code className="px-2 py-1 bg-yellow-100 rounded font-mono">{sugg.word}</code>
                            </span>
                            <span className="text-yellow-700"> tidak ditemukan. Mungkin maksud Anda: </span>
                            <button
                              onClick={() => {
                                const newInput = input.replace(
                                  new RegExp(`\\b${sugg.word}\\b`, 'gi'),
                                  sugg.suggestion
                                );
                                setInput(newInput);
                                setResult(null);
                              }}
                              className="px-2 py-1 bg-[#B11226] text-white rounded font-mono hover:bg-[#8d0e1e] transition-colors"
                            >
                              {sugg.suggestion}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Validation Status */}
              <div>
                <label className="block mb-3 text-[#1a1a1a]">
                  Status Validasi
                </label>
                <div
                  className={`flex items-center gap-3 p-4 rounded-lg ${
                    result.isValid
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  {result.isValid ? (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-green-900">Kalimat VALID</p>
                        <p className="text-sm text-green-700">
                          Struktur kalimat sesuai dengan grammar Bahasa Madura
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-red-900">Kalimat INVALID</p>
                        <p className="text-sm text-red-700">
                          Struktur kalimat tidak lengkap atau tidak sesuai grammar
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Structure */}
              <div>
                <label className="block mb-3 text-[#1a1a1a]">
                  Struktur Kalimat
                </label>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    {result.structure.map((part, index) => (
                      <span key={index} className="flex items-center gap-2">
                        <span className="px-4 py-2 bg-[#B11226] text-white rounded font-mono">
                          {part}
                        </span>
                        {index < result.structure.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    {result.structure.map(s => {
                      const labels: { [key: string]: string } = {
                        S: 'Subjek',
                        P: 'Predikat',
                        O: 'Objek',
                        K: 'Keterangan'
                      };
                      return labels[s] || s;
                    }).join(' → ')}
                  </p>
                </div>
              </div>

              {/* Translation */}
              <div>
                <label className="block mb-3 text-[#1a1a1a]">
                  Hasil Terjemahan
                </label>
                <div className="bg-gradient-to-r from-[#B11226]/5 to-transparent p-5 rounded-lg border-l-4 border-[#B11226]">
                  <p className="text-lg text-[#1a1a1a]">
                    {result.translation}
                  </p>
                </div>
              </div>

              {/* Token Analysis */}
              <div>
                <label className="block mb-3 text-[#1a1a1a]">
                  Analisis Token
                </label>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#B11226] text-white">
                        <th className="px-4 py-3 text-left">Bahasa Madura</th>
                        <th className="px-4 py-3 text-left">Bahasa Indonesia</th>
                        <th className="px-4 py-3 text-center">Jenis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.tokens.map((token, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        >
                          <td className="px-4 py-3 border-b border-gray-200 font-mono">
                            {token.madurese}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200">
                            {token.indonesian}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 text-center">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm ${
                                token.type === 'S' ? 'bg-blue-100 text-blue-800' :
                                token.type === 'P' ? 'bg-purple-100 text-purple-800' :
                                token.type === 'O' ? 'bg-green-100 text-green-800' :
                                token.type === 'K' ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {token.type === 'S' ? 'Subjek' :
                               token.type === 'P' ? 'Predikat' :
                               token.type === 'O' ? 'Objek' :
                               token.type === 'K' ? 'Keterangan' :
                               'Unknown'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Example Sentences */}
        <Card className="bg-white shadow-sm p-6">
          <h3 className="mb-4 text-[#1a1a1a]">Contoh Kalimat</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "sengko makan nase",
              "guru ngajar lesson dhibi",
              "anak belajar",
              "dhisa laju ka dika",
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(example);
                  setResult(null);
                }}
                className="text-left p-3 rounded-lg border border-gray-200 hover:border-[#B11226] hover:bg-[#B11226]/5 transition-colors"
              >
                <code className="text-sm text-[#B11226]">{example}</code>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}