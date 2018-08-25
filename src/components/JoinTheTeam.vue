<template>
  <div>
    <h2>Want to be a part of UCI Engineering Conference?</h2>
    <div>
      <ul>
        <li v-for="(data, index) in positionInfo" :key="index">
          <div class = "title">{{ data.title }}</div>
          <div>{{ data.title }} Team Description </div>
          <div class = "description"> {{ data.description }}</div>
          <div>Requirements</div>
          <ul>
            <li v-for="(req, k) in data.requirements" :key="k">
              <div class="requirements">{{ req }}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div>
      <h2>Apply Here!</h2>
      <div class="form-input">
        <div>
          <label>First Name <b>*</b></label>
          <input type="text" v-model="user.firstname" v-validate="'required'" name="firstName">
          <span class="alert">{{ errors.first('firstName') }}</span>
        </div>
        <div>
          <label>Last Name <b>*</b></label>
          <input type="text" v-model="user.lastname" v-validate="'required'" name="lastName">
          <span class="alert">{{ errors.first('lastName') }}</span>
        </div>
        <div>
          <label>Email <b>*</b></label>
          <input type="text" v-model="user.email" v-validate="'required|email'" name="email">
          <span class="alert">{{ errors.first('email') }}</span>
        </div>
        <div>
          <label>Phone</label>
          <input type="text" v-model="user.phone">
        </div>
        <div>
          <label>Major</label>
          <input type="text" v-model="user.major">
        </div>
        <div>
          <label>Graduation Year <b>*</b></label>
          <input type="text" v-model="user.graduationyear" v-validate="'required'" name="year">
          <span class="alert">{{ errors.first('year') }}</span>
        </div>
        <div>
          <label>LinkedIn</label>
          <input type="text" v-model="user.linkedin">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PositionInfo from '../../static/positioninfo.json'
export default {
  data () {
    return {
      positionInfo: PositionInfo,
      user: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        major: '',
        graduationyear: '',
        linkedin: '',
        position: ''
      }
    }
  }
}
</script>

<style scoped>
  b {
    color: red;
  }
  .form-input {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    justify-content: space-evenly;
    grid-row-gap: 1.5em;
  }

  @media only screen and (min-width:500px) {
    .form-input {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media only screen and (min-width:790px) {
    .form-input {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

</style>
