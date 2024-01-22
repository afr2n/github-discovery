<!-- prettier-ignore -->
<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
		<div class="row w-100">
      <div class="col-5 mx-auto">
        <h2>Sign Up</h2>
        <form @submit.prevent="submitForm">
          <div class="w-100">
            <CustomInput label="Email" @input-changed="(val) => inputChanged(val, 'email')" placeholder="Email" v-model="email" type="email" id="email" required />
            <CustomInput label="Password" @input-changed="(val) => inputChanged(val, 'password')"  placeholder="**********" type="password" v-model="password" id="password" required />
            <CustomInput label="Repeat Password" @input-changed="(val) => inputChanged(val, 'repeatPassword')"  placeholder="**********" type="password" v-model="repeatPassword" id="repeatPassword" required />
            <CustomButton extraClass="w-100 pt-4 px-0" buttonType="solid" buttonText="Sign Up" type="submit" />
          </div>
        </form>

        <p>
          Have an account already? <router-link class="text-black" to="/login">Sign In</router-link>
        </p>
      </div>
		</div>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import store from "../store";

const redirectToLoginView = () => {
  setTimeout(() => {
    window.history.pushState(null, null, "/discovery");
  }, 3000);
};

export default {
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
    };
  },
  components: { CustomInput, CustomButton },
  methods: {
    submitForm() {
      if (this.password && this.password === this.repeatPassword) {
        createUserWithEmailAndPassword(
          getAuth(),
          this.email,
          this.password
        ).then((data) => {
          const userData = JSON.parse(JSON.stringify(data.user));
          this.showSuccessToast("Successfully Registered!");
          if (userData) {
            userData["username"] = userData.email.split("@")[0];
            store.commit("updateUserData", userData);
            redirectToLoginView();
          }
        });
      } else {
        if (this.password.length < 8) {
          this.showErrorToast("The password must be atleast 8 characters");
        } else {
          this.showErrorToast("Two passwords do not match");
        }
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
        case "repeatPassword":
          this.repeatPassword = val;
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
