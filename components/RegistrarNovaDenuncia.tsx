
import React, { useState, useRef, useEffect } from 'react';

interface RegistrarNovaDenunciaProps {
  navigateToConfirmacao: (protocolo: string, senha: string) => void;
  goHome: () => void;
}

interface FormData {
  titulo: string;
  descricao: string;
  id_categoria: string;
  data_fato: string;
  local_fato: string;
  id_unidade: string;
}

const ApiStatusIndicator: React.FC<{ status: 'checking' | 'online' | 'offline' }> = ({ status }) => {
    if (status === 'checking') {
        return (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                <p className="text-sm font-medium">Verificando conexão com a API...</p>
            </div>
        );
    }

    if (status === 'online') {
        return (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <p className="text-sm font-medium">Conexão com a API estabelecida com sucesso!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 p-4 rounded-lg bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20">
            <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xl mt-0.5">error</span>
                <div>
                    <p className="text-base font-bold">Falha de Conexão: Problema de CORS</p>
                    <p className="text-sm mt-1">
                        O teste de conexão <code className="text-xs bg-red-200 dark:bg-red-900/50 p-1 rounded">curl</code> foi bem-sucedido, o que confirma que sua API está no ar. O erro atual é causado pela política de segurança (CORS) do navegador.
                    </p>
                    <p className="text-sm mt-2 font-semibold">Para corrigir, adicione a seguinte classe de configuração <code className="text-xs bg-red-200 dark:bg-red-900/50 p-1 rounded">WebConfig.java</code> ao seu projeto Spring Boot:</p>
                </div>
            </div>
            <pre className="w-full bg-slate-900 text-slate-300 p-3 rounded-md text-xs overflow-x-auto">
                <code>
{`import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                // Mude para a URL do seu frontend em produção
                .allowedOrigins("*") 
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
`}
                </code>
            </pre>
            <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xl mt-0.5 text-amber-500">info</span>
                <div>
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-400">Instruções Importantes:</p>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                        <li>Coloque este arquivo Java em um pacote de configuração do seu projeto (ex: <code className="text-xs">com.seuprojeto.config</code>).</li>
                        <li><strong>REINICIE O SERVIDOR JAVA</strong> após adicionar o arquivo para que a alteração tenha efeito.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};


const RegistrarNovaDenuncia: React.FC<RegistrarNovaDenunciaProps> = ({ navigateToConfirmacao, goHome }) => {
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descricao: '',
    id_categoria: '',
    data_fato: '',
    local_fato: '',
    id_unidade: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const apiUrl = 'http://127.0.0.1:8081/api/denuncias';

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const checkApi = async () => {
        try {
            // An OPTIONS request is a lightweight way to check if the server is up and if CORS is configured.
            // The browser will handle the preflight check. If it fails, fetch() will throw an error.
            await fetch(apiUrl, {
                method: 'OPTIONS',
                signal: controller.signal,
                headers: {
                  'Access-Control-Request-Method': 'POST',
                  'Access-Control-Request-Headers': 'content-type'
                }
            });
            // If the fetch promise resolves, it means the server responded.
            setApiStatus('online');
        } catch (e) {
            setApiStatus('offline');
        } finally {
            clearTimeout(timeoutId);
        }
    };

    checkApi();
  }, [apiUrl]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (apiStatus === 'offline') {
        setError("Não é possível enviar a denúncia. Siga as instruções sobre CORS acima.");
        return;
    }

    // Validação básica
    if (!formData.titulo || !formData.descricao || !formData.id_categoria || !formData.data_fato || !formData.local_fato || !formData.id_unidade) {
        setError("Todos os campos marcados com * são obrigatórios.");
        return;
    }
    
    setIsSubmitting(true);
    try {
      // O backend espera números para os IDs, então convertemos aqui.
      const payload = {
          ...formData,
          id_categoria: parseInt(formData.id_categoria, 10),
          id_unidade: parseInt(formData.id_unidade, 10),
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Tenta extrair uma mensagem de erro do backend, se houver.
        const errorData = await response.json().catch(() => ({ message: `O servidor respondeu com o status ${response.status}.` }));
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      // O backend deve retornar um objeto com `protocolo` e `senhaAcesso`
      navigateToConfirmacao(result.protocolo, result.senhaAcesso);

    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch')) {
             setError('Falha ao enviar denúncia: Não foi possível conectar ao servidor. Verifique sua conexão e se a API está no ar.');
        } else {
             setError(`Falha ao enviar denúncia: ${err.message}.`);
        }
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="px-4 pb-4">
                <ApiStatusIndicator status={apiStatus} />
            </div>
            <form className="flex flex-col gap-8 p-4 pt-0" onSubmit={handleSubmit}>
              <section className="flex flex-col gap-4 border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900/30">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 border-b border-slate-200 dark:border-slate-800">Detalhes da Denúncia</h3>
                <div className="grid grid-cols-1 gap-6">
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Título da Denúncia <span className="text-red-500">*</span></p><input name="titulo" value={formData.titulo} onChange={handleInputChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-14 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal" placeholder="Digite um título breve e claro para a denúncia" /></label>
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Descrição detalhada do fato <span className="text-red-500">*</span></p><textarea name="descricao" value={formData.descricao} onChange={handleInputChange} className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] min-h-36 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal" placeholder="Descreva o ocorrido com o máximo de detalhes possível..."></textarea></label>
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Categoria <span className="text-red-500">*</span></p><select name="id_categoria" value={formData.id_categoria} onChange={handleInputChange} className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-14 p-[15px] text-base font-normal leading-normal"><option value="">Selecione uma categoria</option><option value="1">Assédio Moral</option><option value="2">Corrupção</option><option value="3">Fraude</option><option value="4">Conduta Inadequada</option><option value="5">Outros</option></select></label>
                </div>
              </section>
              <section className="flex flex-col gap-4 border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900/30">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 border-b border-slate-200 dark:border-slate-800">Ocorrência</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Data do Fato <span className="text-red-500">*</span></p><input name="data_fato" value={formData.data_fato} onChange={handleInputChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-14 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal" type="date" /></label>
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Local do Fato <span className="text-red-500">*</span></p><input name="local_fato" value={formData.local_fato} onChange={handleInputChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-14 placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] p-[15px] text-base font-normal leading-normal" placeholder="Ex: Campus UNEMAT - Cáceres, Bloco de História" /></label>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <label className="flex flex-col w-full"><p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Unidade Envolvida <span className="text-red-500">*</span></p><select name="id_unidade" value={formData.id_unidade} onChange={handleInputChange} className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#3b4754] bg-background-light dark:bg-[#1c2127] h-14 p-[15px] text-base font-normal leading-normal"><option value="">Selecione uma unidade</option><option value="1">Reitoria</option><option value="2">Ouvidoria - Cáceres</option><option value="3">Departamento de História</option><option value="4">Biblioteca Central</option><option value="5">Não se aplica</option></select></label>
                </div>
              </section>
              <section className="flex flex-col gap-4 border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900/30">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 border-b border-slate-200 dark:border-slate-800">Anexos e Evidências (Opcional)</h3>
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
               {error && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20">
                  <span className="material-symbols-outlined">error</span>
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
              <footer className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6">
                <button type="button" onClick={goHome} disabled={isSubmitting} className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50">Cancelar</button>
                <button type="submit" disabled={isSubmitting || apiStatus !== 'online'} className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Enviando...' : 'Enviar Denúncia'}
                </button>
              </footer>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegistrarNovaDenuncia;
