import MacoCore from "../src/lib/core/Maco";
import LacoFactory from "../src/lib/core/LacoFactory";

const DeleteButton = LacoFactory(({ props }, effects) => {
  return <div className="delete-button">
    REMOVE
  </div>
});

export default DeleteButton;
