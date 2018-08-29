<script>
export default {
  name: 'modal',
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <router-link to="/" tag="button" style="float:right;" class="modal-close-button" @click="$emit('close')"><close /></router-link>
            <br/><br/>
            <h2>Congratulations!</h2>
          </div>
          <div class="modal-body">
           <p>You're official registered for UCI Engineering Conference! We'll be in touch with you soon regarding the status of your application.</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
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
  .modal-mask {
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

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px 8px 30px;
    background-image: url(/static/img/MailModalBG.png);
    background-repeat:   no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    border: 5px solid #808080;
  }

  .modal-header h2 {
    margin-top: 0;
    color: #65D25C;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-footer {
    padding: 30px;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
