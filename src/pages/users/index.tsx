import React, { useState, FC, useRef } from 'react';
import { Table, Tag, Space, Popconfirm, Button } from 'antd';
import ProTable, {
  ProColumns,
  TableDropdown,
  ActionType,
} from '@ant-design/pro-table';
import { connect, Dispatch, Loading, UserState } from 'umi';
import UserModal from './components/UserModal';
import { SingleUserType, FormValues } from './data';
import { getRemoteList, editRecord, deleteRecord, addRecord } from './service';

interface UserPageProps {
  users: UserState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

const UserListPage: FC<UserPageProps> = ({
  users,
  dispatch,
  userListLoading,
}: any) => {
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
      render: (text: any, record: SingleUserType) => (
        <Space size="middle">
          <a onClick={() => editHandler(record)}>Edit</a>
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => deleteHandler(record)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [modalVisible, setModelVisible] = useState(false);
  const [record, setRecord] = useState<SingleUserType | { id: null }>({
    id: null,
  });
  const editHandler = (record: SingleUserType) => {
    setRecord(record);
    setModelVisible(true);
  };
  const deleteHandler = async (record: SingleUserType) => {
    const { id } = record;
    await dispatch({
      type: 'users/delete',
      payload: {
        id,
      },
    });
  };
  const closeHandler = () => {
    setModelVisible(false);
  };
  const addHandler = () => {
    setRecord({ id: null });
    setModelVisible(true);
  };
  const requestHandler = async ({ pageSize, current }: any) => {
    const users = await getRemoteList({
      page: current,
      per_page: pageSize,
    });
    console.log(users);

    return {
      data: users.data,
      success: true,
      total: users.meta.total,
    };
  };
  const onFinish = async (values: FormValues) => {
    const { id } = record;
    let res = null;
    if (id) {
      res = await dispatch({
        type: 'users/edit',
        payload: {
          id,
          ...values,
        },
      });
    } else {
      res = await dispatch({
        type: 'users/add',
        payload: values,
      });
    }
    if (res === false) {
      return;
    }
    setModelVisible(false);
  };

  const ref: any = useRef<ActionType>();
  const reloadHandler = () => {
    ref.current.reload();
  };

  return (
    <div className="list-table">
      <Button type="primary" onClick={addHandler}>
        Add
      </Button>
      <Button onClick={reloadHandler}>Reload</Button>
      <ProTable
        columns={columns}
        rowKey="id"
        loading={userListLoading}
        request={requestHandler}
        search={false}
        actionRef={ref}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
      ></UserModal>
    </div>
  );
};

const mapStateToProps = ({
  users,
  loading,
}: {
  users: UserState;
  loading: Loading;
}) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};

export default connect(mapStateToProps)(UserListPage);
