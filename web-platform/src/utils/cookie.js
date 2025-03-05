/* eslint-disable no-unused-vars */
const newDateUTC = days =>{
    let date = new Date();
    const newFecha = date.setTime(date.getTime() + days*1000*60*60*24);
    return new Date(newFecha);
}


const createCookie = (name,days) =>{
    let expires = newDateUTC(days)
    document.cookie = `${name};expires=${expires}`;
}

const getCookie = cookieName =>{
    let cookies = document.cookie
    // console.log(cookies)
    cookies = cookies.split(";");
    for (let cook of cookies){
        let cookie = cook.trim();
        if (cookie.startsWith(cookieName)){
            return cookie.split("=")[1]
        }
    }

    return null;
}

const deleteCookies = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        const equal = cookie.indexOf("=");
        const name = equal > -1 ? cookie.substring(0, equal) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export {createCookie, getCookie, deleteCookies};