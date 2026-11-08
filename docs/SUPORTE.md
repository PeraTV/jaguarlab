# Perguntas frequentes e problemas

## Preciso de hospedagem ou de uma conta no app?

Não. Os dados ficam no aparelho. Internet é usada para consultas, vídeos, atualizações e backup online opcional. Não há servidor próprio ou conta central de clientes.

## Meus dados vão para o GitHub do criador?

Não. Cada pessoa usa seu repositório privado e token. O repositório público do projeto serve para distribuição, código e documentação. Veja [privacidade](PRIVACIDADE.md).

## Onde coloco o link, o token e a senha?

Seu repositório privado recebe `seu-usuario/BackupJaguarLab` ou o link completo. Seu token pessoal recebe o código gerado pelo GitHub. Senha de backup recebe uma senha escolhida por você, com pelo menos 10 caracteres. Não são o mesmo dado.

## O GitHub pede Confirm access. Preciso esperar um dia?

Não é uma regra de um dia. É uma reconfirmação de segurança para uma ação sensível. Use o método disponível na sua conta. Se houver autenticador TOTP, use o código dele; Google Authenticator é apenas um exemplo. Não envie esses códigos a outras pessoas.

## Apaguei ou perdi a senha de backup

Ela não pode ser recuperada pelo app ou pelo criador. Mantenha uma cópia segura. Um token novo não substitui a senha que criptografou um backup antigo.

## O estoque não diminuiu ao salvar orçamento ou vender

Esse é o comportamento esperado. A baixa acontece em Registrar impressão, com os carretéis e gramas escolhidos. A venda não cobra o material novamente. Impressão que falhou também pode consumir filamento.

## O saldo está errado depois de cadastrar um rolo aberto

Confira o peso sem a tara do carretel e o custo proporcional. Um rolo de 1 kg comprado por R$ 100 com 600 g restantes deve ser cadastrado com 600 g e R$ 60 para manter R$ 0,10/g. Não altere preço/peso de um rolo que já tem consumo; cadastre um novo rolo para nova compra.

## Não quero importar um objeto para calcular

Não precisa. Use preço/kg, peso e tempo do fatiador. Projeto e arquivo são opcionais para cálculo e orçamento. Para registrar consumo, escolha um projeto e um carretel cadastrado.

## Por que o tempo/peso do STL difere do fatiador?

STL não contém um fatiamento. A aproximação do app não reproduz todas as trajetórias e acelerações. Prefira os totais do fatiador por G-code compatível ou preenchimento manual. Confira material, camada, paredes, suportes, escala e perfil. A calibração só vale para a peça e opções correspondentes.

## Arquivo 3MF não abre ou só mostra imagem

Há diferenças entre extensões dos programas. Modelos grandes usam imagem incluída no 3MF, quando compatível. Para uma prévia interativa leve, exporte a peça como STL binário. Arquivos até 1 GiB continuam sujeitos à memória e complexidade; não é promessa de abertura de qualquer modelo nesse tamanho.

## Onde estão meus modelos após restaurar?

Os arquivos e suas prévias não vão no backup atual. Guarde os originais e selecione novamente em Projetos → Editar → Importar STL / 3MF. Os cadastros, fotos adicionadas e demais registros podem ser restaurados separadamente.

## Quero lucro de 100%

Use Acréscimo sobre o custo ou o atalho Ganhar 100% sobre o custo. Isso dobra o custo antes das taxas. Margem de 100% sobre a venda não gera um preço finito válido. Inclua trabalho, máquina, energia, perdas e embalagem nos custos antes de escolher o ganho.

## A sugestão de preço é uma tabela oficial?

Não. Usa seus custos e percentuais iniciais editáveis por tipo de peça. Confira qualidade, concorrência, prazo, exclusividade e mercado da sua região antes de combinar o valor.

## WhatsApp envia automaticamente ou anexa a logo?

Não. Abre a mensagem para revisar e confirmar. Os botões de texto não anexam a logo. A prévia mostra a empresa e o texto compartilhado mantém custos internos e CPF do cliente fora da mensagem.

## A Light está disponível?

Sim, na consulta de referências: Light — Rio de Janeiro (LIGHT SESA). Confirme sua distribuidora na conta. A referência ANEEL usada é residencial convencional B1 sem impostos/bandeira; ajuste o preço final por kWh conforme sua conta.

## O app atualizou lentamente ou tentou outro link

A rota até o servidor pode variar mesmo com Wi-Fi forte. As versões recentes priorizam Releases e mantêm uma alternativa. Não é possível garantir uma velocidade igual em todos os aparelhos/redes. Espere a conclusão, use Cancelar se necessário e tente novamente. O APK já validado pode ser reutilizado na etapa de instalação.

## Erro EBUSY no Windows

Veja [instalação e atualização](INSTALACAO.md#erro-ebusy-ao-atualizar). A versão 0.5.5 usa um caminho exclusivo por download. Uma versão antiga pode exigir a instalação manual por cima para receber a correção.

## Quero limpar espaço do GitHub

Os modelos 3D não entram no backup. O histórico de backups ainda ocupa espaço; apagar o arquivo atual não remove automaticamente versões históricas. Esta versão não tem limpeza automática de histórico. Mantenha uma cópia exportada antes de administrar o repositório.

## Como relatar um problema

[Abra uma issue](https://github.com/PeraTV/jaguarlab/issues/new) com versão instalada, Android/Windows, passos para reproduzir e mensagem exibida. Se enviar imagem, cubra nomes/documentos de clientes, tokens, senhas, QR de autenticador e códigos de recuperação. Não publique backups pessoais.


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
