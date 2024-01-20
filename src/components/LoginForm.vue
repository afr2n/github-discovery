<!-- prettier-ignore -->
<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
		<div class="row w-100">
      <div class="col-5 mx-auto">
        <h2>Sign In</h2>
        <form @submit.prevent="submitForm">
            <div class="w-100">
              <CustomInput label="Username" placeholder="Username" :name="username" id="username" required />
              <CustomInput label="Password" placeholder="**********" type="password" :name="password" id="password" required />
              <CustomButton extraClass="w-100 pt-4 px-0" buttonType='solid' buttonText="Sign In" type="submit"/>
            </div>
        </form>

        <p>
          Don't have an account? <router-link class="text-black" to="/signup">Click here to Sign up</router-link>
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
