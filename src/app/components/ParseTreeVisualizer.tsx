import React from "react";
import type { ParseTreeNode } from "../utils/madureseParser";

export function ParseTreeVisualizer({ tree }: { tree: ParseTreeNode | null }) {
  if (!tree) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-900">Parse tree tidak tersedia.</p>
      </div>
    );
  }

  const renderNode = (node: ParseTreeNode) => {
    return (
      <div className="pl-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="px-2 py-1 bg-[#B11226]/10 text-[#B11226] rounded text-xs font-mono">
            {node.label}
          </div>
          {node.word && (
            <div className="text-sm text-gray-700">{node.word}</div>
          )}
        </div>

        {node.children && node.children.length > 0 && (
          <div className="border-l border-gray-200 ml-4 pl-4 space-y-3">
            {node.children.map((child, idx) => (
              <div key={idx}>{renderNode(child)}</div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      {renderNode(tree)}
    </div>
  );
}

export default ParseTreeVisualizer;
