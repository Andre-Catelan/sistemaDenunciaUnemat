
import React, { useState, useRef } from 'react';

interface RegistrarNovaDenunciaProps {
  navigateToConfirmacao: () => void;
  goHome: () => void;
}

const RegistrarNovaDenuncia: React.FC<RegistrarNovaDenunciaProps> = ({ navigateToConfirmacao, goHome }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files!)]);
    }
  };
  
  const removeFile = (fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
        setFiles(prevFiles => [...prevFiles, ...Array.from(event.dataTransfer.files)]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col dark group/design-root bg-background-light dark:bg-background-dark font-display">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-b-[#283039] px-4 sm:px-10 lg:px-20 py-3">
          <div className="flex items-center gap-4 text-slate-800 dark:text-white">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-slate-800 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Sistema de Denúncias</h2>
          </div>
          <div className="flex flex-1 justify-end gap-2 sm:gap-4">
            <div className="flex gap-2">
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 dark:bg-[#283039] text-slate-600 dark:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"><span className="material-symbols-outlined text-xl">dark_mode</span></button>
            </div>
          </div>
        </header>
        <main className="px-4 sm:px-10 lg:px-20 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3"><p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Registrar Nova Denúncia</p><p className="text-slate-500 dark:text-[#9dabb9] text-base font-normal leading-normal">Preencha o formulário abaixo para registrar sua denúncia. As informações fornecidas serão tratadas com confidencialidade.</p></div>
            </div>
            <form className="flex flex-col gap-8 p-4" onSubmit={(e) => { e.preventDefault(); navigateToConfirmacao(); }}>
              <section className="flex flex-col gap-4 border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900/30">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 border-b border-slate-200 dark:border-slate-800">Detalhes da Denúncia</h3>
                <div className="grid grid-cols-1 gap-6">
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Título da Denúncia <span className="text-red-500">*</span></p><input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-14 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal" placeholder="Digite um título breve e claro para a denúncia" /></label>
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Descrição detalhada do fato <span className="text-red-500">*</span></p><textarea className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] min-h-36 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal" placeholder="Descreva o ocorrido com o máximo de detalhes possível..."></textarea></label>
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Categoria <span className="text-red-500">*</span></p><select className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-14 p-[15px] text-base font-normal leading-normal"><option>Selecione uma categoria</option><option>Assédio Moral</option><option>Corrupção</option><option>Fraude</option><option>Outros</option></select></label>
                </div>
              </section>
              <section className="flex flex-col gap-4 border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900/30">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 border-b border-slate-200 dark:border-slate-800">Ocorrência</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Data do Fato <span className="text-red-500">*</span></p><input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-14 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal" type="date" /></label>
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Local do Fato <span className="text-red-500">*</span></p><input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-14 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal" placeholder="Cidade, estado ou endereço completo" /></label>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Unidade Envolvida <span className="text-red-500">*</span></p><select className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-14 p-[15px] text-base font-normal leading-normal"><option>Selecione uma unidade</option><option>Unidade Central - São Paulo</option><option>Filial - Rio de Janeiro</option><option>Centro de Distribuição - Bahia</option><option>Não se aplica</option></select></label>
                </div>
              </section>
              <section className="flex flex-col gap-4 border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900/30">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 border-b border-slate-200 dark:border-slate-800">Anexos e Evidências</h3>
                <div onClick={() => fileInputRef.current?.click()} onDrop={handleDrop} onDragOver={handleDragOver} className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                  <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                  <span className="material-symbols-outlined text-5xl text-slate-400 dark:text-slate-500">upload_file</span>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">Arraste e solte os arquivos aqui</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">ou</p>
                  <button type="button" className="mt-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">Procurar Arquivos</button>
                </div>
                {files.length > 0 &&
                  <div className="flex flex-col gap-4 mt-4">
                    <p className="text-slate-700 dark:text-white text-base font-medium leading-normal">Arquivos Carregados</p>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800/70">
                        <span className="material-symbols-outlined text-slate-500">{file.type.startsWith('image/') ? 'image' : 'description'}</span>
                        <div className="flex-grow"><p className="text-sm font-medium text-slate-800 dark:text-slate-200">{file.name}</p><p className="text-xs text-slate-500 dark:text-slate-400">{(file.size / 1024).toFixed(2)} KB</p></div>
                        <button type="button" onClick={() => removeFile(file.name)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"><span className="material-symbols-outlined text-red-500">delete</span></button>
                      </div>
                    ))}
                  </div>
                }
              </section>
              <footer className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6">
                <button type="button" onClick={goHome} className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600">Cancelar</button>
                <button type="submit" className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-white bg-primary hover:bg-primary/90">Enviar Denúncia</button>
              </footer>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegistrarNovaDenuncia;
