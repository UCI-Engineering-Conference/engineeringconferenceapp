<template>
  <div>
    <section style="overflow:hidden;">
      <div class="page-header">
        <p>Papers & Projects</p>
      </div>
      <div class="papers">
        <h1>Papers</h1>
        <p>Explore the work from undergraduate students during previous Engineering Conferences that have now been published in the UC repository.</p>
        <ul class="pub-grid">
          <li v-for="(pub, index) in generalContent.Publications" v-bind:key="index">
            <img class="pub-image" :src="miscImgPreUrl(pub.img)"/>
            <a class="pub-title" :href="pub.link">{{pub.name}}</a>
            <div class="pub-description">{{pub.desc}}...</div>
          </li>
        </ul>
      </div>
      <div class="projects">
        <h1>Projects</h1>
        <P style="margin: 20px 10%;">Engineering Conference places an emphasis on students gaining technical and applicable skills. As such, we design projects with the intent of having students research topics relevant to them based on their studies, but with a backdrop of having them work as if they were in an industrialized setting.</P>
        <ul class="proj-grid">
          <li v-for="(proj, index) in generalContent.Projects" v-bind:key="index">
            <img class="proj-image" :src="miscImgPreUrl(proj.img)"/>
            <div class="proj-title">{{proj.system}}</div>
            <div class="proj-description">{{proj.desc}}</div>
            <ul class="subsystem-grid">
              <li v-for="(sub, i) in proj.subsystems" v-bind:key="i">
                <img class="sub-image" :src="miscImgPreUrl(sub.img)"/>
                <div class="sub-title">{{sub.name}}</div>
                <div class="sub-description">{{sub.desc}}</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import ImageStrip from '../../static/ImageStrips.json'
import generalContent from '../../static/GeneralContent.json'
export default {
  data () {
    return {
      miscImgLoc: '/static/misc-pics/',
      generalContent: generalContent,
      image_strip: ImageStrip
    }
  },
  methods: {
    miscImgPreUrl (img) {
      return this.miscImgLoc.concat(img)
    }
  }
}
</script>
<style scoped>
  a {
    cursor: pointer;
    text-decoration: none;
    color: var(--green-color);
  }
  a:hover {
    text-decoration: underline;
  }
  .pub-title {
    font-size: 16px;
  }
  .pub-description {
    font-size: 11px;
    padding: 6px 10px 30px 10px;
    color: var(--white-color);
    background: rgba(60, 60, 60, 0.8) url("/static/img/ecgraphic.png") no-repeat center;
    background-size: 90%;
    background-blend-mode: darken;
  }
  .pub-image {
    height: 180px;
    border: 2px solid var(--light-black-color);
  }
  .pub-grid, .subsystem-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .pub-grid li {
    width: 280px;
    padding: 8px 5px 0 5px;
    justify-content: center;
    border: 2px solid var(--light-black-color);
    border-radius: 2px;
    background-color: var(--black-color);
    margin: 20px auto;
  }
  .subsystem-grid li {
    width: 404px;
    justify-content: center;
    margin: 20px auto;
    padding: 0px;
  }
  .proj-description {
    font-size: 13px;
    padding: 6px 10px 30px 10px;
  }
  .sub-description {
    font-size: 13px;
    padding: 6px 10px 30px 10px;
    background: rgba(255, 255, 255, 0.8) url("/static/img/ecgraphic.png") no-repeat center;
    background-size: 90%;
    background-blend-mode: lighten;
  }
  .sub-image {
    width: 400px;
    border: 2px solid var(--light-black-color);
  }
  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, var(--page-header-bg)), rgba(0, 0, 0, var(--page-header-bg))),
      url(/static/page-headers/about.jpg);
  }
  .papers, .proj-description {
    margin: 20px 10%;
  }

  @media only screen and (min-width: 660px) {

  }
  @media only screen and (min-width: 1000px) {

  }
</style>
