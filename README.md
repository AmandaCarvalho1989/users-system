<h1 align="center" >UsersSystem</h1>
<img src="public/images/preview.png" />

---

## 💻 Sobre

O UsersSystem é um projeto de desafio passado pela Softplan.
 O resultado foi uma aplicação com sistema de autenticação e gerenciamento de usuários.


### Requisitos exigidos:

- [x]  A aplicação deverá estar protegida por login e senha
- [x] Deverá existir 2 tipos de perfis (ADMIN e USER)
- [x] Deverá possuir interface para pesquisa dos usuários cadastrados
- [x]  Deverá possuir interface para cadastro (CRUD) dos usuários da aplicação
- [x] Deverá possuir interface para visualizar “Meu perfil”, podendo alterar a senha
- [x] Deverá possuir a opção de “Sair” da aplicação
- [x]  Deverá aparecer o nome e/ou foto do usuário no header da aplicação

### Regras de negócio exigidas:
- [x]  O usuário com acesso ADMIN poderá executar cadastro (CRUD) de outros usuários e visualizar
- [x]  O usuário com acesso USER poderá apenas visualizar os usuários do sistema

### Requisitos não funcionais exigidos:

- [x] O frontend deverá ser desenvolvido em React;
- [x] Utilizar algum mock http, exemplo: json-server;
- [x] Utilizar algum framework UI (Material-UI, Bootstrap, AntDesign, etc…);

### PLUS:

- [x]  Testes unitários;
- [x]  Usuário possuir foto no seu cadastro;

### Estrutura de usuário recomendada:

```
{
  "id": 1,
  "firstName": "Thomas",
  "lastName": "Hudson",
  "birthDate": "1989-12-24",
  "email": "thomas.hudson@gmail.com",
  "document": "52254883070",
  "password": "MTIzNDU2",
  "role": "ADMIN",      
}
```

### Estrutura de usuário final:
```
{
  "id": 1,
  "firstName": "Thomas",
  "image": BASE_64
  "lastName": "Hudson",
  "birthDate": "24-12-1989",
  "email": "thomas.hudson@gmail.com",
  "document": "52254883070",
  "password": "MTIzNDU2",
  "role": "ADMIN",      
}
```
---


## 🧬  Tecnologias

Utilizei as seguintes tecnologias:
- ReactJs
- NextJs
- Typescript
- Styled-components
- ChakraUI
- JSON-Server
- Jest

### 🛠 ReactJs

O ReactJS é uma framework em javascript que apresentou ao mercado de desenvolvimento o conceito de JSX (JavaScript XML) que é basicamente a utilização de tags dentro do javascript, ou seja, trechos html sendo interpretado pelo javascript. Nesse caso o React é a base do projeto, todos os sistemas são feitos a partir dele.

### 🛠 NextJs

O NextJS é uma framework do ReactJS, que eleva a utilização do React a outro nível. O Next ficou popular por conta das funcionalidades diversas que ele traz ao React, como por exemplo:
- SPA (Single page application)
- SSR (Server Side Rendering)
- Pages routes
- Dynamic routes
- API routes
- Static Pages Generation
- tratamento de imagens
- etc...

Além disso o Next possuí um Back end intermediario que é responsável pela renderização das telas em server side, retornando para o usuário final uma página estática completamente tratada, o que não limita o usuário à utilização do Javascript no browser. E é nesse servidor aonde os endpoints desenvolvidos dentro da pasta api (do api routes) são executadas, deixando as requisições do front-end mais seguras e eficiêntes.

Nesse projeto utilizamos as principais tecnologias:
- SPA para ter mais desempenho e fluidez na navegação
- Pages routes para agilizar a manipulação de rotas de navegação
- Dynamic routes para tornar o gerenciamento de informações mais transparente para o usuário

### 🔧 Typescript

O Typescript é uma ferramenta de tipagem feita pela microsoft, desenvolvida com o objetivo de esclarecer o código e prever erros que aconteceriam por conta da tipagem dinâmica presente no Javascript atualmente, além disso o Typescript também trás uma vizualização clara do código para desenvolvedores multiplos no projeto. Nesse projeto o Typescript está sendo utilizado com um método de boas práticas e para organização e clareza do código.


## Utilização do projeto

### 📁 Baixar o projeto

Faça o clone do repositório para ter uma versão do projeto em sua máquina

```
$ git clone hhttps://github.com/AmandaCarvalho1989/users-system.git && cd users-system
```



### 🧰 Instalar dependências

Inclua no projeto as bibliotecas externas 

```
$ yarn
# ou
$ npm install
```

### 📀 Gerar uma versão funcional

O userManager ja está pronto, portanto não precisamos executa-lo em ambiente de desenvolvimento, por isso podemos gerar uma versão de build para ter a melhor experiência com a aplicação:

```
$ yarn build
# ou
$ npm run build
```

### 🔌 Iniciar a aplicação

Agora que temos tudo pronto basta iniciar a aplicação, só lembrando que o userManager utiliza o json-server portanto ele precisa que o servidor esteja disponível para que possa utilizar o sistema de gerenciamento e autenticação:


```

$ yarn server
$ yarn start

# com npm
$ npm run server

```

### Usuário para testes

email
```
admin@admin.com
```

senha
```
123456
```


### 💪 Funcionalidades extras:

- Tratamento de rotas inexistentes (404) e de erros internos (500)
- Paginação dos dados dos usuários
- Visualização dos dados dos usuários em tabela ou cards
- Responsividade 

### 📊 Sobre o desenvolvimento 

- Optei começar o projeto com o NextJS e com Typescript. O NextJS pelas funcionalidades que ele traz ao React, como ciração de páginas dinâmicas, 
- Escolhi utilizar o `ChakraUI`, que é uma biblioteca de componentes do React que facilita a construção da IU de um aplicativo ou site, pois ele é bem simples, flexível e acessível.
- Para o CRUD dos usuários utilizei o JSON-SERVER que faz a simulação de uma API.
- Para lidar com os dados dos formulários utilizei o `react-hook-form` junto com `yup`, que serve para realizar validações dos campos.
- Apesar do Chakra ter componente Toast, preferi utilizar a biblioteca `react-toastify` para mensagens de erro e/ou sucesso.
- Para alguns componentes, tive que aplicar `styled-components` para melhor funcionamento.

###  🎨 Layout

Fiz a construção das telas utilizando o Figma.
- [Layout](https://www.figma.com/file/hV3HBNcYY1RzlajZ7JaQzN/UsersSystem?node-id=0%3A1) 

## 👋 Experiência com o projeto

Neste projeto pude aprender e aprimorar demais! Consegui notar e valorizar também a importância de um código limpo, algo que tenho me atentado diariamente.
Aprendi a utilizar várias bibliotecas que nunca havia usado e/ou não tinha tamanha experiência como `react-lottie` para animações, `react-masked-text` para máscaras e o próprio `jest` para testes.
Desde já, agradeço pela oportunidade! Com certeza este desafio me fez uma profissional melhor!  
