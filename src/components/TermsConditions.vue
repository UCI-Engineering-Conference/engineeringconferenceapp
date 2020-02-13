<template>
  <section>
    <div class="d-flex align-items-center p-3 mb-3 text-white-50 box-shadow it">
      <div class="col-6 text-center">
        <div class="lh-100">
          <h6 class="mb-0 text-white lh-100">Our Terms and Conditions</h6>
        </div>
      </div>
      <div class="col-6 text-center">
        <p class="text-white"><router-link to="/application" class="btn btn-outline-success"><a @click="$bvModal.show('bv-modal-example')">View</a></router-link></p>
      </div>
    </div>
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
