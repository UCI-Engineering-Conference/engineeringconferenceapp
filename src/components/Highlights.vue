<template>
  <section class="section about">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 align-self-center">
          <div class="content-block">
            <h2>Past Highlights</h2>
            <div class="mb-3">
              <p class="display-4">
                <span style="color: #65d25c"><b>400</b></span> Engineers
              </p>
              <p class="display-4">
                <span style="color: #65d25c"><b>3</b></span> Days
              </p>
              <p class="display-4">
                <span style="color: #65d25c"><b>48</b></span> Published Papers
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 mb-3 align-self-center">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="3000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide img-src="../../static/img/img-1.jpg"></b-carousel-slide>

            <b-carousel-slide img-src="../../static/img/img-2.jpg"></b-carousel-slide>

            <b-carousel-slide img-src="../../static/img/img-3.jpg"></b-carousel-slide>

            <b-carousel-slide img-src="../../static/img/img-4.jpg"></b-carousel-slide>

          </b-carousel>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
  @import '../../static/style.css';
</style>
