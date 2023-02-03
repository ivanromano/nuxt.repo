<template>


  
<v-form @submit.prevent="(HandleRegister)" ref="form" v-model="valid" lazy-validation>
  <main class="mx-auto <lg:w-[90%] lg:w-[55%]">  
    <v-text-field color="primary" v-model.trim="email" :rules="[ruleEmail.required, ruleEmail.email]" label="Email"/>
    <v-text-field color="primary" v-model.trim="password" :rules="[rules.required, rules.min]" :type="show2 ? 'text' : 'password'" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" name="input-10-2" label="Password"
      hint="At least 8 characters"
      class="input-group--focused"
      @click:append="show2 = !show2"
      ></v-text-field>
    <v-text-field color="primary" v-model.trim="repassword" :rules="[rerules.required, rerules.min]" type='password' name="input-10-2" label="repassword" hint="At least 8 characters" class="input-group--focused" @click:append="show2 = !show2" ></v-text-field>
      <button type="submit" class="vic-btn lg:mx-[7rem]">
        <span class="vic-btn-span">
          Register
        </span>
      </button>
  </main>
</v-form>
</template>

<script setup>
import axios from 'axios';
// import { notify } from "@kyvg/vue3-notification";

const supaAuth = useSupabaseAuthClient().auth


const email = ref('email')
const password = ref('')
const repassword = ref('')
const errors = ref([])
const valid = ref(true)


const validate = async() => {
  console.log('haz llegado');
  const { valid } = await this.$refs.form.validate()
  
  if (valid) {
    alert('Form is valid')
    console.log(username, password, repassword);
  } else {
   alert('nonon')
   console.log(username, password, repassword);
  }
}

const HandleRegister = async() => {

  if (email.value === '') {
    return
  }

  if (password.value === '') {
    return
  }

  if (password.value !== repassword.value) {
    return 
  }
  const formData = {
    email: email.value,
    password: password.value
  }
  console.log(formData);

  const {error} = await supaAuth.signUp(formData)
    if (error) {
      return
    } else {
      console.log("funciono");
      navigateTo("/")
    }
}

const show2 = ref(false)

const ruleEmail = {
  required: value => !!value || 'Required.',
  counter: value => value.length <= 20 || 'Max 20 characters',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
      },
    }




const rules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
  emailMatch: () => (`The email and password you entered don't match`),
  }

const rerules = {
  required: value => !!value || 'Required.',
  min: v => v === password.value || 'The passwords do not match.',
}
</script>

<style lang="scss" scoped>

</style>