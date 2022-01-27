import { Layout, Menu, Row, Col } from 'antd';
import { UserOutlined,   FileOutlined, InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './App.css'
import Body from './home/basicinfo';
import LogoPEN from './penlogo';
import SearchBar from './itens/SearchBar';
import ProductData from './products.json';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import ValueItem from './itens/InputNumber'
import UploadImg from './newitem/ItemRequest';
import NewItemDescription from './newitem/NameItemRequest';
import WantAddItem from './itens/Buttontoadd';

const { Header, Content, Footer, Sider } = Layout;

function App () {
    const [collapsed, setCollapsed] = useState(false);
    return (
    <Router>
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
        <NavLink to="/"> Home </NavLink>
            <Routes>
                <Route path="/" 
                element={
                <Content style={{ margin: '0 16px' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <Body />
                </div>
                </Content> }/>
                <Route path="/itens" element={                        
                    <Row justify="center">
                        <Col>
                            <SearchBar placeholder="Insira um produto..." data={ProductData}/>
                            <ValueItem/>   
                            <WantAddItem/>         
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