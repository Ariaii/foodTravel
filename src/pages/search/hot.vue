<template>
  <div class="hot">
    <h4 class="hot-title">热门搜索</h4>
    <div class="loading-container" v-if="!hots.length">
      <me-loading/>
    </div>
    <ul class="hot-list" v-else>
      <li
        class="hot-item"
        v-for="(item, index) in hots"
        :key="index"
        @click="$_selectItem(item.hotWord)"
      >{{item.hotWord}}</li>
    </ul>
  </div>
</template>

<script>
import MeLoading from '../../base/loading/index'
import {getSearchHotKeyword} from 'api/search'
// import storage from 'assets/js/storage'
// import {SEARCH_HISTORY_KEYWORD_KEY} from './config'
import {searchMixin} from 'assets/js/mixins'

export default {
  name: 'SearchHot',
  components: {
    MeLoading
  },
  mixins: [searchMixin],
  data () {
    return {
      hots: []
    }
  },
  created () {
    this.getHotKeyword().then(() => {
      this.$emit('loaded')
    })
  },
  methods: {
    getHotKeyword () {
      return getSearchHotKeyword().then(data => {
        return new Promise(resolve => {
          if (data) {
            this.hots = data
            resolve()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .hot {
    padding-left: 10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
  }
</style>
