import axios from "axios"
import { ORDERS_ALL_URL, ORDERS_ORDER_URL, ORDERS_STATUS_URL, EMPLOYERS_ALL_URL } from "./settings"


const fetchOrder = async (orderId) => {
    const { data } = await axios.get(ORDERS_ORDER_URL(orderId))
    data.key = data.id
    return data
}

const fetchOrders = async () => {
    const { data } = await axios.get(ORDERS_ALL_URL)
    data.forEach((order) => order.key = order.id)
    return data
}

const fetchEmployers = async () => {
    const { data } = await axios.get(EMPLOYERS_ALL_URL)
    data.forEach((order) => order.key = order.id)
    return data
}

const changeOrderStatus = async () => {
}

export { fetchOrder, fetchOrders, fetchEmployers }