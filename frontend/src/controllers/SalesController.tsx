import api from '../services/api';

export default class SalesController {
  static get() {
    return api.get('/purchases/sales')
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
      });
  }
}