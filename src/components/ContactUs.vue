<template>
  <div>
    <div class="container mb-5">
      <div class="row text-center">
        <div class="m-auto">
          <div class="mt-5 mb-5"></div>
          <div class="m-auto">
            <h4 class="mb-5">Contact 📞</h4>
            <div v-for="(data, index) in team_email" :key="index">
              <p>For urgent questions or comments, please email us at <br>
                <a class="btn btn-md btn-secondary mt-3" style="color: white; border-radius: 0px !important;" v-bind:href="'mailto:' + data.email">{{ data.email }}</a></p>
            </div>
          </div>
        </div>
      </div>
      <div class="row text-center">
        <div id="social" class="m-auto">
          <div class="mt-5">
            <a class="facebookBtn smGlobalBtn" href="https://www.facebook.com/EConferenceUCI/"></a>
            <a class="twitterBtn smGlobalBtn" href="https://twitter.com/EConferenceUCI"></a>
            <a class="instagramBtn smGlobalBtn" href="https://www.instagram.com/econferenceuci/"></a>
            <a class="linkedinBtn smGlobalBtn" href="https://www.linkedin.com/in/uciengineeringconference/"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3"></div>
    <Map></Map>
  </div>

</template>

<script>
import TeamEmail from '../../static/TeamEmail.json'
import Map from './Map.vue'
export default {
  data () {
    return {
      team_email: TeamEmail
    }
  },
  components: {
    'Map': Map
  }
}
</script>

<style>
  @import '../../static/style.css';
</style>

<style>
  @import url('//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');

  #social {
    margin: 20px 10px;
    text-align: center;
  }

  .smGlobalBtn{ /* global button class */
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 50px;
    height: 50px;
    box-shadow: 0 2px 2px #999;
    padding: 0px;
    text-decoration: none;
    text-align: center;
    color: #fff;
    font-size: 25px;
    font-weight: normal;
    line-height: 50px;
    border-radius: 25px;
    -moz-border-radius:25px;
    -webkit-border-radius:25px;
  }

  /* facebook button class*/
  .facebookBtn{
    background: #4060A5;
  }

  .facebookBtn:before{ /* use :before to add the relevant icons */
    font-family: "FontAwesome";
    content: "\f09a"; /* add facebook icon */
  }

  .facebookBtn:hover{
    color: #4060A5;
    background: #fff;
  }

  /* twitter button class*/
  .twitterBtn{
    background: #00ABE3;
  }

  .twitterBtn:before{
    font-family: "FontAwesome";
    content: "\f099"; /* add twitter icon */
  }

  .twitterBtn:hover{
    color: #00ABE3;
    background: #fff;
  }

  /* google plus button class*/
  .instagramBtn{
    background: #e64522;
  }

  .instagramBtn:before{
    font-family: "FontAwesome";
    content: "\f16d"; /* add googleplus icon */
  }

  .instagramBtn:hover{
    color: #e64522;
    background: #fff;
  }

  /* linkedin button class*/
  .linkedinBtn{
    background: #0094BC;
  }

  .linkedinBtn:before{
    font-family: "FontAwesome";
    content: "\f0e1"; /* add linkedin icon */
  }

  .linkedinBtn:hover{
    color: #0094BC;
    background: #fff;
  }
</style>
