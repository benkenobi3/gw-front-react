import { Tag } from "antd"


function BusyTag(is_busy) {
    let color = is_busy ? 'orange' : 'green'
    let text = is_busy ? 'ЗАНЯТ' : 'СВОБОДЕН'

    return (
        <Tag color={color} key={is_busy}>
            {text}
        </Tag>
    )
}

export default BusyTag