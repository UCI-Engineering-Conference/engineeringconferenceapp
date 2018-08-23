<template>
  <div>
    <transition name="slide-fade" mode="out-in">
      <div id="app" class="container" v-bind:key="currentDay">
        <div>
          <h4><button class="arrow" @click="switchSchedule"></button>
          {{ currentDay }}
          <button class="arrow" @click="switchSchedule"></button></h4>
        </div>
          <div class="timeline">
            <ul>
              <li v-for="(event, index) in timeline_data[currentDay]" v-bind:key="index">
                <span></span>
                <div class="event">
                  <div style="font-size: 16px; font-weight: bold">{{ event.name }}</div>
                  <div style="font-size: 16px">{{ event.location }}</div>
                  <div style="font-style:italic">{{ event.description }}</div>
                </div>
                <div class="year">
                  <span>{{ event.end }}</span>
                  <span>{{ event.start }}</span>
                </div>
              </li>
            </ul>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ECSchedule from '../../static/Schedule.json'
export default {
  data () {
    return {
      currentDay: 'Day 1',
      timeline_data: ECSchedule
    }
  },
  methods: {
    switchSchedule () {
      switch (this.currentDay) {
        case 'Day 1':
          this.currentDay = 'Day 2'
          break
        case 'Day 2':
          this.currentDay = 'Day 3'
          break
        case 'Day 3':
          this.currentDay = 'Day 1'
          break
      }
    }
  }
}

</script>

<style scoped>

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  html body {
    background-color: #D3D3D3;
    font-family: "Calibri", sans-serif;
    color: #FFFFFF;
  }
  .container {
    width: 45%;
    height: 100%;
    margin: auto;
    padding: 50px;
  }
  .event {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 14px;
    border-radius: 6px;
    width: 250px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.08);
  }
  .timeline ul li:nth-child(even) .event {
    background-color: #A2E49D;
    padding: 14px;
    border-radius: 6px;
    width: 250px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.08);
  }
  .arrow{
    cursor: pointer;
    margin: 10px;
    height:20px;
    width:20px
  }
  .arrow:hover{
    -webkit-animation: arrow 1s linear infinite;
    -moz-animation: arrow 1s linear infinite;
    -o-animation: arrow 1s linear infinite;
    animation: arrow 1s linear infinite;
  }
  .timeline {
    margin: 5px 45px;
  }
  .timeline ul {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .timeline ul::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0px;
    height: 100%;
  }
  .timeline ul li {
    position: relative;
    margin: 50px 35px;
    width: 100%;
  }
  .timeline ul li > span {
    content: '';
    position: absolute;
    top: 0;
    left: -30px;
    width: 0px;
    height: 100%;
    border: 2px dashed #aaa;
  }
  .timeline ul li > span::before, .timeline ul li > span::after {
    background-image: url('/static/favicon.png');
    background-repeat: no-repeat;
    -webkit-background-size: 16px;
    background-size: 16px;
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    left: -8px;
  }
  .timeline ul li > span::before {
    top: -15px;
  }
  .timeline ul li > span::after {
    top: 100%;
  }
  .timeline ul li .year span {
    position: absolute;
    font-size: 14px;
    font-weight: bold;
    left: -90px;
    width: 40px;
    text-align: right;
  }
  .timeline ul li .year span:first-child {
    top: -15px;
  }
  .timeline ul li .year span:last-child {
    top: 100%;
  }


</style>
