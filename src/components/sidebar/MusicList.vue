<template>
    <div id="sideBar">
      <div class="item">
        <span>推荐</span>
        <div id="findMusic" ><label for="findMusic" class="glyphicon glyphicon-music"/>发现音乐</div>
        <div id="mv">MV</div>
      </div>
      <div class="item">
        <span>我的音乐</span>
        <router-link to="/">
          <div id="localMusic">本地音乐</div>
        </router-link>
        <div id="downloadManagement">下载管理</div>
      </div>
      <div class="item">
        <img id="arrow" class="toggle" src="../../../static/img/arrow.png"></img>
        <span @click="toggleMusicSheet">创建的歌单</span>
        <span class="addPanel" @mouseover="toggleShow" @mouseout="toggleShow">
          <img class="addPanel" :src="showAddBtn ? iconSrc : ''" @click="addSongList"/>
        </span>
        <router-link to="/mysonglist" v-show="getShowMusicSheet">
          <div id="likeMusic" @click="goToList('likeMusic')">我喜欢的音乐</div>
          <div id="allMusic" @click="goToList('allMusic')">所有音乐</div>
          <div v-for="item in this.$store.getters.getAllSongListsName" @click="goToList(item)">{{item}}</div>
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
        showMusicSheet: false,
        showAddBtn: false,
        iconSrc: '../../../static/img/plus_alt.png'
      }
    },
    methods: {
      goToList (name) {
        this.$store.dispatch('set_CurrentShowList', name)
      },
      toggleMusicSheet () {
        this.$store.dispatch('toggle_MusicSheet')
        document.getElementById('arrow').style.transform = this.$store.getters.getShowMusicSheet ? 'rotate(90deg) translate3d(-50%, 0, 0)' : 'rotate(0deg) translate3d(0, -50%, 0)'
      },
      addSongList () {
        if (this.$store.getters.getSongListCounts >= 5) {
          alert('创建的歌单最多5个')
          return
        }
        let listName = prompt('请输入歌单名称: ')
        if (listName === '') {
          alert('名称不能为空')
        } else if (this.$store.getters.getAllSongsList[listName]) {
          alert('该歌单名称已存在')
        } else {
          this.$store.dispatch('add_SongList', listName)
          alert('创建成功')
        }
      },
      toggleShow () {
        this.showAddBtn = !this.showAddBtn
      }
    },
    computed: {
      getShowMusicSheet () {
        return this.$store.getters.getShowMusicSheet
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

  span{
    border: 1px solid #B22222;
  }

  .addPanel{
    width: 16px;
    height: 16px;
    margin: auto 5px;
    padding: 0;
    border: 1px solid #B22222;

  }

  .toggle{
    height: 16px;
    width: 16px;
    transition:all 0.5s;
    transform:translate3d(0,-50%,0);
    margin-top: 10px;
  }

  .item{
    padding: 10px;
    border: 1px solid #B22222;
  }

  a{
    text-decoration: none;
  }

  .item  div{
    padding: 0px 20px;
  }
</style>
