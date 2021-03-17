import MacoCore from "../src/lib/core/Maco";
import LacoFactory from "../src/lib/core/LacoFactory";
import Header from './header';
import Item from './item';

const example = [
  {
    title:'안녕하세요',
    key:'id-1'
  },{
    title:'반가워요',
    key:'id-2'
  },{
    title:'항상 고마워요',
    key:'id-3'
  }
]

const Main = LacoFactory((props, effects) => {
  const [todoList, setTodoList] = effects.useState(example);

  const addTodoList = (title)=>{
    setTodoList([...todoList,{
      title,
    }])
  }

  const deleteTodoList = (index) =>{
    setTodoList([...todoList.slice(0,index),...todoList.slice(index+1)]);
  }

  return <div>
    <Header addTodo={addTodoList}/>
    <ul>
    {todoList.map((e,id)=><Item todo={e} key={e.title} index={id} deleteTodo={deleteTodoList}/>)}
    </ul>
  </div>
});


export default Main;