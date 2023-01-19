import React, { useEffect, useState } from "react";
import { db, auth, storage } from "./firebase/FirebaseConnect";
import Header from "./Header";
import "./Insta.css";
import Post from "./posts/Post";
import { collection, getDocs } from "firebase/firestore/lite";
import Modal from "@mui/material/Modal";
import { Input, makeStyles } from "@material-ui/core";
import { Button } from "@mui/material";
import logo from "../assets/images/logo.jpg";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import ImageUpload from "./posts/ImageUpload";
import { InstagramEmbed, FacebookEmbed } from "react-social-media-embed";

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
  const [openSignIn, setOpenSignIn] = useState(false);

  // For Input Hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // For signup
  const singUp = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (authUser) => {
        return await updateProfile(authUser.user.displayName, {
          displayName: username,
        });
      })
      .catch((error) => alert(error));

    setOpen(false);
  };

  // For signIn
  const singIn = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
    setOpenSignIn(false);
  };

  const getPost = async (db) => {
    const collectionName = collection(db, "post");
    const postSnapshot = await getDocs(collectionName);
    const postData = postSnapshot.docs.map((doc) => doc.data());
    setPost(postData);
    // collectionName.firestore()
    // console.log(postData);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //= user has logged in
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
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

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
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
            <Button type="submit" onClick={singIn}>
              SignIn
            </Button>
          </form>
        </div>
      </Modal>

      <header>
        <Header />
        {user ? (
          <Button variant="" onClick={() => auth.signOut()}>
            Logout
          </Button>
        ) : (
          <div className="app__loginContainer">
            <Button variant="" onClick={() => setOpenSignIn(true)}>
              Sign In
            </Button>
            <Button variant="" onClick={() => setOpen(true)}>
              SignUp
            </Button>
          </div>
        )}
      </header>
      {user ? (
        <ImageUpload username={username} />
      ) : (
        <h3 style={{textAlign:'center'}}>Login to upload</h3>
      )}

      <div className="side__bar">
        <div className="right__side__post">
          <InstagramEmbed
            url="https://www.instagram.com/p/CUbHfhpswxt/"
            width={328}
            captioned
          />
        </div>
        <div className="left__side__post">
          {post.map((post) => (
            <Post
              key={post.username}
              imgUrl={post.imageUrl}
              username={post.username}
              caption={post.caption}
            />
          ))}
        </div>
        <div className="right__side__post">
          <FacebookEmbed
            url="https://www.facebook.com/TechPanaNews/photos/a.215607672656527/919354242281863/"
            width={328}
          />
          <FacebookEmbed
            url="https://www.facebook.com/TechPanaNews/photos/a.215607672656527/919354242281863/"
            width={328}
          />
        </div>
      </div>
    </div>
  );
};

export default Insta;
