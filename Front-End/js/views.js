/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements view functions...">
 *
 * Student Name:
 * Student Number:
 *
 */

import {formatDate} from "./util.js";
import {api_url} from "./config.js";
import {Auth} from "./service.js";
import {Model} from "./model.js";

export function listAllPostsView(target, posts) {
    if (posts.length > 0) {
        let __html = '';

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            let __comment_html = '';

            for (let j = 0; j < post.comments.length; j++) {
                __comment_html += `<li style="padding: 10px">${post.comments[j].c_content}</li>`;
            }

            __html += `<div class="post">
                <div class="info">
                    <img class="thumbnail" alt="Post thumbnail" src="${post.p_image !== null ? api_url + post.p_image.url : ''}"/>
                    <div>
                        <i>${post.p_caption} by ${post.user.username} - ${formatDate(post.published_at, 'dd-mm-yyyy')}</i>
                    </div>
                </div>
                <div class="comments">
                <ul>
                    ${__comment_html}
                    </ul>
                </div>
            </div>`;
        }

        target.innerHTML = __html;
    }
}

export function listPostsView(target, posts) {
    if (posts.length > 0) {
        let __html = '';

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];

            __html += `<tr style="cursor: pointer" onClick="window.location = '/#!/post/${posts[i].id}';">`;
            __html += `<td><img class="thumbnail" alt="Post thumbnail" src="${post.p_image !== null ? api_url + post.p_image.url : ''}"/></td>`;
            __html += `<td>${post.p_caption}</td>`;
            __html += `<td>${post.user.username}</td>`;
            __html += `<td>${formatDate(post.published_at, 'dd-mm-yyyy')}</td>`;
            __html += `<td style="font-weight: bold;">${post.p_likes} Likes</td>`;
            __html += `<td><button type="button" role="like-btn" data-id="${post.id}" data-likes="${post.p_likes}">Like</button></td>`;
            __html += '</tr>';
        }

        target.innerHTML = __html;


        document.querySelectorAll('[role="like-btn"]').forEach((button, index) => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                Model.addLike(e.target.getAttribute('data-id'), e.target.getAttribute('data-likes'));
            });
        });
    }
}


export function listMostLikedPosts(target, posts) {
    if (posts.length > 0) {
        let __html = '';

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];

            __html += `<div class="flowtow">
            <ul id="most-popular-first">
                <li>
                    <a href="/#!/post/${posts[i].id}">
                        <img alt="Post thumbnail" src="${post.p_image !== null ? api_url + post.p_image.url : ''}"/>
                    </a>
                </li>
                <li>User Nick: ${post.user.username}</li>
                <li>Post Date: ${formatDate(post.published_at, 'dd-mm-yyyy')}</li>
                <li>${post.p_caption}</li>
                <li>No. of Likes: ${post.p_likes}</li>
            </ul>
        </div>`;
        }

        target.innerHTML = __html;
    }
}

export function drawSinglePost(target, post) {
    if (post !== null) {
        let __comments_html = '';

        for (let i = 0; i < post.comments.length; i++) {
            __comments_html += `<li style="padding: 3px;">>> ${post.comments[i].c_content}</li>`;
        }

        target.innerHTML = `<img src="${api_url + post.p_image.url}"/>
            <h3 align="center">
                ${post.p_caption}
            </h3>
            <div align="center">by ${post.user.username}</div>
            <div align="center">${formatDate(post.published_at, 'dd-mm-yyyy')}</div>

            <br/>

            <u><i>Comments</i></u>
            <br/>
            <br/>

            <ul>${__comments_html}</ul>

            <br/>

            <div class="comment-composer">
                <label>
                    <table style="width: 100%;">
                        <tr>
                            <td>
                                <input type="text" placeholder="Input Comment"/>
                            </td>
                            <td style="text-align: right">
                                <button>Submit</button>
                            </td>
                        </tr>
                    </table>
                </label>
            </div>`;
    }
}


export function drawIsLoggedIn(target) {
    let __html = '';
    const isLoggedIn = Auth.isLoggedIn();

    if (!isLoggedIn) {
        __html = `<h2>Login</h2>
            <p>Enter credentials to login</p>

            <form method="POST" name="LoginForm">
                <div class="form-input">
                    <label>Username</label>
                    <input type="text" name="username"/>
                </div>
                <div class="form-input">
                    <label>Password</label>
                    <input type="password" name="password"/>
                </div>

                <div class="form-submit">
                    <input type="submit" value="Login"/>
                </div>
            </form>`
    } else {
        __html += `
        <div>Logged in as: ${Auth.getAuthUser().user.username}</div>
    `;
    }

    target.innerHTML = __html;
}