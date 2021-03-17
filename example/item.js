import MacoCore from "../src/lib/core/Maco";
import LacoFactory from "../src/lib/core/LacoFactory";

const Item = LacoFactory(({props}, effects) => {
  const {deleteTodo} = props;
  const onClick = ()=>{
    deleteTodo(props.index);
  }
  return <li onClick={onClick}>{props.todo.title}</li>
});

export default Item;
