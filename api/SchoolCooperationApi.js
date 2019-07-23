import BaseApi from './BaseApi.js';
import Pagination from '../utils/Pagination.js';
const schoolCooperationData = require('../data/schoolCooperationList.js');
export default class SchoolCooperationApi extends BaseApi {
  constructor() {
    super();
  }

  page() {
    const url = `${this.hpUrl}/schoolCooperationList`;
    return new Pagination(url, null, schoolCooperationData);
  }
}