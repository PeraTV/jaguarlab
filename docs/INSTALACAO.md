# Instalação e atualizações

[Página principal e downloads](../README.md) · [Ajuda](SUPORTE.md)

## Android — celular e tablet

Baixe **JaguarLab-0.5.3-Android.apk** nos downloads oficiais. Requer Android 7 ou superior. Abra o arquivo, autorize a instalação pela origem usada se o Android solicitar e confirme a instalação no sistema. Em uma atualização, instale por cima; não desinstale para trocar de versão.

Dentro do app, toque em Atualizar e Verificar atualização. Quando houver uma versão nova, baixe e aguarde a conferência de tamanho, integridade, pacote, versão e assinatura. O app abre a tela de instalação; a confirmação final é sua no Android. Se for necessário autorizar a origem, volte ao app após liberar. O botão Instalar continua como alternativa se o sistema impedir a abertura automática.

A velocidade depende do caminho até o GitHub e não apenas da intensidade do Wi-Fi. O download prioriza Releases e possui um link alternativo. Versões antigas usam seu próprio mecanismo para baixar a primeira atualização; as melhorias do mecanismo só passam a valer após instalar a versão nova.

## Windows 64 bits

Baixe **JaguarLab-0.5.3-Setup.exe**. Feche outra instalação que esteja aberta e siga o instalador. Ao atualizar, use a mesma instalação para preservar os registros. O aplicativo mantém a identidade interna e a pasta de dados das versões anteriores.

O botão Atualizar consulta o canal público, guarda uma cópia local, baixa e confere o instalador antes de abri-lo. A partir de 0.5.3, cada download usa uma pasta temporária exclusiva para evitar sobrescrever um EXE antigo em uso. Bloqueios transitórios de arquivo têm tentativas limitadas; o app não desativa verificações do Windows nem encerra outros processos.

## Erro EBUSY ao atualizar

`EBUSY: resource busy or locked, open ...Setup.exe` significa que o arquivo estava ocupado ou bloqueado. Feche outro instalador aberto e tente novamente. Se estiver em uma versão antiga com esse problema, baixe o instalador atual pelo GitHub e instale por cima uma vez. A correção do próprio atualizador vale depois que a versão nova estiver instalada. Não apague os dados do app para corrigir esse erro.

## Nome do repositório e dos arquivos

O endereço oficial é [PeraTV/jaguarlab](https://github.com/PeraTV/jaguarlab). Os downloads principais usam **JaguarLab** no nome. Versões antigas e alguns arquivos de compatibilidade ainda usam nomes anteriores; eles são mantidos para permitir atualização de instalações existentes. Não altere ou reutilize o endereço antigo em outro repositório: isso pode remover o redirecionamento usado por versões antigas.

Atualizar não exige token pessoal. O token é somente para o backup opcional de cada pessoa. Os arquivos publicados incluem `SHA256SUMS.txt` para verificação de integridade. O instalador Windows não tem certificado comercial de editor; o sistema pode solicitar confirmação.

## Antes de atualizar ou trocar de aparelho

Exporte um backup com senha e confirme que foi guardado. Salve os modelos 3D originais em outra pasta/local, pois eles ficam fora do backup. Após trocar de aparelho e restaurar os registros, selecione novamente os modelos em Projetos → Editar.
