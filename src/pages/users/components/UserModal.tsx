import React, { useEffect, FC } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { SingleUserType, FormValues } from '../data';

interface UserModalProps {
  visible: boolean;
  record: SingleUserType | any;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
}
const UserModal: FC<UserModalProps> = props => {
  const [form] = Form.useForm();
  const { visible, record, closeHandler, onFinish } = props;
  useEffect(() => {
    if (record.id) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [visible]);
  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo.errFields[0].errors[0]);
  };
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender
      >
        <Form
          name="base"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Create Time" name="create_time">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
