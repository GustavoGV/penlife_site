import { Input, Row, Col, Form, Button, Cascader, Select, Tooltip, Space, Typography, Menu, Dropdown } from "antd";
import { useState } from "react";

const { Option } = Select;

export default function Body () {
    const [name, setName] = useState('');
    
    return <>
    
    <Form
        layout="vertical"
    >
        <Row>
            <Col span={12}
            push={6}>
                <Form.Item
                    required= '${label} é necessário'
                    name={['nomecompleto']}
                    label='Nome Completo'
                    rules={[{ required: true, message: 'Por favor, insira um nome' }]}
                >

                    <Input placeholder="Ex: Caio Balarin"></Input>
                </Form.Item>
            </Col>    
        </Row>
    
        <Row>
            <Col span={12}
            push={6}>
                <Form.Item
                    required= '${label} é obrigatório'
                    name={['email']}
                    label='E-mail'
                    rules={[{type:'email'},{required:true, message:'Por favor, insira um email'}]}
                >
                    <Input placeholder="Ex: caiobalarin@penlife.com.br"></Input>
                    
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
                            value: 'ensino infantil',
                            label: 'Ensino Infantil',
                        },
                        {
                            value: 'ensino fundamental',
                            label: 'Ensino Fundamental',
                        },
                        {
                            value: 'ensino medio',
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
                    {
                        value: 'manutencao',
                        label: 'Manutenção',
                    },
                    ]
                    }
                    />
                </Form.Item>
            </Col>
        </Row>
        
        <Row>
            <Col push={6}>
                <Button type="primary" htmlType="submit">
                Enviar
                </Button>
            </Col>
        </Row>
        
    </Form>
    </>
}