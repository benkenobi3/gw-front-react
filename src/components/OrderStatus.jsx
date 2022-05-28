import { Select } from "antd"
import { useEffect, useState } from "react"

import { fetchStatusList } from "../requests"
import StatusTag from "./StatusTag"

const cache = new Map()

function OrderStatus({disabled, value, onSelect, onChange}) {
        
    const [statusList, setStatusList] = useState([])
    
    const memoStatusList = async () => {
        if(cache.has('status_list')) {
            setStatusList(cache.get('status_list'))
            return
        }
            
        const value = await fetchStatusList()
        cache.set('status_list', value)
        setStatusList(value)
    }

    useEffect(() => {
        memoStatusList()
    })

    const options = []
    for (let s of statusList)
        options.push(
            <Select.Option value={s.status} key={s.status}>
                <StatusTag status={s.status} status_locale={s.status_locale}/>
            </Select.Option>
        )

    return (
        <Select disabled={disabled} value={value} onSelect={onSelect} onChange={onChange}>
            {options}
        </Select>
    )
}

export default OrderStatus