import { Input, Row, Col, Form, Button, Cascader } from "antd";
import { useNavigate } from "react-router-dom"

export default function Body () {
    function handleFinish (a) {
        console.log(a)
    }
    let navigate = useNavigate();
    return <>
    
    <Form
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
                            value: 'ensino_fundamental',
                            label: 'Ensino Fundamental',
                        },
                        {
                            value: 'ensino_medio',
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
        
        <Row justify="center">
            <Col>
                <Button 
                type="primary"
                htmlType="submit"
                onClick={() => {
                    navigate("/itens")
                }}>
                Enviar
                </Button>
            </Col>
        </Row>
    </Form>
    </>
}