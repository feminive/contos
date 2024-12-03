import { useState } from 'react';

export default function TextSizeAdjuster() {
  const [fontSize, setFontSize] = useState(16); // Tamanho inicial do texto

  const increaseFontSize = () => setFontSize(prevSize => prevSize + 2); // Aumenta o tamanho do texto
  const decreaseFontSize = () => setFontSize(prevSize => Math.max(prevSize - 2, 12)); // Diminui o tamanho do texto (mínimo de 12)

  return (
    <div>
      <div className="bg-black p-2 flex justify-end gap-4">
        <button 
          onClick={increaseFontSize} 
          className="text-white hover:bg-gray-700 px-3 py-1 rounded"
        >
          Aumentar texto
        </button>
        <button 
          onClick={decreaseFontSize} 
          className="text-white hover:bg-gray-700 px-3 py-1 rounded"
        >
          Diminuir texto
        </button>
      </div>
      <div style={{ fontSize: `${fontSize}px` }} className="my-4">
        <p>Texto aqui. Ajuste o tamanho usando os botões acima.</p>
      </div>
    </div>
  );
}
