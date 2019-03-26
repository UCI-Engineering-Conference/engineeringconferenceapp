<template>
  <div>
    <div class="page-header">
      <p>Conference Schedule</p>
    </div>
    <div>
     <button class="arrow-left" @click="switchSchedule(-1)"></button>
     <h4>{{ displayDay }}</h4>
     <button class="arrow-right" @click="switchSchedule(1)"></button>
    </div>
    <div class="timeline-wrapper">
      <transition name="slide-fade" mode="out-in">
        <div class="container" v-bind:key="currentDay">
            <div class="timeline">
              <ul>
                <li v-for="(event, index) in timeline_data[currentDay].events" v-bind:key="index">
                    <div class="event">
                      <span class="time">
                        <span class="start">{{ event.start }}</span>
                        <span class="to">to</span>
                        <span class="end">{{ event.end }}</span>
                      </span>
                      <h2>{{ event.name }}</h2>
                      <div class="event-content">
                        <p>{{ event.location }}</p>
                        <p style="font-style:italic">{{ event.description }}</p>
                      </div>
                    </div>
                </li>
              </ul>
            </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ECSchedule from '../../static/Schedule.json'
export default {
  data () {
    return {
      timeline_data: ECSchedule,
      currentDay: 0,
      displayDay: ECSchedule[0].day
    }
  },
  methods: {
    switchSchedule (inc) {
      if (this.currentDay + inc < 0) this.currentDay = this.timeline_data.length - 1
      else if (this.currentDay + inc >= this.timeline_data.length) this.currentDay = 0
      else this.currentDay += inc
      this.displayDay = this.timeline_data[this.currentDay].day
    }
  }
}

</script>

<style scoped>

  h4, button {
    display:inline-block;
    vertical-align: middle;
  }

  button {
    padding: 10px;
  }

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
  .arrow-left, .arrow-right{
    cursor: pointer;
    margin: 10px;
    font-size: 30px;
    border: none;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
  .arrow-right:hover, .arrow-left:hover{
    color:  #65D25C;
  }
  .arrow-left:before {
    content: '\00ab';
  }
  .arrow-right:before {
    content: '\00bb';
  }
  .timeline-wrapper {
    background-color: #A2E49D;
    padding-top: 10px;
    overflow: hidden;
  }
  .timeline {
    width: 90%;
    margin: 20px auto;
    position: relative;
  }
  .timeline:before {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 0;
    margin: 0 0 0 -3px;
    width: 2px;
    height: 100%;
    background: rgba(255,255,255,0.5);
  }
  .timeline li {
    width: 100%;
    margin: 0 0 20px 0;
    position: relative;
  }
  .timeline li:after {
    content: '';
    display: block;
    clear: both;
  }

  .timeline li div.event {
    width: 40%;
    float: left;
    margin: 5px 0 0 0;
    border-radius: 6px;
  }
  .timeline li div.event span.time {
    display: block;
    width: 60px;
    height: 50px;
    padding: 5px 0;
    position: absolute;
    top: 0;
    left: 50%;
    margin: 0 0 0 -32px;
    font-weight: 900;
    color: #3D3D3D;
    background-color: rgba(255, 255, 255, .7);
    border-radius: 50%;
    /*background: url('/static/img/ScheduleBullet.png') no-repeat;*/
  }
  .timeline li div.event span.time span {
    display: block;
    text-align: center;
    padding-top: 2px;
  }
  .timeline li div.event span.time span.start {
    font-size: 10px;
  }
  .timeline li div.event span.time span.to {
    font-size: 8px;
  }
  .timeline li div.event span.time span.end {
    font-size: 10px;
  }
  .timeline li div.event h2 {
    padding: 15px;
    margin: 0;
    color: #fff;
    font-size: 3.6vw;
    text-transform: uppercase;
    border-radius: 6px 6px 0 0;
    position: relative;
  }
  .timeline li div.event h2:after {
    content: '';
    position: absolute;
    top: 20px;
    right: -5px;
    width: 10px;
    height: 10px;
    -webkit-transform: rotate(-45deg);
  }
  .timeline li .event-content {
    padding: 1px;
    margin: 0;
    font-size: 3vw;
    background: #FFFFFF;
    color: #3D3D3D;
    border-radius: 0 0 6px 6px;
  }

  .timeline li:nth-child(even) div.event {
    float: right;
  }
  .timeline li:nth-child(even) div.event h2:after {
    left: -5px;
  }
  .timeline li div.event h2 {
    background: #65D25C;
  }
  .timeline li div.event h2:after {
    background: #65D25C;
  }
  .timeline li:nth-child(even) div.event h2 {
    background: #606060;
  }
  .timeline li:nth-child(even) div.event h2:after {
    background: #606060;
  }
  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, var(--page-header-bg)), rgba(0, 0, 0, var(--page-header-bg))),
      url(/static/page-headers/conference-schedule.jpg);
  }

  @media only screen and (min-width: 560px) {
    .timeline {
      width: 80%;
      margin: 20px auto;
      position: relative;
    }
    .timeline li div.event span.time {
      width: 70px;
      height: 60px;
      margin: 0 0 0 -37px;
    }
    .timeline li div.event span.time span.start {
      font-size: 14px;
    }
    .timeline li div.event span.time span.to {
      font-size: 10px;
    }
    .timeline li div.event span.time span.end {
      font-size: 14px;
    }
    .timeline li div.event h2 {
      padding: 15px;
      font-size: 20px;
    }
    .timeline li .event-content {
      padding: 1px;
      font-size: 14px;
    }
  }
</style>
