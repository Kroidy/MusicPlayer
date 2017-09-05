<template>
    <transition name="sliderUpHideRight">
      <div id="musicDetail" v-show="getIsShowMusicDetail" :style="{background : 'url(' + this.info[2] + ')'}">
        <div class="topNav">
          <img class="back" @click="goBackToMain" src="../../../static/img/back.png"/>
          <span class="musicName">{{getCurrentMusicInfo[0]}}|</span>
          <span class="singer">{{getCurrentMusicInfo[1]}}</span>
        </div>
        <hr/>
        <div class="player">
          <div class="progressPanel">
            <span class="current">{{this.getCurrentTime}}</span>
            <div class="progress">
              <input type="range" id="musicProgress" />
            </div>
            <span class="total">{{this.getMusicDuration}}</span>
          </div>
          <div class="btnPanel">
            <a href="#" @click.stop.prevent="preMusic"><img src="../../../static/img/pre.png"/></a>
            <a href="#" @click.stop.prevent="playOrStop"><img id="playImage" :src="getPlayBtnSrc"/></a>
            <a href="#" @click.stop.prevent="nextMusic"><img src="../../../static/img/next.png"/></a>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        info: []
      }
    },
    computed: {
      getCurrentMusicInfo () {
        let info = this.$store.getters.getCurrentMusicInfo
        this.info = info
        return info
      },
      getPlayBtnSrc () {
        return this.$store.getters.getPlayBtnSrc
      },
      getIsShowMusicDetail () {
        return this.$store.getters.getIsShow
      },
      setUrl () {
        document.getElementById('musicDetail').style.backgroundImage = 'url(\'' + this.$store.getters.getCurrentMusicInfo[2] + '\')'
      },
      getMusicDuration () {
        let duration = this.$store.getters.getMusicDuration ? this.$store.getters.getMusicDuration : '00:00'
        if (duration !== '00:00') {
          let minutes = parseInt(duration / 60)
          let seconds = parseInt(duration % 60)
          duration = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
        }
        return duration
      },
      getCurrentTime () {
        let currentTime = this.$store.getters.getCurrentTime ? this.$store.getters.getCurrentTime : '00:00'
        if (currentTime !== '00:00') {
          let minutes = parseInt(currentTime / 60)
          let seconds = parseInt(currentTime % 60)
          currentTime = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
        }
        this.progress = parseInt((this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration) * 100)
        return currentTime
      }
    },
    mounted () {
      document.getElementById('musicDetail').style.backgroundImage = 'url(\'' + this.$store.getters.getCurrentMusicInfo[2] + '\')'
    },
    methods: {
      playOrStop () {
        if (this.$store.getters.getIsPlaying) {
          this.$store.dispatch('set_PlayBtn')
        } else {
          this.$store.dispatch('set_StopBtn')
        }
        this.$store.dispatch('set_IsPlaying')
      },
      nextMusic () {
        this.$store.dispatch('play_Next')
      },
      preMusic () {
        this.$store.dispatch('play_Pre')
      },
      goBackToMain () {
        this.$store.dispatch('toggle_IsShow')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #musicDetail{
    transform:translate3d(0, 0, 0);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #B22222;
    background-size: cover;
    background-attachment: fixed;
  }

  .progressPanel{
    width: 80%;
    border: 1px solid #B22222;
    margin: auto;
    height: 40%;
  }

  .btnPanel{
    width: 100%;
    border: 1px solid #B22222;
    height: 60%;
    display: flex;
    justify-content: space-around;
    align-items:center;
  }

  .current{
    border: 1px solid #B22222;
    float: left;
    margin: 10px;
  }

  .total{
    border: 1px solid #B22222;
    float: right;
    margin: 10px;
  }

  #musicProgress{
    border: 1px solid #B22222;
  }

  .progress{
    width: 88%;
    background: transparent;
    display: inline-block;
    margin-top: 10px;
  }

  .back{
    width: 32px;
    height: 32px;
    margin: 10px;
    border: 1px solid #B22222;
    background-color: aliceblue;
    border-radius: 90px;
  }

  hr{
    width: 100%;
    height: 1px;
  }

  .topNav{
    width: 100%;
    height: 10%;
  }

  .player{
    width: 100%;
    height: 20%;
    border: 1px solid #B22222;
    position: absolute;
    bottom: 0;
  }

  img{
    height: 40px;
    width: 40px;
    margin: 5px auto;
  }

  a{
    width: 80px;
    height: 40px;
    margin: 5px 20px;
  }

    input[id=musicProgress]{
      -webkit-appearance: none;
      width: 100%;
      height: 20px;
    }

    input[id=musicProgress]::-webkit-slider-thumb{
      -webkit-appearance: none;
      border: 1px solid #000000;
      height: 16px;
      width: 16px;
      border-radius: 90px;
      background-color: #ffffff;
      cursor: pointer;
      margin-top: -6px;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }

    input[id=musicProgress]::-moz-range-thumb {
      border: 1px solid #000000;
      height: 16px;
      width: 16px;
      border-radius: 90px;
      background-color: #ffffff;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }

    input[id=musicProgress]::-ms-thumb {
      border: 1px solid #000000;
      height: 16px;
      width: 16px;
      border-radius: 90px;
      background-color: #ffffff;
      cursor: pointer;
      margin-top: 1px;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }

    input[id=musicProgress]::-webkit-slider-runnable-track{
      width: 100%;
      height: 5px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background-color: #3071a9;
      border-radius: 1px;
      border: 0.2px solid #ffffff;
      margin-top: 10px;
    }

    input[id=musicProgress]::-moz-range-track{
      width: 100%;
      height: 5px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border-radius: 1px;
      border: 0.2px solid #ffffff;
    }

    input[id=musicProgress]::-ms-track{
      width: 100%;
      height: 5px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    input[id=musicProgress]::-ms-fill-lower{
      background: #B22222;
      border: 0.2px solid #010101;
      border-radius: 2.6px;

    }

    input[id=musicProgress]:focus::-ms-fill-lower{
      background: #B22222;
      border: 0.2px solid #ffffff;
    }

    input[id=musicProgress]::-ms-fill-upper{
      background: #ffffff;
      border: 0.2px solid rgb(169,172,160);
      border-radius: 2.6px;
    }

    input[id=musicProgress]:focus::-ms-fill-upper{
      background: #ffffff;
    }

  .sliderUpHideRight-enter-active{
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .sliderUpHideRight-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .sliderUpHideRight-enter{
    transform: translate3d(0,100%,0);
    opacity: 0;
  }

  .sliderUpHideRight-leave-to{
    transform: translate3d(100%,0,0);
    opacity: 0;
  }
</style>
