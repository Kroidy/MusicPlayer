import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    localMusicList: [],
    allSongs: [],
    allSongLists: {},
    allSongListsName: [],
    songListCounts: 0,
    currentMusicIndex: 0,
    myFavorite: [],
    currentPlayList: [],
    currentShowlist: [],
    audioObj: '',
    playBtnObj: '',
    isPlaying: false,
    musicDuration: '',
    currentTime: '',
    showMusicSheet: false,
    isShow: false
  },
  mutations: {
    addLocalMusic (state, musicArr) {
      if (musicArr === null || musicArr.length === 0) return
      state.localMusicList.push(...musicArr)
    },
    addSongList (state, name) {
      state.allSongLists[name] = []
      state.allSongListsName.push(name)
      state.songListCounts++
    },
    deleteSongList (state, name) {
      delete state.allSongLists[name]
      let index = 0
      for (let i = 0; i < state.allSongListsName; i++) {
        if (state.allSongListsName[i] === i) {
          index = i
          break
        }
      }
      state.allSongListsName.remove(index)
      state.songListCounts--
    },
    setCurrentPlayList (state, obj) {
      if (obj === null) {
        return
      } else {
        state.currentPlayList = obj
      }
    },
    setAllSongs (state, obj) {
      if (obj === null) return
      state.allSongs = obj
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
      // state.audioObj.setAttribute('src', state.currentPlayList[state.currentMusicIndex].url)
    }, // 传过来的几个参数都成为了obj的属性
    choosePlay (state, obj) {
      if (state.audioObj.src) {
        // 如果当前点击的音乐已经在播放，则多次点击此音乐无效果
        if (state.audioObj.src === state.currentPlayList[obj.index].url && state.isPlaying === true) return
      }
      state.audioObj.setAttribute('src', state.currentPlayList[obj.index].url)
      state.playBtnObj.src = '../../static/img/stop.png'
      state.isPlaying = true
      state.currentMusicIndex = obj.index
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
      state.currentMusicIndex++
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
      if (state.currentTime !== newCurrentTime && state.isPlaying) {
        state.currentTime = newCurrentTime
        state.audioObj.currentTime = state.currentTime
      }
    },
    toggleShowMusicSheet (state) {
      state.showMusicSheet = !state.showMusicSheet
    },
    setCurrentShowList (state, listName) {
      if (listName === null || listName === '') {
        return
      } else {
        switch (listName) {
          case 'likeMusic':
            state.currentShowlist = state.myFavorite
            break
          case 'allMusic':
            state.currentShowlist = state.allSongs
            break
          default:
            state.currentShowlist = state.allSongLists[listName]
        }
      }
    },
    deleteCurrentShowSong (state, index) {
      if (index < 0 || index >= state.currentShowlist.length) return
      state.currentShowlist.splice(index, 1)
    },
    toggleIsShow (state) {
      state.isShow = !state.isShow
    },
    addSongToLists (state, obj) {
      let music = state.currentShowlist[obj['musicIndex']]
      for (let i = 0; i < obj['list'].length; i++) {
        state.allSongLists[obj['list'][i]].push(music)
      }
    }
  },
  getters: {
    getLocalMusicList: (state) => state.localMusicList,
    getCurrentPlayList: (state) => state.currentPlayList,
    getAllSongs: (state) => state.allSongs,
    getMyFavorite: (state) => state.myFavorite,
    getIsPlaying: (state) => state.isPlaying,
    getMusicDuration: (state) => state.musicDuration,
    getCurrentTime: (state) => state.currentTime,
    getShowMusicSheet: (state) => state.showMusicSheet,
    getCurrentShowList: (state) => state.currentShowlist,
    getCurrentMusicInfo: (state) => {
      if (state.currentMusicIndex >= 0 && state.currentMusicIndex < state.currentPlayList.length) {
        let music = state.currentPlayList[state.currentMusicIndex]
        let info = [music.name, music.singer, music.img_src]
        return info
      }
      return ''
    },
    getPlayBtnSrc: (state) => {
      if (state.isPlaying) return '../../static/img/stop.png'
      else return '../../static/img/play.png'
    },
    getIsShow: (state) => state.isShow,
    getAllSongsList: (state) => state.allSongLists,
    getSongListCounts: (state) => state.songListCounts,
    getAllSongListsName: (state) => state.allSongListsName
  },
  actions: {
    set_AllSongs ({commit}, obj) {
      commit('setAllSongs', obj)
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
    },
    toggle_MusicSheet ({commit}) {
      commit('toggleShowMusicSheet')
    },
    set_CurrentShowList ({commit}, listName) {
      commit('setCurrentShowList', listName)
    },
    delete_CurrentShowSong ({commit}, index) {
      commit('deleteCurrentShowSong', index)
    },
    toggle_IsShow ({commit}) {
      commit('toggleIsShow')
    },
    add_SongList ({commit}, name) {
      commit('addSongList', name)
    },
    add_SongToLists ({commit}, obj) {
      commit('addSongToLists', obj)
    }
  }
})

export default store
