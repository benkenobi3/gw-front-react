import { Tag } from "antd"


function StatusTag({status, status_locale}) {

    if (!status && !status_locale)
        return <Tag>status or status_locale error</Tag>

    let color = status === 'rejected' ? 'darkred' : 'green'
    color = status === 'info_required' ? 'orange' : color
    color = status === 'done' ? 'darkgreen' : color

    return (
        <Tag color={color} key={status}>
            {status_locale.toUpperCase()}
        </Tag>
    )
}

export default StatusTag