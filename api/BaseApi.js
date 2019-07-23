import Http from '../utils/Http.js';
import Config from '../config.js';
const app = getApp();

export default class BaseApi {
  constructor() {
    this.hpUrl = Config.hpUrl;
    this.app = app;

    //网络请求
    this.get = Http.get.bind(Http);
    this.post = Http.post.bind(Http);
    this.patch = Http.patch.bind(Http);
    this.delete = Http.delete.bind(Http);
    this.put = Http.put.bind(Http);
  }
}