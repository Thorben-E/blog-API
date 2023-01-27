import React from "react"

const NewPost = (props) => {
  return (
    <div className="container">
        <h3>create post</h3>
        <form action={`${import.meta.env.VITE_SERVER_URL}/api/posts`} method="POST"> 
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" name="title" placeholder="Title" id="title" className="form-control" />
          <label htmlFor="message" className="form-label">Message</label>
          <textarea type="text" name="message" rows="8" placeholder="Message" id="message" className="form-control" />
          <button type="submit" className="btn btn-primary mt-3">Post</button>
        </form>
    </div>
  )
};

export default NewPost; 