import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


function WantAddItem() {
    let navigate = useNavigate();
    return(
        <div>
            <Button 
            onClick={() => {navigate("/additem")
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