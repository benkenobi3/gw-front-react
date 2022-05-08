import axios from 'axios'
import {AUTH_URL, AUTH_REFRESH_URL} from '../settings'

const login = async (username, password) => {
    const response = await axios.post(AUTH_URL, {
        username,
        password
    })
    if (response.status === 200) {
        localStorage.setItem('a', response.data.access)
        localStorage.setItem('r', response.data.refresh)
    }
    return response
}

const refresh = () => {
    const token = localStorage.getItem('r')
    if (!token) {
        throw Error('refresh token error')
    }

    axios.post(AUTH_REFRESH_URL, {
        'refresh': token
    }).then((response) => {
        localStorage.setItem('a', response.data.access)
        console.log('refresh')
    }).catch((err) => {
        logout()
    }) 
}

const logout = () => {
    localStorage.removeItem('a')
    localStorage.removeItem('r')
    window.location.reload()
}

export {login, refresh, logout}