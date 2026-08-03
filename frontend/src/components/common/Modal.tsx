// Modal = uma "janelinha" que aparece por cima da página.
// Usado tanto para formulários quanto para confirmar exclusões.
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { modalOpen } from '../../utils/gsapAnimations';

interface Props {
  aberto: boolean;
  titulo: string;
  onFechar: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ aberto, titulo, onFechar, children }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aberto && boxRef.current) {
      modalOpen(boxRef.current);
    }
  }, [aberto]);

  // Fecha o modal quando a pessoa aperta a tecla Esc (acessibilidade por teclado).
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onFechar();
    };
    if (aberto) document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [aberto, onFechar]);

  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
      onClick={onFechar}
    >
      <div
        ref={boxRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 id="modal-titulo" className="font-display text-xl text-[#1a1a1a]">
            {titulo}
          </h2>
          <button
            onClick={onFechar}
            aria-label="Fechar"
            className="text-gray-400 hover:text-black transition-colors"
          >
            <X size={22} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
