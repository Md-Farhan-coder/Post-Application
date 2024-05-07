import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState({
    logged:false,
    id:" "
  });
  const history = useNavigate();

 

  const handleLogin = () => {
    // Logic for login...
    // For example, after successful login
    
    //setIsLoggedIn(true);

    // Set cookie with expiry date of 1 month
history('/login')
  };

  return (
    <div>
      {isLoggedIn.logged ? (
        <p>User is Not logged in!</p>
       
       
      ) : (
        <div>
          <button onClick={handleLogin}>Login</button>
          <p>Redirecting to another login page in 5 seconds...</p>
        </div>
      )}
    </div>
  );
};


export default Home