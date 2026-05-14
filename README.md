# Pulse Finance

Sistema financeiro pessoal/casal em Flask com frontend em HTML, CSS e JavaScript puro, usando SQLite.

## Distribuição simples para Windows

Para usuário comum de Windows, o caminho certo não é Docker. O ideal é entregar um executável `.exe` que abre sozinho no navegador e salva os dados no perfil do próprio usuário.

### Como o executável funciona

- Abre o sistema em `http://127.0.0.1:9001`
- Salva o banco em `%LOCALAPPDATA%\Pulse Finance\finance.db`
- Salva a chave da aplicação em `%LOCALAPPDATA%\Pulse Finance\secret.key`
- Não exige Python nem Docker instalado na máquina do cliente

### Gerar o `.exe` no Windows

No próprio Windows:

```bat
build-windows.bat
```

Arquivos gerados:

```text
dist\PulseFinance.exe
release\PulseFinance-Windows.zip
```

### Gerar instalador do Windows

Para entregar no formato tradicional de instalação:

```bat
build-installer.bat
```

Arquivo gerado:

```text
release\PulseFinance-Installer.exe
```

Esse instalador:

- cria atalhos no menu Iniciar e opcionalmente na área de trabalho
- instala o executável em `Arquivos de Programas`
- preserva os dados do usuário em `%LOCALAPPDATA%\Pulse Finance`
- não apaga o banco financeiro ao atualizar ou desinstalar o programa
- usa ícone e telas de instalação próprios do Pulse Finance

### Entrega para famílias e usuários leigos

O fluxo recomendado é:

1. Gerar `PulseFinance-Installer.exe`
2. Entregar esse instalador para a família
3. Orientar o usuário a clicar em `Avançar`, `Instalar` e `Concluir`
4. Para segurança adicional, orientar o uso periódico do botão `Baixar backup agora` na aba `Acesso`

### Atualização sem perder dados

Para atualizar em uma máquina já instalada:

1. Fechar o Pulse Finance
2. Baixar o instalador mais novo
3. Executar a nova instalação por cima da versão atual
4. Abrir o sistema normalmente

Os dados continuam preservados porque ficam em:

```text
%LOCALAPPDATA%\Pulse Finance
```

O botão `Baixar versão mais nova` na aba `Acesso` pode apontar para a página pública de releases configurada em `version.json`.

### Build automática no GitHub Actions

O repositório já pode gerar o pacote Windows automaticamente pelo workflow:

```text
.github/workflows/windows-build.yml
```

Isso permite publicar sempre a versão mais nova sem depender de build manual local.

## Imagem no Docker Hub

```text
renanmoreiraluz/pulse_finance:latest
```

## Como subir o container

### 1. Baixar a imagem

```bash
docker pull renanmoreiraluz/pulse_finance:latest
```

### 2. Subir o container

```bash
docker run -d \
  --name pulse-finance \
  -p 9001:9001 \
  -v pulse-finance-data:/data \
  renanmoreiraluz/pulse_finance:latest
```

### 3. Acessar no navegador

```text
http://127.0.0.1:9001
```

## Primeiro acesso em banco vazio

Se a instalação for nova e o banco estiver vazio, o sistema cria automaticamente um usuário administrador padrão:

```text
usuário: admin
senha: PulseFinance123!
```

## Recomendação após o primeiro login

1. Entrar com o usuário `admin`.
2. Criar seu próprio usuário administrador.
3. Sair da conta padrão.
4. Entrar com o novo usuário.
5. Apagar o usuário `admin`.

## Persistência dos dados

O banco SQLite do container fica em:

```text
/data/finance.db
```

Por isso o volume abaixo é importante:

```bash
-v pulse-finance-data:/data
```

Sem esse volume, os dados podem ser perdidos ao recriar o container.

## Comandos úteis

### Ver logs

```bash
docker logs -f pulse-finance
```

### Parar o container

```bash
docker stop pulse-finance
```

### Iniciar novamente

```bash
docker start pulse-finance
```

### Remover o container

```bash
docker rm -f pulse-finance
```

## Observações

- A aplicação roda na porta `9001`.
- O seed inicial só cria o usuário padrão se não existir nenhum usuário no banco.
- Se você reutilizar um banco já existente, o usuário `admin` pode não ser criado.
