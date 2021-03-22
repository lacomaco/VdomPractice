import MacoCore from "../src/lib/core/Maco";
import LacoFactory from "../src/lib/core/LacoFactory";

const Item = LacoFactory(({props}, effects) => {
  const [clickCount,setClickCount] = effects.useState(0);
  const {deleteTodo,changeTodoList} = props;

  const onClick = ()=>{
    if(clickCount===1){
      deleteTodo(props.index);
    }else{
      setClickCount(clickCount+1);
      changeTodoList(props.index);
    }
  }

  if(clickCount === 1){
    return <li className="item item-checked" style={{
      textDecoration:"line-through"
    }} onClick={onClick}>{props.todo.title}
    </li>
  }
  return <li className="item" onClick={onClick}>{props.todo.title}</li>
});

export default Item;
