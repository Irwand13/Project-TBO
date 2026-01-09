import { useState } from "react";
import { GitBranch, Search } from "lucide-react";
import { Card } from "./ui/card";
import { parseMadurese } from "../utils/madureseParser";

export function ParsingTreePage() {
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    { sentence: "sengko ngakan nase", meaning: "Saya makan nasi" },
    { sentence: "guru ngajhari ngoding e dinna", meaning: "Guru mengajari ngoding di sini" },
    { sentence: "sape ngakan rebbha ", meaning: "sapi makan rumput" },
    { sentence: "irwan e macah buku e kelas ", meaning: "irwan membaca buku kelas" },
    { sentence: "vio mangkat e pasar sateya", meaning: "vio pergi ke pasar sekarang" },
  ];

  const currentExample = examples[selectedExample];
  const parseResult = parseMadurese(currentExample.sentence);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-[#B11226]/10 rounded-full mb-4">
            <span className="text-[#B11226]">Finite State Automaton</span>
          </div>
          <h1 className="mb-3 text-[#1a1a1a]">Diagram State Parsing</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualisasi proses parsing sebagai finite state automaton untuk kalimat Bahasa Madura
          </p>
        </div>

        {/* Example Selector */}
        <Card className="bg-white shadow-sm p-6 mb-8">
          <label className="block mb-3 text-[#1a1a1a]">
            Pilih Contoh Kalimat
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedExample === index
                    ? "border-[#B11226] bg-[#B11226]/5"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <code className="text-[#B11226] block mb-1">
                  {example.sentence}
                </code>
                <p className="text-sm text-gray-600">{example.meaning}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* State Diagram Visualization */}
        <Card className="bg-white shadow-lg border-t-4 border-[#B11226] p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#B11226]/10 rounded-lg flex items-center justify-center">
              <GitBranch className="h-6 w-6 text-[#B11226]" />
            </div>
            <div>
              <h2 className="text-[#1a1a1a]">State Transition Diagram</h2>
              <p className="text-gray-600">Finite State Automaton untuk parsing kalimat</p>
            </div>
          </div>

          {/* Sentence Display */}
          <div className="bg-gradient-to-r from-[#B11226]/5 to-transparent p-4 rounded-lg border-l-4 border-[#B11226] mb-8">
            <p className="text-sm text-gray-600 mb-1">Kalimat Input:</p>
            <p className="font-mono text-lg text-[#1a1a1a]">
              {currentExample.sentence}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Terjemahan: {currentExample.meaning}
            </p>
          </div>

          {/* State Diagram */}
          {parseResult.isValid && (
            <div className="overflow-x-auto pb-8">
              <StateDiagram parseResult={parseResult} />
            </div>
          )}

          {!parseResult.isValid && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-900">
                Kalimat tidak valid. Tidak dapat membuat diagram state.
              </p>
            </div>
          )}

          {/* Diagram Legend */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="mb-4 text-[#1a1a1a]">Legenda</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 border-2 border-gray-700 rounded-full bg-white"></div>
                <span className="text-sm text-gray-600">State (q0, q1, ...)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 border-4 border-[#B11226] rounded-full bg-[#B11226]/10"></div>
                <span className="text-sm text-gray-600">Final State</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="40" height="20" className="flex-shrink-0">
                  <defs>
                    <marker id="arrowhead-legend" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#B11226" />
                    </marker>
                  </defs>
                  <line x1="0" y1="10" x2="35" y2="10" stroke="#B11226" strokeWidth="2" markerEnd="url(#arrowhead-legend)" />
                </svg>
                <span className="text-sm text-gray-600">Transisi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-[#B11226]/10 text-[#B11226] rounded text-xs">Label</div>
                <span className="text-sm text-gray-600">Token/Komponen</span>
              </div>
            </div>
          </div>
        </Card>

        {/* FSA Explanation */}
        <Card className="bg-white shadow-sm p-6">
          <h3 className="mb-4 text-[#1a1a1a]">Finite State Automaton (FSA)</h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-[#1a1a1a]">Definisi State</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-[#B11226] font-mono flex-shrink-0">q0:</span>
                  <span>Initial state (start)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226] font-mono flex-shrink-0">q1:</span>
                  <span>State setelah membaca Subjek</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226] font-mono flex-shrink-0">q2:</span>
                  <span>State setelah membaca Predikat (accept state jika tidak ada O/K)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226] font-mono flex-shrink-0">q3:</span>
                  <span>State setelah membaca Objek</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226] font-mono flex-shrink-0">q4:</span>
                  <span>Final state dengan Lokasi/Preposisi(e)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226] font-mono flex-shrink-0">q6:</span>
                  <span>Final state dengan Waktu</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="mb-2 text-[#1a1a1a]">Transisi State</h4>
              <p className="text-gray-600 mb-3">
                Automaton membaca token secara berurutan dan bertransisi antar state:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm text-gray-700 leading-relaxed">
                q0 →<span className="text-[#B11226]">[Subjek]</span>→ q1 →<span className="text-[#B11226]">[Predikat]</span>→ q2 →<span className="text-[#B11226]">[Objek]</span>→ q3 →<span className="text-[#B11226]">[Preposisi/Lokasi]</span>→ q4<br/>
                q2 →<span className="text-[#B11226]">[Waktu]</span>→ q6 (jalur alternatif)<br/>
                q3 →<span className="text-[#B11226]">[Waktu]</span>→ q6 (dari objek ke waktu)
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="mb-2 text-[#1a1a1a]">Karakteristik</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Deterministik FSA - setiap state memiliki transisi yang jelas</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Multiple final states (q2, q3, q4, q6) untuk berbagai pola kalimat</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#B11226]">•</span>
                  <span>Memodelkan struktur SPOK dengan komponen opsional</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// State Diagram Component menggunakan SVG
