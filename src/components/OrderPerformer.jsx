import { Select } from "antd"
import { Link } from "react-router-dom"

function OrderPerformer({performer, availablePerformers, edit}) {
 
    if (!performer)
        return <></>

    const options=[(
        <Select.Option value={performer.id} key={performer.id.toString()}>
            <Link to={"/user/" + performer.id}>
                {`${performer.first_name} ${performer.last_name}`}
            </Link>
        </Select.Option>
    )]

    if (!availablePerformers)
        return (
            <Select disabled={!edit}>
                {options}
            </Select>
        )

    for (let p of availablePerformers)
        options.push(
            <Select.Option value={p.id} key={p.id}>
                <Link to={"/user/" + p.id}>
                    {`${p.first_name} ${p.last_name}`}
                </Link>
            </Select.Option>
        )

    return (
        <Select disabled={!edit}>
            {options}
        </Select>
    )
}

export default OrderPerformer