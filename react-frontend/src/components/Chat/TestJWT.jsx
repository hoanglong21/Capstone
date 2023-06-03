import React, { Component } from 'react';
import jwt_decode from "jwt-decode";

// let string = localStorage.getItem("token");
// let decode = jwt_decode(string)
// console.log(decode.sub)

class TestJWT extends Component {
    render() {
        return (
            <div>
            //     <h1>Current Username: {localStorage.getItem("token")}</h1>
            //     {/* <h2>Decode: {decode}</h2> */}
            </div>
        );
    }
}

export default TestJWT;