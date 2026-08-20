import http from './http.js'

export const getBanner = () => {
	return http('/user/getBanner', {}, 'GET')
}

export const getHomeList = () => {
	return http('/user/getHomeList', {}, 'GET')
}

export const login = () => {
	return http('/login', {}, 'POST')
}

export const getUserInfo = () => {
	return http('/getUserInfo', {}, 'GET')
}

export const getProject = () => {
	return http('/detail/project', {}, 'GET')
}

export const getInfo = (data) => {
	return http('/project/info', data, 'GET')
}

export const getLike = () => {
	return http('/like/list', {}, 'GET')
}