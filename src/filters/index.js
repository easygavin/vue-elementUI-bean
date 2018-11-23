import {format} from '@/util/formatDate';

/**
 * 日期格式化
 * @param timestamp
 * @param pattern 
 */
export function dateFmt(timestamp, pattern = 'yyyy-MM-dd hh:mm:ss') {
  if (!timestamp) {
    return '';
  }
  return format(new Date(timestamp), pattern);
}