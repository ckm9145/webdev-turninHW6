import React from "react";

class Story extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			story: props.model,
		};

		// initialization code here
	}

	componentDidMount() {
		// fetch posts and then set the state...
	}

	render() {
		const story = this.state.story;
		return (
			<div>
				<img
					src={story.user.thumb_url}
					className="pic"
					alt={"profile pic for " + story.user.username}
				/>
				<p>{story.user.username}</p>
			</div>
		);
	}
}

export default Story;
