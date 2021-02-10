import React, { useEffect } from 'react'
import { Modal, Button, Form, Input } from 'antd'

const UserModal = (props: any) => {
    const [form] = Form.useForm()
    const { visible, record, closeHandler, onFinish } = props
    useEffect(() => { form.setFieldsValue(record) }, [visible])
    const onOk = () => {
        form.submit()
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed::', errorInfo)
    }
    return (
        <div>
            <Modal title='Basic Modal'
                visible={visible}
                onOk={onOk}
                onCancel={closeHandler}
                forceRender
            >
                <Form
                    name='base'
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label='Email'
                        name='email'
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label='Create Time'
                        name='create_time'
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label='Status'
                        name='status'
                    >
                        <Input></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default UserModal