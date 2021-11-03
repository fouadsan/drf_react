import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Header, Footer, Logout, Create, Edit, Delete } from './components'
import { Home, About, SinglePost, Login, Error,
   Register, Admin } from './pages';

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
          <Route exact path="/posts/:slug" children={<SinglePost />} />
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/edit/:id" children={<Edit />} />
          <Route exact path="/delete/:id" children={<Delete />} />
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
    </Router>
  );
}

export default App;
