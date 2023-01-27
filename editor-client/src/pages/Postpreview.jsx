import React from "react"
import { useNavigate } from "react-router-dom"

const Postpreview = ({ title, user, date, postid }) => {
  const navigate = useNavigate()

  const onPostClick = () => {
    navigate(`/post`, { state: { id: postid }}); 
  }

  return (
    <div className="card col-xl" style={{width: "18rem"}}>
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p className="card-subtitle">{user}</p>
            <p className="card-text">{date}</p>
            <button className="btn btn-primary" onClick={onPostClick}>Edit</button>
        </div>
    </div>
  )
};

export default Postpreview;
