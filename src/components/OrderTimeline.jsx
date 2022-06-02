import { Steps, Tooltip } from "antd"
import { useEffect, useState } from "react"

import { datetimeFormat } from "../utils"
import { fetchTimelineList } from "../requests"


const { Step } = Steps;

function OrderTimeline({orderId}) {

    const [timelineList, setTimelineList] = useState([])

    async function fetchAndSetTimelineList() {
        if (orderId) {
            const data = await fetchTimelineList(orderId)
            setTimelineList(data)
        }
    }

    useEffect(() => {if (orderId) {
        fetchAndSetTimelineList()
    }}, [orderId])
    
    const steps = []

    const pushStepsFromList = list => {
        for (let point of list)
            steps.push(<Step key={point.key} title={point.title} description={(new Date(point.datetime)).toLocaleString()}/>)
    }

    if (timelineList.length < 8)
        pushStepsFromList(timelineList)
    else {
        
        const start = timelineList.slice(0, 3)
        const finish = timelineList.slice(-3)
        const collapsed = timelineList.slice(3, -3)

        const tooltipTitle = collapsed.reduce((res, elem) => `${res} ${elem.title} - ${datetimeFormat(elem.datetime)} \n`, '')
        const tooltip = <Tooltip overlayStyle={{ whiteSpace: 'pre-line', maxWidth: '400px' }} title={tooltipTitle} placement="bottom">...</Tooltip>

        pushStepsFromList(start)
        steps.push(<Step key={3} title={tooltip}/>)
        pushStepsFromList(finish)
    }
    
    return (
        <Steps direction="vertical" size="small" current={steps.length}>
            {steps}
        </Steps>
    )

}

export default OrderTimeline