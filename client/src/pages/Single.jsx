import React, { useContext, useEffect, useState } from "react"
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import Menu from "../components/Menu"
import axios from "axios"
import moment from "moment"
import {AuthContext} from "../context/authContext"

export default function Single(){
  const navigate = useNavigate();
  const [post, setPost] = useState();


  //const postId = useLocation().pathname.split('/')[2];

  const {currentUser} = useContext(AuthContext)
  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent;
  }
  

  console.log("curretn user ", currentUser)
   const {id} = useParams();
  useEffect(() => {
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/api/posts/${id}`)
        console.log(res.data)
        setPost(res.data);

      }
      catch(err){
        console.log("err or Occurred ",err)
      }
    }
    fetchData();
  }, [id]);

  const handleDelete = async ()=>{
    try {
      const res = await axios.delete(`/api/posts/${id}`);
      console.log(res)
      if(res.status == 200){
        window.alert("Post Deleted ")
        navigate("/")
      }
    } catch (err) {
      console.log(err);
    }
  }

    return (
        <div className="single">
        <div className="content">
          <img src={`../public/upload/${post?.img}`} alt=""/>

         <div className="user">
          {currentUser &&
          <img src={`../public/upload/${currentUser?.img}`} alt="" />
          }
          <div className="info">
           <span>{post?.author.username}</span>
           <p>Posted {moment(post?.createdAt).fromNow()}</p>
          </div>
          {currentUser && post && currentUser?.username === post?.author.username && (
          <div className="edit">
                 <Link to={`/write?edit=2`} state={post}>
                <img src ={Edit} alt=""/>
                </Link>
                <img onClick ={handleDelete} src ={Delete} alt=""/>
          </div>
          )}
         </div>
            <h1>{getText(post?.title)}</h1>
            {getText(post?.des)}
        </div>
        {
          post?.cat ?
          <Menu  cat = {post?.cat && post.cat }/>
          :
          <Menu/>
        }
      </div>
      
    );
  };