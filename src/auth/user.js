const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const getUser = () => {
    const token = localStorage.getItem('a')

    if (token) {
        let jwt = parseJwt(token)

        return {
            username: jwt.username,
            first_name: jwt.first_name,
            last_name: jwt.last_name,
            id: jwt.user_id
        }
    }

    return null
}

export {parseJwt, getUser}