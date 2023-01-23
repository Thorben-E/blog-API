import React from "react"

const Postpreview = (postid) => {

  const onPostClick = () => {
    console.log('here you go to post with postid')
  }

  return (
    <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
            <h2 className="card-title">Post title</h2>
            <p className="card-subtitle">User</p>
            <p className="card-text">date of post</p>
            <button className="btn btn-primary" onClick={onPostClick}>View Post</button>
        </div>
    </div>
  )
};

export default Postpreview;
