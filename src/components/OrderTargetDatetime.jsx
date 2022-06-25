import { Progress } from "antd"

function OrderTargetDatetime({value}) {

    if (value.target && value.target != null && value.target != undefined) {

        c = new Date(value.creation)
        t = new Date(value.target)

        return (
            <div>
                <Progress percent={t.value / c.value * 100}/>
            </div>
        )
    }
    
    return <></>
}

export default OrderTargetDatetime