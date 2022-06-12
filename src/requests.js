import axios from "axios"
import { ORDERS_ALL_URL, ORDERS_ORDER_URL, COMMENTS_CREATE_URL, 
    EMPLOYERS_ALL_URL, COMMENTS_LIST_URL, EMPLOYERS_AVAILABLE_URL, 
    ORDERS_STATUS_URL, ORDERS_PERFORMER_URL, COMMENTS_DELETE_URL, 
    STATUS_LIST_URL, TIMELINE_LIST_URL, CHARTS_BUSY_URL, 
    CHARTS_STATUS_URL, SPECIALIZATION_LIST_URL, ORDERS_CREATE_URL, USERS_USER_URL } from "./api"


const fetchOrder = async orderId => {
    const { data, status } = await axios.get(ORDERS_ORDER_URL(orderId))
    
    if (status !== 200)
        return {data: {}, err: data}

    data.key = data.id
    return {data: data, err: null}
}

const fetchOrders = async () => {
    const { data, status } = await axios.get(ORDERS_ALL_URL)

    if (status !== 200)
        return {data: {}, err: data}

    data.forEach((order) => order.key = order.id)
    return {data: data, err: null}
}

const fetchEmployers = async () => {
    const { data, status } = await axios.get(EMPLOYERS_ALL_URL)

    if (status !== 200)
        return {data: {}, err: data}

    data.forEach((order) => order.key = order.id)
    return {data: data, err: null}
}

const fetchComments = async orderId => {
    const { data, status } = await axios.get(COMMENTS_LIST_URL(orderId))

    if (status !== 200)
        return {data: {}, err: data}

    data.forEach((comment) => comment.key = comment.id)
    return {data: data, err: null}
}

const fetchAvailableEmployers = async orderId => {
    const { data, status } = await axios.get(EMPLOYERS_AVAILABLE_URL(orderId))

    if (status !== 200)
        return {data: {}, err: data}
    
    data.forEach((employer) => employer.key = employer.id)
    return {data: data, err: null}
}

const fetchStatusList = async () => {
    const { data, status } = await axios.get(STATUS_LIST_URL)

    if (status !== 200)
        return []
    
    data.forEach((s) => s.key = s.status)
    return data
}

const fetchSpecList = async () => {
    const { data, status } = await axios.get(SPECIALIZATION_LIST_URL)

    if (status !== 200)
        return []
    
    data.forEach((s) => s.key = s.id)
    return data
}

const fetchBusyChart = async () => {
    const { data, status } = await axios.get(CHARTS_BUSY_URL)

    if (status !== 200)
        return []
    
    data.forEach((s) => s.key = s.title)
    return data
}

const fetchStatusChart = async () => {
    const { data, status } = await axios.get(CHARTS_STATUS_URL)

    if (status !== 200)
        return []
    
    return data
}

const fetchTimelineList = async orderId => {
    const { data, status } = await axios.get(TIMELINE_LIST_URL(orderId))

    if (status !== 200)
        return []
    
    data.forEach((t) => t.key = t.id)
    return data
}

const fetchUserProfile = async userId => {
    const { data, status } = await axios.get(USERS_USER_URL(userId))
    if (status !== 200)
        return {data: {}, err: data}

    data.key = data.id
    return {data: data, err: null}
}

const saveOrderStatus = async (orderId, statusId) => {
    const { data, status } = await axios.post(ORDERS_STATUS_URL(orderId), {'status': statusId})

    if (status !== 200)
        return {data: {}, err: data}
    
    data.key = data.id
    return {data: data, err: null}
}

const saveOrderPerformer = async (orderId, performerId) => {
    const { data, status } = await axios.post(ORDERS_PERFORMER_URL(orderId), {'performer': performerId})

    if (status !== 200)
        return {data: {}, err: data}

    data.key = data.id
    return {data: data, err: null}
}

const saveComment = async comment => {
    const { data, status } = await axios.post(COMMENTS_CREATE_URL, comment)

    if (status !== 201)
        return {data: {}, err: data}

    data.key = data.id
    return {data: data, err: null}
}

const saveOrder = async order => {
    const { data, status } = await axios.post(ORDERS_CREATE_URL, order)

    if (status !== 201)
        return {data: {}, err: data}

    data.key = data.id
    return {data: data, err: null}
}

const deleteComment = async commentId => {
    const { data, status } = await axios.post(COMMENTS_DELETE_URL(commentId))

    if (status !== 204)
        return {data: {}, err: data}
    
    return {data: data, err: null}
}

export { fetchOrder, fetchOrders, fetchEmployers, fetchComments, fetchAvailableEmployers, fetchStatusList, fetchTimelineList,
    saveComment, saveOrderStatus, saveOrderPerformer, saveOrder, deleteComment, fetchBusyChart, fetchStatusChart, fetchSpecList, fetchUserProfile }