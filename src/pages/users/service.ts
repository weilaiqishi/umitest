import { request } from 'umi'

export const getRemoteList = () => {
    return request('http://public-api-v1.aspirantzhang.com/users', {
        method: 'get',
    }).then((res) => {
        return res.data
    })
}

export const editRecord = (values: {
    id: number,
    [proppName: string]: any;
}) => {
    return request(`http://public-api-v1.aspirantzhang.com/users/${values.id}`, {
        method: 'put',
        data: values
    })
}

export const deleteRecord = (values: {
    id: number,
    [proppName: string]: any;
}) => {
    console.log('deleteRecord')
    return request(`http://public-api-v1.aspirantzhang.com/users/${values.id}`, {
        method: 'delete'
    })
}