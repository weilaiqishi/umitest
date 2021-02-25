import request, { extend } from 'umi-request';
import { message } from 'antd';
import { SingleUserType, FormValues } from './data';

const errorHandler = (err: any) => {
  if (err.response) {
    if (err.response.status >= 100) {
      message.error(err.data.message ? err.data.message : err.data);
    }
  } else {
    message.error('Network Error.');
  }
  throw err;
};

const extendRequest = extend({ errorHandler });

export const getRemoteList = ({
  page,
  per_page,
}: {
  page: Number;
  per_page: Number;
}) => {
  return extendRequest(
    `http://public-api-v1.aspirantzhang.com/users?page=${page}&per_page=${per_page}`,
    {
      method: 'get',
    },
  )
    .then(res => {
      return res;
    })
    .catch(err => {
      message.error('getRemoteList Failed.');
      return false;
    });
};

export const editRecord = (values: FormValues) => {
  return extendRequest(
    `http://public-api-v1.aspirantzhang.com/users/${values.id}`,
    {
      method: 'put',
      data: values,
    },
  )
    .then(res => {
      message.success('Edit successfully.');
      return true;
    })
    .catch(err => {
      message.error('Edit Failed.');
      return false;
    });
};

export const addRecord = (values: FormValues) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users`, {
    method: 'post',
    data: values,
  })
    .then(res => {
      console.log(res);
      message.success('Add successfully.');
      return true;
    })
    .catch(err => {
      message.error('Add Failed.');
      return false;
    });
};

export const deleteRecord = (values: {
  id: number;
  [proppName: string]: any;
}) => {
  return extendRequest(
    `http://public-api-v1.aspirantzhang.com/users/${values.id}`,
    {
      method: 'delete',
    },
  )
    .then(res => {
      message.success('Delete successfully.');
      return true;
    })
    .catch(err => {
      message.error('Delete Failed.');
      return false;
    });
};
