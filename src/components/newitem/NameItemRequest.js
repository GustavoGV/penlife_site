import { Input } from 'antd';

export default function NewItemDescription () {
    function handleFinish (a) {
        console.log(a)
    }
    const { TextArea } = Input;
    const onChange = a => {
      console.log(a);
    };
   
    return <>
     <div className='newitemname'>
        <h1> Nome do Produto
        <Input placeholder='Insira o nome do produto desejado...'
        showCount 
        maxLength={40} 
        onChange={onChange}>
        </Input>
        </h1>
        <br />
        <p>Descrição do Produto
        <TextArea 
        style={{height : 139}}
        placeholder='Insira as especificações do item...
        -
        Ex: Cor, Tipo, Tamanho, etc...
        -'
        showCount 
        maxLength={200} 
        onChange={onChange}>
        </TextArea>
        </p>
      </div>
      </>
      
}