# Seus dados, backup e token

[Página principal](../README.md) · [Manual](GUIA.md) · [Vídeos](TUTORIAIS.md)

## Onde ficam os dados

O JAGUAR LAB trabalha com armazenamento local no aparelho. Não há servidor próprio, conta central de clientes nem envio de cadastros ao criador do projeto. O repositório público `PeraTV/jaguarlab` distribui código, imagens, vídeos, instaladores e o canal de atualização.

As consultas online vão diretamente aos serviços usados: IBGE para cidades, ANEEL para tarifas e GitHub para atualizações, vídeos e backup opcional. Cadastros, cálculos e relatórios continuam funcionando offline com os dados já salvos.

## O que entra no backup

Inclui cadastros dos projetos, fotos adicionadas pelo usuário, foto e dados da empresa, clientes, impressoras, carretéis, produções, vendas, custos, despesas e configurações. **STL/3MF e suas prévias geradas ficam fora do backup**: guarde os originais na sua pasta. Depois de restaurar em outro aparelho, abra o projeto e selecione novamente o arquivo.

O backup exportado/enviado é criptografado com senha, usando AES-GCM e uma chave derivada por PBKDF2. A senha não pode ser recuperada pelo aplicativo ou pelo criador. O token e a senha não são incluídos no backup. Sem Manter conectado, o token fica somente na sessão. Se você marcar Manter conectado neste aparelho e tocar em Salvar acesso, repositório, token e senha do backup ficam cifrados com a proteção local do sistema: Android Keystore no Android e safeStorage/DPAPI no Windows. Não entram nos backups. Desconectar remove esse acesso salvo. No navegador, não há persistência de credenciais. A opção não renova tokens vencidos ou revogados.

Desinstalar o app ou limpar seus dados pode apagar a base e as prévias locais. O backup não é sincronização automática: restaurar substitui a base, não mescla alterações de dois aparelhos. Antes de restaurar, o app solicita guardar uma cópia dos dados atuais. O limite da restauração local é 150 MB.

## Opção 1: exportar arquivo

Em Configurações → Seu backup, protegido, informe uma senha com no mínimo 10 caracteres e use Exportar backup. No Android, escolha o destino no compartilhamento do sistema e confira se o arquivo foi salvo. Guarde-o fora do aparelho, em local escolhido por você. Para recuperar, use Restaurar arquivo e a mesma senha.

## Opção 2: seu próprio GitHub privado

Cada pessoa usa sua própria conta, repositório privado e token. O app verifica que o repositório é privado e pertence à conta do token. Os canais públicos do projeto são recusados como destino.

