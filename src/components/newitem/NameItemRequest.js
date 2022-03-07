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
        <h1>Descrição do Produto
        <TextArea 
        id = "textoespecificacoes"
        placeholder='Insira as o nome e especificações do item...
        -
        Ex: Cor, Tipo, Tamanho, etc...
        -'
        showCount 
        maxLength={400} 
        onChange={onChange}>
        </TextArea>
        </h1>
      </div>
      </>
      
}