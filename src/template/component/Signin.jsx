import React from 'react'

class Signin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {user:{
            email: '',
            password: '',
        },
     };
    }

    handleChange=event=>{
        const name=event.target.name
        const value=event.target.value
      this.setState({user:{
          ...this.state.user,
          [name]:value
      }});
    }

    render(){
        return(
            <div className='login'>
            <h1>Login</h1>

            <label htmlFor="">E-mail: </label>
            <input className='login__input' type="email" value={this.state.user.email} onChange={this.handleChange} name="email"/>
            
            <label htmlFor="">Senha: </label>
            <input className='login__input' type="password" value={this.state.user.password} onChange={this.handleChange} name="password"/>

            <button className='login_button btn btn-primary'> Entrar </button>

            </div>
            )
        }
    }

export default Signin