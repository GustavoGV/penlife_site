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
        <TextArea 
        id = "textoespecificacoes"
        placeholder='Insira o nome e as especificações do item...
        -
        Ex: Cor, Tipo, Tamanho, etc...
        -'
        showCount 
        maxLength={400} 
        onChange={onChange}>
        </TextArea>
      </div>
      </>
}