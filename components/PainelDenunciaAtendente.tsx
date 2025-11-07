import React from 'react';

interface PainelDenunciaAtendenteProps {
  navigateToDetalhes: () => void;
  navigateToLogin: () => void;
}

const PainelDenunciaAtendente: React.FC<PainelDenunciaAtendenteProps> = ({ navigateToDetalhes, navigateToLogin }) => {
  const denuncias = [
    {
      titulo: "Conduta inadequada em sala",
      protocolo: "#2024-5843",
      status: "Nova",
      statusColor: "red",
      local: "15/07/2024 - Bloco de Letras"
    },
    {
      titulo: "Uso indevido de laboratório",
      protocolo: "#2024-5842",
      status: "Em Análise",
      statusColor: "amber",
      local: "14/07/2024 - Bloco de Computação"
    },
    {
      titulo: "Assédio moral por servidor",
      protocolo: "#2024-5841",
      status: "Nova",
      statusColor: "red",
      local: "13/07/2024 - Biblioteca Central"
    },
    {
      titulo: "Problema na infraestrutura",
      protocolo: "#2024-5840",
      status: "Concluída",
      statusColor: "green",
      local: "12/07/2024 - Campus Jane Vanini"
    },
    {
      titulo: "Conflito de interesse",
      protocolo: "#2024-5839",
      status: "Em Análise",
      statusColor: "amber",
      local: "11/07/2024 - Reitoria"
    }
  ];

  const getStatusClass = (statusColor: string) => {
    switch (statusColor) {
      case 'red':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'amber':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
      case 'green':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };


  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-gray-900/50 p-4 border-r border-gray-200 dark:border-gray-800">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("https://picsum.photos/40/40")` }} data-alt="Avatar do atendente"></div>
            <div className="flex flex-col">
              <h1 className="text-gray-900 dark:text-white text-base font-medium leading-normal">Atendente Silva</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">atendente@email.com</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-primary"><span className="material-symbols-outlined">dashboard</span><p className="text-sm font-medium leading-normal">Dashboard</p></a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><span className="material-symbols-outlined">assignment_turned_in</span><p className="text-sm font-medium leading-normal">Minhas Tarefas</p></a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><span className="material-symbols-outlined">bar_chart</span><p className="text-sm font-medium leading-normal">Relatórios</p></a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><span className="material-symbols-outlined">settings</span><p className="text-sm font-medium leading-normal">Configurações</p></a>
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-1">
          <button onClick={navigateToLogin} className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><span className="material-symbols-outlined">logout</span><p className="text-sm font-medium leading-normal">Logout</p></button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 px-4 sm:px-10 py-3 bg-white dark:bg-gray-900/50">
          <div className="flex items-center gap-4 text-gray-800 dark:text-white">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Ouvidoria UNEMAT - Cáceres</h2>
          </div>
          <div className="flex flex-1 justify-end gap-4">
            <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-gray-400 flex border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg"><span className="material-symbols-outlined">search</span></div>
                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-inset border border-l-0 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 h-full placeholder:text-gray-400 px-4 text-base font-normal leading-normal" placeholder="Buscar..." />
              </div>
            </label>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-transparent text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"><span className="material-symbols-outlined">notifications</span></button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("https://picsum.photos/40/40")` }} data-alt="Avatar do atendente"></div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="flex flex-wrap justify-between gap-3"><p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Painel de Denúncias</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"><p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">Novas Denúncias</p><p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">12</p><p className="text-green-500 text-sm font-medium leading-normal">+5.2%</p></div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"><p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">Em Apuração</p><p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">5</p><p className="text-green-500 text-sm font-medium leading-normal">+1.8%</p></div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"><p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">Casos Finalizados</p><p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">89</p><p className="text-red-500 text-sm font-medium leading-normal">-0.5%</p></div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"><p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">Tempo Médio de Análise</p><p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">2.1 dias</p><p className="text-green-500 text-sm font-medium leading-normal">+3.0%</p></div>
          </div>
          <div className="mt-8 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl">
            <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-6 pb-3 pt-5">Lista de Denúncias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b border-gray-200 dark:border-gray-800">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="status-filter">Status</label><select className="form-select w-full rounded-lg bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary" id="status-filter"><option>Todos</option><option>Nova</option><option>Em Análise</option><option>Concluída</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="unit-filter">Local</label><select className="form-select w-full rounded-lg bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary" id="unit-filter"><option>Todos</option><option>Campus Jane Vanini</option><option>Bloco de Letras</option><option>Bloco de História</option><option>Biblioteca Central</option></select></div>
              <div className="md:col-span-2 lg:col-span-2 flex items-end gap-3"><button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"><span className="material-symbols-outlined text-base">filter_alt</span>Aplicar Filtros</button><button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"><span className="material-symbols-outlined text-base">close</span>Limpar</button></div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Título</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Protocolo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Data / Local</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {denuncias.map((denuncia, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{denuncia.titulo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{denuncia.protocolo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"><span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(denuncia.statusColor)}`}>{denuncia.status}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{denuncia.local}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button onClick={navigateToDetalhes} className="text-primary hover:text-primary/80">Visualizar</button></td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm text-gray-500 dark:text-gray-400">Mostrando 1 a 5 de 23 resultados</span>
              <div className="inline-flex rounded-lg shadow-sm">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700">Anterior</button>
                <button className="relative inline-flex items-center px-4 py-2 -ml-px border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Próximo</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PainelDenunciaAtendente;