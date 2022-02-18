import { Input, Row, Col, Form, Button, Cascader } from "antd";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import SearchBar from '../itens/SearchBar.js'
import WantAddItem from "../itens/Buttontoadd";
import UploadImg from '../newitem/ItemRequest';
import NewItemDescription from '../newitem/NameItemRequest';
import { SearchOutlined } from '@ant-design/icons';



export default function Body () {
    function handleFinish (a) {
        console.log(a)
    }
    const [mostrar, setMostrar] = useState(true)
    const [search, setSearch] = useState(false)
    const [mostrarNewProduto, setMostrarNewProduto] = useState(false)
    //let navigate = useNavigate();
    return <>
    <Button onClick={() => {
        setSearch(false)
        setMostrar(true)
        setMostrarNewProduto(false)
        }
    }>Voltar</Button>
    { mostrar ? <Form
        layout="vertical"
        onFinish={handleFinish}
    >
        
        <Row>
            <Col span={12}
            push={6}>
                <Form.Item
                    name={['nomecompleto']}
                    label='Nome Completo'
                    rules={[{ required: true, message: 'Por favor, insira um nome' }]}
                >

                    <Input placeholder="Ex: Maria da Silva"></Input>
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
                    <Input placeholder="Ex: mariadasilva@penlife.com.br"></Input>
                    
                </Form.Item>
            </Col>
        </Row>

        <Row>
            <Col span={8}
            push={6}>
                <Form.Item 
                    name={['area']}
                    label="Área"
                    rules={[{ required: true, message: 'Área é necessario' }]}
                >
                <Cascader
                    options={[
                    {
                    value: 'pedagogico',
                    label: 'Pedagógico',
                    children: [
                        {
                            value: 'ensino_infantil',
                            label: 'Ensino Infantil',
                        },
                        {
                            value: 'fund1',
                            label: 'Ensino Fundamental',
                        },
                        {
                            value: 'fund2_e_medio',
                            label: 'Ensino Médio',
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
                    setMostrar(false)
                    //navigate("/itens")
                    setSearch(true)
                }}>
                Enviar
                </Button>
            </Col>
        </Row>
    </Form> : null }

    { search ? <> <SearchBar /> 
        <Button 
            onClick={() => {
                //navigate("/additem")
                setMostrarNewProduto(true)
                setSearch(false)
            }}
            type="primary"
            icon={<SearchOutlined />} 
            size="large">
                Clique para adicionar um item que não se encontra na lista.
        </Button> </>: 
    null}

    {<div>
            {mostrarNewProduto ? <Row justify="center">
                        <Col>
                            <UploadImg/>
                            <NewItemDescription/>
                        </Col>
            </Row> : null}
            
            
        </div>}
    
    </>
}