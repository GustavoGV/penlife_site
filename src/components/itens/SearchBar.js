import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { socket } from '../../socket.js'
import { InputNumber, Button, Space, Input, Select, Tag } from 'antd';
import NewItemDescription from "../newitem/NameItemRequest";
import { CloseOutlined } from "@mui/icons-material";

function SearchBar({  data, cadastro }) {
  const { TextArea } = Input;
  //const produtos = data
  const [selecionados, setSelecionados] = useState([])
  const [produtos, setProdutos] = useState(data)
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [popUp, setPopUp] = useState(false)
  const [prodEscolhido, setProdEscolhido] = useState("")
  const [categorias, setCategorias] = useState([])
  const { Option } = Select;
  useEffect(() => {
    socket.emit('puxarProdutos')
    socket.on('produtos', (p) => {
      console.log(p + ' <prodServer')
      console.log(data + ' <data')
      setProdutos(p)
    })
    socket.on('resultado', (r) => {
      console.log(r)
    })
    return () => {socket.off('produtos');socket.off('resultado')}
  }, [])
  const children = [];
  let categ = ['Cor', 'Largura', 'Comprimento', 'Peso']
  for (let i = 0; i < categ.length; i++) {
    children.push(<Option key={categ[i]}>{categ[i]}</Option>);
  } 


function handleChange(value) {
  console.log(`selected ${value}`);
  setCategorias(value)
}
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = produtos.filter((value) => {
      console.log(value.descricao + " <value")
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
  
  const [produtoAtual, setProdutoAtual] = useState()
  const [largura, setLargura] = useState("cm")
  const [comprimento, setComprimento] = useState("cm")
  const [peso, setPeso] = useState("g")
  function addProduto() {
    // let categ = ['Cor', 'Largura', 'Comprimento', 'Peso']
    let valorCategorias = []
    if(document.querySelector('#Cor')){
      valorCategorias.push({categ: "Cor", valor: document.querySelector('#Cor').value, un: ''})
      console.log(document.querySelector('#Cor').value + ' <document.querySelector(#Cor).value')
    }
    if(document.querySelector('#Largura')){
      valorCategorias.push({categ:"Largura", valor: document.querySelector('#Largura').value, un: largura})
    }
    if(document.querySelector('#Comprimento')){
      valorCategorias.push({categ: "Comprimento", valor: document.querySelector('#Comprimento').value, un: comprimento})
    }
    if(document.querySelector('#Peso')){
      valorCategorias.push({categ: "Peso", valor: document.querySelector('#Peso').value, un: peso})
    }
   

    let descri = document.querySelector('#descri-add').value
    let qnt = document.querySelector('#qnt-prod').value
    let prod = produtoAtual.descricao
    let value = produtoAtual
    if (qnt.length > 0){
      setPopUp(false)
      setSelecionados([...selecionados, {nome: prod, qnt: qnt, descri: descri, valorCategorias: valorCategorias, codIntProd: value.codigo_produto_integracao, codProd: value.codigo_produto}])
    }
    else{
      alert('Voce precisa especificar a quantidade que deseja do item')
    }
  }
  function checarMedida(categ) {
    if(categ == "Comprimento"){
      return true
    }
    else if(categ == 'Largura'){
      return true
    }
    else{
      return false
    }
    
    
  }

  function checarSeInt(categ) {
    if(categ == "Cor"){
      return false
    }
    else {
      return true
    }
    
  }

  const selectAfter = (
    <Select defaultValue="cm" style={{ width: 70 }} onChange={(val)=>{setComprimento(val)}}>
      <Option value="cm" >cm</Option>
      <Option value="dm" >dm</Option>
      <Option value="m" >m</Option>
      <Option value="dam" >dam</Option>
    </Select>
  );
  const selectAfter2 = (
    <Select defaultValue="g" style={{ width: 70 }} onChange={(val)=>{setPeso(val)}}>
      <Option value="g" >g</Option>
      <Option value="kg" >kg</Option>
    </Select>
  )
  function produtoSelecionado(value) {
    console.log(Object.keys(value) + ' <produtoSelecionado')
    setProdutoAtual(value)
    let prod = value.descricao
    setCategorias([])
    //console.log(selecionados)
    //popUP descriçao + qnt
    let duplicado = 0
    selecionados.forEach((item) => {
      if(item.nome == prod){
        duplicado = 1
      }
    })
    if(duplicado == 0){
      setProdEscolhido(prod)
      setPopUp(true)
      clearInput()

      
    }
    else{
      alert('O produto "' + prod + '" ja foi adicionado ao pedido')
    }
  }

  function removerSelecionados(item) {
    let newSelecionados = selecionados.filter((value) => {
      console.log(value.nome + " value.nome" + item + " item")
      return value.nome !== item.nome
    })
    console.log(newSelecionados + ' newSelecionados')
    setSelecionados(newSelecionados)
  }

  function enviarPedido() {
    let nomes = document.querySelectorAll('#nome-item')
    let qnts = document.querySelectorAll('#qnt-item')
    let pedido = []
    let qntFaltando = 0 
    //nomes.forEach((nome, index) => {
    selecionados.map((selecionado) => {
      pedido.push({categ: selecionado.valorCategorias, obs: selecionado.descri, codInt: selecionado.codIntProd, codProduto: selecionado.codProd, qtde: selecionado.qnt})//, qtde: qnts[index].innerText})
      /*  
      if(parseInt(qnts[index].innerText) < 1){
          qntFaltando = 1
          alert('Para enviar o pedido adicione a quantidade do item ' + nome.innerHTML)
        }
        */
    })
    if(pedido.length == 0){
      alert("Para enviar o pedido é necessário adicionar os itens desejados")
    }
    
    if((qntFaltando == 0 && pedido.length > 0)){
      socket.emit('fazerRequisicao', {itens: pedido, solicitador: cadastro.nome, email: cadastro.email, area: cadastro.area})
      alert("Pedido enviado com sucesso")
      setSelecionados([])
    }

    
    
  }
  
  return (
    <>
      
      <div id='searchbutton' className="search">
      <h2 style={{
          textAlign:"center", 
          fontWeight:"800",
          color:"rgb(0, 33, 64)",
          }}
        >Requisição de Produto</h2>
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
              <a className="dataItem" href={value.link} target="_blank" onClick={() => produtoSelecionado(value)}>
                <p>{value.descricao} </p>
              </a>
            );
          })}
        </div>
      )}
      <div id="listadeitens">
      <ul id="horizontal-list"></ul>

      
      {

        selecionados.map((item) => {
          return (
            <>
            <ul id="horizontal-list">
              <li>
                <a id="nome-item">{item.nome}</a>
              </li>
              <li id="qnt-item">
                <a>{item.qnt + " un"} </a>
              </li>
              <li>
               
                <a id="buttonRemover"><Button icon={<CloseIcon />} size="large" onClick={() => removerSelecionados(item)}></Button></a>
              </li>
              
              
            </ul>

            <ul id="horizontal-list">
            <li>
                Justifique seu pedido: 
              </li>
              <li>{item.descri}</li>
            </ul>
            <ul>
            {
              item.valorCategorias.map((c) => {
              
                  return (
                    <>
                      <li>
                        {c.categ + ': ' + c.valor + ' ' + c.un}
                      </li>
                    </>
                  )
                

              })
            }
            </ul>
            

            </>
            

          )
        })
      }
            </div>

      </div>
  
      
      {popUp ? (<>
        
        <div className="popup"> 
        
          <div className="popup-inner">
          <Button type="primary" onClick={() => addProduto() }>Adicionar</Button>
            
            <>
            
     <div className='newitemname'>
            
            <h1> {prodEscolhido}
            </h1>
            <p>Quantidade:</p>
            <InputNumber id="qnt-prod" min={1} max={99} defaultValue={1} style={{ margin: 1 }} placeholder={"Insira a quantidade..."}></InputNumber>
          
        <br />
        <p style={{ margin: 5 }}>Selecione as categorias desejadas:</p>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={[]}
          onChange={handleChange}
        >
          {children}
        </Select>
        <p>Descrição adicional:
        <TextArea id="descri-add"
        style={{height : 75}}
        placeholder='Insira aqui uma justificativa para o pedido e qualquer detalhe adicional'
        showCount 
        maxLength={150} 
        >
        </TextArea>
        </p>
      </div>
      {categorias.map((categoria) => {
            return <div ><p>{categoria}</p> {checarMedida(categoria) ? <InputNumber defaultValue={1} min={1} max={99} id={categoria} addonAfter={selectAfter}></InputNumber> : checarSeInt(categoria) ? <InputNumber defaultValue={1} min={1} max={99} id={categoria} addonAfter={selectAfter2}></InputNumber> : <Input id={categoria} ></Input> }</div>
          })}
          
      </>
      
              
          </div>
          
        </div>
        
      </>) : null}

      <Button size="large" type="primary" onClick={() => {enviarPedido()}}>Enviar pedido</Button>
    </>
  );
}



export default SearchBar;