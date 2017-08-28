<template>
    <div id="bottomPlayer">
      <div id="playBtns">
        <a href="#" @click.stop.prevent="preMusic"><img src="../../../static/img/pre.png"/></a>
        <a href="#" @click.stop.prevent="playOrStop"><img id="playImage" src="../../../static/img/stop.png"/></a>
        <a href="#" @click.stop.prevent="nextMusic"><img src="../../../static/img/next.png"/></a>
      </div>
      <div id="progressBar">
        <span id="currentProgress">{{this.getCurrentTime}}</span>
        <div class="col-md-10
                  innerBar">
          <input type="range" id="musicProgress" :value="this.progress" @change="changeCurrentTime"/>
        </div>
        <span id="totalProgress">{{this.getMusicDuration}}</span>
      </div>
      <audio id="audio" style="display: none;" @ended="musicEnd" @canplay="setMusicDuration"
             @timeupdate="setCurrentTime"
             src="http://music.163.com/song/media/outer/url?id=4017240.mp3"
             controls="controls">
      </audio>
      <div id="volume">
        <input type="range" id="volumeBar" value="50" v-model="volume"/>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        progress: 0,
        playBtn: '开始',
        volume: 0.5
      }
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
      musicEnd () {
        console.log('play end')
        this.$store.dispatch('play_Ended')
      },
      setMusicDuration () {
        this.$store.dispatch('set_MusicDuration', document.querySelector('audio').duration)
      },
      setCurrentTime () {
        this.$store.dispatch('set_CurrentTime', document.querySelector('audio').currentTime)
      },
      changeCurrentTime () {
        console.log('change: ' + document.getElementById('musicProgress').value)
        this.$store.dispatch('change_CurrentTime', document.getElementById('musicProgress').value)
      }
    },
    watch: {
      volume (curVal, oldVal) {
        document.querySelector('audio').volume = curVal / 100
      },
      progress (curVal, oldVal) {
        document.getElementById('musicProgress')._value = 50
      }
    },
    mounted () {
      this.$store.dispatch('set_AudioEle', document.querySelector('audio'))
      this.volume = 100
      this.$store.dispatch('set_PlayBtnObj', document.getElementById('playImage'))
      this.$store.dispatch('set_PlayBtn')
    },
    computed: {
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "/static/css/btn.css";
  @import "/static/css/volume_controller.css";

    #bottomPlayer{
      width: 100%;
      height:50px;
      border: 1px solid #4682B4;
      bottom: 0px;

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

    #playBtns{
      width: 25%;
      height: 50px;
      display: inline-block;
      float: left;
      border: 1px solid #000000;
    }

  #volume{
    width: 15%;
    height:50px;
    border: 1px solid #B22222;
    float: right;
  }

  #volumeBar{
    margin: 10px auto;
    height: 25px;
  }

  #currentProgress,
  #totalProgress{
    border: 1px solid #000000;
    margin: 10px 5px;
    font-size: 18px;
  }

  #progressBar{
    width: 60%;
    height: 100%;
    display: inline-block;
    border: 1px solid #000000;
  }
  #currentProgress{
    float: left;
  }

  #totalProgress{
    float: right;
  }

  .innerBar{
    margin: 10px auto;
  }

  input[id=musicProgress]{
    -webkit-appearance: none;
    width: 100%;
    border-radius: 10px;
  }

  input[id=musicProgress]::-webkit-slider-thumb{
    -webkit-appearance: none;
    border: 1px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 90px;
    background-color: #ffffff;
    cursor: pointer;
    margin-top: -6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  input[id=musicProgress]::-moz-range-thumb {
    border: 1px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 90px;
    background-color: #ffffff;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  input[id=musicProgress]::-ms-thumb {
    border: 1px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 90px;
    background-color: #ffffff;
    cursor: pointer;
    margin-top: 1px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  input[id=musicProgress]::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input[id=musicProgress]::-webkit-slider-runnable-track{
    width: 100%;
    height: 8px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background-color: #3071a9;
    border-radius: 1px;
    border: 0.2px solid #010101;
  }

  input[id=musicProgress]::-moz-range-track{
    width: 100%;
    height: 8px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border-radius: 1px;
    border: 0.2px solid #010101;
  }

  input[id=musicProgress]::-ms-track{
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input[id=musicProgress]::-ms-fill-lower{
    background: #B22222;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  input[id=musicProgress]:focus::-ms-fill-lower{
    background: #B22222;
  }

  input[id=musicProgress]::-ms-fill-upper{
    background: #ffffff;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  input[id=musicProgress]:focus::-ms-fill-upper{
    background: #ffffff;
  }
</style>
