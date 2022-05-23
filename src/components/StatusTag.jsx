import { Tag } from "antd"
import { STATUS_MAPPING } from "../utils"


function StatusTag({status}) {
    let color = status === 'rejected' ? 'darkred' : 'green'
    color = status === 'info_required' ? 'orange' : color
    color = status === 'done' ? 'darkgreen' : color

    return (
        <Tag color={color} key={status}>
            {STATUS_MAPPING[status]}
        </Tag>
    )
}

export default StatusTag