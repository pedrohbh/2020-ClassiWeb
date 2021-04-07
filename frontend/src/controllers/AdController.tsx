import api from '../services/api';

export default class AdController {
    static getAll() {
        return api.get('/ads')
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
            });
    }
}