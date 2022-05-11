import axios from 'axios'
import {AUTH_URL, AUTH_REFRESH_URL} from '../settings'

const getToken = async (username, password) => {
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

const refreshToken = async () => {
    const token = localStorage.getItem('r')
    if (!token) {
        throw Error('refresh token error')
    }

    try {
        const response = await axios.post(AUTH_REFRESH_URL, {
            'refresh': token
        })
        localStorage.setItem('a', response.data.access)
        return response
    } catch (err) {
        forgetToken()
    }
}

const forgetToken = () => {
    localStorage.removeItem('a')
    localStorage.removeItem('r')
    window.location.reload()
}

export {getToken, refreshToken, forgetToken}