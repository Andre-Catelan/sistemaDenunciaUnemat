
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

    const renderScreen = () => {
        switch (currentScreen) {
            case Screen.Home:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
                        <div className="flex items-center gap-4 text-slate-800 dark:text-white mb-8">
                            <div className="size-8 text-primary">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold">Sistema de Canal de Denúncias</h1>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <button onClick={() => setCurrentScreen(Screen.RegistrarNovaDenuncia)} className="w-full sm:w-auto px-6 py-3 rounded-lg text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg">
                                Registrar Nova Denúncia
                            </button>
                            <button onClick={() => setCurrentScreen(Screen.AcessoSeguro)} className="w-full sm:w-auto px-6 py-3 rounded-lg text-base font-medium text-white bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-lg">
                                Acompanhar Denúncia
                            </button>
                        </div>
                        <div className="mt-8">
                            <button onClick={() => setCurrentScreen(Screen.LoginAtendente)} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                                Acesso do Atendente
                            </button>
                        </div>
                    </div>
                );
            case Screen.RegistrarNovaDenuncia:
                return <RegistrarNovaDenuncia navigateToConfirmacao={() => setCurrentScreen(Screen.ConfirmacaoEnvio)} goHome={() => setCurrentScreen(Screen.Home)} />;
            case Screen.ConfirmacaoEnvio:
                return <ConfirmacaoEnvio navigateToAcompanhamento={() => setCurrentScreen(Screen.AcompanhamentoDenuncia)} goHome={() => setCurrentScreen(Screen.Home)} />;
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
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <h1 className="text-2xl font-bold">Página não encontrada</h1>
                        <button onClick={() => setCurrentScreen(Screen.Home)} className="mt-4 px-4 py-2 bg-primary text-white rounded">Voltar ao Início</button>
                    </div>
                );
        }
    };

    return <div className="min-h-screen">{renderScreen()}</div>;
};

export default App;
