import React from 'react'

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
     };
    }

    messageList = (a) =>{a.forEach(item => {
        this.state.rows.push(<p className='formulario__erro' key={item}>{item}</p>)
    });}

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
        
          if(this.state.user.name.length < 5) a.push('Por favor, insira seu nome completo.')
          if(this.state.user.email.length < 5) a.push('Por favor, insira seu email corretamente.')
          if(!validateCPF(this.state.user.cpf)) a.push('Por favor, insira um CPF válido.')
          if(this.state.user.birthday > date || this.state.user.birthday === '') a.push('Por favor, insira uma data de nascimento válida.')
          if(this.state.user.password.length < 4) a.push('Por favor, insira uma senha com ao menos 4 digitos.')
          
          
          if(a.length === 0) console.log('validação correta')
          else{
            this.messageList(a)
          }
      }


      render(){
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

                <button className='formulario__button btn btn-primary' onClick={this.validateForm}>Cadastrar</button>
        
        <div>
        {this.state.rows}
        </div>

        </div>
        
        )
        }
}

function validateCPF(strCPF) {
    var sum;
    var rest;
    sum = 0;
  if (strCPF == "00000000000") return false;

  for (let i=1; i<=9; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(strCPF.substring(9, 10)) ) return false;

  sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

export default Signup