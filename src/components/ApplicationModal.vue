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
            <slot name="header">
              default header
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
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
    width: 200px;
    height: 200px;
    margin: 0px auto;
    padding: 20px 30px 8px 30px;
    background: url(/static/img/MailModalBG.png) no-repeat center center;
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

  @media only screen and (min-width: 400px) {
    .modal-container {
      width: 300px;
    }
  }
</style>
