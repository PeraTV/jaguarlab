# JAGUAR LAB — prévia 0.2.1

Aplicativo local de gestão para impressão 3D, com identidade amarela e preta. Projeto em `F:\Projetos\Onca3D` no computador do mantenedor.

## Correção 0.2.1

Corrige a leitura do canal de atualização no Android quando o GitHub retorna JSON como texto. A consulta evita cache antigo, valida a resposta e mostra um resultado persistente. Versões anteriores afetadas precisam receber este APK por instalação por cima uma vez; não desinstale. Dados e assinatura preservados.

## Novidades da versão 0.2.0

- Interface refeita seguindo o conceito aprovado: preto neutro, amarelo, cartões compactos, lista de filamentos e quatro atalhos no celular. Carretéis redesenhados e marca escolhida pelo usuário no perfil.
- Importação local de STL (binário/ASCII) e 3MF, prévia 3D com rotação e zoom e miniatura automática do projeto. Os arquivos entram no backup.
- Limite por modelo: 20 MB, até 250 mil triângulos; expansão de arquivos 3MF limitada a 64 MB. Extensões avançadas de 3MF podem não ser compatíveis. STL é interpretado em milímetros.
- Tempo e gramas são lidos de metadados fatiados compatíveis, como slice_info.config e cabeçalhos G-code dentro do 3MF. Mesas são mostradas separadamente. Um STL ou 3MF não fatiado não contém esses resultados.
- Estimativa geométrica opcional para malhas fechadas, com perfil ajustável de densidade, preenchimento, casca, fluxo e suportes adicionais. É uma aproximação e não executa fatiamento, trajetórias, acelerações ou geração real de suportes. Confirme no fatiador antes de registrar consumo.
- Aba Tutoriais com explicação de cada função e passo a passo de backup junto dos campos de configuração. Aceita o link completo do repositório individual.
- Light identificada como “Light — Rio de Janeiro (LIGHT SESA)” e destacada na lista quando RJ é selecionado.
- Meta mensal configurável e menu Colaboração com o QR Code fornecido pelo criador, reutilizado do PeraTV. Doações voluntárias, sem processamento de pagamentos no app.
- Dados, identidade de instalação e assinatura Android preservados ao atualizar.

## Recursos desta prévia

- Projetos com fotos próprias (JPG, PNG e WebP, redimensionadas para até 960 px).
- Carretéis individuais por cor, marca, linha/modelo e material; peso, valor de compra, consumo e saldo.
- Calculadora multicolorida: gramas, horas, consumo médio, energia, máquina/h, mão de obra, extras, taxas e margem sobre o preço de venda.
- Orçamento salvo sem baixar estoque. Registrar impressão concluída ou falha baixa o material; estorno mantém histórico e devolve o consumo. Vendas vinculadas precisam ser canceladas antes de estornar.
- Venda parcial de lotes, pagamentos e cancelamentos; custo da peça e tarifa de energia preservados no histórico.
- Rankings por produto, dia, mês e gasto com material por marca e cor; filtros de período e despesas extras.
- Estado e cidades do IBGE; consulta direta à ANEEL para referência residencial convencional B1, com confirmação da distribuidora. Referência sem impostos e bandeira: ajuste a tarifa final pela conta. Tarifas comerciais e brancas usam preenchimento manual.
- Dados em IndexedDB no aparelho, gravação transacional e bloqueio de revisões antigas.
- Backup completo criptografado (AES-GCM, chave derivada com PBKDF2/210 mil iterações), incluindo fotos. A senha não pode ser recuperada.
- Backup online opcional na conta GitHub individual, em repositório privado, dividido em partes e com índice publicado somente após o envio completo. Token mantido apenas na tela, sem salvar em disco ou incluir no backup.
- Consulta do canal público de atualizações; Windows baixa o instalador, verifica SHA-256, guarda cópia local e abre a instalação. Android baixa e verifica o APK e pede a instalação ao sistema. A assinatura Android precisa ser preservada entre versões.

## Começar

1. Instale a versão adequada de Android ou Windows, sem desinstalar quando atualizar.
2. Em Configurações, informe o nome do ateliê e os dados de energia.
3. Cadastre cada carretel. Se já estiver aberto, informe o peso restante e o custo proporcional desse material.
4. Cadastre um projeto e sua foto. Na calculadora, informe o consumo total do lote, incluindo suportes, purga e perdas.
5. Salve o orçamento ou registre a impressão realizada. Vender uma peça não desconta novamente o filamento.
6. Exporte um backup com senha e guarde em outro local.

## Backup individual

Em sua própria conta GitHub, crie um repositório **privado** para os backups. Crie um token limitado a esse repositório com permissão Contents: leitura e escrita. Em Configurações, informe `seu-usuario/seu-repositorio`, o token e sua senha de backup. Envie e aguarde a confirmação. Cada pessoa usa suas próprias credenciais; o canal público `PeraTV/onca3d-atualizacoes` é recusado como destino de backup.

Fotos e registros ficam no mesmo arquivo criptografado. Um backup grande gera vários arquivos e pode demorar conforme a conexão e os limites da API. O histórico do GitHub ocupa armazenamento da conta; esta prévia não faz limpeza automática de snapshots.

Exportar e restaurar backups não é sincronização automática entre aparelhos. A restauração substitui a base local e solicita salvar uma cópia dos dados atuais antes. O limite de restauração local é 150 MB. No Android, escolha um destino no compartilhamento do sistema e confirme que guardou o arquivo.

## Energia e privacidade

As consultas online vão diretamente ao IBGE, à ANEEL e ao GitHub. Não há servidor próprio nem conta central de usuários. As referências de tarifa dependem da disponibilidade da ANEEL; a última configuração salva funciona offline. A cidade não identifica sozinha a concessionária nem o custo final. Não use a potência máxima da fonte como consumo médio medido.

