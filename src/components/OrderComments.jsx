import { Comment, List, Avatar} from "antd"
import { Link } from "react-router-dom"
import { FormOutlined, UserOutlined } from "@ant-design/icons"

import { datetimeFormat } from "../utils"

function OrderComments({comments}) {
 
    if (comments.length < 1)
        return (
            <div style={{textAlign: "center"}}>Нет комментариев <FormOutlined /></div>
        )

    

    const res = []
    for (let c of comments) {
        const actions = [
            <span key={0}>delete</span>,
        ]

        const author = (
            <Link
                to={'user/' + c.user.id} 
                style={{lineHeight: '38px', fontSize: '16px'}}
            >
                {`${c.user.first_name} ${c.user.last_name}`}
            </Link>
        )

        res.push(
            <li key={c.id}>
                <Comment 
                    author={author}
                    actions={actions}
                    avatar={<Avatar size={38} icon={<UserOutlined />} className="comments-avatar"/>}
                    content={<p>{c.text}</p>}
                    datetime={datetimeFormat(c.creation_datetime)}
                />
            </li>        
        )
    }

    return (
        <List className="comments-list">
            {res}
        </List>
    )

}

export default OrderComments