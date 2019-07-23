
//接口Api

import BaseApi from './BaseApi.js';  //网络请求

import Pagination from '../utils/Pagination.js'; //分页

const roomData = require('../data/roomlist.js');  //假数据

export default class classroomApi extends BaseApi {
  constructor() {
    super();
  }

  page() {
    const url = `${this.hpUrl}/roomlist`;
    return new Pagination(url, null, roomData);
  }
}