A cópia automática anterior a uma atualização fica na pasta interna de recuperação do aplicativo e não contém tokens. Ela é uma cópia local sem senha; os backups exportados e enviados ao GitHub são criptografados. Desinstalar o aplicativo ou limpar seus dados pode apagar a base e a recuperação local.

## Desenvolvimento e manutenção

Requer Node 24+, Java 21 e Android SDK para Android. Instale com `npm ci`; execute `npm test` e `npm run build`. Para a prévia web local use `npm run dev`. Para Windows use `npm run desktop:build`.

Para gerar o projeto Android do zero: `npm run android:init`. Nas próximas alterações: `npm run android:sync`, depois compile com Gradle. O script aplica a identidade, versão e plugin de atualização. O código-fonte distribuído não inclui SDKs, dependências baixadas nem credenciais.

A chave Android e sua senha ficam **fora** do repositório, em `F:\Projetos\Onca3D-private`. Faça uma cópia privada segura dessa pasta. Perdê-la impede atualizar instalações existentes com a mesma assinatura.

O mantenedor publica os instaladores em Releases e atualiza `updates/stable.json` somente depois de validar os arquivos e seus hashes. O manifesto precisa conter `release.version`, `release.notes` e, para cada plataforma, `url` e `sha256`. Não reutilize uma versão com arquivos diferentes.

## Validação e limites

Testes automatizados cobrem cálculo, baixa de estoque, consumo duplicado, falhas, estornos, vendas parciais, integridade de backup, senha incorreta, transações, tarifas e restrição dos endereços de atualização. O fluxo de cadastro e produção foi conferido no navegador.

Esta é uma prévia para avaliação. A assinatura Windows não usa certificado comercial; o sistema pode pedir confirmação do editor. A instalação Android deve ser confirmada no aparelho. Ainda é necessário testar em aparelhos físicos e testar o ciclo de atualização entre duas versões instaladas. Não há controle direto da impressora, fatiamento completo nem sincronização simultânea nesta prévia.

## Versão 0.3.0 — JAGUAR LAB
O nome exibido mudou; as identidades internas e os caminhos locais foram mantidos para preservar registros e atualizações.

Na calculadora, o projeto é opcional. Você pode informar preço por kg, peso e tempo diretamente, sem objeto ou estoque cadastrado. O campo de lucro está visível e permite margem sobre a venda ou acréscimo sobre o custo. Custos de máquina, trabalho e embalagem devem ser incluídos conforme sua operação.

Depois de fatiar no Anycubic/Orca/Bambu/Prusa, exporte um G-code de até 20 MB e use **Importar dados do fatiador**. O app lê os totais presentes no cabeçalho e mostra as trajetórias compatíveis por camadas. Não executa um fatiador completo; STL isolado oferece somente aproximação geométrica opcional. Quando o arquivo não informa gramas ou tempo, o dado ausente continua disponível para preenchimento manual. G-code binário (.bgcode), arquivos compactados e comandos proprietários podem exigir exportação como G-code de texto. A prévia simplifica arquivos grandes e alguns arcos; essa simplificação não altera os totais lidos.

O APK corrige o recorte do ícone e aplica a área segura das barras, câmera e teclado do Android. A consulta de atualização foi corrigida para o JSON servido pelo GitHub. Instale por cima da versão antiga uma vez, sem desinstalar, se o verificador antigo não oferecer a atualização.

### 0.3.1 — atalhos visíveis
Os botões **Atualizar** e **Colaboração** aparecem no cabeçalho em celular, tablet e PC. Atualizar abre uma área própria, consulta a versão publicada e oferece baixar e instalar quando houver uma versão mais nova. A confirmação final de instalação continua sendo feita pelo sistema. Colaboração abre diretamente a tela do QR Code do projeto.

### 0.4.0 — personalizar cores
O botão Cores abre dois controles independentes para fundo e destaque. Há paletas, seletor livre, código hexadecimal e restauração do padrão. A preferência fica em settings.theme, entra no backup e não altera a logo nem as cores dos carretéis.

### 0.4.1 — estimativa com perfil e calibração
A prévia permite escolher altura de camada, material, preenchimento, número de paredes e velocidade média. Densidade, largura da linha e limite de fluxo ficam em Avançado com orientações. O fluxo médio é aproximado por largura × altura × velocidade, limitado pelo teto volumétrico. Não replica trajetórias, acelerações, tempos mínimos de camada nem os perfis oficiais de impressoras.

A calibração usa tempo e peso do mesmo modelo no fatiador. Seus fatores ficam vinculados ao perfil e à peça; mudar as opções desativa a calibração. Salvar perfil mantém as opções e a referência no projeto e no backup, sem alterar estoque. Para usar os totais do fatiador, importe G-code. Corrigidas as cores do botão em hover/toque e do fundo do rodapé fixo de Nova venda.

### 0.4.2 — consulta de atualização
Verificação e instalação consultam o arquivo de canal pela API pública de conteúdo do GitHub, decodificando o JSON retornado em Base64. A consulta não depende da cópia em cache do domínio raw. Não usa token pessoal e respeita falhas/limites da API: se a consulta falhar, não informa que o app está atualizado. A validação do endereço oficial dos instaladores e do SHA-256 continua ativa.

### 0.4.3 — teclado Android
O app é o único responsável pelo espaço das barras e do teclado (SystemBars.insetsHandling=disable). O preenchimento considera apenas a região ainda encoberta e os espaços tratados são zerados antes de chegar ao WebView. A barra inferior e os botões fixos se ocultam durante a digitação; o campo é trazido à área visível sem alterar seu foco ou conteúdo. Ao fechar o teclado, a navegação retorna.
