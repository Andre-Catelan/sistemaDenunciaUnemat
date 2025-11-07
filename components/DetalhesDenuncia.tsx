import React, { useState } from 'react';

interface DetalhesDenunciaProps {
  navigateBack: () => void;
}

const DetalhesDenuncia: React.FC<DetalhesDenunciaProps> = ({ navigateBack }) => {
  const [activeTab, setActiveTab] = useState<'messages' | 'attachments'>('messages');
  const [showSaveToast, setShowSaveToast] = useState(false);

  const handleSaveChanges = () => {
    // Lógica para salvar as alterações iria aqui.
    console.log('Alterações salvas.');
    setShowSaveToast(true);
    setTimeout(() => {
      setShowSaveToast(false);
    }, 4000); // Duração corresponde à animação fade-in-out
  };

  return (
    <>
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
        <header className="sticky top-0 z-10 w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
          <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-4 py-3">
            <div className="flex items-center gap-4">
              <div className="size-6 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Sistema de Denúncias</h2>
            </div>
            <div className="hidden md:flex flex-1 justify-center gap-8">
              <a href="#" onClick={(e) => { e.preventDefault(); navigateBack(); }} className="text-sm font-medium leading-normal">Dashboard</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateBack(); }} className="text-sm font-medium leading-normal">Minhas Tarefas</a>
              <a href="#" className="text-sm font-medium leading-normal">Relatórios</a>
              <a href="#" className="text-sm font-medium leading-normal">Configurações</a>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-transparent hover:bg-primary/10">
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark text-xl">notifications</span>
              </button>
              <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-transparent hover:bg-primary/10">
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark text-xl">help</span>
              </button>
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ml-2" style={{ backgroundImage: `url("https://picsum.photos/40/40")` }} data-alt="Avatar do usuário"></div>
            </div>
          </div>
        </header>
        <main className="flex-1 w-full container mx-auto p-4 md:p-6 lg:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <a href="#" onClick={(e) => { e.preventDefault(); navigateBack(); }} className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal hover:text-primary">Página Inicial</a>
              <span className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">/</span>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateBack(); }} className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal hover:text-primary">Minhas Tarefas</a>
              <span className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">/</span>
              <span className="text-text-light dark:text-text-dark text-sm font-medium leading-normal">Denúncia #ID-12345</span>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex min-w-72 flex-col gap-2">
                <p className="text-3xl font-black leading-tight tracking-[-0.033em]">Detalhes da Denúncia #ID-12345</p>
                <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal">Visualize e gerencie todos os detalhes da denúncia, incluindo status, mensagens e anexos.</p>
              </div>
              <button onClick={navigateBack} className="flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold leading-normal tracking-wide hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Voltar ao Painel
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <aside className="lg:col-span-1 flex flex-col gap-6">
                <div className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 flex flex-col gap-6">
                  <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Informações Gerais</h2>
                  <div className="flex flex-col gap-4">
                    <label className="flex flex-col">
                      <p className="text-sm font-medium leading-normal pb-2">Status</p>
                      <select className="form-select w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-primary focus:border-primary" defaultValue="Em Análise">
                        <option>Recebida</option>
                        <option>Em Análise</option>
                        <option>Aguardando Informações</option>
                        <option>Resolvida</option>
                        <option>Fechada</option>
                      </select>
                    </label>
                    <label className="flex flex-col">
                      <p className="text-sm font-medium leading-normal pb-2">Prioridade</p>
                      <select className="form-select w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-primary focus:border-primary" defaultValue="Média">
                        <option>Baixa</option>
                        <option>Média</option>
                        <option>Alta</option>
                      </select>
                    </label>
                    <button onClick={handleSaveChanges} className="w-full h-10 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed">Salvar Alterações</button>
                  </div>
                  <div className="border-t border-border-light dark:border-border-dark pt-4 flex flex-col gap-3 text-sm">
                    <div className="flex justify-between"><span className="text-text-muted-light dark:text-text-muted-dark">ID da Categoria:</span><span className="font-medium">CAT-08</span></div>
                    <div className="flex justify-between"><span className="text-text-muted-light dark:text-text-muted-dark">Unidade Responsável:</span><span className="font-medium">Ouvidoria - Cáceres</span></div>
                    <div className="flex justify-between"><span className="text-text-muted-light dark:text-text-muted-dark">Data de Abertura:</span><span className="font-medium">25/07/2024</span></div>
                    <div className="flex justify-between"><span className="text-text-muted-light dark:text-text-muted-dark">Última Atualização:</span><span className="font-medium">26/07/2024</span></div>
                  </div>
                </div>
              </aside>
              <div className="lg:col-span-2 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                <div className="flex border-b border-border-light dark:border-border-dark">
                  <button onClick={() => setActiveTab('messages')} className={`px-4 py-3 text-sm font-semibold ${activeTab === 'messages' ? 'border-b-2 border-primary text-primary' : 'text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:border-b-2 hover:border-primary/50'}`}>Histórico de Mensagens</button>
                  <button onClick={() => setActiveTab('attachments')} className={`px-4 py-3 text-sm font-semibold ${activeTab === 'attachments' ? 'border-b-2 border-primary text-primary' : 'text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:border-b-2 hover:border-primary/50'}`}>Anexos Enviados</button>
                </div>
                <div className="p-6 flex flex-col gap-6">
                  {activeTab === 'messages' && (
                    <>
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-3"><div className="size-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center"><span className="material-symbols-outlined text-primary">person</span></div><div className="flex-1 rounded-xl rounded-tl-none bg-background-light dark:bg-background-dark p-4"><div className="flex justify-between items-center mb-1"><p className="font-bold text-sm">Denunciante</p><p className="text-xs text-text-muted-light dark:text-text-muted-dark">25/07/2024 10:30</p></div><p className="text-sm">Estou formalizando a denúncia sobre a conduta inadequada de um servidor no setor de protocolo. Ele se recusa a fornecer informações básicas e trata os alunos com descaso.</p></div></div>
                        <div className="flex gap-3"><div className="flex-1 rounded-xl rounded-tr-none bg-primary/10 dark:bg-primary/20 p-4 text-right"><div className="flex justify-between items-center mb-1"><p className="text-xs text-text-muted-light dark:text-text-muted-dark">25/07/2024 11:15</p><p className="font-bold text-sm">Analista da Ouvidoria</p></div><p className="text-sm">Recebemos seu relato. Para darmos andamento, você poderia informar o dia e um horário aproximado do ocorrido? Alguma outra pessoa presenciou a cena?</p></div><div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center"><span className="material-symbols-outlined text-gray-600 dark:text-gray-300">support_agent</span></div></div>
                        <div className="flex gap-3"><div className="size-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center"><span className="material-symbols-outlined text-primary">person</span></div><div className="flex-1 rounded-xl rounded-tl-none bg-background-light dark:bg-background-dark p-4"><div className="flex justify-between items-center mb-1"><p className="font-bold text-sm">Denunciante</p><p className="text-xs text-text-muted-light dark:text-text-muted-dark">26/07/2024 09:00</p></div><p className="text-sm">Ocorreu ontem, por volta das 15h. Havia outros dois alunos na fila que também podem testemunhar. Não tenho os nomes, mas posso descrevê-los se ajudar.</p></div></div>
                      </div>
                      <div className="border-t border-border-light dark:border-border-dark pt-6">
                        <label className="flex flex-col w-full gap-2"><p className="text-sm font-medium">Responder ao denunciante</p><textarea className="form-textarea w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-primary focus:border-primary min-h-28" placeholder="Digite sua resposta aqui..."></textarea></label>
                        <button className="mt-4 h-10 px-6 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold tracking-[0.015em] hover:bg-primary/90">Enviar Mensagem</button>
                      </div>
                    </>
                  )}
                  {activeTab === 'attachments' && (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-3"><span className="material-symbols-outlined text-xl text-text-muted-light dark:text-text-muted-dark">draft</span><div className="flex flex-col"><p className="font-medium text-sm">Edital_Concurso_001-2024.pdf</p><p className="text-xs text-text-muted-light dark:text-text-muted-dark">Enviado em 26/07/2024</p></div></div>
                        <button className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg hover:bg-primary/10"><span className="material-symbols-outlined text-lg text-primary">download</span></button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-3"><span className="material-symbols-outlined text-xl text-text-muted-light dark:text-text-muted-dark">image</span><div className="flex flex-col"><p className="font-medium text-sm">Captura_Tela_Email.jpg</p><p className="text-xs text-text-muted-light dark:text-text-muted-dark">Enviado em 26/07/2024</p></div></div>
                        <button className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg hover:bg-primary/10"><span className="material-symbols-outlined text-lg text-primary">download</span></button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {showSaveToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-green-600 text-white py-3 px-5 rounded-lg shadow-lg animate-fade-in-out">
            <span className="material-symbols-outlined">check_circle</span>
            <span>Alteração salva!</span>
        </div>
      )}
    </>
  );
};

export default DetalhesDenuncia;