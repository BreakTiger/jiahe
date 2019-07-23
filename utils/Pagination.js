import Http from './Http.js';

export default class Pagination {
  constructor(url, processFunc,data) {
    this.url = url;
    this.list = [];
    this.start = 0;
    this.count = 10;
    this.processFunc = processFunc;
    this.loading = false;
    this.params = [];
    this.reachBottom = false;
    this.data = data;
  }

  /**
     * 加载下一页数据
     */
  next(args) {
    const param = {
      from: this.start,
      limit: this.count
    };
    //附加参数
    this.loading = true;
    Object.assign(param, args);
    if(this.data){
      this.list = this.list.concat(this.data);
      this.loading = false;
      let that = this;
      return new Promise(function(resolve,reject){
        resolve(that._export());
      });
    }
    return Http.get(this.url, param).then(data => {
      //底部判断
      if (data == null || data.length < 1) {
        this.reachBottom = true;
        return this._export();
      }

      //处理数据
      this._processData(data);

      //设置数据
      this.list = this.list.concat(data);
      this.start += this.count;
      //加载完毕
      this.loading = false;
      if (data.length < this.count) {
        this.reachBottom = true;
      }
      //导出列表数据
      return this._export();
    });
  }


  /**
   * 恢复到第一页
   */
  reset() {
    this.start = 0;
    this.list = [];
  }

  /**
   * 处理数据（私有）
   */
  _processData(data) {
    if (this.processFunc) {
      for (let i in data) {
        const result = this.processFunc(data[i]);
        if (result) {
          data[i] = result;
        }
      }
    }
  }

  /**
   * 导出数据（私有）
   */
  _export() {
    return {
      list: this.list,
      start: this.start,
      count: this.count
    }
  }
}