import React from "react"
import { useNavigate } from "react-router-dom"

const Postpreview = ({ img, title, user, date, postid, editor }) => {
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
    <article className="w-[800px] max-w-[80vw] flex flex-row gap-2 border p-4 rounded">
      <img src={img} alt="" className="w-[50%]"/>
      <div className="">
          <h2 className="text-lg">{title}</h2>
          <p className="text-sm">Written by <b>{user}</b> on <b>{date.split("T")[0]}</b></p>
          <button className="bg-zinc-700 hover:bg-zinc-800 text-white px-2 py-1 rounded mt-2" onClick={onPostClick}>View Post</button>
      </div>
    </article>
  )
};

export default Postpreview
