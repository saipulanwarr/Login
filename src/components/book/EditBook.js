import React, { Component } from 'react';
import axios from 'axios';

class EditBook extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            writer: '',
            description: '',
            publisher: '',
            year: '',
            stock: '',
            genre: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        console.log('constructor');
    }

    componentDidMount(){
        console.log('did mount');
        this.getBook(this.props.match.params.bookId);
    }

    componentWillMount(){
        console.log('will mount');
        // setTimeout(() => {
            
        // }, 3000);

    }

    getBook(id){
        axios
            .get(`http://localhost:8000/book/${id}`)
            .then(res => {
                this.setState({
                    
                    name: res.data[0].name,
                    writer: res.data[0].writer,
                    description: res.data[0].description,
                    publisher: res.data[0].publisher,
                    year: res.data[0].year,
                    stock: res.data[0].stock,
                    genre: res.data[0].genre  
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChange(e){
        this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        console.log(this.state);
        // axios
        //     .put(`http://localhost:8000/book/${this.props.match.params.bookId}`, this.state)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })

        axios({
            method: 'PUT',
            url: `http://localhost:8000/book/${this.props.match.params.bookId}`,
            data: this.state
        })
        .then(res => {
            this.props.history.push('/book');
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        console.log('render');
        return(
            <div className="container">
                <h4 style={{ marginTop: "10px" }}>Edit Book</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Enter name" name="name" onChange={this.onChange} value={this.state.name}/>
                    </div>
                    <div className="form-group">
                        <label>Writer</label>
                        <input type="text" className="form-control" placeholder="Enter writer" name="writer" onChange={this.onChange} value={this.state.writer} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" rows="6" placeholder="Enter Description" name="description" onChange={this.onChange} value={this.state.description} />
                    </div>
                    <div className="form-group">
                        <label>Publisher</label>
                        <input type="text" className="form-control" placeholder="Enter publisher" name="publisher" onChange={this.onChange} value={this.state.publisher} />
                    </div>
                    <div className="form-group">
                        <label>Year</label>
                        <input type="text" className="form-control" placeholder="Enter year" name="year" onChange={this.onChange} value={this.state.year} />
                    </div>
                    <div className="form-group">
                        <label>Stock</label>
                        <input type="text" className="form-control" placeholder="Enter stock" name="stock" onChange={this.onChange} value={this.state.stock} />
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <input type="text" className="form-control" placeholder="Enter genre" name="genre" onChange={this.onChange} value={this.state.genre} />
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        )
    }
}

export default EditBook;