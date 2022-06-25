import { Progress } from "antd"

function OrderTargetDatetime({value}) {

    if (value && value.target && value.target !== null && value.target !== undefined) {

        const start = new Date(value.creation)
        const finish = new Date(value.target)
        const now = new Date()
        const target_interval = finish.getTime() - start.getTime()
        const now_interval = now.getTime() - start.getTime()

        const percent = Math.round(now_interval / target_interval)

        return (
            <div>
                <Progress percent={percent}/>
            </div>
        )
    }
    
    return <></>
}

export default OrderTargetDatetime