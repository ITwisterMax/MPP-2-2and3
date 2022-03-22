import React, {Component} from 'react'

class Post extends Component {
	constructor(props) {
		super();

		this.state = {
			postId: props.post.postId,
			authorName: props.post.authorName,
			description: props.post.description,
			date: props.post.date,
			photo: props.post.photo
		}
	}

	render() {
		let {postId, authorName, description, date, photo} = this.state;
		let objDate = new Date(date);
		let month = (objDate.getMonth() + 1) < 10 ? '0' + (objDate.getMonth() + 1) : (objDate.getMonth() + 1);

		return (
			<tr className="post">
				<th>{postId}</th>
				<td>{authorName}</td>
				<td>{description}</td>
				<td>{`${objDate.getDate()}.${month}.${objDate.getFullYear()}`}</td>
				<td><img className ="post-image" src={photo} width="50" height="50" /></td>
			</tr>
		);
	}
}

export default Post;