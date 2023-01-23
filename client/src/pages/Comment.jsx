import React from "react"

const Comment = ({ name, message, date }) => {
  return (
    <div className="card">
        <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <p className="card-subtitle">{date}</p>
            <h3 className="card-text">{message}</h3>
        </div>
    </div>
  )
};

export default Comment;
