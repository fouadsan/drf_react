import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Header, Footer, Logout } from './components'
import { Home, About, SinglePost, Login, Error,
   Register } from './pages';

function App() {
  return (
    <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/posts/:id" children={<SinglePost />}
          />
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
    </Router>
  );
}

export default App;
