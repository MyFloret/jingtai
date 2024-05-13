// const baseUrl="http://192.168.1.148:8090/"
const baseUrls = "https://www.spdl.com/"
// const baseUrl="https://124.70.38.212/"
// const baseUrl = "https://api.spdl.com/"
const baseUrl = "https://jxsapi.zzmhkj.net/"
import moment from "moment"
const Http = {
    get: function (url, data, isLoading) {
        data.time = moment().valueOf()
        let header = {
            'content-type': 'application/json',
            'apitoken': uni.getStorageSync('mebtoken')
        }
        let href = -1
        if (window.location.href.indexOf('login') != -1 || window.location.href.indexOf('bind') != -1) {
            href = 0
        }
        let indeof = url.indexOf('GetCustClassifyList')
        return new Promise((resolve, reject) => {

            uni.request({
                url: baseUrl + url,
                header: header,
                method: 'GET',
                data: data,
                success: function (res) {
                    let status = res.data.Tag;
                    if (href != -1 && url != -1) {

                    } else {
                        if (status == -2) {
                            uni.showModal({
                                title: '提示',
                                content: res.data.Message,
                                success: function (res) {
                                    if (res.confirm) {
                                        uni.clearStorageSync()
                                        uni.navigateTo({
                                            url: "/pages/login/login"
                                        })
                                    }
                                }
                            })
                        } else if (status == 1) {
                            resolve(res.data)
                        } else {
                            uni.showModal({
                                title: '提示',
                                content: res.data.Message,
                                success: function (res) {
                                }
                            })
                        }
                    }
                },
                fail: function (err) {
                    if (isLoading) {
                        uni.hideLoading();
                    }
                    reject(err);
                }
            });
        }).catch(function (err) {

        });
    },
    post: function (url, data, isLoading, isUpdata, isUserInfo) {
        let header = {
            'content-type': 'application/json',
            'apitoken': uni.getStorageSync('mebtoken')
        }
		console.log(data)
		
        // data.time = moment().valueOf()
		// console.log(data.time)
        return new Promise((resolve, reject) => {
            uni.request({
                url: baseUrl + url,
                header: header,
                method: 'POST',
                data: data,
                success: function (res) {
                    let status = res.data.Tag;
                    if (status == -2) {
                        uni.showModal({
                            title: '提示',
                            content: res.data.Message,
                            success: function (res) {
                                if (res.confirm) {
                                    uni.clearStorageSync()
                                    uni.navigateTo({
                                        url: "/pages/login/login"
                                    })
                                }
                            }
                        })
                    } else if (status == 1) {
                        resolve(res.data)
                    } else {
                        uni.showModal({
                            title: '提示',
                            content: res.data.Message,
                            success: function (res) {

                            }
                        })
                    }

                    // if(res)
                    // if (code === 200) {
                    //   resolve(res.data);
                    // } else if(code === 0){
                    //   resolve(res.data);
                    // }else if (code === 201) {

                    // } else {
                    //   resolve(res.data);
                    //   reject(res.data.error);
                    // }
                },
                fail: function (err) {
                    if (isLoading) {
                        uni.hideLoading();
                    }
                    reject(err);
                }
            });
        }).catch(function (err) {
            // uni.showToast({
            //   title: String(err),
            //   icon: 'none',
            //   duration: 2000
            // });
        });
    },
    gets: function (url, data, isLoading) {
        data.time = moment().valueOf()
        return new Promise((resolve, reject) => {
            uni.request({
                url: baseUrl + url,
                header: {
                    'content-type': 'application/json'
                },
                method: 'GET',
                data: data,
                success: function (res) {
                    let status = res.data.Tag;
                    if (status == -2) {
                        uni.showModal({
                            title: '提示',
                            content: res.data.Message,
                            success: function (res) {
                                if (res.confirm) {
                                    uni.clearStorageSync()
                                    uni.navigateTo({
                                        url: "/pages/login/login"
                                    })
                                }
                            }
                        })
                    } else if (status == 1) {
                        resolve(res.data)
                    } else {
                        uni.showModal({
                            title: '提示',
                            content: res.data.Message,
                            success: function (res) {

                            }
                        })
                    }
                },
                fail: function (err) {
                    if (isLoading) {
                        uni.hideLoading();
                    }
                    reject(err);
                }
            });
        }).catch(function (err) {
            // uni.showToast({
            //   title: String(err),
            //   icon: 'none',
            //   duration: 2000
            // });
        });
    },
}
const href = function getHref(url) {
    var allHref = url.replace("pages", "..")
    var newAry = allHref.split('')
    const index = newAry.lastIndexOf("/")
    const href = allHref.slice(index + 1, allHref.length)
    return { allHref, href }
}
const showMode = (msg) => {
    uni.showModal({
        title: "提示",
        content: msg,
        success() {

        }
    })
}
const showText = (msg, icon) => {
    uni.showToast({
        title: msg,
        icon: icon == 0 ? 'none' : icon,
        duration: 2500
    })
}
module.exports = {
    get: Http.get,
    post: Http.post,
    gets: Http.gets,
    baseUrl,
    href,
    showMode,
    showText,
    baseUrls
} 