//需求学校接口

import BaseApi from './BaseApi.js';
import Pagination from '../utils/Pagination.js';

const needData = require('../data/demand.js');
export default class demandApi extends BaseApi {
  constructor() {
    super();
  }

  page() {
    const url = `${this.hpUrl}/demand`;
    return new Pagination(url, null, needData);
  }
}