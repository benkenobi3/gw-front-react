import { Select, Tooltip } from "antd"
import { useEffect, useState } from "react"

import { fetchAddressList } from "../requests"

const cache = new Map()

function OrderAddress({disabled, value, onSelect, onChange}) {

    const [addresses, setAddresses] = useState([])

    const memoAddressesList = async () => {
        if(cache.has('address_list')) {
            setAddresses(cache.get('address_list'))
            return
        }

        const value = await fetchAddressList()
        console.log(value)
        if (value) {
            cache.set('address_list', value)
            setAddresses(value)
        }

    }

    useEffect(() => {
        memoAddressesList()
    }, [])

    const options = [
        (
        <Select.Option value={0} key={0}>
            <Tooltip title={'Не указан'}>
                {'Не указан'}
            </Tooltip>
        </Select.Option>  
        ),
    ]
    for (let address of addresses)
        options.push(
            <Select.Option value={address.id} key={address.key}>
                <Tooltip title={address.location}>
                    {address.name}
                </Tooltip>
            </Select.Option>
        )

    return (
        <Select disabled={disabled} value={value} onSelect={onSelect} onChange={onChange}>
            {options}
        </Select>
    )
}

export default OrderAddress