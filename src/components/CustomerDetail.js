import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CustomerDetail = () => {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${params.userId}`).then(
            (res) => {
                setPosts(res.data);
            }
        );
        axios.get(`https://jsonplaceholder.typicode.com/users/${params.userId}`).then(
            (res) => {
                setUser(res.data);
            }
        );
    }, [params.userId])
    return (
        <div>
            <div class="ui clearing segment">
            <Link className="ui left floated header" to="/">Back to all users</Link>
            My App
            </div>
            <h1>{user?.name}</h1>
            <p className="meta">{user?.username}</p>
            <p><i class="envelope icon"></i> {user?.email}</p>
            <hr />
            <h2>My Posts</h2>
            <div className="ui cards">
                {posts.map((post) => {
                    const summary = `${post.body.substring(0, 49)}...`;
                    return (<div className="ui card">
                            <div className="content">
                                <Link to={`/post/${post.id}`}><h3 className="heading">{post.title}</h3></Link><p>{summary}</p>
                            </div>
                        </div>);
                })}
            </div>
        </div>
    );
}

export default CustomerDetail;