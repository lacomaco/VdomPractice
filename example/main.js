import MacoCore from "../src/lib/core/Maco";
import LacoFactory from "../src/lib/core/LacoFactory";
import Header from './header';
import Item from './item';
import Footer from './footer';
import Progress from './progress';

const example = [
  {
    title:'안녕하세요',
    state:'remain',
  },{
    title:'반가워요',
    state:'remain',
  },{
    title:'항상 고마워요',
    state:'remain',
  },{
    title:"TDD를 공부합시다",
    state:'remain',
  },{
    title:"파이썬 알고리즘 인터뷰",
    state:'remain',
  },{
    title:"자바 ORM 표준 JPA 프로그래밍",
    state:'remain'
  }
]

const Main = LacoFactory((props, effects) => {
  const [todoList, setTodoList] = effects.useState(example);
  const [done,setDone] = effects.useState(0);
  const [remain,setRemain] = effects.useState(todoList.length);

  const addTodoList = (title)=>{
    setTodoList([...todoList,{
      title,
      state:'remain',
    }])
  }

  const deleteTodoList = (index) =>{
    setTodoList([...todoList.slice(0,index),...todoList.slice(index+1)]);
  }

  const changeTodoList = (index)=>{
    setTodoList([...todoList.slice(0,index),{
      title:todoList[index].title,
      state:'done',
    },...todoList.slice(index+1)]);

  }

  effects.useEffect(()=>{
    const doneCount = todoList.reduce((acc,curr)=>{
      if(curr.state==='done'){
        return acc+1;
      }
      return acc;
    },0);
    const remainCount = todoList.reduce((acc,curr)=>{
      if(curr.state==='remain'){
        return acc+1;
      }
      return acc;
    },0);
    console.log('doneCount : ',doneCount);
    console.log('remainCount : ',remainCount);
    setDone(doneCount);
    setRemain(remainCount);
  },[todoList])

  return <div className="app-background">
    <main className="app">
      <Header addTodo={addTodoList}/>
      <ul className="item-list">
        {todoList.map((e,id)=><Item todo={e} key={e.title} index={id} changeTodoList={changeTodoList} deleteTodo={deleteTodoList}/>)}
      </ul>
      <Progress done={done} remain={remain}/>
      <Footer/>
    </main>
  </div>
});


export default Main;