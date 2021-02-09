import React, { useState } from 'react'
import { Table, Tag, Space } from 'antd'
import { connect } from 'umi'
import UserModal from './components/UserModal'

const index = ({ users }) => {
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
            render: (text: any, record: { name: React.ReactNode; }) => (
                <Space size="middle">
                    <a onClick={() => {
                        setModelVisible(true)
                    }}>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    
    const [modalVisible, setModelVisible] = useState(false)

    return (
        <div className="list-table">
            <Table columns={columns} dataSource={users} rowKey='id' />
            <UserModal visible={modalVisible}></UserModal> 
        </div>
    )
}

const mapStateToProps = (state) => {
    return { users: state.users.users }
}

export default connect(mapStateToProps)(index)