<template>
  <div class="mine-search-box-wrapper">
    <i class="iconfont icon-search"></i>
    <div class="mine-search-box" v-if="fake"
    >{{placeholder}}</div>
    <input
      class="mine-search-box"
      type="text"
      title="搜索框"
      :placeholder="placeholder"
      ref="input"
      v-model="query"
      v-if="!fake"
    >
    <i
      class="iconfont icon-close"
      v-show="query"
      @click="reset"
    ></i>
  </div>
</template>

<script>
import {debounce} from 'assets/js/util'

export default {
  name: 'MeSearchBox',
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    },
    fake: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      query: ''
    }
  },
  watch: {
    query: debounce(function () {
      this.$emit('query', this.query)
    })
  },
  methods: {
    focus () {
      this.$refs.input && this.$refs.input.focus()
    },
    clear () {
      this.query = ''
    },
    reset () {
      this.clear()
      this.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  $search-box-height: 30px;
</style>
