import React from "react";
import { getHeaders } from "./utils";

class FollowButton extends React.Component {
	constructor(props) {
		super(props);

		this.toggleFollow = this.toggleFollow.bind(this);
		this.createFollower = this.createFollower.bind(this);
		this.removeFollower = this.removeFollower.bind(this);
		this.state = {
			followingId: null,
		};
	}

	componentDidMount() {
		// fetch posts and then set the state...
	}

	toggleFollow() {
		if (this.state.followingId) {
			this.removeFollower();
		} else {
			this.createFollower();
		}
	}

	createFollower() {
		const url = "https://photo-app-secured.herokuapp.com/api/following/";
		console.log("create follow", url);

		const followData = {
			user_id: this.props.userId,
		};

		fetch(url, {
			headers: getHeaders(),
			method: "POST",
			body: JSON.stringify(followData),
		})
			.then((Response) => Response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					followingId: data.id,
				});

				console.log("i just hit the follow button");
			});
	}

	removeFollower() {
		const url = "https://photo-app-secured.herokuapp.com/api/following/" + this.state.followingId;

		fetch(url, {
			method: "DELETE",
			headers: getHeaders(),
		})
			.then((Response) => Response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					followingId: null,
				});
				console.log("i unfollowed a user");
			});
	}

	render() {
		const followingClass = this.state.followingId ? "unfollow" : "follow";

		return (
			<button
				className={followingClass}
				onClick={this.toggleFollow}
				aria-label="follow / unfollow"
			>
				{this.state.followingId ? "Unfollow" : "Follow"}
			</button>
		);
	}
}

export default FollowButton;
