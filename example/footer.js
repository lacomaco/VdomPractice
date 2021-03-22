import MacoCore from "../src/lib/core/Maco";
import LacoFactory from "../src/lib/core/LacoFactory";


const Footer = LacoFactory((props, effects) => {
  return <div className ="footer">
  <div  className="footer-copyright">Made By Tiny-React <a href="https://github.com/lacomaco/tiny-react">GitHub</a></div>
  </div>
});

export default Footer;
