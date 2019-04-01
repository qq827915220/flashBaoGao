module.exports = {
    // lintOnSave: process.env.NODE_ENV !== 'production',
    lintOnSave: false,
    productionSourceMap: false,
    // webpack 配置
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    }
};