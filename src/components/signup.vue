<template>
  <div class="container-fluid bg-image">
      <div class="container">
          <div class="row">
              <div class="col-sm-8 offset-sm-2 mt-5">
                  <div class="signup-form">
                      <h4>Signup Details</h4>
                      <form @submit.prevent="handleSubmit">
                          <div class="form-group">
                              <label for="firstName">First Name</label>
                              <input type="text" v-model="user.firstName" v-validate="'required'" id="firstName" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('firstName') }" />
                              <div v-if="submitted && errors.has('firstName')" class="invalid-feedback">{{ errors.first('firstName') }}</div>
                          </div>
                          <div class="form-group">
                              <label for="lastName">Last Name</label>
                              <input type="text" v-model="user.lastName" v-validate="'required'" id="lastName" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('lastName') }" />
                              <div v-if="submitted && errors.has('lastName')" class="invalid-feedback">{{ errors.first('lastName') }}</div>
                          </div>
                          <div class="form-group">
                              <label for="email">Email</label>
                              <input type="email" v-model="user.email" v-validate="'required|email'" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" />
                              <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                          </div>
                          <div class="form-group">
                              <label for="phone">Phone</label>
                              <input type="tel" v-model="user.phone" v-validate="{ required: true, max: 10, min: 10 }" id="phone" name="phone" pattern="[0-9]" class="form-control" :class="{ 'is-invalid': submitted && errors.has('phone') }" />
                              <div v-if="submitted && errors.has('phone')" class="invalid-feedback">{{ errors.first('phone') }}</div>
                          </div>
                          <div class="form-group">
                              <label for="password">Password</label>
                              <input type="password" v-model="user.password" v-validate="{ required: true, min: 8 }" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" />
                              <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                          </div>
                           <div class="form-group">
                                <label for="confirmPassword">Confirm Password</label>
                               <input v-validate="{ required: true, min: 8, confirmed: user.password }" name="confirmPassword" type="password" class="form-control" data-vv-as="password" :class="{ 'is-invalid': submitted && errors.has('confirmPassword') }">
                                <div v-if="submitted && errors.has('confirmPassword')" class="invalid-feedback">
                                    {{ errors.first('confirmPassword') }}
                                </div>
                            </div>
                          <div class="form-group">
                              <button class="btn btn-primary">Register</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
 import router from '../router'
export default {
    name: 'signup',
    data () {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                phone:'',
                password: ''
            },
            submitted: false,
            hidden: true,
            storedEmail:'',
            allUsers: []
        }
    },
    methods: {
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    let existingUsers = JSON.parse(localStorage.getItem('userDetail'));
                    // this.storedEmail=JSON.parse(localStorage.getItem('userDetail')).email;
                    if(existingUsers) {
                      let userPresent = false;
											for(let i=0; i<existingUsers.length; i++) {
													let tempObj = existingUsers[i];
													if(tempObj.email === this.user.email) {
															userPresent = true;
															break;
													}
											}
											if(userPresent){
												alert('email already exists');
											} else {
													existingUsers.push(this.user);
													localStorage.setItem('userDetail', JSON.stringify(existingUsers));
													router.push({ name: "login" });
											}
                    } else {
                        this.allUsers.push(this.user);
												localStorage.setItem('userDetail', JSON.stringify(this.allUsers));
												router.push({ name: "login" });
                    }
                    
                       
                }
            });
        },
    }, 
};
</script>


<style scoped>
.bg-image {
	background: url('../assets/bg.jpg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	height: 100%;
}
h4{
    color: #fff;
    margin-bottom: 20px;
}
.hidden{
  display: none;
}
.signup-form label, .login-form label{
    color: #fff;
}
.btn-primary{
    background-color: transparent;
    border-color: #fff;
}
.btn-primary:hover, .btn-primary:focus, .btn-primary:active,.btn-primary:not(:disabled):active{
    box-shadow: none !important;
    outline: none;
    background-color: transparent;
    border-color: #fff;
}
</style>