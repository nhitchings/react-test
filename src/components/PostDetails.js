import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    const params = useParams();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${params.postId}`).then(
            (res) => {
                setPost(res.data);
                
            axios.get(`https://jsonplaceholder.typicode.com/users/${res?.data.userId}`).then(
                (users) => {
                    setUser(users.data);
                }
            );
            });
        axios.get(`https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`).then(
            (res) => {
                setComments(res.data);
            }
        );
    }, [params.postId])

    return (<div>
        <div class="ui clearing segment">
            My App
        </div>
        <h1>{post?.title}</h1>
        By: <Link to={`/user/${user?.id}`}>{user?.name}</Link>
        <p>{post?.body}</p>
        <hr />
        <h3>Comments</h3>
        <div className="ui feed">
        {comments.map((comment) => {
            return (
                <div className="ui event">
                    <div className="content">
                        <h4 className="heading">{comment.name}</h4>
                        <p className="">{comment.email}</p>
                        <p>{comment.body}</p>
                        <hr />
                    </div>
                </div>);
        })}
        </div>
    </div>);
}

export default PostDetails;