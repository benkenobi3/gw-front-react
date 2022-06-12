import { Select } from "antd"
import { Link } from "react-router-dom"
import { LinkOutlined } from "@ant-design/icons"

function OrderPerformer({availablePerformers, disabled, value, onSelect, onChange}) {
 
    const options = [(
        <Select.Option value={-1} key={-1}>
            Не назначен
        </Select.Option>
    )]

    for (let p of availablePerformers)
        options.push(
            <Select.Option value={p.id} key={p.id}>
                {`${p.first_name} ${p.last_name}`} <Link to={"panel/user/" + p.id}><LinkOutlined /></Link>
            </Select.Option>
        )

    return (
        <Select disabled={disabled} value={value} defaultValue={-1} onSelect={onSelect} onChange={onChange}>
            {options}
        </Select>
    )
}

export default OrderPerformer