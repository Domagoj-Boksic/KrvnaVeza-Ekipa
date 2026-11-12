import request from './api'

export const authService = {
    me: () => request('/api/me'),
    logout: () => request('/auth/logout', {method: 'POST'})
}