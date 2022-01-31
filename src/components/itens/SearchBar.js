import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { socket } from '../../socket.js'
import { InputNumber, Button, Space } from 'antd';


function SearchBar({  data, cadastro }) {
  
  //const produtos = data
  const [selecionados, setSelecionados] = useState([])
  const [produtos, setProdutos] = useState(data)
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    socket.emit('puxarProdutos')
    socket.on('produtos', (p) => {
      console.log(p + ' <prodServer')
      console.log(data + ' <data')
      setProdutos(p)
    })
    return () => socket.off('produtos')
  }, [])
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = produtos.filter((value) => {
      console.log(value.Descricao + " <value")
      return value.descricao.toLowerCase().includes(searchWord.toLowerCase());
    });
    console.log(newFilter + ' newFilter')

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  
  
  function produtoSelecionado(prod) {
    //console.log(selecionados)
    let duplicado = 0
    selecionados.forEach((item) => {
      if(item == prod){
        duplicado = 1
      }
    })
    if(duplicado == 0){
      setSelecionados([...selecionados, prod])
      console.log([...selecionados, prod])
    }
    else{
      alert('O produto "' + prod + '" ja foi adicionado ao pedido')
    }
  }

  function removerSelecionados(item) {
    let newSelecionados = selecionados.filter((value) => {
      return value !== item
    })
    console.log(newSelecionados + ' newSelecionados')
    setSelecionados(newSelecionados)
  }

  function enviarPedido() {
    let nomes = document.querySelectorAll('#nome-item')
    let qnts = document.querySelectorAll('#qnt-item')
    let dataLimite = document.querySelector('#dataLimite').value
    let pedido = []
    let qntFaltando = 0 
    nomes.forEach((nome, index) => {
      pedido.push({obs: nome.innerHTML, qtde: qnts[index].value})
      if(qnts[index].value < 1){
        qntFaltando = 1
        alert('Para enviar o pedido adicione a quantidade do item ' + nome.innerHTML)
      }
    })
    if(pedido.length == 0){
      alert("Para enviar o pedido é necessário adicionar os itens desejados")
    }
    if(dataLimite.length !== 10){
      alert("A data esta no formato errado (ex: 13/04/1999)")
    }
    if((qntFaltando == 0 && pedido.length > 0) && dataLimite.length == 10){
      socket.emit('fazerRequisicao', {itens: pedido, solicitador: cadastro.nome, email: cadastro.email, area: cadastro.area, dataUso: dataLimite})
      alert("Pedido enviado com sucesso")
      setSelecionados([])
    }
    
  }

  return (
    <div id='botao' className="search">
      
      <div className="searchInputs">
      
        <input
          type="text"
          placeholder={"Insira um produto..."}
          value={wordEntered}
          onChange={handleFilter}
        />
        
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank" onClick={() => produtoSelecionado(value.descricao)}>
                <p>{value.descricao} </p>
              </a>
            );
          })}
        </div>
      )}
      <ul id="horizontal-list"></ul>
      <ul id="horizontal-list">
        <li>
          Nome do item:
        </li>
        <li>
          Quantidade:
        </li>
      </ul>
      {

        selecionados.map((item) => {
          return (
            <ul id="horizontal-list">
              <li>
                <a id="nome-item">{item}</a>
              </li>
              <li>
                <a ><input id="qnt-item"></input></a> 
              </li>
              <li>
                <a><button onClick={() => removerSelecionados(item)}>Remover</button></a>
              </li>
            </ul>
          )
        })
      }
      <ul id="vertical-list">
        <li>
      <Button onClick={() => {enviarPedido()}}>Enviar pedido</Button>
      </li>
      <li>Insira a data limite para a chegada dos itens:</li>
      <li>
      <input id="dataLimite"
          type="text"
          placeholder={"Ex: 13/04/1999"}
          
          
        />
        </li>
        </ul>
      
    </div>
  );
}

export default SearchBar;