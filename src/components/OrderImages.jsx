import { useState } from "react"
import { Image, Button } from "antd"
import { IMAGE_FALLBACK } from "../settings"


function OrderImages({images}) {

    const [visible, setVisible] = useState(false)

    if (!images)
        return <></>

    if (images.length === 1)
        return (
            <Image.PreviewGroup>
                <Image 
                    width={150} height={200} 
                    src={images[0].url} 
                    fallback={IMAGE_FALLBACK}
                />
            </Image.PreviewGroup>
        )

    let group = []
    for (let i =0; i < images.length; i++)
        group.push(
            <Image 
                key={i} 
                width={150} height={200} 
                src={images[i].url} 
                fallback={IMAGE_FALLBACK}
            />
        )

    return (
        <>
        <Image 
            width={150} height={200} 
            src={images[0].url} 
            preview={{ visible: false }} 
            onClick={() => setVisible(true)} 
            fallback={IMAGE_FALLBACK}
        />
        <Button type="link" onClick={() => setVisible(true)}>
            {"Еще\u00a0+" + (images.length-1)}
        </Button>
        <div style={{ display: 'none' }}>
            <Image.PreviewGroup 
                preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                {group}
            </Image.PreviewGroup>
        </div>
        </>
    )

}

export default OrderImages