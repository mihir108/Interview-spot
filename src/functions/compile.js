import axios from "axios";
const API_KEY = '73bfff05e8mshdafc167b1f0cbd0p1f5d74jsn2debc0231dda'

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

function showOutput(data, setOutput) {
	let result;
	if(data.status.description === "Compilation Error") result = data.compile_output;
	else if(data.status.description === "Accepted") result = data.stdout;
	else if(data.status.description === 'Runtime Error (NZEC)') result = data.stderr;
	setOutput(decode(result));
}

function checkIfCodeCompiled(token, setOuput) {
	const options = {
	method: 'GET',
	url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
	params: {base64_encoded: 'true', fields: '*'},
	headers: {
		'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
		'x-rapidapi-key': `${API_KEY}`
	}
	};

	axios.request(options).then(function (response) {
		showOutput(response.data, setOuput);

	}).catch(function (error) {
		console.error(error);
	});
}

export function compile(code, input,lang, setOutput) {
	setOutput('Compiling your code...');
	const options = {
	method: 'POST',
	url: 'https://judge0-ce.p.rapidapi.com/submissions',
	params: {base64_encoded: 'true', fields: '*'},
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

	axios.request(options).then(function (response) {
		const token = response.data.token;
		checkIfCodeCompiled(token, setOutput);

	}).catch(function (error) {
		console.error(error);
	});
    
}