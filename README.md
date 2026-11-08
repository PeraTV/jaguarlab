# ONÇA 3D — atualizações oficiais

Canal público de distribuição do ONÇA 3D para celulares e tablets Android e computadores Windows.

**Estado: preparação do projeto. Ainda não há aplicativo compilado ou instalador disponível.** A criação deste canal não significa que o aplicativo ou seu atualizador estejam implementados.

## Distribuição

As versões validadas serão disponibilizadas em [Releases](https://github.com/PeraTV/onca3d-atualizacoes/releases). O arquivo `updates/stable.json` está reservado para informar versões ao futuro aplicativo. Enquanto `available` for `false`, nenhuma instalação deve ser oferecida.

No Android, a distribuição direta deverá abrir o instalador do sistema e respeitar a confirmação do usuário. As atualizações devem preservar a identidade e assinatura do aplicativo. No Windows, o mecanismo de atualização ainda será escolhido e implementado.

## Dados individuais

Este repositório é exclusivo para distribuição e documentação pública. Não armazena backups, fotos pessoais, registros de vendas, tokens, chaves de API ou credenciais de usuários.

O aplicativo será planejado para salvar os dados no aparelho e permitir backup no serviço conectado individualmente por cada usuário. O provedor de backup ainda será definido. Uma conta de armazenamento não será compartilhada entre usuários. Backup e sincronização entre aparelhos são recursos distintos; sincronização ainda precisa ter seu escopo definido.

## Requisitos

Veja [os requisitos do projeto](docs/REQUISITOS.md). Não é necessário manter servidor próprio para o funcionamento local. Consultas, downloads e backups online dependem dos respectivos serviços externos e de suas condições.
