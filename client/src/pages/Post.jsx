import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Comment from "./Comment";

const Post = () => {
  const [title, setTitle] = useState('')
  const [img, setImg] = useState()
  const [user, setUser] = useState()
  const [date, setDate] = useState()
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState([])
  const { state } = useLocation();
  const { id, editor } = state
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title)
        setImg(data.img)
        setUser(data.user)
        setDate(data.date.split("T")[0])
        setMessage(data.message)
        setComments(data.comments.map((comment, i) => {
          return <Comment key={i} commentId={comment} postId={id} editor={editor} />
        }))
      })
  }, [])

  const goBack = () => {
    navigate(-1)
  }

  return (
    <main className="flex justify-center">
      <article className="border p-4 rounded w-[800px] max-w-[80vw] h-fit mb-10 flex flex-col items-center gap-4">
          <div className="w-[80%] flex justify-between items-center">
            <h2 className="text-xl">{title}</h2>
            <button onClick={goBack} className="bg-zinc-700 hover:bg-zinc-800 text-white px-2 py-1 rounded mt-2">Go back to homepage</button>
          </div>
          <p className="text-sm w-[80%]">Written by <b>{user}</b> on <b>{date}</b></p>
          <img src={img} alt="" className="w-[80%]" />
          <p className="w-[80%]">{message}</p>
          <form action={`${import.meta.env.VITE_SERVER_URL}/api/comment`}  className="w-[80%] flex flex-col gap-2" method="POST">
            <label htmlFor="name" className="">Name</label>
            <input type="text" name="name" id="name" placeholder="Your name" className="border border-black rounded px-2 py-1" />
            <label htmlFor="comment" className="">Comment</label>
            <input type="text" name="comment" placeholder="comment" id="comment" className="border border-black rounded px-2 py-1" />
            <input type="hidden" name="postid" value={id} />
            <button type="submit" className="bg-zinc-700 hover:bg-zinc-800 text-white px-2 py-1 rounded mt-2">Place comment</button>
          </form>
          {comments}
      </article>
    </main>
  )
};

export default Post;
