import "chart.js/auto"
import { Row, Col } from "antd"
import { useEffect, useState } from "react"
import { Radar, Doughnut } from "react-chartjs-2"

import { fetchBusyChart, fetchStatusChart } from "../requests"
import "./Overview.sass"



function Overview() {

    const [busyChartsData, setBusyChartsData] = useState([])
    const [statusChartsData, setStatusChartsData] = useState({datasets: []})

    async function fetchAndSetBusyCharts() {
        const data = await fetchBusyChart()
        if (data)
            setBusyChartsData(data)
    }

    async function fetchAndSetStatusCharts() {
        const data = await fetchStatusChart()
        console.log(data)
        if (data)
            setStatusChartsData(data)
    }

    useEffect(() => {
        fetchAndSetBusyCharts()
        fetchAndSetStatusCharts()
    }, [])

    const busyCharts = []

    for (let chart of busyChartsData) {
        const options = {
            plugins: {
                title: {
                    display: true,
                    text: chart.title
                }
            }
        }
        busyCharts.push(
            <Doughnut data={chart.data} key={chart.title} options={options}/>
        )
    }
        

    if (busyCharts) {
        return (
            <Row justify="space-around" className="busy-charts">
                <Col xs={24} xl={12} xxl={8}>
                    <Row justify="center">
                        <Col xs={14} md={12}>{busyCharts[0]}</Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={14} md={7}>{busyCharts[1]}</Col>
                        <Col xs={14} md={7}>{busyCharts[2]}</Col>
                        <Col xs={14} md={7}>{busyCharts[3]}</Col>
                    </Row>
                </Col>
                <Col xs={18} xl={12} xxl={8}>
                    <Row justify="center">
                        <Col xs={19}>
                            <Radar data={statusChartsData}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
    
    return <></>

}

export default Overview