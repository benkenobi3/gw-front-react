import axios from "axios"
import { ORDERS_ALL_URL, ORDERS_ORDER_URL, COMMENTS_CREATE_URL, 
    EMPLOYERS_ALL_URL, COMMENTS_LIST_URL, EMPLOYERS_AVAILABLE_URL, 
    ORDERS_STATUS_URL, ORDERS_PERFORMER_URL, COMMENTS_DELETE_URL, 
    ORDERS_STATUS_LIST_URL } from "./api"


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
    const { data, status } = await axios.get(ORDERS_STATUS_LIST_URL)

    if (status !== 200)
        return []
    
    data.forEach((s) => s.key = s.status)
    return data
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

const deleteComment = async commentId => {
    const { data, status } = await axios.post(COMMENTS_DELETE_URL(commentId))

    if (status !== 204)
        return {data: {}, err: data}
    
    return {data: data, err: null}
}

export { fetchOrder, fetchOrders, fetchEmployers, fetchComments, fetchAvailableEmployers, fetchStatusList,
    saveComment, saveOrderStatus, saveOrderPerformer, deleteComment }