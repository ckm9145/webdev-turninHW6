import React, { useState, useRef } from "react";
import { getHeaders } from "./utils";

function Comments(props) {
	let post = props.post;
	const [newComment, setNewComment] = useState("");
	const commentRef = useRef(null);

	function ExistingComments() {
		if (post.comments.length > 1) {
			return (
				<div>
					<button
						data-post-id={post.id}
						// onclick="showModal(event)"
						// class="embedded-comment-link"
					>
						<a href="#" className="no-underline">
							View all {post.comments.length} Comments
						</a>
					</button>
					<p>
						<b> {post.comments[post.comments.length - 1].user.username}</b>
						{post.comments[post.comments.length - 1].text}
					</p>
				</div>
			);
		} else if (post.comments.length === 1) {
			return (
				<div>
					<p>
						<b> {post.comments[0].user.username}</b> {post.comments[0].text}
					</p>
				</div>
			);
		}
		// use other way to addd empty div
		return <div></div>;
	}

	const addComment = (e) => {
		e.preventDefault();
		console.log(newComment);
		const postData = {
			post_id: post.id,
			text: newComment,
		};

		fetch("https://photo-app-secured.herokuapp.com/api/comments", {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify(postData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setNewComment("");
				props.refreshPost();
				commentRef.current.focus();
			});

		//clear input after submission
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			addComment(e);
		}
	};

	return (
		<div>
			<ExistingComments />
			<form onSubmit={addComment}>
				<div className="timestamp">
					<p>
						<b> {post.display_time}</b>{" "}
					</p>
				</div>
				<i className="far fa-smile"></i>

				<input
					className="formatInput"
					value={newComment}
					placeholder="Add a comment ..."
					type="text"
					ref={commentRef}
					onChange={(e) => setNewComment(e.target.value)}
					onKeyDown={handleKeyDown}
				/>

				<input value="Post" type="submit" />
			</form>
		</div>
	);
}

export default Comments;
