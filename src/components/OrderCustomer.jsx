import { Input, Select } from "antd"
import { Link } from "react-router-dom"
import { LinkOutlined } from "@ant-design/icons"

function OrderCustomer({value}) {
 
    if (!value)
        return <Input disabled></Input>

    const name = `${value.first_name} ${value.last_name}`
    const selectValue = <>{name} <Link to={"/user/" + value.id}><LinkOutlined /></Link></>

    return (
        <Select disabled showArrow={false} value={0} dropdownRender={()=>""}>
            <Select.Option value={0}>{selectValue}</Select.Option>
        </Select>
    )
}

export default OrderCustomer