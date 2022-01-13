import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const CustomerList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users").then(
            (res) => {
                setUsers(res.data);
            }
        );
    }, []);

    return (
        <div>
        <div class="ui clearing segment">
            My App
        </div>
            <h1 class="ui header">All Users</h1>
            
            <div className="ui cards">
                {users?.map((user) => {
                    return (<div className="ui card">
                                <div className="content">
                                    <Link className="header" to={`/user/${user.id}`}>{user.name}</Link>
                                    <p className="meta">{user.username}</p>
                                    <p><i class="envelope icon"></i> {user.email}</p>
                                </div>
                            </div>);
                })}
            </div>
        </div>
    );
}

export default CustomerList;