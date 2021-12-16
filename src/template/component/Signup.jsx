import React from 'react'
import axios from 'axios'

class Signup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {user:{
            name:'',
            email: '',
            cpf: '',
            birthday: '',
            phone: '',
            address: '',
            password: '',
        },
        rows: [],
        flag: false,
        isLoaded: false,
        error: false,
     };
    }
    //Cria o usuário, mas passa validação nos inputs primeiro pelo validateForm, se ele voltar true, faz a requisição post.
    async createUser() {

      if (this.validateForm() === false) return 0

      const user = {
      data: {
        name: this.state.user.name,
        email: this.state.user.email,
        password: this.state.user.password,
        cpf: this.state.user.cpf,
        birthdate: this.state.user.birthdate,
        phone: this.state.user.phone,
        address: this.state.user.address,
      }
     }
     
     this.setState({isLoaded: true})
      await axios.post(`http://localhost:8084/api/user`, user)
           .then(res =>{
             this.setState({
               error: false,
               isLoaded: true
              })
           },(error) => {
             this.setState({
                 isLoaded: true,
                 error: error,
             });
           });
     }

  //Salva no State os dados que o usuário digitou em cada evento OnChange.
   handleChange=event=>{
          const name=event.target.name
          const value=event.target.value
        this.setState({user:{
            ...this.state.user,
            [name]:value
        }});
   }

   validateForm=event=>{
          let a = []
          let date = new Date().toISOString().slice(0, 10);
        
          if(this.state.user.name.length < 5) a.push(<p className='formulario__erro' key={1}>Por favor, insira seu nome completo.</p>)
          if(this.state.user.email.length < 5) a.push(<p className='formulario__erro' key={2}>Por favor, insira seu email corretamente.</p>)
         if(!validateCPF(this.state.user.cpf)) a.push(<p className='formulario__erro' key={3}>Por favor, insira um CPF válido.</p>)
         if(this.state.user.birthday > date| this.state.user.birthday === '') a.push(<p className='formulario__erro' key={4}>Por favor, insira uma data de nascimento válida.</p>)
          if(this.state.user.password.length < 4) a.push(<p className='formulario__erro' key={5}>Por favor, insira uma senha com ao menos 4 digitos.</p>)

          this.setState({rows: []})
          
          if(a.length === 0)
          { 
            this.setState({flag: ''})
            return true
          }
          else{
            this.setState({rows: a})
            this.setState({flag: true})
            return false
          }
   }


   render(){

    //Aqui as comparações são encima do isLoaded (se ele já fez a requisição) e sobre a "flag", a flag só se torna vazia
    //quando as validações dão sucesso, então é seguido para o post e o cadastro do usuário.

      if(this.state.error !== false){
        return(
          <div className='formulario'>
              <h1>Cadastro</h1>
              <p className='formulario__erro'>Ops! algo deu errado!</p>
              <p className='formulario__erro'>{this.state.error}</p>
          </div>
        )
      }

        else if(this.state.error === false && this.state.isLoaded === true){
          return(
            <div className='formulario'>
                <h1>Cadastro</h1>
                <span>Usuário criado com sucesso!</span>
            </div>
          )
        }

        else if(this.state.flag === true && this.state.isLoaded === false){
          return(
            <div className='formulario'>
                <h1>Cadastro</h1>

                    <label htmlFor="">Nome: </label>
                    <input className='formulario__input' type="text" value={this.state.user.name} onChange={this.handleChange} name="name" required/>

                    <label htmlFor="">E-mail: </label>
                    <input className='formulario__input' type="email" value={this.state.user.email} onChange={this.handleChange} name="email"/>

                    <label htmlFor="">CPF: </label>
                    <input className='formulario__input' type="text" value={this.state.user.cpf} onChange={this.handleChange} name="cpf"/>

                    <label htmlFor="">Data de Nascimento: </label>
                    <input className='formulario__input' type="date" value={this.state.user.birthday} onChange={this.handleChange} name="birthday"/>

                    <label htmlFor="">Telefone celular: </label>
                    <input className='formulario__input' type="text" value={this.state.user.phone} onChange={this.handleChange} name="phone"/>

                    <label htmlFor="">Endereço: </label>
                    <input className='formulario__input' type="text" value={this.state.user.address} onChange={this.handleChange} name="address"/>
                    
                    <label htmlFor="">Senha: </label>
                    <input className='formulario__input' type="password" value={this.state.user.password} onChange={this.handleChange} name="password"/>

                    <button className='formulario__button btn btn-primary' onClick={()=> this.createUser()}>Cadastrar</button>
            
            <div>
              {this.state.rows}
            </div>

            </div>
          )
        }

        else if(this.state.flag === false && this.state.isLoaded === false){
          return(
            <div className='formulario'>
                <h1>Cadastro</h1>

                    <label htmlFor="">Nome: </label>
                    <input className='formulario__input' type="text" value={this.state.user.name} onChange={this.handleChange} name="name" required/>

                    <label htmlFor="">E-mail: </label>
                    <input className='formulario__input' type="email" value={this.state.user.email} onChange={this.handleChange} name="email"/>

                    <label htmlFor="">CPF: </label>
                    <input className='formulario__input' type="text" value={this.state.user.cpf} onChange={this.handleChange} name="cpf"/>

                    <label htmlFor="">Data de Nascimento: </label>
                    <input className='formulario__input' type="date" value={this.state.user.birthday} onChange={this.handleChange} name="birthday"/>

                    <label htmlFor="">Telefone celular: </label>
                    <input className='formulario__input' type="text" value={this.state.user.phone} onChange={this.handleChange} name="phone"/>

                    <label htmlFor="">Endereço: </label>
                    <input className='formulario__input' type="text" value={this.state.user.address} onChange={this.handleChange} name="address"/>
                    
                    <label htmlFor="">Senha: </label>
                    <input className='formulario__input' type="password" value={this.state.user.password} onChange={this.handleChange} name="password"/>

                    <button className='formulario__button btn btn-primary' onClick={()=> this.createUser()}>Cadastrar</button> 

            </div>
          )
        }

   }

}

//Função de validar CPF, não foi feita por mim.
function validateCPF(strCPF) {
    var sum;
    var rest;
    sum = 0;
  if (strCPF === "00000000000") return false;

  for (let i=1; i<=9; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11))  rest = 0;
    if (rest !== parseInt(strCPF.substring(9, 10)) ) return false;

  sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11))  rest = 0;
    if (rest !== parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

export default Signup