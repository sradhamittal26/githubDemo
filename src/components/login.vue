<template>
  <div class="container-fluid bg-image">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2 mt-5">
          <div class="login-form" v-if="hidden">
            <h4>Login Details</h4>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  v-validate="'required|email'"
                  id="email"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && errors.has('email') }"
                >
                <div
                  v-if="submitted && errors.has('email')"
                  class="invalid-feedback"
                >{{ errors.first('email') }}</div>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  v-model="user.password"
                  v-validate="{ required: true, min: 8 }"
                  id="password"
                  name="password"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && errors.has('password') }"
                >
                <div
                  v-if="submitted && errors.has('password')"
                  class="invalid-feedback"
                >{{ errors.first('password') }}</div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>

          <div v-if="!hidden">
            <div class="user-details">
              <h4>User Details</h4>
              <p>
                <label for="fname">First Name:</label>
                {{storedData.firstName}}
              </p>
              <p>
                <label for="lname">Last Name:</label>
                {{storedData.lastName}}
              </p>
              <p>
                <label for="phone">Phone Number:</label>
                {{storedData.phone}}
              </p>
              <p>
                <label for="email">Email:</label>
                {{storedData.email}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      hidden: true,
      showError: true,
      submitted: false,
      userData: "",
      userEmail: "",
      userPassword: "",
      userEnteredData: "",
      storedData: []
    };
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.userData = localStorage.getItem("userDetail");
          var userDetail = JSON.parse(this.userData);
          this.userEnteredData = JSON.stringify(this.user);
          this.userEmail = JSON.parse(this.userEnteredData).email;
          this.userPassword = JSON.parse(this.userEnteredData).password;
          for (let i = 0; i < userDetail.length; i++) {
            this.storedData = userDetail[i];
            console.log(this.storedData.email, "wwwwwww");
            let storedUserEmail = this.storedData.email;
            let storedPassWord = this.storedData.password;
            if (
              this.userEmail == storedUserEmail &&
              this.userPassword == storedPassWord
            ) {
              this.hidden = false;
              return;
            }
            alert("Invalid Username or Password! Please try again.");
          }
        }
      });
    }
  }
};
</script>


<style scoped>
.bg-image {
  background: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}
h4 {
  color: #fff;
  margin-bottom: 20px;
}
.error-field {
  border: 1px solid red;
  color: #fff;
}
.hidden {
  display: none;
}
.login-form label {
  color: #fff;
}
.btn-primary {
  background-color: transparent;
  border-color: #fff;
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active,
.btn-primary:not(:disabled):active {
  box-shadow: none !important;
  outline: none;
  background-color: transparent;
  border-color: #fff;
}
.user-details label,
.user-details p {
  color: #fff;
}
</style>