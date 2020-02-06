<template>
  <section class="section schedule py-0 mt-3">
    <div class="container">
      <h4 class="text-center mb-4">Schedule</h4>
      <div class="row">
        <div class="col-12">
          <div class="schedule-tab">
            <ul class="nav nav-pills text-center">
              <li class="nav-item" v-for="(day, index) in timeline_data" v-bind:key="index">
                <a class="nav-link" v-bind:class="{ active: index == currentDay}" data-toggle="pill" @click="changeDay(index)">
                  {{day.label}}
                  <span>{{day.date}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="schedule-contents bg-schedule">
            <div class="tab-content" id="pills-tabContent" v-bind:key="currentDay">
              <div class="tab-pane fade show active schedule-item" id="nov20">
                <!-- Headings -->
                <ul class="m-0 p-0">
                  <li class="headings">
                    <div class="time">Time</div>
                    <div class="speaker">Activity</div>
                    <div class="venue">Location</div>
                  </li>
                  <li class="schedule-details" v-for="(event, index) in timeline_data[currentDay].events" v-bind:key="index">
                    <div class="block">
                      <!-- Time -->
                      <div class="time">
                        <i class="fa fa-clock-o"></i>
                        <span class="time">{{event.start}} - {{event.end}}</span>
                      </div>
                      <!-- Speaker -->
                      <div class="speaker">
                        <span class="name">{{event.name}}</span>
                      </div>
                      <!-- Venue -->
                      <div class="venue">{{event.location}}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
  @import '../../static/style.css';
</style>

<script>
import ECSchedule from '../../static/Schedule.json'
export default {
  data () {
    return {
      timeline_data: ECSchedule,
      currentDay: 0
    }
  },
  methods: {
    changeDay (index) {
      this.currentDay = index
    }
  }
}

</script>
