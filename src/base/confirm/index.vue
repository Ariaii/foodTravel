<template>
  <transition name="mine-confirm">
    <div class="mine-confirm-wrapper" v-show="visible">
      <div class="mine-confirm">
        <div class="mine-confirm-title">{{title}}</div>
        <div class="mine-confirm-msg">{{msg}}</div>
        <div class="mine-confirm-btns">
          <button
            class="mine-confirm-btn mine-confirm-cancel"
            @click="cancel"
          >{{cancelBtnText}}</button>
          <button
            class="mine-confirm-btn mine-confirm-ok"
            @click="confirm"
          >{{confirmBtnText}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MeConfirm',
  props: {
    title: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: '确定执行此操作吗?'
    },
    cancleBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .mine-confirm-wrapper {
    position: absolute;
    top: 0;
  }
</style>
