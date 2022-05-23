import { Steps } from "antd"

const { Step } = Steps;

function OrderTimeline({creationDatetime}) {
    if (creationDatetime) {
        const date = new Date(creationDatetime)
        return (
            <Steps direction="vertical" size="small" current={1}>
                <Step title="Заявка создана" description={date.toLocaleString()} />
                <Step title="Заявка назначена на исполнителя" description={(new Date()).toLocaleString()} />
                <Step title="Ожидание" description="" />
            </Steps>
        )
    }
    return <></>
}

export default OrderTimeline