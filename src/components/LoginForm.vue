<!-- prettier-ignore -->
<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
		<div class="row w-100">
      <div class="col-5 mx-auto">
        <h2>Sign In</h2>
        <form @submit.prevent="submitForm">
            <div class="w-100">
            <CustomInput label="Email" @input-changed="(val) => inputChanged(val, 'email')" placeholder="Email" v-model="email" type="email" id="email" required />
            <CustomInput label="Password" @input-changed="(val) => inputChanged(val, 'password')"  placeholder="**********" type="password" v-model="password" id="password" required />
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
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import store from "../store";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  components: { CustomInput, CustomButton },
  methods: {
    submitForm() {
      if (this.password && this.email) {
        signInWithEmailAndPassword(getAuth(), this.email, this.password)
          .then((data) => {
            const userData = JSON.parse(JSON.stringify(data.user));
            this.showSuccessToast("Successfully Logged In!");
            if (userData) {
              userData["username"] = userData.email.split("@")[0];
              store.commit("updateUserData", userData);
              console.log("this.$router", this.$router);
              this.$router.push("/discovery");
            }
          })
          .catch((error) => {
            console.log("error", error);
            let errorMsg = "An error occurred while signing in.";
            switch (error.code) {
              case "auth/invalid-credential":
                errorMsg = "Email or password incorrect";
                break;
            }
            setTimeout(() => {
              this.showErrorToast(errorMsg);
            }, 1000);
          });
      } else {
        this.showErrorToast("Please enter email and password");
      }
    },
    inputChanged(val, variable) {
      switch (variable) {
        case "email":
          this.email = val;
          break;
        case "password":
          this.password = val;
          break;
      }
    },
    showSuccessToast(message) {
      const toast = useToast();
      toast.success(message);
    },
    showErrorToast(message) {
      const toast = useToast();
      toast.error(message);
    },
  },
};
</script>
