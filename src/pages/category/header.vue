<template>
  <me-nabvar class="header" >
    <!--<i class="iconfont icon-scan" slot="left"></i>-->
    <div slot="center">搜索框</div>
    <!--<i class="iconfont icon-scan" slot="center"></i>-->
    <i class="iconfont icon-msg" slot="right"></i>
  </me-nabvar>
</template>

<script>
import MeNabvar from 'base/navbar'
export default {
  name: 'CategoryHeader',
  components: {
    MeNabvar
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .header {
    &.mine-navbar {
      background-color: $header-bgc-translucent;
      /*  background-color: transparent;  */
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
