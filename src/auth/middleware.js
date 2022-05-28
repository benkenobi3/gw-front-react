import axios from 'axios'
import { Service } from 'axios-middleware'
import { AUTH_URL, AUTH_REFRESH_URL } from '../api';

import { refreshToken, forgetToken } from './auth'

const service = new Service(axios);

service.register({

  onRequest(config) {
    const token = localStorage.getItem('a')
    if (!token) {
      return config
    }

    return {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
        ...config.headers
      }
    }
  },

  async onResponseError(err) {
    if (err.response) {
      if (err.response.status === 401 && err.config && !err.config.hasRetriedRequest 
        && err.response.config.url !== AUTH_URL && err.response.config.url !== AUTH_REFRESH_URL) {
    
          const refreshResponse = await refreshToken()
          console.log(refreshResponse.status)
          if (refreshResponse.status === 200) {

            const token = localStorage.getItem('a')
            return axios({
                ...err.config,
                hasRetriedRequest: true,
                headers: {
                  ...err.config.headers,
                  Authorization: `Bearer ${token}`
                }
              })
          }
    
      } else if (err.response.status === 401 && (!err.config || err.response.config.url !== AUTH_URL)) {
          forgetToken()
      }
      throw err
    }
    throw err
  }

})
