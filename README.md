# JAGUAR LAB

**Download público — não precisa de token nem conta para baixar.**

[Baixar APK direto no celular — 0.4.4](https://raw.githubusercontent.com/PeraTV/onca3d-atualizacoes/v0.4.4/distribution/Onca3D-0.4.4-Android.apk) · [Baixar para Windows — 0.4.4](https://github.com/PeraTV/onca3d-atualizacoes/releases/download/v0.4.4/Onca3D-0.4.4-Setup.exe)

No Android, baixe pelo navegador do próprio celular e instale por cima da versão anterior, sem desinstalar, para manter os registros. Na 0.4.4, o app separa Baixar e Instalar e mostra o andamento. Backups continuam individuais, na conta de cada usuário.

Gestão local de impressão 3D para Android, tablets e Windows.

## Versão 0.4.4

[Baixar Android e Windows](https://github.com/PeraTV/onca3d-atualizacoes/releases/tag/v0.4.4) · [Guia completo](app/README.md)

- Duas paletas independentes para fundo e destaque, salvas no aparelho e no backup.
- Botões Cores, Atualizar e Colaboração visíveis no topo.
- Calculadora sem projeto ou objeto obrigatório, com preço por kg manual e percentual de lucro visível: margem sobre a venda ou acréscimo sobre o custo.
- G-code: leitura de tempo/material informados pelo fatiador e prévia de trajetórias por camadas.
- Projetos com fotos e STL/3MF, prévia 3D e arquivos incluídos no backup.
- Carretéis por cor, marca e modelo; consumo, saldo e alerta de estoque baixo. A baixa ocorre ao registrar impressão, inclusive falha. Orçar não consome estoque.
- Vendas, pagamentos, metas e rankings.
- Referência de energia ANEEL, incluindo Light, e cidades IBGE.
- Tutoriais e colaboração voluntária pelo QR Code do criador.

## Atualizar

Toque em Atualizar no cabeçalho. Havendo versão mais nova, o app oferece baixar e instalar, verifica a integridade e abre a instalação do sistema. A confirmação final pertence ao Android/Windows. Não é necessário token para atualizar.

Versões antigas afetadas pelo erro de consulta no Android precisam instalar o novo APK por cima uma vez, sem desinstalar. Nome novo, identidade interna, assinatura e dados locais preservados.

Os dados ficam no aparelho, sem servidor próprio. Cada usuário usa seu próprio repositório privado para backup criptografado; o token é individual e não entra no backup.

Tempo/material do G-code continuam sendo estimativas do fatiador. STL isolado não contém fatiamento; sua estimativa geométrica é opcional e aproximada. Leia o guia sobre compatibilidade e limites.

### Ajustes desta versão

Cores dos botões e do rodapé fixo corrigidas. A estimativa STL oferece altura de camada, material, paredes, preenchimento e velocidade média, com opções avançadas explicadas. A calibração com valores do fatiador é vinculada à peça e ao perfil e pode ser salva no backup. Não executa fatiamento completo; importar G-code usa os totais informados pelo fatiador.

### Consulta de versões corrigida

Verificação e instalação leem o canal pela API pública de conteúdo do GitHub, sem depender da cópia antiga do endereço raw. Não requer token pessoal. Falhas e limites de consulta não são apresentados como aplicativo atualizado. Se a versão anterior ainda consultar a lista antiga, instale o APK novo por cima uma vez, sem desinstalar.

### Digitação com teclado no Android

Tratamento único do espaço das barras e do teclado, evitando redução duplicada da área útil. A barra inferior e os botões fixos ficam ocultos durante a digitação; o campo é trazido à área visível sem alterar foco ou valor. Ao fechar o teclado, a navegação retorna.

### Download Android público com progresso

Qualquer pessoa pode baixar o JAGUAR LAB sem token. O download começa pelo APK direto da tag pública e usa a release como alternativa. Baixar e Instalar são etapas separadas, com progresso por bytes/porcentagem, cancelamento e erro visível. O APK é conferido por SHA-256, tamanho quando disponível, pacote, assinatura e versão. Após autorizar a instalação no Android, o arquivo conferido é reutilizado. Backups continuam individuais. O Estilo Carioca não teve sua distribuição alterada.
