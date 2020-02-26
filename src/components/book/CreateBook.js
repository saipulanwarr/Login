import React, { Component } from 'react';
import axios from 'axios';

class CreateBook extends Component{
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
    }

    onChange(e){
        this.setState({ [e.target.name] : e.target.value })
    //    this.setState({
    //        name: e.target.value
    //    })
    }

    onSubmit(e){
        e.preventDefault();
        const authorization = localStorage.getItem('token');
        const userId = localStorage.getItem("user-id");

        // axios.defaults.headers.common['authorization'] = authorization;
        // axios.defaults.headers.common['user-id'] = userId;

        // axios
        //     .post('http://localhost:8000/book',this.state)
        //     .then(res => {
        //         // this.props.history.push('/book');
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })

        axios({
            method: "POST",
            url: "http://localhost:8000/book", 
            data: this.state,
            headers: {
                "authorization": authorization,
                "user-id": userId
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        })
    }
    render(){
        return(
            <div className="container">
                <h4 style={{ marginTop: "10px" }}>Add Book</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Enter name" name="name" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Writer</label>
                        <input type="text" className="form-control" placeholder="Enter writer" name="writer" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" rows="6" placeholder="Enter Description" name="description" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Publisher</label>
                        <input type="text" className="form-control" placeholder="Enter publisher" name="publisher" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Year</label>
                        <input type="text" className="form-control" placeholder="Enter year" name="year" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Stock</label>
                        <input type="text" className="form-control" placeholder="Enter stock" name="stock" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <input type="text" className="form-control" placeholder="Enter genre" name="genre" onChange={this.onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        )
    }
}

export default CreateBook;