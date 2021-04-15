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

  static getUser(token) {
    return api.get('/users', token)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
      })
  }

  static update(user) {
    return api.put('/users', user)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
      });
  }

  static delete(id) {
    return api.delete('/users', id)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
      })
  }
}
