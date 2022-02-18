import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components/index'
import { Link } from 'react-router-dom'


const landing = () => {
  return (
    <Wrapper>
    <nav><Logo /></nav>
    <div className='contaier page'>
      <div className='info'>
        <h1>job <span>tracking</span>app</h1>
        <p>I'm baby actually keffiyeh blue bottle live-edge irony cred small batch locavore knausgaard farm-to-table four dollar toast iPhone edison bulb tumblr jianbing. Umami pop-up street art, glossier prism gluten-free edison bulb ethical heirloom deep v master cleanse scenester cloud bread. Seitan kickstarter flexitarian meditation, tofu 3 wolf moon mlkshk hoodie vexillologist sustainable. Migas pitchfork man braid scenester roof party plaid selvage kickstarter before they sold out banh mi butcher. Blue bottle lomo mustache sartorial photo booth cloud bread offal pickled. Scenester man bun chillwave, aesthetic knausgaard marfa selfies literally. Ramps locavore artisan crucifix.
        </p>
          <Link to='/register' className='btn btn-hero'>
          Login / Register
        </Link>
      </div>
      <img src={main} alt="job hunt" className='img main-img'/>
    </div>

    </Wrapper>
);
};


export default landing;
