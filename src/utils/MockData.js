
import Mock from 'mockjs';

const MockData = {
  initMockData() {
    const url = 'http://getData.com';
    const obj = {
      'success|0-1': false,
      'message|1': null,
      'test|1': 'mock',
      'data|4': {
        'pageSize|8-10': 10,
        'totalPage|2-3': 2,
        'totalCount|11-13': 13,
        'data|1-10': [
          {
            'id|+1': 1,
            'actName|+1': [
              'Hello',
              'Mock.js',
              '!',
            ],
            'merchantType|1': '个人金牌',
            'actType|1': '专场活动',
            'registerFee|+1': 10,
            'registerTime|1': '2016-06-10 17:38:02 - 2016-06-13 17:38:02',
            'status|1': '未开始',
          },
        ],
      },
    };
    Mock.mock(url, obj);
    // 输出结果
    // console.log(JSON.stringify(data, null, 4));
  },

  getData() {
    const url = 'http://getData.com';
    const obj = {
      'code|1': '1000',
      'success|0-1': false,
      'message|1': null,
      'test|1': 'mock',
      'data|4': {
        'pageSize|8-10': 10,
        'totalPage|2-3': 2,
        'totalCount|11-13': 13,
        'data|1-10': [
          {
            'id|+1': 1,
            'actName|+1': [
              'Hello',
              'Mock.js',
              '!',
            ],
            'merchantType|1': '个人金牌',
            'scope|1': '专场活动',
            'price|+1': 10,
            'registerTime|1': '2016-06-10 17:38:02 - 2016-06-13 17:38:02',
            'status|1': '未开始',
            'image|1': 'http://ww1.sinaimg.cn/bmiddle/4db822d2jw1fab2k271d0j20iz0sgaga.jpg',
            source: '富文本测试',
            'age|+1': 10,
            address: '天安门',
            index: 'wd',
          },
        ],
      },
    };
    Mock.mock(url, obj);
    // 输出结果
    // console.log(JSON.stringify(data, null, 4));
  },
};

export default MockData;
