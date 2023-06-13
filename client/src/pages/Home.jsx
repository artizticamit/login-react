import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


export default function Home() {

  const {logout} = useLogout();
  const {user} = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <>
      <div>
        <h1>Home Page</h1>
        <h2>Welcome {user ? user.email: 'Nobody'}</h2>
      </div>


      {user && <div className="logout">
        <button type="submit" onClick={handleClick}>logout</button>
      </div>
      }
      <div className="posts">
      <a href="/posts">
        posts
      </a>
        
      </div>
      {!user &&
        <>
          <div className="login">
            <a href='/login' type="submit">login</a>
          </div>
          <div className="register">
            <a href='/register' type="submit">Register</a>
          </div>
        </>
      }

    </>
  )
}
