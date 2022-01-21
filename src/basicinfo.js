import { Input, Form, Button, Select, Tooltip, Space, Typography } from "antd";
import { useState } from "react";


const { Option } = Select;

export default function Body () {
    const [name, setName] = useState('');

    return <>
    <Form
        layout="vertical"
    >
        <Form.Item
            required= '${label} é necessário'
            name={['nomecompleto']}
            label='Nome Completo'
            rules={[{ required: true, message: 'Por favor, insira um nome' }]}
        >

            <Input placeholder="Ex: Caio Balarin"></Input>
        </Form.Item>

        <Form.Item
            required= '${label} é obrigatório'
            name={['email']}
            label='E-mail'
            rules={[
                {
                    type:'email'
                },
            ]}
        >
            <Input placeholder="Ex: caiobalarin@penlife.com.br"></Input>
            
        </Form.Item>

        <Form.Item
            name={['address', 'province']}
            label="Área"
            rules={[{ required: true, message: 'Área é necessario' }]}
        >
            <Select placeholder="Selecione sua área">
            <Option value="Educação Infantil">Educação Infantil</Option>
            <Option value="Ensino Fundamental">Ensino Fundamental</Option>
            <Option value="Ensino Médio">Ensino Médio</Option>
            </Select>
        </Form.Item>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
    </Form>
    </>
}