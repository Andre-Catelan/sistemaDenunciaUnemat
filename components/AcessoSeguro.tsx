
import React, { useRef, useState } from 'react';

interface AcessoSeguroProps {
  navigateToNext: () => void;
  navigateBack: () => void;
}

const AcessoSeguro: React.FC<AcessoSeguroProps> = ({ navigateToNext, navigateBack }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState('');

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    if (error) setError('');
    const input = e.currentTarget;
    if (input.value.length === 1 && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const input = e.currentTarget;
    if (e.key === 'Backspace' && input.value === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = inputsRef.current.map(input => input?.value).join('');
    if (code.length === 6) {
      setError('');
      navigateToNext();
    } else {
      setError('Por favor, preencha o código de acesso completo.');
    }
  };


  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display">
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="flex w-full max-w-md flex-col items-center">
            {/* Header */}
            <header className="mb-8 flex w-full items-center justify-center whitespace-nowrap border-b border-gray-200/20 dark:border-white/10 pb-4">
              <div className="flex items-center gap-4 text-gray-800 dark:text-white">
                <div className="size-6 text-primary">
                  <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">Sistema de Denúncias</h2>
              </div>
            </header>
            <main className="w-full">
              {/* Heading */}
              <div className="flex flex-col gap-3 p-4 text-center">
                <h1 className="font-display text-3xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-4xl">Acompanhar Denúncia</h1>
                <p className="text-base text-gray-600 dark:text-gray-400">Insira o código de acesso de 6 caracteres recebido no registro da sua denúncia.</p>
              </div>
              {/* Code Input */}
              <div className="flex justify-center px-4 py-6">
                <fieldset className="relative flex gap-2 sm:gap-4">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      ref={el => { inputsRef.current[i] = el; }}
                      className="flex h-14 w-12 appearance-none rounded-lg border border-gray-300 bg-white text-center text-xl font-bold text-gray-900 ring-offset-background-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:ring-offset-background-dark dark:focus:border-primary"
                      inputMode="text"
                      maxLength={1}
                      onInput={(e: React.FormEvent<HTMLInputElement>) => handleInput(e, i)}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, i)}
                      type="text"
                    />
                  ))}
                </fieldset>
              </div>
               {error && (
                <div className="flex items-center justify-center gap-2 mt-2 px-4 text-sm text-red-600 dark:text-red-400">
                    <span className="material-symbols-outlined text-base">error</span>
                    <span>{error}</span>
                </div>
              )}
              {/* Buttons */}
              <div className="mt-4 flex justify-center">
                <div className="flex w-full flex-col gap-3 px-4 py-3 sm:flex-row">
                  <button onClick={navigateBack} className="flex h-12 flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-200 text-base font-bold text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                    <span className="truncate">Voltar</span>
                  </button>
                  <button onClick={handleSubmit} className="flex h-12 flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary text-base font-bold text-white transition-colors hover:bg-primary/90">
                    <span className="truncate">Acessar</span>
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcessoSeguro;
