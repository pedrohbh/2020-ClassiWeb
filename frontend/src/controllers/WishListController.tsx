import api from '../services/api';

export default class WishListController {
  static get() {
    return api.get('/wish-list')
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
      });
  }

  static post(id) {
    return api.post(`/wish-list/${id}`)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
      });
  }

  static delete(id) {
    return api.delete(`/wish-list/${id}`)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
      });
  }
}