import React from 'react'

class Menu extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {dropdown: false};
      }

      //Dropdown do menu, falso esconde, true desce.
    render(){
        return(
            <div className="container-fluid">
                <div className="menu" onClick={()=> this.state.dropdown === false ? this.setState({dropdown:true}) : this.setState({dropdown:false})}>
                    <span>Menu</span>
                    {this.state.dropdown ? <ul className="menu__item">
                        <a href="/">Home</a>
                        <a href="/signup">Cadastrar</a>
                        <a href="/signin">Login</a>
                        <a href="/me">Dados Pessoais</a>
                        </ul> : ''}
                </div>
            </div>
        )
    }
}

export default Menu