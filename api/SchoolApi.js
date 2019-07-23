import BaseApi from './BaseApi.js';
import Pagination from '../utils/Pagination.js';
const schoolData = require('../data/schoolList.js');
export default class schoolApi extends BaseApi {
  constructor() {
    super();
  }

  page() {
    const url = `${this.hpUrl}/schoolList`;
    return new Pagination(url, null, schoolData);
  }
}