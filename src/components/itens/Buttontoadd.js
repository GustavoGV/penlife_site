import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import { Row, Col } from 'antd';
import UploadImg from '../newitem/ItemRequest';
import NewItemDescription from '../newitem/NameItemRequest';

function WantAddItem() {
    //let navigate = useNavigate();
    const [mostrar, setMostrar] = useState(false)
    return(
        <div>
            {mostrar ? <Row justify="center">
                        <Col>
                            <UploadImg/>
                            <NewItemDescription/>
                        </Col>
            </Row> : null}
            
            <Button 
            onClick={() => {
                //navigate("/additem")
                setMostrar(true)
        }}
            type="primary"
            icon={<SearchOutlined />} 
            size="large">
                Clique para adicionar um item que não se encontra na lista.
            </Button>
        </div>
    )
}

export default WantAddItem