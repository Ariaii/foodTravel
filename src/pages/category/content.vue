<template>
  <div class="content-wrapper">
    <div class="loading-container" v-if="isLoading">
      <div class="loading-wrapper">
        <me-loading/>
      </div>
    </div>
    <me-scroll ref="scroll">
      <div class="content">
        <div class="pic" v-if="content.banner">
          <a :href="content.banner.linkUrl" class="pic-link">
            <img @load="updateScroll" :src="content.banner.picUrl" alt="" class="pic-img">
          </a>
        </div>
        <div class="section"
             v-for="(section, index) in content.data"
             :key="index"
        >
          <h4 class="section-title">{{section.name}}</h4>
          <ul class="section-list">
            <li
              class="section-item"
              v-for="(item, i) in section.itemList"
              :key="i"
            >
              <a :href="item.linkUrl" class="section-link">
                <p class="section-pic" v-if="item.picUrl">
                  <img v-lazy="item.picUrl" alt="" class="section-img"/>
                </p>
                <p class="section-name">{{item.name}}</p>
              </a>
            </li>
          </ul>
        </div>
          <div></div>
        <div class="g-backtop-container">
          <me-backtop @backtop="backToTop" :visible="isBacktopVisible"/>
        </div>
      </div>
    </me-scroll>
  </div>
</template>

<script>
import MeLoading from 'base/loading'
import MeScroll from 'base/scroll'
import MeBacktop from 'base/backtop'
import {getCategoryContent} from 'api/category'
import storage from 'assets/js/storage'
import {CATEGORY_CONTENT_KEY, CATEGORY_CONTENT_UPDATE_TIME_INTERVAL} from './config'
export default {
  name: 'CategoryContent',
  components: {
    MeLoading,
    MeScroll,
    MeBacktop
  },
  props: {
    curId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      content: {},
      isBacktopVisible: false,
      isLoading: false
    }
  },
  watch: {
    curId (id) {
      this.isLoading = true
      this.getContent(id).then(() => {
        this.isLoading = false
        this.backToTop(0)
      })
    }
  },
  methods: {
    getContent (id) {
      let contents = storage.get(CATEGORY_CONTENT_KEY)
      let updateTime
      const curTime = new Date().getTime()

      if (contents && contents[id]) {
        updateTime = contents[id].updateTime || 0
        if (curTime - updateTime <= CATEGORY_CONTENT_UPDATE_TIME_INTERVAL) {
          // localstorage
          return this.getContentByLocalStorage(contents[id])
        } else { // HTTP
          return this.getContentByHTTP(id).then(() => {
            this.updateLocalStorage(contents, id, curTime)
          })
        }
      } else { // HTTP
        return this.getContentByHTTP(id).then(() => {
          this.updateLocalStorage(contents, id, curTime)
        })
      }
      // return getCategoryContent(id).then(data => {
      //   if (data) {
      //     this.content = data
      //   }
      // })
    },
    getContentByLocalStorage (content) {
      this.content = content.data
      return Promise.resolve()
    },
    getContentByHTTP (id) {
      return getCategoryContent(id).then(data => {
        return new Promise(resolve => {
          if (data) {
            this.content = data
            resolve()
          }
        })
      })
    },
    updateLocalStorage (contents, id, curTime) {
      contents = contents || {}
      contents[id] = {}
      contents[id].data = this.content
      contents[id].updateTime = curTime
      storage.set(CATEGORY_CONTENT_KEY, contents)
    },
    backToTop (speed) {
      this.$refs.scroll && this.$refs.scroll.scrollToTop(speed)
    },
    updateScroll () {
      this.$refs.scroll && this.$refs.scroll.update()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .content-wrapper{
    position: relative;
    height: 100%;
  }

  .loading-container{
    position:absolute;
    top:0;
    left: 0;
    z-index:$category-popup-z-index;
    @include flex-center();
    width: 100%;
    height: 100%;
  }

  .mine-loading{
    color: #fff;
    font-size:14px;
  }
  .loading-wrapper{
    width: 50%;
    padding:30px 0;
    background-color: $modal-bgc;
    border-radius: 4px;
  }
  .content {
    padding:10px;
  }
  .pic-link{
    display: block;
    width: 100%;
    overflow: hidden;
    height: 100%;
  }
  /*.pic-link,.pic-img{*/
    /*overflow: hidden;*/
    /*!*width: 100%;*!*/
    /*height: 100%;*/
  /*}*/
  .pic-img {
    border-radius: 5px;
    height: 120px;
    overflow: hidden;
    width: 100%;
  }
  .section{
  }
  .section-title{
    color: #686868;
    font-size: 12px;
    font-weight: bold;
    font-align: cneter;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .section-list{
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-between;*/
    background-color: #fff;
    margin-right: 10px;
  }
  .section-item{
    width: 33%;
    margin-bottom: 15px;
  }
  .section-link{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .section-pic{
  }
  .section-img{
    margin-bottom: 8px;
  }
</style>
