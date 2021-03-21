import MacoCore from "../src/lib/core/Maco";
import LacoFactory from "../src/lib/core/LacoFactory";

const Item = LacoFactory(({props}, effects) => {
  const [clickCount,setClickCount] = effects.useState(0);
  const {deleteTodo} = props;
  
  effects.useEffect(()=>{
    console.log(clickCount);
  },[clickCount])

  const onClick = ()=>{
    if(clickCount===1){
      deleteTodo(props.index);
    }else{
      setClickCount(clickCount+1);
    }
  }

  if(clickCount === 1){
    return <li style={{
      textDecoration:"line-through"
    }} onClick={onClick}>{props.todo.title}<span>,{clickCount}</span></li>
  }
  return <li onClick={onClick}>{props.todo.title}<span>,{clickCount}</span></li>
});

export default Item;
