/*
 * @Author: Tiger Zhang
 * @LastEditors: Tiger Zhang
 * @Date: 2019-08-11 20:51:57
 * @LastEditTime: 2019-08-11 21:14:30
 * @Description:
 */
module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  configureWebpack:{
    externals:{
      'vue':'Vue',
      'vuex':'Vuex'
    }
  }
};
