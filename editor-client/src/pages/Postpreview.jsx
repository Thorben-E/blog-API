import React from "react"
import { useNavigate } from "react-router-dom"

const Postpreview = ({ title, user, date, postid }) => {
  const navigate = useNavigate()

  const onPostClick = () => {
    navigate(`/post`, { state: { id: postid }}); 
  }

  return (
    <article className="flex border rounded w-[600px] max-w-[80vw]">
        <div className="w-[50%] bg-slate-200 flex items-center justify-center">
          (img)
        </div>
        <div className="p-3 flex flex-col gap-1 w-[50%]">
            <h2 className="text-lg">{title}</h2>
            <div className="flex gap-1">
              <p className="text-sm">{user}</p>
              <p className="text-sm text-gray-500">at {date.split('T')[0]}</p>
            </div>
            <button className="border p-1 rounded bg-zinc-700 text-white w-[60px]" onClick={onPostClick}>Edit</button>
        </div>
    </article>
  )
};

export default Postpreview;
