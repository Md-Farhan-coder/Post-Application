import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState({
    logged:false,
    id:" "
  });
  const history = useNavigate();

  useEffect(() => {
		const checkLoggedIn = () => {
			
			// If user hass logged in so
			if (Cookies.get("isLoggedIn")!=undefined)				
			{
						console.log(JSON.stringify(Cookies.get("isLoggedIn")));

			const loggedInCookie = Cookies.get("isLoggedIn");
			
			console.log(JSON.parse(loggedInCookie).bool);
				if (JSON.parse(loggedInCookie).bool == true) {
				
						 console.log(loggedInCookie);
					history("/account/" + JSON.parse(loggedInCookie).id);
				}

				// If user hass not logged in so direct to login page
				else {
					// Navigate to another login page after 5 seconds
				
				}
			}
      else {console.log("cOOKIE NOT DEFINED");
      history('/login')
      }
		};

		checkLoggedIn();
	}, [history]);


  const handleLogin = () => {
    // Logic for login...
    // For example, after successful login
    
    //setIsLoggedIn(true);

    // Set cookie with expiry date of 1 month
history('/login')
  };

  return (<></>
    // <div>
    //   {isLoggedIn.logged ? (
    //     <p>User is Not logged in!</p>
       
       
    //   ) : (
    //     <div>
    //       {history('/login')}
    //       <button onClick={handleLogin}>Login</button>
    //       <p>Redirecting to another login page in 5 seconds...</p>
    //     </div>
    //   )}
    // </div>
  );
};


export default Home