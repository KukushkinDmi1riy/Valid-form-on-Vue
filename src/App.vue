<template>
<div class="container">
  <form class="pt-3" @submit.prevent="onSubmit">
     <div class="form-group">
      <label for="email">Email!</label>
      <input type="email" id="email" class="form-control"
      @blur="$v.email.$touch()"
      v-model="email"
      :class="{'is-invalid': $v.email.$error}">
       <div class="invalid-feedback" v-if="!$v.email.email">
        Please provide a valid email.
      </div>
      <div class="invalid-feedback" v-if="!$v.email.required">
        Please enter your email.
      </div>
      <div class="invalid-feedback" v-if="!$v.email.uniqEmail">
        Please enter other email. This Email is already exists.
      </div>
     </div>

  <div class="form-group">
      <label for="password">password!</label>
      <input type="password" id="password" class="form-control"
      :class="{'is-invalid': $v.password.$error}"
      @blur="$v.password.$touch()"
      v-model="password"
      >
      <div class="invalid-feedback" v-if="!$v.password.minLength">
        Please enter your password. Min length {{$v.password.$params.minLength.min}}. Now it is {{password.length}}
      </div>
  </div>

 
 
 
 
 
 <div class="form-group">
      <label for="confirm">confirm your password!</label>
      <input 
      type="password" 
      id="confirm" 
      class="form-control"
      :class="{'is-invalid': $v.confirmPas.$error}"
      @blur="$v.confirmPas.$touch()"
      v-model="confirmPas"
      >
      <div class="invalid-feedback" v-if="!$v.confirmPas.sameAs">
        Password should be matched.
      </div>
  </div>
<button 
class="btn btn-success" 
type='submit'
:disabled="($v.password.$model.length<=$v.password.$params.minLength.min-1)|| ($v.$invalid)"   
>Submit form</button>

 <pre>
  {{$v.password}}
  {{$v.confirmPas}}
  {{$v.password.$model.length}}
</pre> 
<!--
prevent в form чтоб не перегружалось при отправке

 -->

  </form>
</div>
</template>

<script>

import { required, email, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
data(){
  return{
    email:'',
    password:'',
    confirmPas:''
  }
},
methods:{
  onSubmit(){
    console.log('Email', this.email);
    console.log('password', this.password);
    
    
  }
},

validations:{
  email:{    //контрол емэйл
    required, //required: required
    email,//email:email
    uniqEmail: function(newEmail){
      if (newEmail === '') return true
      return new Promise((resolve, reject)=>{            //симуляция сервера через отложенную функцию.
        setTimeout(()=>{
          const value = newEmail !== 'test@mail.ru'
          resolve(value)
        },1000)
      })
    }
  },
  password:{
    minLength: minLength(6)
  },
  confirmPas:{
    sameAs: sameAs((vue)=>{
      return vue.password
    })
  }
}
  
}
</script>

<style scoped>

</style>
