import axios from "axios";
// const API_KEY = '73bfff05e8mshdafc167b1f0cbd0p1f5d74jsn2debc0231dda'
// const API_KEY = '642a5d1a7fmshfc133c9d3876cc3p14c362jsn159bad2f1041'
// const API_KEY = '81351fd847msh51e7b8d7c9f13efp1cc954jsn4cce49d4dd1e'
const API_KEY = '7618912dbfmsh2a325e3decd2d07p1f9956jsn62222c2ff5fd'

function encode(str) {
	return btoa(unescape(encodeURIComponent(str || "")));
}
function decode(bytes) {
	var escaped = escape(atob(bytes || ""));
	try {
		return decodeURIComponent(escaped);
	} catch {
		return unescape(escaped);
	}
}

function checkIfCodeCompiled(token, onOutputChange) {
	const options = {
		method: 'GET',
		url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
		params: { base64_encoded: 'true', fields: '*' },
		headers: {
			'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
			'x-rapidapi-key': `${API_KEY}`
		}
	};
	console.log('asking');
	axios.request(options).then(function (response) {

		let description = response.data.status.description;

		if (description === "In Queue" || description === "Processing") {
			setTimeout(() => {
				checkIfCodeCompiled(token, onOutputChange);
			}, 1000);
		}
		else if(description === 'Accepted'){
			console.log(decode(response.data.stdout), 'Accepted');
			onOutputChange(decode(response.data.stdout));
		}
		else if(description === "Compilation Error"){
			onOutputChange(decode(response.data.compile_output));
		}
		else{
			onOutputChange(description);
		}

	}).catch(function (error) {
		console.error(error);
	});
}

export function compile(code, input, lang, onOutputChange) {
	onOutputChange('Compiling your code...');
	const options = {
		method: 'POST',
		url: 'https://judge0-ce.p.rapidapi.com/submissions',
		params: { base64_encoded: 'true', fields: '*' },
		headers: {
			'content-type': 'application/json',
			'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
			'x-rapidapi-key': `${API_KEY}`
		},
		data: {
			language_id: `${lang}`,
			source_code: `${encode(code)}`,
			stdin: `${encode(input)}`
		}
	};

	console.log('compiling');
	axios.request(options).then(function (response) {
		const token = response.data.token;
		checkIfCodeCompiled(token, onOutputChange);

	}).catch(function (error) {
		console.error(error);
	});

}