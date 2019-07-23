//分享学校接口

import BaseApi from './BaseApi.js';
import Pagination from '../utils/Pagination.js';

const shareData = require('../data/sharelist.js');
export default class shareApi extends BaseApi {
  constructor() {
    super();
  }

  page() {
    const url = `${this.hpUrl}/sharelist`;
    return new Pagination(url, null, shareData);
  }
}