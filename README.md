# LabEddit

## Stack
Esse é um projeto de Frontend Web feito utilizando ReactJS, HTML e CSS; 
e como gerenciador de pacotes do NodeJS o npm. Os arquivos estão divididos
entre `components`(CriarComentario, CriarPost e outros) e as `pages` (Login,
Register e outras) que são as páginas em si do projeto. 

## Sobre

O projeto consiste em um modelo de rede social, com cadastro, login, posts,
likes e comentários.

### Página de Login

A página de login possui dois campos de texto: email e senha, ao fazer o login, 
o usuário será redirecionado para a página de feed.
A página possui também um botão "Criar conta", que leva o usuário para a página 
de cadastro.

### Página de Cadastro

A página de cadastro possui 3 campos: nome de usuário, email e senha, após 
cadastrar, o usuário será redirecionado para a página de feed.

### Página de Feed

A página de feed deverá mostrar todos os posts, além de um formulário para 
a criação de post.
Essa página só poderá ser acessada por um usuário logado. Caso o usuário não 
esteja logado, será redirecionado para a página de login.
O formulário possui apenas um campo de texto e cada post mostrará o nome de 
usuário que postou, o texto do post, o número de votos (positivo ou negativo) 
e o número de comentários.
Quando o usuário clicar em um post, ele será ser redirecionado para a 
página do respectivo post.

### Página de Post

A página de post mostrará o mesmo post da página de feed que o usuário 
clicou anteriormente, com o usuário, texto, curtidas e número de comentários.
Essa página também só poderá ser acessada por um usuário logado. Caso o usuário 
não esteja logado, será redirecionado para a página de login.
Abaixo, terá um formulário para criação de comentários e os cards de comentários.

Há integrações com APIs externas. Bibliotecas: axios, styled-components e 
material-ui

## Instruções para rodar
Por ser um projeto com ReactJS, há a necessidade do NodeJS. Com ele em 
sua máquina, basta abrir o terminal e navegar até o repositório clonado e 
rodar:

1. `npm install` para instalar todas as dependências;
1. `npm run start` para rodar localmente o projeto
1. `npm run build` para gerar uma versão estática do projeto 
(que ficará na pasta `build`)

Estando com o surge instalado (`npm install surge`), para deployar pode-se utilizar 
o `surge ./build`, um link será fornecido e assim poderá utilizá-lo para abrir a 
aplicação no navegador.
