import React from 'react'
import { Modal, Button } from 'antd'

const UserModal = (props) => {
    return (
        <div>
            <Modal title="Basic Modal" visible={props.visible} />
        </div>
    )
}

export default UserModal