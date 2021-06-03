import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom'

import './Sidebar.css';

interface Props {}

const Sidebar: FunctionComponent<Props> = (props: Props) => {
  return (
    <section className="sidebar">
      <ul className="links">
        <NavLink to="/" className="navlinks">
          <li className="active">
          Appointments
          </li>
        </NavLink>
       
          <li className="link">
          Settings
          </li>
   
       
      </ul>
    </section>
  );
};

export default Sidebar;
