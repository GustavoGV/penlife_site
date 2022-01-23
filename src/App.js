import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import './App.css'
import Body from './basicinfo';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App () {
    const [collapsed, setCollapsed] = useState(false);

    return  <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
            Cadastro
            </Menu.Item>
            <Menu.Item key="2" icon={<ReconciliationOutlined />}>
            Option 2
            </Menu.Item>
        </Menu>
        </Sider>
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Usuário</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <Body />
                </div>
            </Content>
        <Footer style={{ textAlign: 'center' }}>PEN Life International School ©2022</Footer>
        </Layout>
    </Layout>
}

export default App