import React from 'react'
import axios from 'axios'

class Signin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {user:{
            email: '',
            password: '',
        },
        error: false,
        items: [],
        isLoaded: false,
        errorMessage: ''
     };
    }

    //Envia pro back o usuário que tentou realizar login.
    async validateUser() {
        const user = {email: this.state.user.email, password: this.state.user.password }
        await axios.post(`http://localhost:8084/validate`, user)
             .then(res =>{
                 this.setState({
                   error: res.data.error,
                   items: res.data.data,
                   isLoaded: true
                 })
             },(error) => {
               this.setState({
                   isLoaded: true,
                   error: error,
                   errorMessage: error.response.data.data

               });
             });
       }

    //Salva no State os dados que o usuário digitou em cada evento OnChange.
    handleChange=event=>{
        const email=event.target.name
        const value=event.target.value
      this.setState({user:{
          ...this.state.user,
          [email]:value
      }});
    }

    render(){
        
        if(this.state.error !== false)
        {
             return (
             <div className='login'>
                <h1>Login</h1>
    
                <label htmlFor="">E-mail: </label>
                <input className='login__input' type="email" value={this.state.user.email} onChange={this.handleChange} name="email" required/>
                
                <label htmlFor="">Senha: </label>
                <input className='login__input' type="password" value={this.state.user.password} onChange={this.handleChange} name="password" required/>
    
                <button className='login__button btn btn-primary' onClick={()=> this.validateUser()}> Entrar </button>

                <span className='login__erro'>{this.state.errorMessage}</span>
 
             </div>)
        }

        //Se tiver dado sucesso o isLoaded é true e mostra o Token
        if(this.state.error === false && this.state.isLoaded === true)
        {
             return (
             <div className='login'>
                <h1>Login</h1>
    
                <label htmlFor="">E-mail: </label>
                <input className='login__input' type="email" value={this.state.user.email} onChange={this.handleChange} name="email" required/>
                
                <label htmlFor="">Senha: </label>
                <input className='login__input' type="password" value={this.state.user.password} onChange={this.handleChange} name="password" required/>
    
                <button className='login__button btn btn-primary' onClick={()=> this.validateUser()}> Entrar </button>

                <span className='login__sucesso'>Seu login foi realizado com sucesso! seu token:</span>
                <p className='login__token'>{this.state.items}</p>
 
             </div>)
        }


        return(
            <div className='login'>
            <h1>Login</h1>

            <label htmlFor="">E-mail: </label>
            <input className='login__input' type="email" value={this.state.user.email} onChange={this.handleChange} name="email" required/>
            
            <label htmlFor="">Senha: </label>
            <input className='login__input' type="password" value={this.state.user.password} onChange={this.handleChange} name="password" required/>

            <button className='login_button btn btn-primary' onClick={()=> this.validateUser()}> Entrar </button>

            </div>
            )
        }
    }

export default Signin