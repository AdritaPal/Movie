export class list {
    'page': number;
    'total_results': number;
    'total_pages': number;
    'email': string;
    'results': object;
  
    constructor(values: object = {}) {
      Object.assign(this, values);
    }
  }