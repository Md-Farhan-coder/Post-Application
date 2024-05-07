import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from 'js-cookie';

const Login = () => {
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
		password: "",
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
     	await axios.post("http://localhost:8000/login", user)
			.then((response) => {
				toast.success(response.data.message, { position: "top-right" });
console.log(response);
            
				navigate("/account/"+response.data.id);
			})
			.catch((error) =>{
				console.log(error);
				if(error.response.data.status == 402)
					setMsg(error.response.data.message);
				

				console.log(error.response.status);
			});
	}
else { setMsg("Fill Data Properly")}
}
	return (
		<div className="gradient">
		<div class="container gradient">
	<div class="screen">
		<div class="screen__content">
			<form class="login" onSubmit={submitForm}>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					{/* <input type="text" class="login__input" placeholder="User name / Email" /> */}
                    <input type="text" className="login__input" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Username' />
          
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					{/* <input type="password" class="login__input" placeholder="Password" /> */}
                    <input type="password" className="login__input" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='password' />
         
				</div>
				<button class="button login__submit">
					<span class="button__text">Log In Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>		
				<span className="new-msg" onClick={()=>	navigate("/register")}> Create new Account </span>
				<span className="msg"> {msg}</span>			
			</form>
		
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div></div>
</div>
	);
};

export default Login;
