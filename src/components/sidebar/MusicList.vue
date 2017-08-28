<template>
    <div id="sideBar">
      <div class="item">
        <span>推荐</span>
        <div id="findMusic" ><label for="findMusic" class="glyphicon glyphicon-music"/>发现音乐</div>
        <div id="mv"><label for="mv" class="glyphicon glyphicon-music"/>MV</div>
      </div>
      <div class="item">
        <span>我的音乐</span>
        <router-link to="/">
          <div id="localMusic"><label for="localMusic" class="glyphicon glyphicon-music"/>本地音乐</div>
        </router-link>
        <div id="downloadManagement"><label for="downloadManagement" class="glyphicon glyphicon-music"/>下载管理</div>
      </div>
      <div class="item">
        <span>创建的歌单</span>
        <router-link to="/mysonglist">
          <div id="likeMusic" @click="goToList"><label for="likeMusic" class="glyphicon glyphicon-music" />我喜欢的音乐</div>
          <div id="allMusic" @click="goToList"><label for="allMusic" class="glyphicon glyphicon-music" />所有音乐</div>
        </router-link>
      </div>
      <div class="item">
        <span>收藏的歌单</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      goToList (e) {
        this.$store.dispatch('set_CurrentPlayList', e.target.id)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #sideBar{
      width: 200px;
      height: 90%;
      border: 1px solid #B22222;
    }

  .item{
    padding: 10px;
  }

  a{
    text-decoration: none;
  }

  .item  div{
    padding: 0px 10px;
  }
</style>
