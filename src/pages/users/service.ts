import { request } from 'umi'

export const getRemoteList = () => {
    return request('http://public-api-v1.aspirantzhang.com/users', {
        method: 'get',
    }).then((res) => {
        return res.data
    })
}