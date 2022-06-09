import { Select } from "antd"
import { useEffect, useState } from "react"

import { fetchSpecList } from "../requests"

const cache = new Map()

function OrderSpecs({disabled, value, onSelect, onChange}) {
        
    const [specs, setSpecs] = useState([])
    
    const memoSpecList = async () => {
        if(cache.has('spec_list')) {
            setSpecs(cache.get('status_list'))
            return
        }
        
        const value = await fetchSpecList()
        if (value)
            cache.set('spec_list', value)
        setSpecs(value)
    }

    useEffect(() => {
        memoSpecList()
    }, [])

    const options = []
    for (let s of specs)
        options.push(
            <Select.Option value={s.id} key={s.key}>
                {s.title}
            </Select.Option>
        )

    return (
        <Select disabled={disabled} value={value} onSelect={onSelect} onChange={onChange}>
            {options}
        </Select>
    )
}

export default OrderSpecs