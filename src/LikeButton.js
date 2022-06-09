import React from "react";
import { getHeaders } from "./utils";

class LikeButton extends React.Component {
	constructor(props) {
		super(props);

		this.toggleLike = this.toggleLike.bind(this);
		this.createLike = this.createLike.bind(this);
		this.removeLike = this.removeLike.bind(this);

		// initialization code here
	}

	componentDidMount() {
		// fetch posts and then set the state...
	}

	toggleLike() {
		if (this.props.likeId) {
			this.removeLike();
		} else {
			this.createLike();
		}
	}

	createLike() {
		const url = "https://photo-app-secured.herokuapp.com/api/posts/likes";
		console.log("create like", url);

		const postData = {
			post_id: this.props.postId,
		};

		fetch(url, {
			headers: getHeaders(),
			method: "POST",
			body: JSON.stringify(postData),
		})
			.then((Response) => Response.json())
			.then((data) => {
				console.log(data);
				this.props.refreshPost();
			});
	}

	removeLike() {
		const url =
			"https://photo-app-secured.herokuapp.com/api/posts/likes/" +
			this.props.likeId;
		console.log("remove like", url);

		fetch(url, {
			headers: getHeaders(),
			method: "DELETE",
		})
			.then((Response) => Response.json())
			.then((data) => {
				console.log(data);
				this.props.refreshPost();
			});
	}

	render() {
		// const isLiked = false;
		const likeId = this.props.likeId;
		const heartClass = (likeId ? "fas" : "far") + " fa-heart";

		return (
			<i
				className={heartClass}
				onClick={this.toggleLike}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						this.toggleLike();
					}
				}}
				aria-label="like / unlike"
				tabIndex={0}
			></i>
		);
	}
}

export default LikeButton;
