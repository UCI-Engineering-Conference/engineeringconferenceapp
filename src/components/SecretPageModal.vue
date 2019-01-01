<template>
  <transition name="modalt">
    <div class="modalt-mask">
      <div class="modalt-wrapper">
        <div class="modalt-container">
          <div class="modal-header">
            <button style="float:right;" class="modal-close-button" @click="$emit('close')"><close /></button>
            <br/><br/>
            <h3>What is Mazen's favorite animal?</h3>
          </div>
          <div class="modal-body">
            <input type="password" v-model="password">
          </div>
          <div class="modalt-footer">
            <div name="footer">
              <router-link to="/secretpage" v-if="password===adminPswd" tag="button" class="submit-button" @click="$emit('close')"><span>Submit</span></router-link>
              <button v-else class="submit-button" @click="$emit('close')"><span>Submit</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>

export default {
  data () {
    return {
      password: '',
      adminPswd: process.env.ADMIN_PSWD
    }
  }
}
</script>
<style>
  .modal-close-button {
    color: #606060;
    border: none;
    cursor: pointer;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
  .modal-close-button:hover {
    color: red;
  }
  .modalt-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(162, 228, 157, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modalt-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modalt-container {
    width: 200px;
    overflow-y: auto;
    max-height: 350px;
    margin: 0px auto;
    padding: 20px 30px 8px 30px;
    background: url(/static/img/MailModalBG.png) no-repeat center center;
    background-size: cover;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    border: 5px solid #808080;
  }

  .modalt-header h3 {
    margin-top: 0;
    color: #3D3D3D;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modalt-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modalt-container,
  .modal-leave-active .modalt-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  @media only screen and (min-width: 400px) {
    .modalt-container {
      width: 300px;
      max-height: 500px;
    }

  }
</style>
