
let referer = document.referrer
if (referer.indexOf("spdl.com") < 0) {
    document.cookie = `referers=${referer}; domain=.spdl.com; path=/; expires=` + new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toUTCString() + '; SameSite=None; Secure';
}
let cookies = document.cookie;
let cookieValue = null;
//domain=.spdl.com;
cookies.split(';').forEach(cookie => {
    let [name, value] = cookie.trim().split('=');
    if (name === 'referers') {
        cookieValue = decodeURIComponent(value);
    }
});
if (!cookieValue) {
    cookieValue = ""
}