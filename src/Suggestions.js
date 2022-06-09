import React from "react";
import { getHeaders } from "./utils";
import Suggestion from "./Suggestion";

class Suggestions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			suggestions: [],
		};
		this.getSuggestionsFromServer();
	}

	getSuggestionsFromServer() {
		fetch("https://photo-app-secured.herokuapp.com/api/suggestions", {
			headers: getHeaders(),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					suggestions: data,
				});
			});
	}

	componentDidMount() {
		// fetch posts and then set the state...
	}

	render() {
		return (
			<div id="suggestions">
				<p className="suggestion-text">Suggestions for you</p>
				<div>
					{this.state.suggestions.map((suggestion) => {
						return (
							<Suggestion
								key={"suggestion_" + suggestion.id}
								model={suggestion}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Suggestions;
