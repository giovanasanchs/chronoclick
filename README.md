# ChronoClick

Aplicação desenvolvida em React + TypeScript como parte de um desafio técnico para vaga de Frontend Júnior.

O projeto consiste em um contador interativo que pode ser convertido em cronômetro, com foco em arquitetura escalável, boas práticas e organização de código.

## Preview da Aplicação

<p align="center">
  <img src="./assets/screenshot.png" width="700"/>
</p>

## Visão Geral

ChronoClick é uma aplicação simples em conceito, mas estruturada com foco em:

- Separação de responsabilidades
- Componentização
- Isolamento da lógica de negócio
- Tipagem forte com TypeScript
- Organização preparada para evolução futura

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- CSS modularizado
- Hooks customizados
- ESLint + Prettier

## Funcionalidades

✔️ Contador incremental por clique
✔️ Destaque visual para algarismos pares (verde)
✔️ Modo cronômetro (contagem automática em segundos)
✔️ Botão único para iniciar/parar o cronômetro
✔️ Reset do contador
✔️ Estrutura escalável baseada em separação de responsabilidades


## Arquitetura do Projeto

O projeto foi estruturado visando escalabilidade e manutenibilidade, mesmo sendo uma aplicação simples.

### 📁 Organização por responsabilidade:

```bash
src/
 ├── assets/       → Imagens utilizadas
 ├── components/   → Componentes reutilizáveis
 ├── hooks/        → Lógica isolada (useCounter)
 ├── types/        → Tipagens centralizadas
 ├── styles/       → Tema global e estilos compartilhados
 ├── store/        → Preparado para possível expansão de estado global
 └── app/          → Composição principal da aplicação

```

A lógica foi isolada em um hook customizado para manter a UI desacoplada das regras de negócio.


## ▶️ Como Executar o Projeto

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/chronoclick.git

# Instalar dependências
npm install

# Rodar projeto
npm run dev

```
