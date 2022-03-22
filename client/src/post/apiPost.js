export const getPosts = () => {
	return fetch('/post/posts')
	.then(response => {
		return response.json()
	})
	.catch();      
}

export const createPost = (post) => {
  	return fetch('/post/create', {
	  	method: 'POST',
	  	headers: {
	    	'Accept': 'application/json',
	  	},
	  	body: post
  	})
  	.then(response => response.json());
}