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

  return <div className="header">
  <div className="header-input">
    <input onChange={inputChange} value={inputValue}></input>
  </div>
  <div className="header-button" onClick={AddClick}>
    ADD
  </div>
  </div>
});


export default Header;
