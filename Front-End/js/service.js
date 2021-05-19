/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements user authentication ...">
 *
 * Student Name:
 * Student Number:
 *
 */

import {api_url} from "./config.js";

const Auth = {
    userData: null,

    // login - handle user login  
    //      by submitting a POST request to the server API
    //      username - is the input username
    //      password - is the input password
    // when the request is resolved, creates a "userLogin" event
    login: function (username, password) {
        fetch(`${api_url}/auth/local`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({identifier: username, password: password})
        }).then(res => res.json()).then(data => {
            if(typeof data.jwt !== "undefined" && data.jwt !== null) {
                this.userData = data;
                localStorage.setItem('__auth_userData', JSON.stringify(data));
                let event = new CustomEvent('loggedIn');
                document.dispatchEvent(event);
            } else {
                localStorage.removeItem('__auth_userData');
            }
        });
    },

    getAuthUser: function () {
        const userData = localStorage.getItem('__auth_userData');
        if(userData !== '' && userData !== null) {
            return JSON.parse(userData);
        }

        return null;
    },

    isLoggedIn: function () {
        return localStorage.getItem('__auth_userData') !== '' && localStorage.getItem('__auth_userData') !== null;
    }

};

export {Auth};