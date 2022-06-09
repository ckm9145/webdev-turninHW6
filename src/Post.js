import React from "react";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import Comments from "./Comments";
import { getHeaders } from "./utils";

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			post: props.model,
		};
		this.refreshPostDataFromServer = this.refreshPostDataFromServer.bind(this);

		// initialization code here
	}

	refreshPostDataFromServer() {
		//refetch post
		const url = "https://photo-app-secured.herokuapp.com/api/posts/" + this.state.post.id;
		fetch(url, {
			headers: getHeaders(),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					post: data,
				});
			});
	}

	componentDidMount() {
		// fetch posts and then set the state...
	}

	render() {
		const post = this.state.post;
		return (
			<div className="card">
				{/* key={'post_' + post.id}> */}
				<div className="card-header">
					<b>{post.user.username}</b>
					<i className="fas fa-ellipsis-h"></i>
				</div>
				<img src={post.image_url} alt="post" />
				<div className="card-icons">
					<div>
						<LikeButton
							likeId={post.current_user_like_id}
							postId={post.id}
							refreshPost={this.refreshPostDataFromServer}
						/>
						<i className="far fa-comment"></i>
						<i className="far fa-paper-plane"></i>
					</div>

					<BookmarkButton
						bookmarkId={post.current_user_bookmark_id}
						postId={post.id}
						refreshPost={this.refreshPostDataFromServer}
					/>
				</div>

				<p>
					<b>{post.user.username}</b> {post.caption}
				</p>

				<Comments
					post={post}
					postId={post.id}
					refreshPost={this.refreshPostDataFromServer}
				/>
			</div>
		);
	}
}

export default Post;
