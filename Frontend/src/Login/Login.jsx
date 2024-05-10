import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from 'js-cookie';


const Login = () => {
	const BASE_URL ="https://post-application-e27c.onrender.com"
	const navigate = useNavigate();

	useEffect(() => {
		const checkLoggedIn = () => {
			
		// If user hass logged in so
		if (Cookies.get("isLoggedIn")!=undefined)				
			{
			
			const loggedInCookie = Cookies.get("isLoggedIn");
			
			console.log(JSON.parse(loggedInCookie).bool);
				if (JSON.parse(loggedInCookie).bool == true) {
				
				
						 console.log(loggedInCookie);
					navigate("/account/" + JSON.parse(loggedInCookie).id);
				}

				// If user hass not logged in so direct to login page
				else {
					// Navigate to another login page after 5 seconds
				
				}
			}
		};

		checkLoggedIn();
	}, [navigate]);

	const users = {
		email: "",
		password: ""
	};

	const [user, setUser] = useState(users);
	const [msg, setMsg] = useState("");
	

	const inputHandler = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const submitForm = async (e) => {
		e.preventDefault();
		 const{email,password} = user;
		if(email!="" && password!=""){
     	await axios.post(`${BASE_URL}/login`, user)
			.then((response) => {
				console.log(response.data.message);
				setMsg(response.data.message);
				toast.success(response.data.message, { position: "top-right" });
console.log(response);
Cookies.set('isLoggedIn', JSON.stringify({bool:true,id:response.data.id}))
            
				navigate("/account/"+response.data.id);
			})
			.catch((error) =>{
				console.log(error);
				
					setMsg(error.response.data.message);
				

				console.log(error.response.status);}
			);
	}
else { setMsg("Fill Data Properly")}
}
	return (
		<div className="gradient">
		<div className="container gradient">
	<div className="screen">
		<div className="screen__content">
			<form className="login" onSubmit={submitForm}>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					{/* <input type="text" className="login__input" placeholder="User name / Email" /> */}
                    <input type="text" className="login__input" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Username' />
          
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					{/* <input type="password" className="login__input" placeholder="Password" /> */}
                    <input type="password" className="login__input" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='password' />
         
				</div>
				<button className="button login__submit">
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>		
				<span className="new-msg" onClick={()=>	navigate("/register")}> Create new Account </span>
				<span className="msg"> {msg}</span>			
			</form>
		
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div></div>
</div>
	);
};

export default Login;
