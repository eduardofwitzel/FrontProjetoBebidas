import React from 'react';
import axios from 'axios';

import './App.css';

class TabelaBebidas extends React.Component {
  render(){
    const lista = this.props.state.lista;
    const listaDisplay = [];
    for (let i=0; i < lista.length;i++) {
      listaDisplay.push(
        <tr>
          <td>{lista[i].id}</td>
          <td>{lista[i].marca} </td>
          <td>{lista[i].valor} </td>
          <td>{lista[i].tipo} </td>
          <td>{lista[i].volume} </td>
        </tr>
      );
    }

    return (
      <div>
          <h2>Tabela de Bebidas</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>marca</th>
                <th>valor</th>
                <th>tipo</th>
                <th>volume</th>
              </tr>
            </thead>
            <tbody>
            {listaDisplay}
            </tbody>
          </table>
      </div>    
    );
  }
  }

  function LabelInput(props){
    return(
      <div className="form-group">
        <label>{props.label}</label>
        <input type="TEXT" value={props.value} 
                className="form-control"
                onChange={(e) => {
                  if (props.atualizarTexto){
                  props.atualizarTexto(e.target.value);
                  }
                  }}/>
      </div>
  
    );
  }
  
  class App extends React.Component {
    state = {
      BebidaAtual: {
        id: "",
        marca: "",
        valor: "",
        tipo: "",
        volume: ""
      },
      lista: [
      
      ]
  }
  
  componentDidMount() {
      axios.get(
          `http://localhost:8080/bebida`,
          {
            responseType: 'json',
          }
        ).then(
        (response) => {
          const novoState = {...this.state};
          novoState.lista = response.data;
          this.setState(novoState);
        }
        );
        console.log("Bebidas carregadas");
  }
  
  atualizarTexto(campo, txt){
      const novoState = {...this.state};
      novoState.BebidaAtual[campo] = txt;
      this.setState(novoState);
  }
  
  gravar(){ 
      const apiUrl = `http://localhost:8080/bebida/add`;
      fetch(apiUrl, {
        method:'POST',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.BebidaAtual)
      }).then(
        (response)=> {
          console.log(response.body);
          this.componentDidMount();
        }
      );
  }

  editar(){ 
    const apiUrl = `http://localhost:8080/bebida/add`;
    fetch(apiUrl, {
      method:'POST',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.BebidaAtual)
    }).then(
      (response)=> {
        console.log(response.body);
        this.componentDidMount();
      }
    );
}
  
    render(){
      return (
        <div className="container">
          <TabelaBebidas state={this.state}/>
          <h1>Registrar Bebida</h1>
        <LabelInput label="marca:"
                    value = {this.state.BebidaAtual.marca}
                    atualizarTexto={(txt) => this.atualizarTexto('marca', txt)}/>
  
        <LabelInput label="valor:"
                    value = {this.state.BebidaAtual.valor}
                    atualizarTexto={(txt) => this.atualizarTexto('valor',txt)}/>
  
        <LabelInput label="tipo:"
                    value = {this.state.BebidaAtual.tipo}
                    atualizarTexto={(txt) => this.atualizarTexto('tipo', txt)}/>
        <LabelInput label="volume:"
                    value = {this.state.BebidaAtual.volume}
                    atualizarTexto={(txt) => this.atualizarTexto('volume',txt)}/>
  
        <button className="btn btn-primary"
          onClick={()=>{this.gravar()}}>Gravar</button>                
      </div>
    );
    }
  }
  
  export default App;