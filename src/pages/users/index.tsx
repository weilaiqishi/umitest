import React, { useState } from 'react'
import { Table, Tag, Space, Popconfirm } from 'antd'
import { connect } from 'umi'
import UserModal from './components/UserModal'

const index = ({ users, dispatch }: any) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text: React.ReactNode) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: React.ReactNode) => <a>{text}</a>,
        },
        {
            title: 'Create Time',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size='middle'>
                    <a onClick={() => editHandler(record)}>Edit</a>
                    <Popconfirm
                        title='Are you sure delete this task?'
                        onConfirm={() => onConfirm(record)}
                        okText='Yes'
                        cancelText='No'
                    >
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const onConfirm = async (record: any) => {
        const { id } = record
        await dispatch({
            type: 'users/delete',
            payload: {
                id,
            }
        })
        dispatch({
            type: 'users/getRemote'
        })
    }

    const [modalVisible, setModelVisible] = useState(false)
    const [record, setRecord] = useState({ id: null })
    const editHandler = (record: any) => {
        setRecord(record)
        setModelVisible(true)
    }
    const closeHandler = () => {
        setModelVisible(false)
    }
    const onFinish = async (values: any) => {
        const { id } = record
        await dispatch({
            type: 'users/edit',
            payload: {
                id,
                ...values
            }
        })
        setModelVisible(false)
        dispatch({
            type: 'users/getRemote'
        })
    }

    return (
        <div className='list-table'>
            <Table columns={columns} dataSource={users} rowKey='id' />
            <UserModal visible={modalVisible} closeHandler={closeHandler} record={record} onFinish={onFinish}></UserModal>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return { users: state.users.users }
}

export default connect(mapStateToProps)(index)