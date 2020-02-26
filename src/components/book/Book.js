import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';

class Book extends Component {
  state = {
    books: [],
    loading: false
  };

  getBooks(){
    // axios({
    //   method: 'get',
    //   url: 'http://localhost:8000/book'
    // })
    // .then((response) => {
    //   this.setState({
    //     books: response.data,
    //     loading: false
    //   })
    // })
    // .catch((error) => {
    //   console.log(error);
    //   this.setState({
    //     loading: true
    //   })
    // })
    const authorization = localStorage.getItem('token');
    const userId = localStorage.getItem("user-id");

    // axios.defaults.headers.common['authorization'] = authorization;
    // axios.defaults.headers.common['user-id'] = userId;
    // axios
    //   .get('http://localhost:8000/book')
    //   .then((response) => {
    //     this.setState({
    //       books: response.data,
    //       loading: false
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     this.setState({
    //       loading: true
    //     })
    //   })

    axios.get('http://localhost:8000/book', {
      headers: {
        "authorization": authorization,
        "user-id": userId
      }
    })
    .then((response) => {
     this.setState({
        books: response.data,
        loading: false
     })
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount(){
    // console.log('Did Mount');
  }

  componentWillMount(){
    // console.log('will mount');
    this.getBooks();
  }

  onDelete(id){
    axios
      .delete(`http://localhost:8000/book/${id}`)
      .then(res => {
        const filterBook = this.state.books.filter(book => book.id !== id );
        this.setState({
          books: filterBook
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { books, loading } = this.state;

    return (
      <div className="container">
        <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-10">
              <h4>Books</h4>
            </div>
            <div className="col-2">
                <Link className="btn btn-primary" to="/add-book">Add Book</Link>
            </div>
        </div>
        
        { books === null || loading ? <Spinner /> : 
          <table className="table table-bordered" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Writer</th>
                <th scope="col">Description</th>
                <th scope="col">Publisher</th>
                <th scope="col">Stock</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              { books.map((book, idx) => 
                <tr key={idx}>
                  <td>{book.id}</td>
                  <td>{book.name}</td>
                  <td>{book.writer}</td>
                  <td>{book.description}</td>
                  <td>{book.publisher}</td>
                  <td>{book.stock}</td>
                  <td><Link className="btn btn-warning btn-sm" to={`/edit-book/${book.id}`}>Edit</Link> | <button className="btn btn-danger btn-sm" onClick={this.onDelete.bind(this, book.id)}>Delete</button></td>
                </tr>  
              )}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default Book;
