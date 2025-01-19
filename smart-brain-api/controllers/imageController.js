const handleApiCall = (req, res) => {
	const {input} = req.body;
	const returnClarifaiRequestOptions = (imageUrl) => {
	// Your PAT (Personal Access Token) can be found in the Account's Security section
	const PAT = process.env.CLARIFAI_PAT;
	// Specify the correct user_id/app_id pairings
	// Since you're making inferences outside your app's scope
	const USER_ID = 'urcd8k814b2u';   
	const APP_ID = 'face-recognition-brain';
	// Change these to whatever model and image input you want to use
	const IMAGE_URL = imageUrl;
	const raw = JSON.stringify({
	  "user_app_id": {
	      "user_id": USER_ID,
	      "app_id": APP_ID
	  },
	  "inputs": [
	      {
	          "data": {
	              "image": {
	                  "url": IMAGE_URL 
	              }
	          }
	      }
	  ]
	});

	const requestOptions = {
	method: 'POST',
	headers: {
	    'Content-Type': 'application/json',
	    'Authorization': 'Key ' + PAT
	},
	body: raw
	};
	return requestOptions;
	}

	fetch(
    "https://api.clarifai.com/v2/models/" + 
    "face-detection/" + 
    "outputs", 
    returnClarifaiRequestOptions(input)
    )
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error unable to fetch from clarifai'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0].entries);
		})
		.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}