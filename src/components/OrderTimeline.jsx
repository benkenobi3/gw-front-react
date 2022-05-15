import { Steps } from "antd"

const { Step } = Steps;

function OrderTimeline({creation_dt}) {
    if (creation_dt) {
        const date = new Date(creation_dt)
        return (
            <Steps direction="vertical" size="small" current={1}>
                <Step title="Заявка создана" description={date.toLocaleString()} />
                <Step title="Заявка назначена на исполнителя" description={(new Date()).toLocaleString()} />
                <Step title="Ожидание" description="" />
            </Steps>
        )
    }
    return <Steps direction="vertical" size="small" current={0}><Step title="Заявка создана" description={""} /></Steps>
}

export default OrderTimeline