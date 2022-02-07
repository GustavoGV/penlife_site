import { Layout, Menu, Row, Col } from 'antd';
import { UserOutlined,   FileOutlined, InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './App.css'
import Body from './home/basicinfo';
import LogoPEN from './penlogo';
import ProductData from './products.json';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import UploadImg from './newitem/ItemRequest';
import NewItemDescription from './newitem/NameItemRequest';

import { Input, Form, Button, Cascader } from "antd";
import { useNavigate } from "react-router-dom"
import SearchBar from './itens/SearchBar.js'
import { SearchOutlined } from '@ant-design/icons';



const { Header, Content, Footer, Sider } = Layout;

function App () {
    const [collapsed, setCollapsed] = useState(false);
    const [mostrar, setMostrar] = useState(true)
    const [search, setSearch] = useState(false)
    const [mostrarNewProduto, setMostrarNewProduto] = useState(false)
    const [aba, setAba] = useState('1')
    const [enviarCadastro, setEnviarCadastro] = useState({nome: "", email: "", area: ""})
    const [area, setArea] = useState("")
    const [valorEmail, setValorEmail] = useState("")
    const [valorNome, setValorNome] = useState("")

    function handleFinish(params) {
        
    }

    function validarCadastro() {
        const nome = document.querySelector('#nome-pessoa')
        const email = document.querySelector('#email')
        if(nome.value.length > 3 && area.length > 0){
            function validateEmail(e) 
            {
                var re = /\S+@\S+\.\S+/;
                return re.test(e);
            }
            if(validateEmail(email.value)){
                setEnviarCadastro({nome: nome.value, email: email.value, area: area})
                setMostrar(false)
                    
                setSearch(true)
                setAba('2')
                setArea("")
            }
            else{
                alert("Email " + email.value + " invalido")
            }
        }
        else{
            alert('Preencha corretamente os dados')
        }
        
    }
    function areaSelect(value) {
        setArea(value)
        
    }
    
    return (
    <Router>
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" selectedKeys={[aba]} defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
                Cadastro
            </Menu.Item>
            <Menu.Item key="2" icon={<FileOutlined />}>
                Selecionar itens
            </Menu.Item>
            <Menu.Item key="3" icon={<InboxOutlined />}>
                Adicionar itens
            </Menu.Item>
        </Menu>
        </Sider>
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        
            <Routes>
                <Route path="/" 
                element={
                <Content style={{ margin: '0 16px' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <>
    
    
    <Button id='botao' onClick={() => {
        setSearch(false)
        setMostrar(true)
        setMostrarNewProduto(false)
        setAba('1')
        }
    }>Voltar</Button>

    <Button id='additembutton'
        onClick={() => {
            //navigate("/additem")
            setMostrarNewProduto(true)
            setSearch(false)
            setAba('3')
        }}
        type="default"
        icon={<SearchOutlined />} 
        size="large">
        Requisitar item
        </Button>

    <br />
    { mostrar ? <Form
        layout="vertical"
        onFinish={handleFinish}
    > 
        <h2 
        style={{
            textAlign:"center", 
            fontWeight:"800",
            color:"rgb(0, 33, 64)",
            fontSize: "50px"
            }}
            >Cadastro</h2>

        
        <Row>
            <Col span={12}
            push={6}>
                <Form.Item
                    name={['nomecompleto']}
                    label='Nome Completo'
                    rules={[{ required: true, message: 'Por favor, insira um nome' }]}
                >

                    <Input id='nome-pessoa' placeholder="Ex: Maria da Silva"></Input>
                </Form.Item>
            </Col>    
        </Row>
    
        <Row>
            <Col span={12}
            push={6}>
                <Form.Item
                    name={['email']}
                    label='E-mail'
                    rules={[{type:'email'},{required:true, message:'Por favor, insira um email'}]}
                >
                    <Input value={valorEmail} id='email' placeholder="Ex: mariadasilva@penlife.com.br"></Input>
                    
                </Form.Item>
            </Col>
        </Row>

        <Row>
            <Col span={8}
            push={6}>
                <Form.Item id='area'
                    name={['area']}
                    label="Área"
                    rules={[{ required: true, message: 'Área é necessario' }]}
                >
                <Cascader onChange={areaSelect}
                    options={[
                    {
                    value: 'pedagogico',
                    label: 'Pedagógico',
                    children: [
                        {
                            value: 'educação_infantil',
                            label: 'Educação Infantil',
                        },
                        {
                            value: 'fund1',
                            label: 'Ensino Fundamental I',
                        },
                        {
                            value: 'fund2_e_medio',
                            label: 'Ensino Fundamental II e Médio',
                        },
                    ],
                    },
                    {
                            value: 'administrativo',
                            label: 'Administrativo',
                    },
                    {
                            value: 'limpeza',
                            label: 'Limpeza',
                    },
                    {
                        value: 'manutencao',
                        label: 'Manutenção',
                    },
                    {
                        value: 'esportes',
                        label: 'Esportes',
                    },
                    ]
                    }
                    />
                </Form.Item>
            </Col>
        </Row>
        
        <Row justify="center">
            <Col>
                <Button 
                type="primary"
                htmlType="submit"
                onClick={() => {
                    validarCadastro()
                }}>
                Enviar
                </Button>
            </Col>
        </Row>
    </Form> : null }

    { search ? <> <Row justify="center"> 
                <Col>
        <SearchBar cadastro={enviarCadastro}/> 
        
        
        </Col>
        </Row> </>
        : null}

    {<div>
            {mostrarNewProduto ? <Row justify="center">
                        <Col>
                        <h2 
                            style={{
                            textAlign:"center", 
                            fontWeight:"800",
                            color:"rgb(0, 33, 64)",
                            fontSize: "50px"
                            }}
                            >Adicionar Item</h2>
                            <UploadImg/>
                            <NewItemDescription/>
                            <Button>Adicionar novo produto</Button>
                        </Col>
            </Row> : null}
            
            
        </div>}
    
    
    
    </>
                </div>
                </Content> }/>
                <Route path="/itens" element={                        
                    <Row justify="center">
                        <Col>
                            <SearchBar placeholder="Insira um produto..." data={ProductData}/>
                               
                                    
                        </Col>
                    </Row>
                }/>
                <Route path="/additem" element={
                    <Row justify="center">
                        <Col>
                            <UploadImg/>
                            <NewItemDescription/>
                        </Col>
                    </Row>
                }/>
            </Routes>
        <LogoPEN />
        <Footer style={{ textAlign: 'center' }}>PEN Life International School ©2022</Footer>
        </Layout>
    </Layout>
    </Router>
    )
}

export default App