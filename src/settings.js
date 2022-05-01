export const HOST_URL = 'http://localhost:8000/'

export const AUTH_URL = HOST_URL + 'auth/token/'
export const AUTH_REFRESH_URL = AUTH_URL + 'refresh/'

export const API_URL = HOST_URL + 'api/'

export const ORDERS_URL = API_URL + 'orders/'
export const ORDERS_ALL_URL = ORDERS_URL + 'all'
export const ORDERS_LIST_URL = ORDERS_URL + 'list'
export const ORDERS_CREATE_URL = ORDERS_URL + 'create'
export const ORDERS_STATUS_URL = (order_id) => `${ORDERS_URL}${order_id}/status`
export const ORDERS_PERFORMER_URL = (order_id) => `${ORDERS_URL}${order_id}/performer`

export const COMMENTS_URL = API_URL + 'comments/'
export const COMMENTS_LIST_URL = COMMENTS_URL + 'list'
export const COMMENTS_CREATE_URL = COMMENTS_URL + 'create'
export const COMMENTS_UPDATE_URL = (comment_id) => `${COMMENTS_URL}${comment_id}/update`
export const COMMENTS_DELETE_URL = (comment_id) => `${COMMENTS_URL}${comment_id}/delete`

export const STATUS_MAPPING = {
    'created': 'СОЗДАНА',
    'appointed': 'НАЗНАЧЕНА',
    'accepted': 'В\u00a0РАБОТЕ',
    'info_required': 'НУЖНА\u00a0ИНФОРМАЦИЯ',
    'done': 'ЗАВЕРШЕНА',
    'rejected': 'ОТМЕНЕНА',
}