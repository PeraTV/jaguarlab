# ONÇA 3D — prévia 0.1.0

Aplicativo local de gestão para impressão 3D, com identidade amarela e preta. Projeto em `F:\Projetos\Onca3D` no computador do mantenedor.

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

Esta é uma prévia para avaliação. A assinatura Windows não usa certificado comercial; o sistema pode pedir confirmação do editor. A instalação Android deve ser confirmada no aparelho. Ainda é necessário testar em aparelhos físicos e testar o ciclo de atualização entre duas versões instaladas. Não há controle direto da impressora, leitura de G-code/STL nem sincronização simultânea nesta prévia.
