<template>
  <me-scroll :scrollbar="false">
    <ul class="tab">
      <li
        class="tab-item"
        :class="{'tab-item-active': item .id ===curId}"
        v-for="(item, index) in items"
        :key="index"
        @click="switchTab(item.id)"
      >{{item.name}}</li>
    </ul>
  </me-scroll>
</template>

<script>
import MeScroll from 'base/scroll'
import {categoryNames} from './config'

export default {
  name: 'CategoryTab',
  components: {
    MeScroll
  },
  data () {
    return {
      curId: ''
    }
  },
  created () {
    this.init()
    this.switchTab(this.items[0].id)
  },
  methods: {
    init () {
      this.items = categoryNames
    },
    switchTab (id) {
      if (this.curId === id) {
        return
      }
      this.curId = id
      this.$emit('switch-tab', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
  $tab-item-height: 46px;
  .tab {
    width: 100%;

    &-item {
      height: $tab-item-height;
      background-color: #fff;
      borer-right: 1px solid $border-color;
      borer-bottom: 1px solid $border-color;
      color: #686868;
      font-size: $font-size-l;
      font-weight: bold;
      font-align: cneter;
      line-height: $tab-item-height;
      padding-left: 10px;
      padding-right: 10px;
      @include ellipsis();
      &:last-child {
        border-bottom: none;
      }
    }

    &-item-active {
      background: none;
      border-right: none;
      color: #f23030;
    }
  }
</style>
