import './App.css';
import {Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Appointments from './components/Appointments/Appointments';
import Settings from './components/Settings/Settings';

function App() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <div className="container">
        <Sidebar />
        <main>
          <Switch>
            <Route exact path="/" component={Appointments} />
            <Route exact path="settings" component={Settings} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
