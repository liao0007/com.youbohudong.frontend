const hostname = window && window.location && window.location.hostname;

let _constant;
if (hostname !== 'www.youbohudong.com') {
  _constant = {
    BizDomain: 'https://www.youbohudong.com/biz/',
    ApiDomain: 'https://www.youbohudong.com/api/',
    StaticDomain: 'https://static.youbohudong.com/',
  };
} else {
  _constant = {
    BizDomain: 'http://localhost:3000/biz/',
    ApiDomain: 'http://localhost:9000/api/',
    StaticDomain: 'https://static.youbohudong.com/',
  };
}

export const Constant = {
  ..._constant,
  ActionStatus: {
    Success: 'Success',
    Error: 'Error',
  },
};

export const Util = {
  jump: (url) => {
    return Constant.BizDomain + 'util/jump/' + encodeURIComponent(url);
  },
};
