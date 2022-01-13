import axios from 'axios';
import React, {useState, useEffect} from 'react';

const DanDan =()=> {
const [users, setUser] =useState([]);
const [post, setPost] =useState([]);
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

        setUser(allDataUsers.data); 
        setPost(allDataPosts.data);
        setComment(allDataComments.data); 

        // console.log(allData);
        console.log(allDataUsers.data);
        console.log(allDataPosts);
        console.log(allDataComments);

    })
  )
}
useEffect(()=> {
  fetchData()
}, [])
  return (
    <div className="App">
      <div>
          <h1>All Users</h1>
          <div>
             {users.map((user) => {
                 return (<h2>{user.name}</h2>);
             })}
          </div>
      </div>
    </div>
  );
}

export default DanDan;