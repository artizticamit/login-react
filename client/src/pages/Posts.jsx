import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'

export default function Posts() {
    const {user} = useAuthContext();
    
    const [posts, setPosts] = useState([]);
    
    useEffect(()=>{
        const fetchPosts = async ()=>{
            if(user)
            {
                const response = user && await axios.get('/api/post/'+user.email+'/timeline', {
                  headers:{
                    'Authorization': `Bearer ${user.token}`
                  }
                })
                setPosts(response.data)
                console.log(response.data)
            }else{
                setPosts([]);
            }
            
        }
        fetchPosts();
    },[user])
  return (
    <div>
    <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post._id}</h2>
          <p>{post.desc}</p>
        </div>
      ))}
    </div>
  )
}
