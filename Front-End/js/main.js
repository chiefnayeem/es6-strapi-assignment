/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name:
 * Student Number:
 *
 */

import {Model} from "./model.js";
import {
    listPostsView,
    listMostLikedPosts,
    listAllPostsView,
    listMyPostsView,
    drawSinglePost,
    drawIsLoggedIn,
    drawLoginError
} from "./views.js";
import {router} from "./router.js";
import {Auth} from "./service.js";

function redraw() {
    /* let content = "<h2>API Test</h2><ul>";
     content += "<li><a href='/#'>Three Posts</a></li>";
     content += "<li><a href='/#'>Recent Posts</a></li>";
     content += "<li><a href='/#'>Popular Posts</a></li>";
     content += "<li><a href='/posts/1'>A Single Post</a></li>";
     content += "</ul>";

     // update the page
     document.getElementById("target").innerHTML = content;*/
}


window.onload = function () {
    redraw();

    Model.getPosts();
    Model.getRecentPosts();
    Model.getPopularPosts();
    Model.getMostLikedPosts();
    if (Auth.isLoggedIn()) {
        Model.getUserPosts(Auth.getAuthUser() !== null ? Auth.getAuthUser().user.id : 0);
    }

    document.addEventListener('allPostsFetched', () => {
        listAllPostsView(document.getElementById('all-posts'), Model.data.posts);
    }, false);

    document.addEventListener('myPostsFetched', () => {
        listMyPostsView(document.getElementById('my-posts'), Model.data.userPosts);
    }, false);

    document.addEventListener('mostLikedPostsFetched', () => {
        listMostLikedPosts(document.getElementById('most-liked-posts'), Model.data.mostLikedPosts);
    }, false);

    document.addEventListener('recentPostsFetched', () => {
        listPostsView(document.getElementById('recent-posts'), Model.data.recentPosts);
    }, false);

    document.addEventListener('popularPostsFetched', () => {
        listPostsView(document.getElementById('popular-posts'), Model.data.popularPosts);
    }, false);

    document.addEventListener('singlePostFetched', () => {
        drawSinglePost(document.getElementById('single-post-container'), Model.data.singlePost);
    }, false);

    document.addEventListener('likeAdded', () => {
        Model.getPosts();
        Model.getRecentPosts();
        Model.getPopularPosts();
        Model.getMostLikedPosts();
    }, false);


    //login notification
    drawIsLoggedIn(document.getElementById('loginForm'));
    document.addEventListener('loggedIn', () => {
        drawIsLoggedIn(document.getElementById('loginForm'));
    }, false);
    document.addEventListener('loginError', () => {
        drawLoginError();
    }, false);

    //login submit handler
    if (typeof document.forms['LoginForm'] !== 'undefined') {
        document.forms['LoginForm'].addEventListener('submit', (e) => {
            e.preventDefault();
            const identifier = document.forms['LoginForm']['username'].value,
                password = document.forms['LoginForm']['password'].value;

            Auth.login(identifier, password);
        }, false);
    }


    //hash change listener
    window.addEventListener('hashchange', function () {
        window.location.reload();
    })

    router.init();
};


export function initializeCommentSubmitAction() {
    document.getElementById('commentform').addEventListener('click', function (e) {
        e.preventDefault();
        const c_content = document.querySelector('#commentform [name="c_content"]').value;
        const post_id = document.querySelector('#commentform [name="post_id"]').value;

        if(c_content.toString().trim() !== '') {
            Model.addComment({
                post_id,
                c_content,
            });
        }
    });
}