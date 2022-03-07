import { Layout, Menu, Row, Col } from 'antd';
import { UserOutlined, ArrowLeftOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons';
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
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} breakpoint="md">
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
                <Content>
                <div className="site-layout-background" style={{ minHeight: 360 }}>
                <>
    
    
    <Button id='botao_voltar' onClick={() => {
        setSearch(false)
        setMostrar(true)
        setMostrarNewProduto(false)
        setAba('1')
        }}
        icon = {<ArrowLeftOutlined />}>
        Voltar
    </Button>


    { mostrar ? <Form
        layout="vertical"
        onFinish={handleFinish}
    > 
        
        <Row id="cadastroh2">
        <h2 
        style={{
            textAlign:"center", 
            fontWeight:"800",
            color:"rgb(0, 33, 64)",
            }}
            >Cadastro</h2>
        </Row>
        
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
                        value: 'esportes',
                        label: 'Esportes',
                    },
                    {
                        value: 'eventos',
                        label: 'Eventos',
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

    { search ? <> 
    
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
        
    <Form layout='vertical'>
        <Row id='reqrow' justify="center"> 
            <Col>
                <SearchBar area={area} cadastro={enviarCadastro}/> 
        
            </Col>
        </Row>
    </Form>
        </>
        : null}

    {<div>
            {mostrarNewProduto ? 
            
            <Row id='additemrow' 
            justify="center">
                        <Col>
                        <h2 
                            style={{
                            textAlign:"center", 
                            fontWeight:"800",
                            color:"rgb(0, 33, 64)",
                            }}
                            >Requisitar Item</h2>
                            <UploadImg/>
                            <NewItemDescription/>
                            <Button>Requisitar item</Button>
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
        <Footer style={{ textAlign: 'center' }}>PEN Life International School ©2022</Footer>
        </Layout>
    </Layout>
    </Router>
    )
}

export default App