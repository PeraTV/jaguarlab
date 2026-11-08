# Requisitos do ONÇA 3D

Estado: requisitos acordados para desenvolvimento; recursos ainda não implementados.

- Identidade visual original amarela e preta, com logo de onça; interface adaptada para Android, tablet e PC Windows.
- Projetos com imagens próprias, descrição, quantidade e tempo de impressão.
- Cadastro individual de carretéis: representação da cor, marca, linha/modelo, tipo de material, custo, peso inicial, consumido e restante.
- Seleção de um ou vários carretéis por impressão. Registrar a produção realizada baixa o consumo uma única vez; orçamento não baixa estoque. Registrar perdas e falhas; correções devem manter histórico e ajustar o saldo sem duplicação.
- Calculadora com material, energia, máquina, mão de obra, embalagem, taxas e margem. Separar gasto de material de custo total e receita de lucro.
- Energia: estado, cidade, confirmação da distribuidora e modalidade, tarifa de referência com fonte e data, ajuste manual e consumo médio da impressora. Preservar a tarifa aplicada nos registros históricos; uso offline da última referência. Consultas online precisam de fonte validada, sem prometer valor final exato apenas pela cidade.
- Vendas, pagamentos e relatórios por período. Rankings de produtos, melhores períodos de vendas, faturamento, lucro e gastos com material por marca e cor.
- Dados e imagens locais, exportação e restauração completa. Provedor online e credenciais individuais de backup; não enviar dados pessoais para este repositório.
- Atualizações pelo GitHub do mantenedor com botão no aplicativo; checagem de integridade, preservação de dados e cópia de segurança antes de migrações. Assinaturas e credenciais de publicação não devem entrar no repositório.
- Sem servidor próprio para operação local; internet permitida para referências, backup e atualizações.

## Decisões pendentes

- Provedor de backup individual e sua forma de conexão.
- Necessidade de sincronização entre aparelhos e regras para alterações simultâneas.
- Tecnologia de implementação, assinatura e empacotamento.

## Critérios para a primeira versão pública

Validar produção e reversão de consumo sem duplicação, cálculo de custos, persistência das imagens, restauração completa, isolamento de credenciais e atualização real em Android e Windows antes de oferecer instaladores neste canal.
