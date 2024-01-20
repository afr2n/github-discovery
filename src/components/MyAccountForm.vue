<!-- prettier-ignore -->
<template>
  <div class="container d-flex justify-content-center align-items-center">
		<div class="row w-100">
            <div class="col-5 ">
                <h2 class="text-left">My Account</h2>
                <form @submit.prevent="submitForm">
                    <div class="w-100">
                        <CustomInput label="Username" placeholder="Username" :name="username" id="username" required />
                        <CustomInput label="Email" placeholder="Email" :name="email" id="email" />
                        <div class="row mx-0">
                            <CustomButton extraClass="pt-4 px-0" buttonType='solid' buttonText="Save" type="submit"/>
                        </div>
                    </div>
                </form>
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
