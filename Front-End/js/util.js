/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements the utility functions...">
 *
 * Student Name:
 * Student Number:
 *
 */

export {splitHash};

// splitHash - given a hash path like "#!/people/2" 
//   return an object with properties `path` ("people") and `id` (2)
function splitHash(hash) {

    const regex = "#!/([^/]*)/?(.*)?";
    const match = hash.match(regex);
    if (match) {
        return {
            path: match[1],
            id: match[2]
        }
    } else {
        return { path: "" }
    }
}

export function formatDate(inputFormat, format) {
    if (format === void 0) { format = 'dd-mm-yyyy'; }
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }
    if (inputFormat !== null && inputFormat !== '') {
        var d = new Date(inputFormat);
        if (format === 'dd-mm-yyyy') {
            return ([pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-')).toString();
        }
        else if (format === 'yyyy-mm-dd') {
            return ([d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')).toString();
        }
        return ([pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-')).toString();
    }
    else {
        return '';
    }
}


export function GetParam(Param) {
    const urlParams = new URLSearchParams(window.location.search);
    const paramVal = urlParams.get(Param);
    return paramVal === null ? '' : paramVal;
}

export function GetPathName() {
    return window.location.pathname;
}

export function RemoveStartingSlash(string) {
    return string.substr(string.indexOf('/') + 1);
}

export function RemoveEndingSlash(string) {
    return string.replace(/\/$/, "");
}