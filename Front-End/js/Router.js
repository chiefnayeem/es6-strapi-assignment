import {GetParam, GetPathName, RemoveEndingSlash} from "./util.js";
import {Model} from "./model.js";

export const router = {
    init: () => {
        const currentRoute = GetPathName();

        if(window.location.hash !== '') {
            let hash = window.location.hash;
            const post_id = hash.replace( /^\D+/g, '');
            hash = hash.replace(post_id, '');
            hash = RemoveEndingSlash(hash.replace('#!', ''));

            if(hash === "/post") {
                document.getElementById('single-post-page').style.display = "block";
                if(post_id !== '') {
                    Model.getPost(post_id);
                }

                return;
            }
        }

        if(currentRoute === "/") {
            document.getElementById('home-page').style.display = "block";
        }

        if(currentRoute === "/all-posts") {
            document.getElementById('all-posts-page').style.display = "block";
        }
    }
}