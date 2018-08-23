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
      <h3>BASIC INFORMATION</h3>
      <div>
        <p>First Name <b>*</b></p>
        <input type="text" v-model="user.firstname" v-validate="'required'" name="firstName">
        <span class="alert">{{ errors.first('firstName') }}</span>
      </div>
      <div>
        <p>Last Name <b>*</b></p>
        <input type="text" v-model="user.lastname" v-validate="'required'" name="lastName">
        <span class="alert">{{ errors.first('lastName') }}</span>
      </div>
      <div>
        <p>Email <b>*</b></p>
        <input type="text" v-model="user.email" v-validate="'required|email'" name="email">
        <span class="alert">{{ errors.first('email') }}</span>
      </div>
      <div>
        <p>Phone</p>
        <input type="text" v-model="user.phone">
      </div>
      <div>
        <p>Major</p>
        <input type="text" v-model="user.major">
      </div>
      <div>
        <p>Graduation Year <b>*</b></p>
        <input type="text" v-model="user.graduationyear" v-validate="'required'" name="year">
        <span class="alert">{{ errors.first('year') }}</span>
      </div>
      <div>
        <p>LinkedIn</p>
        <input type="text" v-model="user.linkedin">
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
</style>
