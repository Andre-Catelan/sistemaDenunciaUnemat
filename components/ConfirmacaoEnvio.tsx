
import React, { useState } from 'react';

interface ConfirmacaoEnvioProps {
  navigateToAcompanhamento: () => void;
  goHome: () => void;
}

const ConfirmacaoEnvio: React.FC<ConfirmacaoEnvioProps> = ({ navigateToAcompanhamento, goHome }) => {
  const protocol = `PROTO-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const [showToast, setShowToast] = useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }).catch(err => {
      console.error('Falha ao copiar: ', err);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 flex flex-1 justify-center py-10 md:py-20">
          <div className="layout-content-container flex flex-col w-full max-w-[720px] flex-1">
            <div className="printable-content flex flex-col items-center justify-center bg-white dark:bg-[#1a232c] rounded-xl shadow-lg p-6 md:p-10 text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                <span className="material-symbols-outlined text-4xl text-green-500">check_circle</span>
              </div>
              <div className="flex flex-col gap-3 mb-8">
                <p className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Denúncia Enviada com Sucesso!</p>
                <p className="text-gray-600 dark:text-[#9dabb9] text-base font-normal leading-normal max-w-lg mx-auto">Agradecemos a sua contribuição. As informações abaixo são essenciais para o acompanhamento da sua denúncia.</p>
              </div>
              <div className="w-full max-w-md border border-gray-200 dark:border-gray-700 rounded-lg mb-8">
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-gray-500 dark:text-[#9dabb9] text-sm font-normal leading-normal">Número de Protocolo</p>
                    <p className="text-gray-900 dark:text-white text-lg font-bold leading-normal tracking-wide">{protocol}</p>
                  </div>
                  <button onClick={() => copyToClipboard(protocol)} className="no-print flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined text-base">content_copy</span>
                    <span className="truncate">Copiar</span>
                  </button>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-gray-500 dark:text-[#9dabb9] text-sm font-normal leading-normal">Código de Acesso</p>
                    <p className="text-gray-900 dark:text-white text-lg font-bold leading-normal tracking-wide">{accessCode}</p>
                  </div>
                  <button onClick={() => copyToClipboard(accessCode)} className="no-print flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined text-base">content_copy</span>
                    <span className="truncate">Copiar</span>
                  </button>
                </div>
              </div>
              <div className="w-full max-w-md bg-yellow-400/10 dark:bg-yellow-500/10 border-l-4 border-yellow-400 dark:border-yellow-500 rounded p-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-yellow-500 dark:text-yellow-400 mt-0.5">warning</span>
                  <div className="flex flex-col items-start text-left">
                    <p className="text-yellow-800 dark:text-yellow-300 text-base font-bold leading-tight">Atenção!</p>
                    <p className="text-yellow-700 dark:text-yellow-300/80 text-sm font-normal leading-normal">Guarde seu código de acesso em um local seguro. Ele é a única forma de acessar sua denúncia no futuro e não pode ser recuperado.</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal mb-6">Use as informações acima para verificar o status da sua denúncia.</p>
              <div className="no-print grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg">
                <button onClick={navigateToAcompanhamento} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                  <span className="truncate">Acompanhar Denúncia</span>
                </button>
                <button onClick={handlePrint} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-slate-600 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-slate-700 transition-all duration-150 active:scale-95 gap-2">
                  <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                  <span className="truncate">Salvar PDF</span>
                </button>
                <button onClick={goHome} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200 dark:bg-[#283039] text-gray-800 dark:text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-[#3b4754] transition-colors">
                  <span className="truncate">Voltar ao Início</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-green-600 text-white py-3 px-5 rounded-lg shadow-lg animate-fade-in-out">
            <span className="material-symbols-outlined">check_circle</span>
            <span>Copiado!</span>
        </div>
      )}
    </div>
  );
};

export default ConfirmacaoEnvio;
