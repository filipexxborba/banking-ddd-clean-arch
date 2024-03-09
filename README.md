# banking-ddd-clean-arch
Este repositório contém o código fonte do projeto desenvolvido como parte do processo seletivo para a Empresa Curso Beta. O projeto visa mostrar o meu domínio sobre o back-end e possuía como objetivo:

> Desenvolver uma mini-aplicação de gerenciamento de contas bancárias.

## Funcionalidades

- Endpoint para criação de uma nova conta bancária.
- Endpoint para consultar uma conta bancária já existente.
- Endpoint para criar uma nova transação entre duas contas.
- Endpoint para consultar todas as transações.
- Endpoint para consultar todas as transações por `id` do remetente.
- Endpoint para consultar todas as transações por `id` do destinatário.
- Endpoint para consultar uma transação pelo seu `id`.
- Endpoint para atualizar o `STATUS` de uma transação pelo seu `id`.


## Stack utilizada

**Back-end:** Node, Express, Jest e Supabase.


## Requisitos

- [x]  Criar endpoint para criação de conta bancária.
- [ ]  Criar comando CLI para criação de conta bancária.
- [x]  Criar endpoint (sem comando) para movimentação de fundos entre duas contas



## Instalação e execução do projeto

Após o clone do repositório, instale todas as dependências do projeto utilizando:

```bash
  npm install
```

Depois disso, basta executar o comando de executar o servidor:

```bash
  npm run start:express
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SERVER_PORT`
`SUPABASE_URL`
`SUPABASE_ANON_KEY`


## Rodando os testes

Para esse repositório foi utilizado Jest para executar todos os testes. Vai ser criado uma pasta de coverage dentro da `./coverage`
da pasta local.
```bash
  npm run test
```


## Documentação

No projeto foi instalado e configurado o
[Swagger](https://swagger.io/). Por isso, assim que for executado o comando para iniciar o servidor, vai estar disponível na rota `/docs` a documentação da API utilizando Swagger.

