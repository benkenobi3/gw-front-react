import axios from "axios"
import { ORDERS_ALL_URL, ORDERS_ORDER_URL, COMMENTS_CREATE_URL, EMPLOYERS_ALL_URL, COMMENTS_LIST_URL } from "./api"


const fetchOrder = async (orderId) => {
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

const fetchComments = async (orderId) => {
    const { data, status } = await axios.get(COMMENTS_LIST_URL(orderId))

    if (status !== 200)
        return {data: {}, err: data}

    data.forEach((comment) => comment.key = comment.id)
    return {data: data, err: null}
}

const saveOrderStatus = async () => {}

const saveOrderPerformer = async () => {}

const saveComment = async (comment) => {
    const { data, status } = await axios.post(COMMENTS_CREATE_URL, comment)

    if (status !== 201)
        return {data: {}, err: data}

    data.key = data.id
    return {data: data, err: null}
}

export { fetchOrder, fetchOrders, fetchEmployers, fetchComments, saveComment, saveOrderStatus, saveOrderPerformer }