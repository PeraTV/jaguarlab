# JAGUAR LAB 0.5.3

Aplicativo local de gestão de impressão 3D para Android, tablet e Windows. Projeto React/Vite, Capacitor e Electron. Distribuição pública: [PeraTV/jaguarlab](https://github.com/PeraTV/jaguarlab).

## Documentação

- [Guia de uso](../docs/GUIA.md)
- [Instalação e atualização](../docs/INSTALACAO.md)
- [Privacidade e backup individual](../docs/PRIVACIDADE.md)
- [Vídeos, capítulos e transcrições](../docs/TUTORIAIS.md)
- [Dúvidas e limites](../docs/SUPORTE.md)

## Desenvolvimento

Use Node 24, npm e Java 21. Android exige SDK 36; mínimo Android 7 (API 24). No diretório app:

```text
npm ci
npm test
npm run dev
npm run build
npm run desktop:build
npm run android:sync
```

Depois da sincronização, compile o projeto Android gerado com Gradle e use scripts/sign-android.ps1 para assinar com a chave oficial externa ao código. Nunca inclua chave, senha, token ou backup pessoal no repositório. Instaladores Windows são gerados pelo workflow de publicação, que confere o APK e publica o canal somente depois dos arquivos de versão.

## Compatibilidade dos dados

O nome público é JAGUAR LAB. Identificadores internos onca3d, br.com.onca3d.app e o diretório de dados antigo são mantidos para preservar instalações e backups. Não os renomeie sem uma migração. Links legados do repositório anterior são mantidos para atualização de versões antigas; os downloads principais usam JaguarLab.

O aplicativo funciona sem servidor próprio. Backups opcionais são criptografados e enviados diretamente ao repositório privado de cada pessoa. Arquivos STL/3MF originais ficam no aparelho e não entram no backup. A prévia não substitui um fatiador; estimativas geométricas não garantem o tempo real da impressora.

O modo de demonstração para filmagem só existe no servidor de desenvolvimento, com dados fictícios e banco separado. Não inclui dados de usuários nem credenciais.
