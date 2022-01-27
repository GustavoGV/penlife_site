import { InputNumber, Button, Space } from 'antd';
import React from 'react';
import './InputNumber.css'

const ValueItem = () => {
  const [value, setValue] = React.useState('0');
  return (
    <div className='valueitem'>
    <Space
    style={{ minHeight: '7vh' }}> Quantidade
      <InputNumber min={1} max={99} value={value} onChange={setValue} />
      <Button
        type="primary"
        htmlType='submit'
      >
        Enviar
      </Button>
    </Space>
    </div>
  );
};

export default ValueItem