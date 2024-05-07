import { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from 'js-cookie';

import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

const Account = () => {
	const [users, setUsers] = useState([]);
	
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get("http://localhost:8000/getall");
			setUsers(response.data);
		};

		fetchData();
	}, []);

	

	return (
		<>
			<Navbar />
			<ModalComp />

			{users.map((user, index) => {
				return (
					<div className="full-container" key={user._id}>
						<div className="post-container">
							<div className="post-heading">{user.title}</div>
							<div className="post-description">{user.description}</div>
							<div className="action-buttons">
								<button className="action-button">
									<AiFillLike /> <span>{user.like}</span>
								</button>
								<button className="action-button">
									<FaRegCommentAlt />{" "}
								</button>
								<CommentSec id={user._id} comment={user.comments}/>
								
								
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
};

const CommentSec = (props) => {

	const [comment, setComment] = useState("");
	const [isCommentVisible, setCommentVisible] = useState(false);

	const toggleCommentVisibility = () => {
		setCommentVisible(!isCommentVisible);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`http://localhost:8000/comment/${props.id}`, {comment} );
			// Optionally, you can perform some action after successfully adding the comment
			console.log('Comment added successfully');
			setComment("");
			
		  } catch (error) {
			console.error('Error adding comment:', error);
		  }
	};
	return(
	<>
		<button className="action-button " onClick={toggleCommentVisibility}>
		<FaRegCommentAlt />
		</button>
		<div className={`comment-section ${isCommentVisible ? "active" : ""}`}>
			<form onSubmit={handleSubmit}>
				<textarea className="comment-textarea" rows={5}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<button type="submit">Add Comment</button>
			</form>

	<div id="textList">
				<ul>
{
	props.comment.map((val,index)=>{
		return(
		      <li key={index}>{val}</li>
		);
	})
}
	   
    </ul>
			</div>		
  
	</div></>)
};

const Navbar = () => {
	const [showNavbar, setShowNavbar] = useState(false);
	const history = useNavigate();

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};
	const signoutClick= ()=>{
		Cookies.remove('isLoggedIn');
		history('/login');
	}
	

	return (
		<nav className="navbar">
			<div className="nav-container">
				<div className="logo">
				<img src="/nodejs.png" alt="g" />
				</div>
				<div className="menu-icon" onClick={handleShowNavbar}>
					<AiFillLike />
				</div>
				<div className={`nav-elements  ${showNavbar && "active"}`}>
					<ul>
						<li>
							<a href="#modal-10" className="link">
								Add New Post
							</a>
						</li>
						
					
						<li onClick={signoutClick}>
							<div>Sign Out</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

const ModalComp = () => {
	const history = useNavigate();
	const users = {
		title: "",
		description: "",
	};

	const [user, setUser] = useState(users);
	const inputHandler = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const submitForm = async (e) => {
		e.preventDefault();

		await axios
			.post("http://localhost:8000/posts", user)
			.then((response) => {
				toast.success(response.data.msg, { position: "top-right" });
				setUser({
					title: "",
					description: "",
				});
				console.log(" data send");
				
			})
			.catch((error) => console.log("dfff"));
	};

	return (
		<>
			<div data-ml-modal id="modal-10">
				<a href="#!" className="modal-overlay"></a>
				<div className="modal-dialog modal-dialog-lg">
					<a href="#!" className="modal-close">
						&times;{" "}
					</a>

					<div className="modal-content newspaper model-my-css">
						<div className="post-add-container">
							<form onSubmit={submitForm}>
								<div className="post-add-group">
									<label >Title:</label>
									<input
										type="text"
										onChange={inputHandler}
										id="title"
										name="title"
										autoComplete="off"
										placeholder="Enter title..."
										required
									/>
								</div>
								<div className="post-add-group">
									<label>Description:</label>
									<textarea
										onChange={inputHandler}
										id="description"
										name="description"
										placeholder="Enter description..."
										rows="4"
										required
									></textarea>
								</div>
								<div className="post-add-group">
									<button type="submit">Submit</button>
								</div>
							</form>
						</div>
						
					</div>
				</div>
			</div>
		</>
	);
};
export default Account;

// <div className="full-container">
// <div className="post-container">

// 	<div className="post-heading">Post Title</div>
// 	<div className="post-description">
// 		Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 		Nullam commodo finibus tortor, nec ullamcorper justo
// 		posuere. Lorem ipsum dolor sit amet consectetur
// 		adipisicing elit. Odio, sunt magni ex voluptate
// 		laboriosam mollitia magnam repellendus nihil deserunt ab
// 		nobis ducimus velit rem vero atque repellat ipsa
// 		corrupti ullam! Lorem ipsum dolor sit amet, consectetur
// 		adipiscing elit. Nullam commodo finibus tortor, nec
// 		ullamcorper justo posuere. Lorem ipsum dolor sit amet
// 		consectetur adipisicing elit. Odio, sunt magni ex
// 		voluptate laboriosam mollitia magnam repellendus nihil
// 		deserunt ab nobis ducimus velit rem vero atque repellat
// 		ipsa corrupti ullam!
// 	</div>
// 	<div className="action-buttons">
// 		<button className="action-button">Like</button>
// 		<button className="action-button">Unlike</button>
// 		<button className="action-button">Comment</button>
// 		<p>
// 			<a href="#modal-10" className="link">
// 				Open Modal 0
// 			</a>
// 		</p>
// 	</div>
// </div>
// </div>