import axios from 'axios'
import { Service } from 'axios-middleware'
import { AUTH_URL } from '../settings';

import {refresh} from './auth'

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

  onResponseError(err) {
    if (err.response.status === 401 && err.config && 
      !err.config.hasRetriedRequest && err.response.config.url != AUTH_URL) {
      refresh().then(() => {
        const token = localStorage.getItem('a')
        return axios({
            ...err.config,
            hasRetriedRequest: true,
            headers: {
              ...err.config.headers,
              Authorization: `Bearer ${token}`
            }
          })
      })
    }
    else {throw err}
  },

})
