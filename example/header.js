import MacoCore from "../src/lib/core/Maco";
import LacoFactory from "../src/lib/core/LacoFactory";

const Header = LacoFactory(({props}, effects) => {
  const {addTodo} = props;
  const [inputValue,setInputValue] = effects.useState('');

  const inputChange = (e)=>{
    setInputValue(e.target.value);
  }

  const AddClick = (e)=>{
    addTodo(inputValue);
    setInputValue('');
  }

  return <div>
  <h1 className="header-title">
    Tiny-React TodoList
  </h1>
  <div className="header">
  <div className="header-input">
    <input onChange={inputChange} value={inputValue} placeholder={"오늘 해야 할 일을 입력해주세요~!"}></input>
  </div>
  <div className="header-button" onClick={AddClick}>
    ADD
  </div>
  </div>
  </div>
});


export default Header;
