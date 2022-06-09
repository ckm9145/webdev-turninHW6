import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import Profile from "./Profile";
import NavBar from "./NavBar";
import { getHeaders } from "./utils";

class App extends React.Component {
	constructor(props) {
		super(props);
		// issue fetch request to /api/profile:

		this.getProfileFromServer();
		this.state = {
			user: {},
		};
	}

	getProfileFromServer() {
		fetch("https://photo-app-secured.herokuapp.com/api/profile", {
			headers: getHeaders(),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					user: data,
				});
			});
	}

	render() {
		return (
			<div>
				<NavBar title="Photo App" username={this.state.user.username} />

				<aside>
					<Profile
						photo={this.state.user.image_url}
						username={this.state.user.username}
					/>
					<Suggestions />
				</aside>

				<main className="content">
					<Stories />
					<Posts />
				</main>
			</div>
		);
	}
}

export default App;
