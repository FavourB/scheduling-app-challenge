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
        <NavLink to="/setttings" className="navlinks">
          <li className="link">
          Settings
          </li>
        </NavLink>
       
      </ul>
    </section>
  );
};

export default Sidebar;
