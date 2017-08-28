<template>
  <div id="sideBar">
    <music-list></music-list>
    <music-info></music-info>
  </div>
</template>

<script>
  import musicList from './MusicList.vue'
  import musicInfo from './MusicInfo.vue'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      musicList,
      musicInfo
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #sideBar{
    width: 15%;
    height: 560px;
    display: inline-block;
    border: 1px solid #B22222;
    background-color: whitesmoke;
  }
</style>
