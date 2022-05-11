import axios from 'axios'
import { Service } from 'axios-middleware'
import { AUTH_URL } from '../settings';

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
    if (err.response.status === 401 && err.config && 
      !err.config.hasRetriedRequest && err.response.config.url != AUTH_URL) {

        const refreshResponse = await refreshToken()
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
    } else if (err.response.status === 401 && err.config && 
      err.config.hasRetriedRequest) {
        forgetToken()
    }
    throw err
  },

})
