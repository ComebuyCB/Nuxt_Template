/**
 * @desc api回傳的url，若非http開頭(非外部連結)，則返回代理url (/api/proxy)
 * @param {string} url api回傳的任意url
 * @returns {string} proxy url
 */
export function _apiUrl(url) {
  if (url.startsWith('http')) {
    return url;
  } else {
    return `/api/proxy${url}`;
  }
}