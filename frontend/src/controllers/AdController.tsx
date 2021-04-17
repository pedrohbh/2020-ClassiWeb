import api from '../services/api';

export enum ProductState {
  NEW,
  SECONDHAND,
}

export enum AdvertisingState {
  VISIBLE,
  HIDDEN,
}

export default class AdController {
  static getAll() {
    return api.get('/ads/list')
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
        return undefined;
      })
  }

  static get(id) {
    return api.get(`/ads/${id}`)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
        return undefined;
      })
  }

  static postAd(newAd) {
    return api.post('/ads', newAd)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
        return undefined;
      });
  }

  static update(id, editAd) {
    return api.put(`/ads/${id}`, editAd)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
        return undefined;
      });
  }

  static delete(id) {
    return api.delete(`/ads/${id}`)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
      });
  }

  static search(filters) {
    return api.post('/ads/search', filters)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
        return undefined;
      })
  }

  static images(adId, file) {
    const data = new FormData();
    data.append('image', file);
    return api.post(`/images/${adId}`, data)
      .then(response => {
        console.log(response.data);
        return response.data;
      }).catch(e => {
        console.error(e);
        return undefined;
      })
  }
}