<template>
  <me-nabvar class="header" title="title" v-show="visible">
    <i class="iconfont icon-scan" slot="left"></i>
    <me-search-box
      planceholder="吃遍潮汕,一起出发"
      slot="center"
      fake
      @query="getQuery"
      @click.native="goToSearch"
    />
    <i class="iconfont icon-msg" slot="right"></i>
  </me-nabvar>
</template>

<script>
import MeNabvar from 'base/navbar'
import MeSearchBox from 'base/search-box'
export default {
  name: 'HomeHeader',
  components: {
    MeNabvar,
    MeSearchBox
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    // API
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    },
    getQuery (query) {
      console.log(query)
    },
    goToSearch () {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .header {
    &.mine-navbar {
      /*background-color: $header-bgc-translucent; */
      background-color: transparent;
      transition: background-color 0.5s;
    }
    &.header-transition {
      background-color: $header-bgc-translucent;
    }
    .iconfont{
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
