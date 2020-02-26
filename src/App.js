import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import About from './components/about/About';
import Book from './components/book/Book';
import CreateBook from './components/book/CreateBook';
import EditBook from './components/book/EditBook';
import NotFound from './components/layout/NotFound';
import Login from './components/auth/Login';
import Upload from './components/upload/Upload';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/book" component={Book} />
        <Route path="/add-book" component={CreateBook} />
        <Route path="/edit-book/:bookId" component={EditBook} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/upload" component={Upload} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
