export class list {
    'id' : number;
    'page': number;
    'results': object;
    'total_results': number;
    'total_pages': number;
  
    constructor(values: object = {}) {
      Object.assign(this, values);
    }
  }