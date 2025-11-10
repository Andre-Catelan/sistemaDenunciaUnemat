
import React, { useState } from 'react';
import { Screen } from './types';
import AcompanhamentoDenuncia from './components/AcompanhamentoDenuncia';
import ConfirmacaoEnvio from './components/ConfirmacaoEnvio';
import DetalhesDenuncia from './components/DetalhesDenuncia';
import LoginAtendente from './components/LoginAtendente';
import PainelDenunciaAtendente from './components/PainelDenunciaAtendente';
import RegistrarNovaDenuncia from './components/RegistrarNovaDenuncia';
import AcessoSeguro from './components/AcessoSeguro';
import RecuperarSenha from './components/RecuperarSenha';
import RedefinirSenha from './components/RedefinirSenha';

const App: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);
    const [denunciaInfo, setDenunciaInfo] = useState<{ protocolo: string; senha: string } | null>(null);

    const handleNavigateToConfirmacao = (protocolo: string, senha: string) => {
        setDenunciaInfo({ protocolo, senha });
        setCurrentScreen(Screen.ConfirmacaoEnvio);
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case Screen.Home:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
                        <div className="flex items-center gap-4 text-slate-800 dark:text-white mb-8">
                            <div className="size-16 text-primary">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h1 className="text-4xl font-black tracking-tight">Canal de Denúncias</h1>
                        </div>
                        <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg p-8 w-full max-w-lg text-center">
                            <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Bem-vindo(a) ao Canal de Denúncias</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">Um ambiente seguro e confidencial para relatar condutas inadequadas.</p>
                            <div className="space-y-4">
                                <button onClick={() => setCurrentScreen(Screen.RegistrarNovaDenuncia)} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors text-lg">
                                    Registrar Nova Denúncia
                                </button>
                                <button onClick={() => setCurrentScreen(Screen.AcessoSeguro)} className="w-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-lg">
                                    Acompanhar Denúncia
                                </button>
                            </div>
                        </div>
                        <button onClick={() => setCurrentScreen(Screen.LoginAtendente)} className="absolute bottom-6 right-6 text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary">
                            Acesso para Atendentes
                        </button>
                    </div>
                );
            case Screen.RegistrarNovaDenuncia:
                return <RegistrarNovaDenuncia navigateToConfirmacao={handleNavigateToConfirmacao} goHome={() => setCurrentScreen(Screen.Home)} />;
            case Screen.ConfirmacaoEnvio:
                return <ConfirmacaoEnvio denunciaInfo={denunciaInfo!} navigateToAcompanhamento={() => setCurrentScreen(Screen.AcessoSeguro)} goHome={() => setCurrentScreen(Screen.Home)} />;
            case Screen.AcompanhamentoDenuncia:
                return <AcompanhamentoDenuncia goHome={() => setCurrentScreen(Screen.Home)} />;
            case Screen.LoginAtendente:
                return <LoginAtendente navigateToPainel={() => setCurrentScreen(Screen.PainelDenunciaAtendente)} goHome={() => setCurrentScreen(Screen.Home)} navigateToRecuperarSenha={() => setCurrentScreen(Screen.RecuperarSenha)} />;
            case Screen.PainelDenunciaAtendente:
                return <PainelDenunciaAtendente navigateToDetalhes={() => setCurrentScreen(Screen.DetalhesDenuncia)} navigateToLogin={() => setCurrentScreen(Screen.LoginAtendente)} />;
            case Screen.DetalhesDenuncia:
                return <DetalhesDenuncia navigateBack={() => setCurrentScreen(Screen.PainelDenunciaAtendente)} />;
            case Screen.AcessoSeguro:
                return <AcessoSeguro navigateToNext={() => setCurrentScreen(Screen.AcompanhamentoDenuncia)} navigateBack={() => setCurrentScreen(Screen.Home)} />;
            case Screen.RecuperarSenha:
                return <RecuperarSenha navigateBackToLogin={() => setCurrentScreen(Screen.LoginAtendente)} navigateToRedefinirSenha={() => setCurrentScreen(Screen.RedefinirSenha)} />;
            case Screen.RedefinirSenha:
                return <RedefinirSenha navigateBackToLogin={() => setCurrentScreen(Screen.LoginAtendente)} />;
            default:
                return <div>Página não encontrada</div>;
        }
    };

    return <>{renderScreen()}</>;
};

export default App;
