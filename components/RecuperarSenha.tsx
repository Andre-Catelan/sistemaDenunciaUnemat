
import React, { useState } from 'react';

interface RecuperarSenhaProps {
  navigateBackToLogin: () => void;
  navigateToRedefinirSenha: () => void;
}

const RecuperarSenha: React.FC<RecuperarSenhaProps> = ({ navigateBackToLogin, navigateToRedefinirSenha }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const validateEmail = (emailToValidate: string) => {
    if (!emailToValidate) {
      return "O e-mail é obrigatório.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToValidate)) {
      return "Formato de e-mail inválido.";
    }
    return "";
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (error) {
      setError(validateEmail(newEmail));
    }
  };

  const handleBlur = () => {
    setError(validateEmail(email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    navigateToRedefinirSenha();
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex h-full grow flex-col">
        <header className="flex items-center justify-center whitespace-nowrap px-6 sm:px-10 py-4">
          <div className="flex items-center gap-3 text-text-light dark:text-text-dark">
            <div className="size-6 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
              </svg>
            </div>
            <h1 className="text-lg font-bold">Sistema de Denúncias</h1>
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-stretch justify-start rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-lg">
              <div className="flex flex-col items-stretch justify-center gap-6 p-8">
                <div className="flex flex-col gap-2 text-center">
                  <h2 className="text-2xl font-bold tracking-tight text-text-light dark:text-text-dark">Esqueceu sua senha?</h2>
                  <p className="text-text-muted-light dark:text-text-muted-dark">Insira seu e-mail abaixo para receber o link de recuperação.</p>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5" htmlFor="email_or_username">E-mail</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">mail</span>
                      </div>
                      <input
                        className={`block w-full rounded-lg bg-background-light dark:bg-background-dark pl-10 text-text-light dark:text-text-dark placeholder-text-muted-light dark:placeholder-text-muted-dark ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-border-light dark:border-border-dark focus:border-primary focus:ring-primary'}`}
                        id="email_or_username"
                        name="email_or_username"
                        placeholder="seuemail@exemplo.com"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!error}
                        aria-describedby="email-error"
                        required
                      />
                    </div>
                     {error && <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>}
                  </div>
                  <button className="w-full justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark disabled:cursor-not-allowed disabled:opacity-50" type="submit">Enviar Instruções</button>
                </form>
                <div className="text-center">
                  <button onClick={navigateBackToLogin} className="text-sm text-primary hover:underline">Lembrou a senha? Voltar ao Login</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecuperarSenha;
