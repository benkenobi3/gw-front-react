import axios from 'axios'
import { Service } from 'axios-middleware'

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
    console.log('Ошибка нахуй')
    if (err.response.status === 401 && err.config && !err.config.hasRetriedRequest) {
      const token = refresh()
      return axios({
          ...err.config,
          hasRetriedRequest: true,
          headers: {
            ...err.config.headers,
            Authorization: `Bearer ${token}`
          }
        })
    }
    else {throw err}
  },

})
