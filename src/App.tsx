import './App.css';
import {Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Appointments from './components/Appointments';


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
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
