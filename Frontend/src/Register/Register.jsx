import React from "react";
import "./registerCss.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

const Register = () => {
	const history = useNavigate();
	const [msg, setMsg] = useState("");
	
	useEffect(() => {
		const checkLoggedIn = () => {
			
			// If user hass logged in so
			
			if (Cookies.get("isLoggedIn")!=undefined)				
			{
			console.log((Cookies.get("isLoggedIn")));
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
			else{//setMsg("Error Occured")
			//history('/register')
			}
		};

		checkLoggedIn();
	}, [history]);

	const users = {
		name: "",
		email: "",
		phone: "",
		password: "",
	};

	const [user, setUser] = useState(users);
	

	const inputHandler = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const submitForm = async (e) => {
		e.preventDefault();
		const{name,email,phone,password} = user;
		if(email!="" && password!="" && name!="" && phone!=""){
		await axios
			.post("https://post-application-e27c.onrender.com/create", user)
			.then((response) => {
				//	toast.success(response.data.msg, { position: "top-right" });
				console.log(response.data);
				Cookies.set('isLoggedIn', JSON.stringify({bool:true,id:response.data.id}))
				history("/account/" + response.data.id);
				
			})
			.catch((error) =>setMsg(error.response.data.message));
	}
	else{setMsg("Fill Data Properly")	}
};

	return (
		<div className="container gradient">
		<div className="container gradient">
			<div className="screen">
				<div className="screen__content">
					<form className="login" onSubmit={submitForm}>
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							{/* <input type="text" className="login__input" placeholder="User name / Email" /> */}
							<input
								type="text"
								className="login__input"
								onChange={inputHandler}
								id="name"
								name="name"
								autoComplete="off"
								placeholder="Username"
							/>
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							{/* <input type="text" className="login__input" placeholder="User name / Email" /> */}
							<input
								type="text"
								className="login__input"
								onChange={inputHandler}
								id="email"
								name="email"
								autoComplete="off"
								placeholder="Email"
							/>
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							{/* <input type="text" className="login__input" placeholder="User name / Email" /> */}
							<input
								type="number"
								className="login__input"
								onChange={inputHandler}
								id="phone"
								name="phone"
								autoComplete="off"
								placeholder="Phone"
							/>
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-lock"></i>
							{/* <input type="password" className="login__input" placeholder="Password" /> */}
							<input
								type="password"
								className="login__input"
								onChange={inputHandler}
								id="password"
								name="password"
								autoComplete="off"
								placeholder="password"
							/>
						</div>
						<button className="button login__submit" >
							<span className="button__text">Log In Now</span> 
							<i className="button__icon fas fa-chevron-right"></i>
						</button>
						<span className="new-msg" onClick={()=>	history("/login")}>Already Logged in </span>
				<span className="msg"> {msg}</span>			
					</form>

				</div>
				<div className="screen__background">
					<span className="screen__background__shape screen__background__shape4"></span>
					<span className="screen__background__shape screen__background__shape3"></span>
					<span className="screen__background__shape screen__background__shape2"></span>
					<span className="screen__background__shape screen__background__shape1"></span>
				</div>
			</div>
		</div></div>
	);
};

export default Register;
