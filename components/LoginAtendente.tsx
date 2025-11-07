
import React, { useState } from 'react';

interface LoginAtendenteProps {
  navigateToPainel: () => void;
  goHome: () => void;
  navigateToRecuperarSenha: () => void;
}

const LoginAtendente: React.FC<LoginAtendenteProps> = ({ navigateToPainel, goHome, navigateToRecuperarSenha }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setError('');
      navigateToPainel();
    } else {
      setError('Email e senha são obrigatórios.');
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col font-display group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center items-center p-4 sm:p-6 md:p-8">
          <div className="layout-content-container flex flex-col w-full max-w-[480px]">
            <header className="flex items-center justify-center whitespace-nowrap px-10 py-6">
              <div className="flex items-center gap-4 text-slate-800 dark:text-white">
                <div className="size-6 text-primary">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h2 className="text-slate-800 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Sistema de Denúncias</h2>
              </div>
            </header>
            <div className="flex flex-col gap-8 rounded-xl bg-white dark:bg-[#111a22] p-6 sm:p-8 md:p-10 shadow-lg border border-slate-200 dark:border-[#233648]">
              <div className="flex flex-wrap justify-between gap-3">
                <div className="flex w-full flex-col gap-2 text-center">
                  <p className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Acesso do Atendente</p>
                  <p className="text-slate-500 dark:text-[#92adc9] text-base font-normal leading-normal">Utilize suas credenciais para acessar o painel de denúncias.</p>
                </div>
              </div>
              <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
                <label className="flex flex-col w-full">
                  <p className="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2">Email</p>
                  <div className="relative flex w-full items-stretch">
                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-12 placeholder:text-slate-400 dark:placeholder:text-[#92adc9] pl-11 pr-4 text-base font-normal leading-normal" placeholder="Digite seu email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4 text-slate-400 dark:text-[#92adc9]">
                      <span className="material-symbols-outlined text-xl">mail</span>
                    </div>
                  </div>
                </label>
                <label className="flex flex-col w-full">
                  <p className="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2">Senha</p>
                  <div className="relative flex w-full items-stretch">
                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-12 placeholder:text-slate-400 dark:placeholder:text-[#92adc9] pl-11 pr-4 text-base font-normal leading-normal" placeholder="Digite sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4 text-slate-400 dark:text-[#92adc9]">
                      <span className="material-symbols-outlined text-xl">lock</span>
                    </div>
                  </div>
                </label>
                <div className="text-right -mt-4">
                  <button
                    type="button"
                    onClick={navigateToRecuperarSenha}
                    className="text-sm font-medium text-primary hover:underline focus:outline-none"
                  >
                    Esqueceu sua senha?
                  </button>
                </div>
                <div className="flex flex-col-reverse sm:flex-row-reverse gap-4">
                  <button type="submit" className="flex items-center justify-center whitespace-nowrap h-12 px-6 rounded-lg w-full sm:w-auto bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-background-dark">Entrar</button>
                  <button type="button" onClick={goHome} className="flex items-center justify-center whitespace-nowrap h-12 px-6 rounded-lg w-full sm:w-auto bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-base font-bold leading-normal tracking-wide shadow-sm hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-background-dark">Voltar</button>
                </div>
                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 border border-red-500/20">
                    <span className="material-symbols-outlined">error</span>
                    <span>{error}</span>
                  </div>
                )}
              </form>
            </div>
            <footer className="w-full text-center py-6 px-4">
              <p className="text-slate-500 dark:text-[#92adc9] text-sm font-normal">© 2024 Sistema de Denúncias. Todos os direitos reservados.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAtendente;