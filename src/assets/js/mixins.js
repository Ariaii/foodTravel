import storage from 'assets/js/storage'
import {SEARCH_HISTORY_KEYWORD_KEY} from 'pages/search/config'
export const searchMixin = {
  methods: {
    $_selectItem (keyword) {
      let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, [])
      if (keywords.length !== 0) {
        keywords = keywords.filter(val => val !== keyword)
      }
      keywords.unshift(keyword)
      storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords)
      //location.href = 'https://s.m.taobao.com/h5?event_submit'
    }
  }
}
