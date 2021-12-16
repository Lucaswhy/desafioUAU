# Teste da UAUBox
Desafio Tech da UAUBox.

# Instalação

npm i < Irá trazer todas as dependências listadas no package.json

npm run start < Após o npm i, estará liberado na porta 8084 pelo http://localhost:8084/



OBS: É necessário ter o PostgreSQL instalado na máquina;
OBS2: A senha do PostgreSQL está configurada no src/config/database está '123456', então é necessário ou trocar no arquivo '\scripts\config.js' ou na própria máquina;
OBS3: É necessário ter o Node.js instalado na máquina, caso tenha algum problema de versão, a utilizada no desenvolvimento foi a v14.17.3.
OBS4: Fazendo uma requisição post pela URL http://localhost:8084/init irá criar um registro para teste, caso necessário.

# Front

Os arquivos do front-end aqui são os de produção gerados, para ver o código real está na branch Front desse mesmo repositório

# API e corpo

http://localhost:8084/api/user/

API GET feita apenas pelo desenvolvimento, lista todos os usuários

API POST feita para criação de um usuário, se estiver com todas informações corretas irá criar o usuário.

Corpo(RAW - Json): 

{
    "data": {
        "name": "Teste Usuario",
        "email": "usuario@teste.com",
        "password": "123456",
        "cpf": "53897207095",
        "birthdate": "1999/01/01",
        "phone": "24994405591",
        "address": "Rua de teste de usuário"
    }
}


http://localhost:8084/api/user/:id

API GET feita para trazer um usuário pelo ID, mesclando as duas tabelas user e user_info, sem trazer o password e token.

http://localhost:8084/api/user/:email

API DELETE para fazer um soft-delete no usuário no sistema, enviando o e-mail, apenas irá trocar a flag active para false.

http://localhost:8084/validate

API POST para realizar o login, irá retornar se houve erro ou não, e com o token gerado no momento. A partir daqui o token expira em 5 horas.

Corpo(RAW - Json): 

{
   "email": "lucas@teste.com",
   "password": "1234"
}

http://localhost:8084/init

API POST Para criar um usuário teste no sistema, não precisa enviar corpo.



# Problemas

- Por um bug que não conheci reconhecer, a comparação do token JWT estava causando um erro, no qual não foi possível colocar a requisição de um token nas páginas, a única que tem é o http://localhost:8084/status na qual não irá abrir pelo fato de o Token sempre dar inválido ou expirado.

- Devido ao mesmo motivo de cima, não consegui terminar a autenticação, então por mais que use a API /validate para logar e voltar o token, ainda não está autenticado.

