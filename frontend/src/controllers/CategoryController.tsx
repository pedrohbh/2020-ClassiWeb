import api from '../services/api';

export default class CategoryController {
    static getAll() {
        return api.get('/categories')
            .then(response => {
                return response.data;
            }).catch(e => {
                console.error(e);
            })
    }

    static postCategory(newCategory) {
        return api.post('/categories', newCategory)
            .then(response => {
                return response.data;
            }).catch(e => {
                console.error(e);
            });
    }
}