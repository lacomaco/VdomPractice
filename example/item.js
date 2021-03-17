import MacoCore from "../lib/core/Maco";
import LacoFactory from "../lib/core/LacoFactory";

const Item = LacoFactory(({props}, effects) => {
  const {deleteTodo} = props;
  const onClick = ()=>{
    deleteTodo(props.index);
  }
  return <li onClick={onClick}>{props.todo.title}</li>
});

export default Item;
