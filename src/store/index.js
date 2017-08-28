import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    localMusicList: [],
    allSongLists: [],
    currentMusicIndex: 0,
    myFavorite: [],
    currentPlayList: [],
    audioObj: '',
    playBtnObj: '',
    isPlaying: false,
    musicDuration: '',
    currentTime: ''
  },
  mutations: {
    addLocalMusic (state, musicArr) {
      if (musicArr === null || musicArr.length === 0) return
      state.localMusicList.push(...musicArr)
    },
    setCurrentPlayList (state, listName) {
      if (listName === null || listName === '') {
        return
      } else {
        switch (listName) {
          case 'likeMusic':
            state.currentPlayList = state.myFavorite
            break
          case 'allMusic':
            state.currentPlayList = state.allSongLists
            break
          default:
            state.currentPlayList = state.allSongLists
        }
      }
    },
    setAllSongLists (state, obj) {
      if (obj === null) return
      state.allSongLists = obj
    },
    setMyFavorite (state, obj) {
      if (obj === null) return
      state.myFavorite = obj
    },
    setPlayBtnObj (state, obj) {
      if (obj === null) return
      state.playBtnObj = obj
    },
    setPlayBtn (state) {
      state.playBtnObj.src = '../../static/img/play.png'
    },
    setStopBtn (state) {
      state.playBtnObj.src = '../../static/img/stop.png'
    },
    setAudioEle (state, obj) {
      if (obj === null) return
      state.audioObj = obj
    }, // 传过来的几个参数都成为了obj的属性
    choosePlay (state, obj) {
      if (state.audioObj.src) {
        if (state.audioObj.src === state.currentPlayList[obj.index].url) return
      }
      state.audioObj.setAttribute('src', state.currentPlayList[obj.index].url)
      state.playBtnObj.src = '../../static/img/stop.png'
      state.isPlaying = true
      state.audioObj.load()
      state.audioObj.play()
    },
    playNext (state) {
      state.currentMusicIndex++
      const length = state.currentPlayList.length
      if (state.currentMusicIndex >= length) {
        state.currentMusicIndex = 0
      }
      state.audioObj.setAttribute('src', state.currentPlayList[state.currentMusicIndex].url)
      state.isPlaying = true
      state.playBtnObj.src = '../../static/img/stop.png'
      state.audioObj.load()
      state.audioObj.play()
    },
    playPre (state) {
      state.currentMusicIndex--
      const length = state.currentPlayList.length
      if (state.currentMusicIndex < 0) {
        state.currentMusicIndex = length - 1
      }
      state.audioObj.setAttribute('src', state.currentPlayList[state.currentMusicIndex].url)
      state.isPlaying = true
      state.audioObj.load()
      state.audioObj.play()
      state.playBtnObj.src = '../../static/img/stop.png'
    },
    playEnded (state) {
      state.currentMusicIndex ++
      console.log('next music')
      const length = state.currentPlayList.length
      if (state.currentMusicIndex >= length) {
        state.currentMusicIndex = 0
      }
      state.audioObj.setAttribute('src', state.currentPlayList[state.currentMusicIndex].url)
      state.playing = true
      state.audioObj.load()
      state.audioObj.play()
    },
    toggleIsPlaying (state) {
      state.isPlaying = !state.isPlaying
      if (state.isPlaying) {
        state.audioObj.play()
      } else {
        state.audioObj.pause()
      }
    },
    setMusicDuration (state, duration) {
      if (duration === null || duration <= 0) return
      state.musicDuration = duration
    },
    setCurrentTime (state, currentTime) {
      if (currentTime === null || currentTime <= 0) return
      state.currentTime = currentTime
    },
    changeCurrentTime (state, currentIndex) {
      if (currentIndex === null || currentIndex <= 0) return
      let newCurrentTime = parseInt((state.musicDuration * currentIndex) / 100)
      console.log('current: ' + state.duration)
      if (state.currentTime !== newCurrentTime && state.isPlaying) {
        state.currentTime = newCurrentTime
        console.log('current: ' + state.currentTime)
        state.audioObj.currentTime = state.currentTime
      }
    }
  },
  getters: {
    getLocalMusicList: (state) => state.localMusicList,
    getCurrentPlayList: (state) => state.currentPlayList,
    getAllSongLists: (state) => state.allSongLists,
    getMyFavorite: (state) => state.myFavorite,
    getIsPlaying: (state) => state.isPlaying,
    getMusicDuration: (state) => state.musicDuration,
    getCurrentTime: (state) => state.currentTime
  },
  actions: {
    set_AllSongLists ({commit}, obj) {
      commit('setAllSongLists', obj)
    },
    set_MyFavorite ({commit}, obj) {
      commit('setMyFavorite', obj)
    },
    set_AudioEle ({commit}, obj) {
      commit('setAudioEle', obj)
    },
    play_Next ({commit}) {
      commit('playNext')
    },
    play_Pre ({commit}) {
      commit('playPre')
    },
    play_Ended ({commit}) {
      commit('playEnded')
    },
    set_IsPlaying ({commit}) {
      commit('toggleIsPlaying')
    },
    set_PlayBtn ({commit}) {
      commit('setPlayBtn')
    },
    set_StopBtn ({commit}) {
      commit('setStopBtn')
    },
    set_PlayBtnObj ({commit}, obj) {
      commit('setPlayBtnObj', obj)
    },
    set_CurrentPlayList ({commit}, obj) {
      commit('setCurrentPlayList', obj)
    },
    set_MusicDuration ({commit}, obj) {
      commit('setMusicDuration', obj)
    },
    set_CurrentTime ({commit}, obj) {
      commit('setCurrentTime', obj)
    },
    change_CurrentTime ({commit}, obj) {
      commit('changeCurrentTime', obj)
    }
  }
})

export default store
