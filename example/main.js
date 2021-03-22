import MacoCore from "../src/lib/core/Maco";
import LacoFactory from "../src/lib/core/LacoFactory";
import Header from './header';
import Item from './item';
import Footer from './footer';

const example = [
  {
    title:'안녕하세요',
  },{
    title:'반가워요',
  },{
    title:'항상 고마워요',
  },{
    title:"TDD를 공부합시다",
  },{
    title:"파이썬 알고리즘 인터뷰",
  },{
    title:"자바 ORM 표준 JPA 프로그래밍"
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

  return <div className="app-background">
    <main className="app">
      <Header addTodo={addTodoList}/>
      <ul>
        {todoList.map((e,id)=><Item todo={e} key={e.title} index={id} deleteTodo={deleteTodoList}/>)}
      </ul>
      <Footer/>
    </main>
  </div>
});


export default Main;