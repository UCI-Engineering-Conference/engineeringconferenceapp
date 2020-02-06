<template>
  <div>
    <div class="mt-3">
      <div class="container text-center">
        <h4>FAQ</h4>
        <section class="section schedule">
          <div class="album">
            <div class="container">
              <div class="row">
                <div class="col-md-4" v-for="(data, index) in faqList" :key="index">
                  <div class="card mb-4 box-shadow" style="border-radius: 0px !important; height: 280px !important;">
                    <div class="card-body">
                      <h5 class="card-title">{{data.title}}</h5>
                      <p class="card-text">{{data.description}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style>
  @import '../../static/style.css';
</style>

<script>
import FAQList from '../../static/FAQList.json'
import ImageStrip from '../../static/ImageStrips.json'
export default {
  data () {
    return {
      faqList: FAQList,
      imgLocation: '/static/faqpics/',
      miscImgLoc: '/static/misc-pics/',
      image_strip: ImageStrip
    }
  },
  methods: {
    imgPreUrl (img) {
      return this.imgLocation.concat(img)
    },
    miscImgPreUrl (img) {
      return this.miscImgLoc.concat(img)
    }
  }
}
</script>
