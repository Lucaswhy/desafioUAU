import React from 'react'
import axios from 'axios';

class Me extends React.Component{
    constructor(props) {
        super(props);
        this.state = {user:{
            error: false,
            isLoaded: false,
            items: {
                name:'',
                email:'',
                cpf:'',
                birthdate:'',
                phone:''
            },
        },
     };
    }

    async componentDidMount() {
     await axios.get(`http://localhost:8084/api/user/1`)
          .then(res =>{
              this.setState({
                error: res.data.error,
                items: res.data.data,
                isLoaded: true
              })
          },(error) => {
            this.setState({
                isLoaded: true,
                error: error
            });
          });
    }

    
    render(){
        const { error, isLoaded, items } = this.state;
        if(error === true)  return <span className='formulario_erro'>Error: Ocorreu um erro, tente novamente mais tarde! :( </span>
            else if (!isLoaded) {
                return <div className='user'><h1>Carregando seus dados!</h1></div>;
            }else{
            const date = items.birthdate.toString().slice(0, 10);
        return(
            <div className='user'>
                <h1>{items.name}</h1>
                <p><strong>Email: </strong> {items.email}</p>
                <p><strong>CPF: </strong>{items.cpf}</p>
                <p><strong>Data de Nascimento: </strong>{date}</p>
                <p><strong>Celular: </strong>{items.phone}</p>
                <p><strong>Endereço: </strong>{items.address}</p>
            </div>
            )
        }
    }
}       


export default Me