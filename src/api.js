export const HOST_URL = 'http://localhost:8000/'

export const AUTH_URL = HOST_URL + 'auth/token/'
export const AUTH_REFRESH_URL = AUTH_URL + 'refresh/'

export const API_URL = HOST_URL + 'api/'

export const STATUS_LIST_URL = `${API_URL}status/list`
export const SPECIALIZATION_LIST_URL = `${API_URL}specialization/list`
export const TIMELINE_LIST_URL = order_id => `${API_URL}timeline/list?order=${order_id}`

export const CHARS_URL = `${API_URL}charts/`
export const CHARTS_BUSY_URL = `${CHARS_URL}busy`
export const CHARTS_STATUS_URL = `${CHARS_URL}status`

export const USERS_URL = API_URL + 'users/'
export const USERS_USER_URL = user_id => `${USERS_URL}${user_id}`

export const EMPLOYERS_URL = API_URL + 'employers/'
export const EMPLOYERS_ALL_URL = EMPLOYERS_URL + 'all'
export const EMPLOYERS_AVAILABLE_URL = order_id => `${EMPLOYERS_URL}available?order=${order_id}`

export const ORDERS_URL = API_URL + 'orders/'
export const ORDERS_ALL_URL = ORDERS_URL + 'all'
export const ORDERS_LIST_URL = ORDERS_URL + 'list'
export const ORDERS_CREATE_URL = ORDERS_URL + 'create'
export const ORDERS_ORDER_URL = order_id => `${ORDERS_URL}${order_id}/`
export const ORDERS_STATUS_URL = order_id => `${ORDERS_URL}${order_id}/status`
export const ORDERS_PERFORMER_URL = order_id => `${ORDERS_URL}${order_id}/performer`

export const COMMENTS_URL = API_URL + 'comments/'
export const COMMENTS_CREATE_URL = COMMENTS_URL + 'create'
export const COMMENTS_LIST_URL = order_id => `${COMMENTS_URL}list?order=${order_id}`
export const COMMENTS_UPDATE_URL = comment_id => `${COMMENTS_URL}${comment_id}/update`
export const COMMENTS_DELETE_URL = comment_id => `${COMMENTS_URL}${comment_id}/delete`
