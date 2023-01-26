import React from "react"
import { useNavigate } from "react-router-dom"

const Postpreview = ({ title, user, date, postid, editor }) => {
  const navigate = useNavigate()

  const onPostClick = () => {
    navigate(`/post`, { state: { id: postid, editor: editor }}); 
  }

  const onDeleteClick = async () => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${postid}`, {
      method: "DELETE"
    })
    window.location.reload()
  }

  return (
    <div className="card col-lg" style={{width: "18rem"}}>
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p className="card-subtitle">{user}</p>
            <p className="card-text">{date}</p>
            <button className="btn btn-primary" onClick={onPostClick}>View Post</button>
            {editor && <button className="btn btn-primary mx-1" onClick={onDeleteClick}>Delete</button>}
        </div>
    </div>
  )
};

export default Postpreview;
