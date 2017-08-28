/* eslint-disable spaced-comment */
import Vue from 'vue'
import Router from 'vue-router'
//import topbar from '@/components/top_title/TopBar'
//import player from '@/components/bottom_player/player'
//import sidebar from '@/components/sidebar/SideNavBar'
import localmusic from '@/components/main_area/localMusicPanel'
//import player from '@/components/bottom_player/player.vue'
import mysonglist from '@/components/main_area/MySongListPanel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'local',
      component: localmusic
    },
    {
      path: '/mysonglist',
      name: 'mysonglist',
      component: mysonglist
    }
  ]
})
