import MacoCore from "../src/lib/core/Maco";
import LacoFactory from "../src/lib/core/LacoFactory";


const Footer = LacoFactory((props, effects) => {
  return <div className ="footer">
  <div  className="footer-copyright">Made By Tiny-React <a href="https://github.com/lacomaco/tiny-react">GitHub</a></div>
  <div className="footer-flat_icon">Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </div>
});

export default Footer;
