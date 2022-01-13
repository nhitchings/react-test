import axios from 'axios';
import React, {useState, useEffect} from 'react';

const DanDan =()=> {
const [users, setUser] =useState([]);
const [posts, setPost] =useState([]);
const [comment, setComment] =useState([]);

const fetchData =() =>{
  const userAPI ='https://jsonplaceholder.typicode.com/users';
  const postAPI ='https://jsonplaceholder.typicode.com/posts';
  const commentAPI ='https://jsonplaceholder.typicode.com/comments';

  const getUser = axios.get(userAPI)
  const getPost = axios.get(postAPI)
  const getComment = axios.get(commentAPI)
  axios.all([getUser, getPost, getComment]).then(
    axios.spread((...allData) =>{
      const allDataUsers = allData[0]; 
        const allDataPosts = allData[1]; 
        const allDataComments = allData[2];
        
        // add comments to posts they belong to
        const postsWithComments = allDataPosts.data.map((post) => {
            const postComments = allDataComments.data.filter((comment) => comment.postId === post.id);
            return { ...post,comments: postComments }
        })

        // add posts with comments to users they belong to
        const usersWithPosts = allDataUsers.data.map((user) => {
            const userPosts = postsWithComments.filter((post) => post.userId === user.id)
            return {...user, posts: userPosts}
        })

        setUser(usersWithPosts); 
        setPost(postsWithComments);
        setComment(allDataComments.data);
    })
  )
}
useEffect(()=> {
  fetchData()
}, [])
  return (
    <div className="App">
      <div>
          <div>
             {users.map((user) => {
                 return (
                     <div> 
                        <hr />
                        <h1 style={{background: 'black', color: 'white'}}>{user.name}</h1>
                        <h2>Posts</h2>
                        {user.posts.map((post) => {
                            return (
                                <div>
                                <hr />
                                    <div>
                                        <h2>{post.title}</h2>
                                        <p>{post.body}</p>
                                        <h3>Comments</h3>
                                        {post.comments.map((comment) => <p>{comment.body}</p>)};
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                 );
             })}
          </div>
      </div>
    </div>
  );
}

export default DanDan;