import Mock from 'mockjs'
import templates from './templates'

Mock.setup({
  timeout: '350-600'
});

// 获取模板列表
Mock.mock(/http:\/\/www\.pop-fashion\.com\/puzzle\/getPuzzleTemplates\/\?t=(.)*/, 'post', templates.getTemplates());

export default Mock
