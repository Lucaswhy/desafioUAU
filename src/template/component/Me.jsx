import React from 'react'
import axios from 'axios';

class Me extends React.Component{
    constructor(props) {
        super(props);
        this.state = {user:{
            error: false,
            isLoaded: false,
            isDeleted: true,
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

    //Realizar a montagem do usuário
    async componentDidMount() {
      //Aqui está em estático o usuário que irá aparecer na tela através da requisição get, caso queria mudar, é só mudar o id no final de '1' para o id desejável.
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

    //Deletar o usuário (Soft-delete)
    async deleteUser() {
        await axios.delete(`http://localhost:8084/api/user/`+this.state.items.email)
        .then(res =>{
            this.setState({
              error: false,
              isDeleted: true
             })
          },(error) => {
            this.setState({
                isLoaded: true,
                error: error,
            });
          });
    }

    render(){
        const { error, isLoaded, items, isDeleted } = this.state;
        if(error === true)  return <span className='formulario_erro'>Error: Ocorreu um erro, tente novamente mais tarde! :( </span>
        else if (isDeleted) return <h1>Usuário deletado!</h1>
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
            
                <button className='btn btn-danger mt-4' onClick={()=> this.deleteUser()}>Deletar Usuário</button>
            </div>
            )
        }
    }
}       


export default Me