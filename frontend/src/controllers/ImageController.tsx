import api from '../services/api';

export default class ImageController {
  static get(id) {
    return api.get(`/images/${id}`, {
      responseType: 'arraybuffer'
    })
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
        return undefined;
      });
  }

  static delete(id) {
    return api.delete(`/images/${id}`)
      .then(response => {
        return response.data
      }).catch(e => {
        console.error(e);
        return undefined;
      });
  }
}