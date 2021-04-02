import api from '../services/api';

export default class UserController {
    static getAll() {
        return api.get('/users')
            .then(response => {
                return response.data;
            }).catch(e => {
                console.error(e);
            })
    }

    static postUser(newUser) {
        return api.post('/users', newUser)
            .then(response => {
                return response.data;
            }).catch(e => {
                console.error(e);
            });
    }
}