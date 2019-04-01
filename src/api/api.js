import http from '@/utils/http'
import qs from 'qs'
import md5 from 'md5'
import moment from 'moment'

function getHash() {
  return md5('Pop_Puzzle' + moment().format('YYYY-MM-DD'))
}

/**
 * 获取自动排版模板列表
 * @returns {*}
 * @date 2018-08-16
 */
export function getTemplates() {
  return http({
    url: 'http://www.pop-fashion.com/puzzle/getPuzzleTemplates/?t=' + Math.random(),
    method: 'POST',
    data: qs.stringify({hash: getHash()})
  })
}
