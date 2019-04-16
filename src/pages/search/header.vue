<template>
  <me-navbar class="header">
    <i
      class="iconfont icon-back"
      slot="left"
      @click="goBack"
    ></i>
    <me-search-box
      planceholder="吃遍潮汕,一起出发"
      slot="center"
      @query="query"
    />
  </me-navbar>
</template>

<script>
import MeNavbar from 'base/navbar'
import MeSearchBox from 'base/search-box'
export default {
  name: 'SearchHeader',
  components: {
    MeNavbar,
    MeSearchBox
  },
  methods: {
    query (query) {
      this.$emit('query', query)
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
