<template>
  <div id="app">
    <top-bar></top-bar>
    <side-navbar></side-navbar>
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
  import player from './components/bottom_player/player.vue'
  import localMusicPanel from './components/main_area/localMusicPanel.vue'
  import sideNavbar from './components/sidebar/SideNavbar.vue'
  import topBar from './components/top_title/TopBar.vue'
  import mySongListPanel from './components/main_area/MySongListPanel.vue'
  import axios from 'axios'

export default {
    name: 'app',
    components: {
      player,
      localMusicPanel,
      sideNavbar,
      topBar,
      mySongListPanel
    },
    created () {
      let allSongs = 'static/musicdata.json'
      axios.get(allSongs).then((res) => {
        this.$store.dispatch('set_AllSongLists', res.data.all)
        this.$store.dispatch('set_MyFavorite', res.data.myFavorite)
        this.$store.dispatch('set_CurrentPlayList', res.data.myFavorite)
      }, (err) => { alert(err) })
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-height: 100%;
}
</style>
