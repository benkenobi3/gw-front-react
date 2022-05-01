import axios from 'axios'
import {AUTH_URL, AUTH_REFRESH_URL} from '../settings'

const login = (username, password) => {
    return axios.post(AUTH_URL, {
        username,
        password
    }).then((response) => {
        localStorage.setItem('a', response.data.access)
        localStorage.setItem('r', response.data.refresh)
    })
}

const refresh = () => {
    console.log('Рефреш нахуй')

    const token = localStorage.getItem('r')
    if (!token) {
        throw Error('refresh token error')
    }

    axios.post(AUTH_REFRESH_URL, {
        'refresh': token
    }).then((response) => {
        console.log('Нормально рефрешнул' + response.data.access)
        localStorage.setItem('a', response.data.access)
        return response.data.access
    }).catch((err) => {
        console.log('В пизду тебя')
        logout()
    }) 
}

const logout = () => {
    localStorage.removeItem('a')
    localStorage.removeItem('r')
    window.location.reload()
}

export {login, refresh, logout}