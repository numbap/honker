import { NavLink, Link } from 'react-router-dom'
import links from '../utils/links'
import {Logo} from './index.js'

const Nav = () => {
  return (
    <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <ul className="nav navbar-right">
              <a className="navbar-brand" ><Link to='/'><Logo /></Link></a> 
          </ul>
        </div>
    </nav>
  )
}

export default Nav