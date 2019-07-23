import BaseApi from './BaseApi.js';
import Pagination from '../utils/Pagination.js';
const jobData = require('../data/jobList.js');
export default class JobApi extends BaseApi {
  constructor() {
    super();
  }

  page() {
    const url = `${this.hpUrl}/jobList`;
    return new Pagination(url,null,jobData);
  }
}