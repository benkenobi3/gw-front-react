import {Row, Col, Button} from "antd"
import {Link} from "react-router-dom"
import {ToolOutlined} from "@ant-design/icons"


function Home() {
    return (
        <div>
        <Row>
            <Col span={6}>
                <Link to="/">
                    <Logo/>
                </Link>
            </Col>
            <Col span={12}></Col>
            <Col span={6}></Col>
        </Row>
        <Row>
            <Col></Col>
        </Row>   
        </div>
    );
}

const Logo = () => {return <div className="logo"></div>}

export default Home