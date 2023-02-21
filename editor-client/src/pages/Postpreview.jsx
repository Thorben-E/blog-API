import React from "react"
import { useNavigate } from "react-router-dom"

const Postpreview = ({ title, user, date, postid }) => {
  const navigate = useNavigate()

  const onPostClick = () => {
    navigate(`/post`, { state: { id: postid }}); 
  }

  return (
    <article className="">
        <div className="">
            <h2 className="">{title}</h2>
            <p className="">{user}</p>
            <p className="">{date}</p>
            <button className="" onClick={onPostClick}>Edit</button>
        </div>
    </article>
  )
};

export default Postpreview;
