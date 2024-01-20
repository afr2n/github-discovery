<!-- prettier-ignore -->
<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
		<div class="row w-100">
      <div class="col-5 mx-auto">
        <h2>Sign Up</h2>
        <form @submit.prevent="submitForm">
            <div class="w-100">
              <CustomInput label="Email" placeholder="Email" :name="email" id="email" required />
              <CustomInput label="Password" placeholder="**********" type="password" :name="password" id="password" required />
              <CustomInput label="Repeat Password" placeholder="**********" type="password" :name="repeatPassword" id="repeat-password" required />
              <CustomButton extraClass="w-100 pt-4 px-0" buttonType='solid' buttonText="Sign Up" type="submit"/>
            </div>
        </form>

        <p>
          Have an account already? <router-link class="text-black" to="/login">Login</router-link>
        </p>
      </div>
		</div>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: { CustomInput, CustomButton },
  methods: {
    submitForm() {
      // Perform login logic here
      console.log("Logging in with:", this.username, this.password);
      // You can make an API call or any other logic for authentication
    },
  },
};
</script>
