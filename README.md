# Front do desafio tech da UauBox

Aqui está todo o front feito em react, porém aqui é apenas gerado e a pasta 'build' gerada para prod vai ao público do back para ser integrado.

# Instalação

npm i para instalar todas as depedências

npm start para iniciar o projeto

# Problemas

Infelizmente, eu não consegui concluir todas as atividades do teste, o tempo foi um problema, deixo aqui anotado o que ficou faltando:

- A página "Me" está com o usuário que irá mostrar estático, não é o logado pois tive problemas para realizar autenticação com o JWT, caso queira ver informações de outro usuário, há a necessidade de mudar o ID na chamada da API no arquivo template/component/Me.jsx há um comentário indicando qual deve ser trocada.

- Pelo fato acima da página "Me" estar estática, se o usuário deletar o usuário que é opção da página, e acessar novamente, ele irá trazer um erro.

- Não consegui por tempo colocar máscaras na página de Cadastro.

- Não foi terminado a animação do dropdown do menu.

- Planejava pelo menos criar views com assinaturas em uma flexbox e com os cards do bootstrap, mas não me sobrou tempo

- Faltou os itens opcionais do desafio