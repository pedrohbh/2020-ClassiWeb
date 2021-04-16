import api from '../services/api';

export default class PurchaseController {
  static get() {
    return api.get('/purchases')
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
      });
  }

  static postFeedback(adId) {
    return api.post(`/purchases/feedback/${adId}`)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
      });
  }

  static postPurchase(adId) {
    return api.post(`/purchases/${adId}`)
      .then(response => {
        return response.data;
      }).catch(e => {
        console.error(e);
      });
  }
}