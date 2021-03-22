import MacoCore from "../src/lib/core/Maco";
import LacoFactory from "../src/lib/core/LacoFactory";

const Progress = LacoFactory(({ props }, effects) => {
  return <div>
    해결한 Todo {props.done} / 남은 Todo {props.remain}
  </div>
});

export default Progress;