function StateDiagram({ parseResult }: { parseResult: ReturnType<typeof parseMadurese> }) {
  const structure = parseResult.structure;
  
  // Define state positions
  const states = [
    { id: 'q0', x: 100, y: 150, label: 'q0', isInitial: true, isFinal: false },
    { id: 'q1', x: 250, y: 150, label: 'q1', isInitial: false, isFinal: false },
    { id: 'q2', x: 400, y: 150, label: 'q2', isInitial: false, isFinal: !structure.includes('O') && !structure.includes('K') },
    { id: 'q3', x: 550, y: 150, label: 'q3', isInitial: false, isFinal: structure.includes('O') && !structure.includes('K') },
    { id: 'q4', x: 700, y: 100, label: 'q4', isInitial: false, isFinal: false },
    { id: 'q6', x: 700, y: 200, label: 'q6', isInitial: false, isFinal: false },
  ];

  // Determine which states are active and transitions based on structure
  const transitions: Array<{ from: string; to: string; label: string; active: boolean }> = [
    { from: 'q0', to: 'q1', label: 'Subjek', active: structure.includes('S') },
    { from: 'q1', to: 'q2', label: 'Predikat', active: structure.includes('P') },
    { from: 'q2', to: 'q3', label: 'Objek', active: structure.includes('O') },
    { from: 'q3', to: 'q4', label: 'Preposisi (e)', active: structure.includes('O') && structure.includes('K') },
    { from: 'q2', to: 'q6', label: 'Waktu', active: !structure.includes('O') && structure.includes('K') },
    { from: 'q3', to: 'q6', label: 'Waktu', active: structure.includes('O') && structure.includes('K') },
    { from: 'q4', to: 'q6', label: 'Waktu', active: false }, // dashed line
  ];

  // Determine which is the final state based on structure
  let finalState = 'q2';
  if (structure.includes('K')) {
    finalState = structure.includes('O') ? 'q4' : 'q6';
  } else if (structure.includes('O')) {
    finalState = 'q3';
  }

  return (
    <div className="flex justify-center">
      <svg width="850" height="320" className="border border-gray-200 rounded-lg bg-white">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#B11226" />
          </marker>
          <marker id="arrowhead-inactive" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#d1d5db" />
          </marker>
        </defs>

        {/* Draw transitions (arrows) */}
        {transitions.map((trans, index) => {
          const fromState = states.find(s => s.id === trans.from);
          const toState = states.find(s => s.id === trans.to);
          if (!fromState || !toState) return null;

          const isActive = trans.active;
          const color = isActive ? '#B11226' : '#d1d5db';
          const strokeWidth = isActive ? 2.5 : 1.5;
          const markerEnd = isActive ? 'url(#arrowhead)' : 'url(#arrowhead-inactive)';

          // Calculate arrow positions (from edge to edge of circles)
          const radius = 30;
          const dx = toState.x - fromState.x;
          const dy = toState.y - fromState.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const unitX = dx / distance;
          const unitY = dy / distance;

          const startX = fromState.x + unitX * radius;
          const startY = fromState.y + unitY * radius;
          const endX = toState.x - unitX * (radius + 10);
          const endY = toState.y - unitY * (radius + 10);

          // Calculate label position (midpoint)
          const labelX = (startX + endX) / 2;
          const labelY = (startY + endY) / 2 - 10;

          // Special handling for curved paths
          if (trans.from === 'q2' && trans.to === 'q6') {
            // Curved path for q2 to q6
            const controlX = 550;
            const controlY = 200;
            return (
              <g key={index}>
                <path
                  d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  markerEnd={markerEnd}
                />
                <text
                  x={controlX}
                  y={controlY + 20}
                  textAnchor="middle"
                  className="text-xs fill-[#B11226]"
                >
                  {trans.label}
                </text>
              </g>
            );
          }

          if (trans.from === 'q3' && trans.to === 'q6') {
            // Straight diagonal for q3 to q6
            return (
              <g key={index}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  markerEnd={markerEnd}
                />
                <text
                  x={labelX + 30}
                  y={labelY + 30}
                  textAnchor="middle"
                  className="text-xs fill-[#B11226]"
                >
                  {trans.label}
                </text>
              </g>
            );
          }

          if (trans.from === 'q3' && trans.to === 'q4') {
            // Curved path upward for q3 to q4
            const controlX = 625;
            const controlY = 100;
            return (
              <g key={index}>
                <path
                  d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  markerEnd={markerEnd}
                />
                <text
                  x={controlX}
                  y={controlY - 10}
                  textAnchor="middle"
                  className="text-xs fill-[#B11226]"
                >
                  {trans.label}
                </text>
              </g>
            );
          }

          if (trans.from === 'q4' && trans.to === 'q6') {
            // Dashed line from q4 to q6
            return (
              <g key={index}>
                <line
                  x1={startX}
                  y1={startY + radius}
                  x2={endX}
                  y2={endY - radius}
                  stroke="#d1d5db"
                  strokeWidth={1.5}
                  strokeDasharray="5,5"
                  markerEnd="url(#arrowhead-inactive)"
                />
                <text
                  x={720}
                  y={155}
                  textAnchor="start"
                  className="text-xs fill-gray-400"
                >
                  Waktu
                </text>
              </g>
            );
          }

          // Default straight line
          return (
            <g key={index}>
              <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={color}
                strokeWidth={strokeWidth}
                markerEnd={markerEnd}
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                className={`text-xs ${isActive ? 'fill-[#B11226]' : 'fill-gray-400'}`}
              >
                {trans.label}
              </text>
            </g>
          );
        })}

        {/* Draw states (circles) */}
        {states.map((state) => {
          const isFinal = state.id === finalState;
          const isActive = 
            (state.id === 'q0') ||
            (state.id === 'q1' && structure.includes('S')) ||
            (state.id === 'q2' && structure.includes('P')) ||
            (state.id === 'q3' && structure.includes('O')) ||
            (state.id === 'q4' && structure.includes('O') && structure.includes('K')) ||
            (state.id === 'q6' && structure.includes('K'));

          return (
            <g key={state.id}>
              {/* Initial state indicator */}
              {state.isInitial && (
                <line
                  x1={state.x - 50}
                  y1={state.y}
                  x2={state.x - 32}
                  y2={state.y}
                  stroke="#1a1a1a"
                  strokeWidth={2}
                  markerEnd="url(#arrowhead)"
                />
              )}
              
              {/* Outer circle for final state */}
              {isFinal && (
                <circle
                  cx={state.x}
                  cy={state.y}
                  r={35}
                  fill="none"
                  stroke="#B11226"
                  strokeWidth={3}
                />
              )}
              
              {/* Main circle */}
              <circle
                cx={state.x}
                cy={state.y}
                r={30}
                fill={isActive ? (isFinal ? '#B11226' : '#e0e7ff') : 'white'}
                stroke={isActive ? '#B11226' : '#6b7280'}
                strokeWidth={2.5}
              />
              
              {/* State label */}
              <text
                x={state.x}
                y={state.y + 5}
                textAnchor="middle"
                className={`font-mono ${isActive ? (isFinal ? 'fill-white' : 'fill-[#B11226]') : 'fill-gray-600'}`}
              >
                {state.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
