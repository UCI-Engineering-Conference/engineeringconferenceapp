<template>
  <section>
      <div class="d-flex align-items-center p-3 text-white-50 box-shadow it">
        <div class="col-6 text-center">
          <div class="lh-100">
            <h6 class="mb-0 text-white lh-100">Congratulations to All 130 of You! 🥳</h6>
          </div>
        </div>
        <div class="col-6 text-center">
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary active">
              <input type="radio" name="options" id="option2" autocomplete="off"> <a @click="$bvModal.show('bv-modal-example')">Terms & Conditions</a>
            </label>
          </div>
        </div>
      </div>
    <b-modal id="bv-modal-example" hide-footer title="Terms and Conditions" class="modal-fullscreen1">
      <div style="height: 330px; overflow-x: hidden;">
        <ul>
          <li v-for="(data, index) in termsList" :key="index">
            <div class="term">
              <div class="lead">{{ data.title }}</div>
              <ul class="requirements-list">
                <li v-for="(req, k) in data.conditions" :key="k">
                  <div class="requirements">{{ req }}</div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </b-modal>
  </section>

</template>

<style scoped>
  .it {
    background-color: #65d25c;
  }
  .btn-outline-success {
    border-radius: 0px;
    border: 1px solid white;
    background: #65D25C;
    color: #fff;
  }

  .btn-outline-success:hover {
    color: #fff;
    border: 1px dashed white;
  }
</style>

<script>
import TermsList from '../../static/TermsList.json'
export default {
  data () {
    return {
      termsList: TermsList
    }
  }
}
</script>