1. Entre na sua conta e abra [Criar repositório](https://github.com/new).
2. Dê um nome, por exemplo `BackupJaguarLab`. Em Choose visibility, escolha **Private** e crie.
3. Copie o endereço. No campo **Seu repositório privado**, cole `seu-usuario/BackupJaguarLab` ou `https://github.com/seu-usuario/BackupJaguarLab`. Cada pessoa substitui `seu-usuario` pelo próprio nome de conta.
4. Abra [Fine-grained personal access token](https://github.com/settings/personal-access-tokens/new), dê um nome ao token e escolha uma validade.
5. Em Resource owner, selecione sua conta. Em Repository access, marque **Only select repositories** e escolha somente o repositório de backup.
6. Em Permissions, clique em **Add permissions**, pesquise **Contents** e marque a opção.
7. Na linha Contents, mude Access de Read-only para **Read and write**. Metadata é obrigatória e fica Read-only. Não são necessárias permissões gerais da conta ou de outros repositórios para esse fluxo.
8. Clique em Generate token, revise a confirmação e confirme. Copie o código completo enquanto está visível.
9. No JAGUAR LAB, cole o código em **Seu token pessoal**. Não cole ali o endereço do repositório.
10. Em **Senha de backup**, escolha sua senha de no mínimo 10 caracteres. Ela é diferente do token e da senha do GitHub.
11. Toque em Enviar backup, mantenha a tela aberta e aguarde a confirmação.

| Campo no aplicativo | O que colocar |
| --- | --- |
| Seu repositório privado | `seu-usuario/BackupJaguarLab` ou o link completo |
| Seu token pessoal | O código gerado pelo GitHub, somente no app |
| Senha de backup | Uma senha sua para criptografar/recuperar o arquivo |

O GitHub só mostra o token completo uma vez. Se perder o código, gere outro com acesso ao mesmo repositório. Quando vencer, substitua-o por um token válido. Um token publicado em foto, conversa ou repositório deve ser revogado e substituído; não o reutilize em um tutorial.

## Confirm access e autenticador

O GitHub pode exigir uma reconfirmação de identidade ao criar o token, mesmo se você já entrou na conta. Essa tela é o **sudo mode**. Use o método disponível na sua conta: senha, passkey, GitHub Mobile, código de um autenticador configurado ou outro método oferecido pelo GitHub. Google Authenticator é um exemplo de app TOTP; não existe uma regra geral de configurá-lo após um dia para usar este backup.

Faça a verificação diretamente no GitHub. Não compartilhe senha, código temporário, chave de configuração do autenticador, QR de 2FA ou códigos de recuperação. Os vídeos do projeto usam exemplos sem credenciais reais.

## Recuperar e trocar de aparelho

Informe o mesmo repositório, um token válido com acesso e a mesma senha do backup. Use Buscar backups, escolha a cópia e toque em Importar do GitHub; confira a confirmação antes de substituir os dados locais. Guarde a cópia anterior solicitada pelo app. Reimporte os modelos originais depois, pois eles não são enviados no backup.

O envio divide o arquivo criptografado em partes e só atualiza o índice após completar. A integridade é conferida ao recuperar. Uma falha no envio não deve substituir o último índice completo. Espere a confirmação antes de sair da tela; não há envio automático ao sair.

## Espaço e histórico no GitHub

O backup pode ocupar espaço na conta, inclusive por versões anteriores mantidas no histórico do GitHub. Apagar um arquivo na versão atual não apaga automaticamente seu histórico. Esta versão não oferece limpeza automática nem promete liberar espaço do histórico. Como os modelos 3D ficam fora do backup, eles não ocupam esse espaço. Guarde também uma cópia exportada em outro local.

## Cópia local antes de atualizar

Antes de abrir uma atualização, o app guarda uma cópia de recuperação no armazenamento interno. Ela é local e sem senha; os backups exportados e enviados ao GitHub são criptografados. Desinstalar/limpar dados pode apagar a recuperação local. Nunca publique essa cópia ou um backup pessoal em uma issue.

## Fontes

- [GitHub: gerenciar tokens pessoais](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [GitHub: sudo mode](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/sudo-mode)
- [GitHub: criar repositório](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)


## Levar os dados do celular para o PC ou tablet

1. No celular com seus dados, abra Configurações → Seu backup, protegido.
2. Informe sua senha de backup, o repositório privado e um token com acesso. Toque em **Enviar backup** e aguarde a confirmação.
3. No PC ou tablet, instale o JAGUAR LAB e abra a mesma área. Use **o mesmo repositório e a mesma senha do backup**. O token pode ser diferente, desde que válido e com acesso ao repositório.
4. Toque em **Buscar backups**, escolha a cópia pela data e toque em **Importar do GitHub**.
5. Confira o resumo, salve a cópia de segurança solicitada e confirme. A importação **substitui** os dados do destino; não mescla duas bases.
6. Guarde os modelos STL/3MF originais e selecione-os novamente nos projetos, pois não são enviados ao GitHub.

Para levar alterações do PC de volta ao celular, envie uma nova cópia pelo PC e importe no celular. Não edite dois aparelhos ao mesmo tempo esperando que os dados sejam combinados: não há sincronização automática.

Sem GitHub: no celular, **Exportar backup**; transfira o arquivo `.onca` pelo meio que preferir; no PC/tablet, **Restaurar arquivo**, usando a mesma senha.

A lista mostra até 100 cópias completas recentes. Cópias anteriores à introdução do histórico podem ter apenas a última versão disponível na lista. Os arquivos antigos não são apagados automaticamente do repositório.

## Manter conectado

Sem Manter conectado, o token fica somente na sessão. Se você marcar Manter conectado neste aparelho e tocar em Salvar acesso, repositório, token e senha do backup ficam cifrados com a proteção local do sistema: Android Keystore no Android e safeStorage/DPAPI no Windows. Não entram nos backups. Desconectar remove esse acesso salvo. No navegador, não há persistência de credenciais. A opção não renova tokens vencidos ou revogados.

## Validade do token

Em Expiration, escolha uma data ou **No expiration**, quando disponível. Com data, substitua o token quando vencer. No expiration significa sem vencimento programado, não acesso garantido para sempre: o token pode ser revogado e o GitHub pode removê-lo após um ano sem uso. Veja [validade e revogação de tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation). Manter conectado não renova o token.

## macOS e Linux (0.5.5)

- Mac Intel: **macOS-x64.dmg**. Mac com chip Apple M1 ou posterior: **macOS-arm64.dmg**. Abra o DMG e arraste JAGUAR LAB para Aplicativos. Para atualizar, feche o app e substitua a cópia anterior. Os dados ficam fora do aplicativo.
- O pacote Mac usa assinatura ad hoc, sem certificado Developer ID nem notarização da Apple. O macOS pode bloquear a primeira abertura e exigir sua autorização nas opções de segurança do sistema. Não é uma versão da App Store. Não desative as proteções globais do sistema.
- Linux 64 bits (x86_64): **DEB** para Debian/Ubuntu/Mint ou **AppImage** para outras distribuições compatíveis. No AppImage, habilite a permissão de execução nas propriedades do arquivo. O DEB abre no gerenciador de pacotes e pode pedir a senha de administrador para instalar. Não execute o app como root.
- O botão Atualizar baixa e confere o instalador correto. No Mac, confirme a substituição em Aplicativos. No Linux, conclua pelo gerenciador de pacotes e reabra. Quem usa AppImage pode baixar a nova AppImage na página de versões e substituir a anterior.
- Manter conectado usa o Keychain do macOS ou um chaveiro seguro do Linux (libsecret/KWallet). Se o Linux não oferecer chaveiro protegido, a opção fica indisponível e o acesso funciona somente na sessão; o app não grava o token em texto simples.
- Dados permanecem locais, sem servidor próprio. Para transferir Android/Windows/Mac/Linux, envie e importe o backup com a mesma senha; a importação substitui o destino e não mescla bases. Os modelos 3D originais devem ser transferidos separadamente.
- Os instaladores são compilados no GitHub Actions em máquinas dos respectivos sistemas. Ainda não foram validados em um Mac/Linux físico do usuário. Arquiteturas Linux ARM não são incluídas nesta prévia.

Referências: [Electron safeStorage](https://github.com/electron/electron/blob/main/docs/api/safe-storage.md), [formatos de instalação](https://www.electron.build/v26/docs/targets/).
