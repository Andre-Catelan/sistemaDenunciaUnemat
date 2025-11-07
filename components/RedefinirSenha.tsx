
import React, { useState } from 'react';

interface RedefinirSenhaProps {
  navigateBackToLogin: () => void;
}

const RedefinirSenha: React.FC<RedefinirSenhaProps> = ({ navigateBackToLogin }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Por favor, preencha ambos os campos de senha.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setError('');
    setShowToast(true);
    setTimeout(() => {
        setShowToast(false);
        navigateBackToLogin();
    }, 3000);
  };

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '40px' }}>shield</span>
              <span className="text-3xl font-bold text-gray-800 dark:text-white">Denúncia Segura</span>
            </div>
          </div>
          <div className="flex w-full flex-col gap-8 rounded-xl bg-surface-light dark:bg-surface-dark p-6 sm:p-8 shadow-lg border border-border-light dark:border-border-dark">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">Redefinir Senha</p>
              <p className="text-base font-normal text-text-muted-light dark:text-text-muted-dark">Crie uma nova senha para acessar sua conta.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <label className="flex flex-col w-full">
                <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">Nova Senha</p>
                <div className="relative flex w-full items-stretch">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4 text-text-muted-light dark:text-text-muted-dark">
                      <span className="material-symbols-outlined text-xl">lock</span>
                    </span>
                    <input 
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark h-12 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark pl-11 pr-4 text-base font-normal leading-normal" 
                      placeholder="Digite sua nova senha" 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
              </label>
              <label className="flex flex-col w-full">
                <p className="pb-2 text-sm font-medium text-text-light dark:text-text-dark">Confirmar Nova Senha</p>
                <div className="relative flex w-full items-stretch">
                   <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4 text-text-muted-light dark:text-text-muted-dark">
                      <span className="material-symbols-outlined text-xl">lock</span>
                    </span>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark h-12 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark pl-11 pr-4 text-base font-normal leading-normal" 
                    placeholder="Confirme sua nova senha" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </label>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400 border border-red-500/20">
                    <span className="material-symbols-outlined text-base">error</span>
                    <span>{error}</span>
                </div>
              )}
              
              <div className="flex justify-center pt-2">
                <button type="submit" className="flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-base font-bold leading-normal text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark">
                  <span className="truncate">Salvar Nova Senha</span>
                </button>
              </div>
            </form>
            <div className="text-center">
              <button onClick={navigateBackToLogin} className="text-sm text-primary hover:underline dark:text-primary/90">Lembrou sua senha? Voltar para o Login</button>
            </div>
          </div>
        </div>
      </div>
       {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white py-3 px-5 rounded-lg shadow-lg animate-fade-in-out dark:bg-slate-800">
            <span className="material-symbols-outlined text-green-400">task_alt</span>
            <span>Senha alterada com sucesso! Redirecionando...</span>
        </div>
      )}
    </>
  );
};

export default RedefinirSenha;
