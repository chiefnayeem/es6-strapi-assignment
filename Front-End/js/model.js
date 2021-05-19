import {api_url} from "./config.js";
import {Auth} from "./service.js";
/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements ...">
 *
 * Student Name:
 * Student Number:
 *
 */

/* 
 * Model class to support the FlowTow application
 * this object provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates different events:
 *   "modelUpdated" event when new data has been retrieved from the API
 *   "postAdded" event when a request to add a new post returns
 *   "likeAdded" event when a request to add a new like returns
 *   "commentAdded" event when a request to add a new comment returns 
*/

const Model = {
    postsUrl: api_url + '/posts',
    uploadUrl: api_url + '/upload',
    commentsUrl: api_url + '/comments',

    //this will hold the post data stored in the model
    data: {
        posts: [],
        recentPosts: [],
        popularPosts: [],
        mostLikedPosts: [],
        singlePost: null,
    },

    // updatePosts - retrieve the latest list of posts from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    updatePosts: function () {

    },

    // getPosts - return an array of post objects
    getPosts: function () {
        //before that you may need to sort the posts by their timestamp
        fetch(this.postsUrl).then(response => {
            return response.json();
        }).then(res => {
            this.data.posts = res;
            let event = new CustomEvent('allPostsFetched');
            document.dispatchEvent(event);
        }).catch((error) => {
            console.log(error);
        })
    },

    // getPost - return a single post given its id
    getPost: function (postId) {
        const url = this.postsUrl + '/' + postId;

        fetch(url).then(response => {
            return response.json();
        }).then(res => {
            this.data.singlePost = res;
            let event = new CustomEvent('singlePostFetched');
            document.dispatchEvent(event);

        }).catch((error) => {
            console.log(error);
        });
    },

    setPosts: function (posts) {
        this.data.posts = posts;
    },

    // addPost - add a new post by submitting a POST request to the server API
    // postData is an object containing all fields in the post object (e.g., p_caption)
    // when the request is resolved, creates an "postAdded" event
    addPost: function (postData) {

    },

    // getUserPosts - return just the posts for one user as an array
    getUserPosts: function (userid) {

    },

    // addLike - increase the number of likes by 1 
    //      by submitting a PUT request to the server API
    //      postId - is the id of the post
    // when the request is resolved, creates an "likeAdded" event
    addLike: function (postId, prevLikeNumber) {
        fetch(this.postsUrl + "/" + postId, {
            method: "PUT", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getAuthUser().jwt}`,
            }, body: JSON.stringify({p_likes: Number(prevLikeNumber) + 1})
        }).then(res => res.json()).then(data => {
            let event = new CustomEvent('likeAdded');
            document.dispatchEvent(event);
        });

    },

    // addComment - add a comment to a post 
    //      by submitting a POST request to the server API
    //      commentData is an object containing the content of the comment, the author and the postid
    // when the request is resolved, creates an "commentAdded" event
    addComment: function (commentData) {

    },

    //getRandomPosts - return N random posts as an array
    getRandomPosts: function (N) {

    },

    // getRecentPosts - return the N most recent as an array
    //  posts, ordered by timestamp, mos
    //  t recent first
    /**
     *
     * @param postNumber {number}
     */
    getRecentPosts: function (postNumber = 10) {
        const url = this.postsUrl + '?_sort=id:DESC&_limit=' + postNumber;

        fetch(url).then(response => {
            return response.json();
        }).then(res => {
            this.data.recentPosts = res;
            let event = new CustomEvent('recentPostsFetched');
            document.dispatchEvent(event);

        }).catch((error) => {
            console.log(error);
        });
    },

    // getPopularPosts - return the N most popular as an array
    // posts, ordered by the number of likes
    getPopularPosts: function (postNumber = 10) {
        const url = this.postsUrl + '?_sort=p_likes:DESC&_limit=' + postNumber;

        fetch(url).then(response => {
            return response.json();
        }).then(res => {
            this.data.popularPosts = res;

            let event = new CustomEvent('popularPostsFetched');
            document.dispatchEvent(event);

        }).catch((error) => {
            console.log(error);
        });
    },


    //Get most liked 3 posts
    getMostLikedPosts: function () {
        const url = this.postsUrl + '?_sort=p_likes:DESC&_limit=3';

        fetch(url).then(response => {
            return response.json();
        }).then(res => {
            this.data.mostLikedPosts = res;

            let event = new CustomEvent('mostLikedPostsFetched');
            document.dispatchEvent(event);

        }).catch((error) => {
            console.log(error);
        });
    },

}

export {Model};