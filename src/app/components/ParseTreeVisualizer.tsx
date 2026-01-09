import React from "react";
import type { ParseTreeNode } from "../utils/madureseParser";

export function ParseTreeVisualizer({ tree }: { tree: ParseTreeNode | null }) {
  if (!tree) return null;

  const renderNode = (node: ParseTreeNode) => {
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="flex flex-col items-center flex-1">
        <div className="relative flex flex-col items-center">
          {/* Box Node */}
          <div className={`
            px-3 py-1 rounded border shadow-sm text-xs font-mono
            ${node.word 
              ? "bg-white border-gray-200 text-gray-600" 
              : "bg-[#B11226] border-[#B11226] text-white font-bold"}
          `}>
            {node.label}
          </div>

          {/* Label Kata di bawah node terminal */}
          {node.word && (
            <div className="mt-1 text-[#B11226] font-medium italic text-xs">
              {node.word}
            </div>
          )}

          {hasChildren && <div className="w-px h-4 bg-gray-300"></div>}
        </div>

        {hasChildren && (
          <div className="relative flex gap-2 w-full justify-center">
            {/* Garis Horizontal Penghubung */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gray-300 mx-auto w-[80%]"></div>
            
            {node.children!.map((child, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-px h-2 bg-gray-300"></div>
                {renderNode(child)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto p-4 bg-white">
      <div className="min-w-max flex justify-center">
        {renderNode(tree)}
      </div>
    </div>
  );
}

export default ParseTreeVisualizer;