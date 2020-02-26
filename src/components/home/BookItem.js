import React from 'react';

const bookItem = ({book, actSelectBook}) => {
    
    const onClickHandler = (e) => {
        e.preventDefault();
        actSelectBook(book);
    }
    return(
        <div onClick={onClickHandler}>
            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{book.name}</h5>
                    <small>3 days ago</small>
                </div>
                <p className="mb-1">{book.publisher}</p>
            </a>
        </div>
    )
}

export default bookItem;