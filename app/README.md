# JAGUAR LAB 0.5.6

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

## macOS e Linux (0.5.6)

- Mac Intel: **macOS-x64.dmg**. Mac com chip Apple M1 ou posterior: **macOS-arm64.dmg**. Abra o DMG e arraste JAGUAR LAB para Aplicativos. Para atualizar, feche o app e substitua a cópia anterior. Os dados ficam fora do aplicativo.
- O pacote Mac usa assinatura ad hoc, sem certificado Developer ID nem notarização da Apple. O macOS pode bloquear a primeira abertura e exigir sua autorização nas opções de segurança do sistema. Não é uma versão da App Store. Não desative as proteções globais do sistema.
- Linux 64 bits (x86_64): **DEB** para Debian/Ubuntu/Mint ou **AppImage** para outras distribuições compatíveis. No AppImage, habilite a permissão de execução nas propriedades do arquivo. O DEB abre no gerenciador de pacotes e pode pedir a senha de administrador para instalar. Não execute o app como root.
- O botão Atualizar baixa e confere o instalador correto. No Mac, confirme a substituição em Aplicativos. No Linux, conclua pelo gerenciador de pacotes e reabra. Quem usa AppImage pode baixar a nova AppImage na página de versões e substituir a anterior.
- Manter conectado usa o Keychain do macOS ou um chaveiro seguro do Linux (libsecret/KWallet). Se o Linux não oferecer chaveiro protegido, a opção fica indisponível e o acesso funciona somente na sessão; o app não grava o token em texto simples.
- Dados permanecem locais, sem servidor próprio. Para transferir Android/Windows/Mac/Linux, envie e importe o backup com a mesma senha; a importação substitui o destino e não mescla bases. Os modelos 3D originais devem ser transferidos separadamente.
- Os instaladores são compilados no GitHub Actions em máquinas dos respectivos sistemas. Ainda não foram validados em um Mac/Linux físico do usuário. Arquiteturas Linux ARM não são incluídas nesta prévia.

Referências: [Electron safeStorage](https://github.com/electron/electron/blob/main/docs/api/safe-storage.md), [formatos de instalação](https://www.electron.build/v26/docs/targets/).
