import React, { useEffect, useState } from "react";
import { db, auth } from "./FirbaseConnect";
import Header from "./Header";
import "./Insta.css";
import Post from "./posts/Post";
import { collection, getDocs } from "firebase/firestore/lite";
import Modal from "@mui/material/Modal";
import { Input, makeStyles } from "@material-ui/core";
import { Button } from "@mui/material";
import logo from "../assets/images/logo.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";
const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-%{top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "150px !important",
    left: "0 !important",
  },
}));

const Insta = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);

  // For Input Hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // For signup
  const singUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
  };
  const getPost = async (db) => {
    const collectionName = collection(db, "post");
    const postSnapshot = await getDocs(collectionName);
    const postData = postSnapshot.docs.map((doc) => doc.data());
    setPost(postData);
    // collectionName.firestore()
    // console.log(postData);
  };
  // useEffect -> Runs a piece of code based on a specific condition
  useEffect(() => {
    // this is where the code run
    getPost(db);
  }, []);

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.paper} style={modalStyle}>
          <form className="app__singup">
            <center>
              <img
                className=""
                style={{ width: "40% !important" }}
                src={logo}
                alt="logo"
              />
            </center>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={singUp}>
              SignUp
            </Button>
          </form>
        </div>
      </Modal>

      <Header />
      <Button variant="contained" onClick={() => setOpen(true)}>
        SignUp
      </Button>
      {post.map((post) => (
        <Post
          key={post.id}
          imgUrl={post.imageUrl}
          username={post.username}
          caption={post.caption}
        />
      ))}
    </div>
  );
};

export default Insta;
