import api from '../services/api';

export default class LoginController {
  static login(email, password) {
    return api.post('/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        return response.data.token;
      }).catch(e => {
        console.error(e);
        return undefined;
      });
  }

  static logout() {
    localStorage.removeItem('token');
  }
}