import { Avatar } from "@mui/material";
import React from "react";
// import postImg1 from "../../assets/images/post1.jpg";
import "./Post.css";
const Post = ({imgUrl,username,caption}) => {
  return (
    <div className="post">
      <div className="post__header">
        {/*! Header -> avatar + username  */}
        <Avatar
          className="post__avatar"
          alt="Avatar images"
          src="https://keshrisamaj.in/public/assets/images/profileicon@3x.png"
        />
        <h4>{username}</h4>
      </div>
      {/* Post images*/}
      <img src={imgUrl} alt="post images" className="post__img" />

      {/* Username: Caption */}
      <h4 className="post__text">
        <strong style={{ fontWeight: 900 }}>{username}</strong>: {caption}
      </h4>
    </div>
  );
};

export default Post;
