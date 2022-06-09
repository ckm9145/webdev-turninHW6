import React from "react";
import FollowButton from "./FollowButton";

class Suggestion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			suggestion: props.model,
		};
		// initialization code here
	}

	componentDidMount() {
		// fetch posts and then set the state...
	}

	render() {
		const suggestion = this.state.suggestion;
		return (
			<div className="suggestion">
				<img src={suggestion.thumb_url} alt="suggested user profile pic" />
				<div>
					<p className="username">{suggestion.username}</p>
					<p className="suggestion-txt">Suggested for you</p>
				</div>
				<FollowButton
					userId={suggestion.id}
					refreshFollow={this.getSuggestionsFromServer}
				/>
			</div>
		);
	}
}

export default Suggestion;
