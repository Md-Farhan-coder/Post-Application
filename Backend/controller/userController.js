import User from "../model/userModel.js";
import postModel from "../model/postModel.js";

export const create = async (req, res) => {
	try {
		const userData = new User(req.body);

		if (!userData) {
			return res.status(404).json({ msg: "User data not found" });
		}

		await userData.save();
		res.status(200).json({
			id: userData._id,
			msg: "User created successfully",
		});
	} catch (error) {
		res.status(500).json({ error: "Error Occured" });
	}
};
export const login = async (req, res) => {
	const { email, password } = await req.body;

	try {
		// Check if the user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(402).json({ message: "User not found" });
		}

		// Check if the password is correct
		//const isPasswordValid = await bcrypt.compare(password, user.password);
		if (password != user.password) {
			return res.status(401).json({ message: "Invalid password" });
		}

		// Redirect the user or send some response indicating successful login
		res.status(200).json({ 	id: user._id,message: "Login successful" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const posts = async (req, res) => {
	try {
		const userData = new postModel(req.body);

		if (!userData) {
			return res.status(200).json({ msg: "User data not found" });
}
await userData.save(); 
res.status(200).json({
  msg: "User created successfully",
});


			// Redirect the user or send some response indicating successful login
			res.status(200).json({ message: "Login successful" });
		
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getAll = async(req, res) =>{
    try {

        const userData = await postModel.find();
        if(!userData){
            return res.status(404).json({msg:"User data not found"});
        }
        res.status(200).json(userData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const comments =async (req, res) => {
	const postId = req.params.id;
	const {comment  }= req.body;
	
	try { 
	  const post = await postModel.findById(postId);
	  if (!post) {
		return res.status(404).json({ message: 'Post not found' });
	  }
	  console.log(JSON.stringify(comment) );
	  post.comments.push(comment);
	  await post.save();
  
	  res.status(201).json({ message: 'Comment added successfully' });
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: 'Internal server error' });
	}
}
