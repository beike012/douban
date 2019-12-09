export default function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options,
      data: {
        apikey: "0df993c66c0c636e29ecbb5344252a4a"
      },
      dataType: "json",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}
