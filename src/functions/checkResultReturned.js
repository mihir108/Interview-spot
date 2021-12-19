

export const checkResultReturned = (response, onOutputChange, decode) => {
    let description = response.status.description;
    if(description === 'Accepted'){
        onOutputChange(decode(response.stdout));
    }
    else if(description === "Compilation Error"){
        onOutputChange(decode(response.compile_output));
    }
    else{
        onOutputChange(description);
    }

}