import React from "react";
import { getHeaders } from "./utils";

class BookmarkButton extends React.Component {
	constructor(props) {
		super(props);

		this.toggleBookmark = this.toggleBookmark.bind(this);
		this.createBookmark = this.createBookmark.bind(this);
		this.removeBookmark = this.removeBookmark.bind(this);

		// initialization code here
	}

	componentDidMount() {
		// fetch posts and then set the state...
	}

	toggleBookmark() {
		if (this.props.bookmarkId) {
			this.removeBookmark();
		} else {
			this.createBookmark();
		}
	}

	createBookmark() {
		const url = "https://photo-app-secured.herokuapp.com/api/bookmarks";
		console.log("create Bookmark", url);

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

	removeBookmark() {
		const url = "https://photo-app-secured.herokuapp.com/api/bookmarks/" + this.props.bookmarkId;
		console.log("remove Bookmark", url);

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
		const bookmarkId = this.props.bookmarkId;
		const bookmarkClass = (bookmarkId ? "fas" : "far") + " fa-bookmark";
		return (
			<i
				className={bookmarkClass}
				onClick={this.toggleBookmark}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						this.toggleBookmark();
					}
				}}
				aria-label="bookmark / unbookmark"
				tabIndex={0}
			></i>
		);
	}
}

export default BookmarkButton;
