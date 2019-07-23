import BaseApi from './BaseApi.js';
import Pagination from '../utils/Pagination.js';
const teacherData = require('../data/teacherList.js');
export default class TeacherApi extends BaseApi {
  constructor() {
    super();
  }

  page() {
    const url = `${this.hpUrl}/teacherList`;
    return new Pagination(url, null, teacherData);
  }
}

