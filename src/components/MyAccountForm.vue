<!-- prettier-ignore -->
<template>
  <div class="container d-flex justify-content-center align-items-center">
		<div class="row w-100">
            <div class="col-5 px-0">
                <h2 class="text-left">My Account</h2>
                <form @submit.prevent="submitForm">
                    <div class="w-100">
                        <CustomInput label="Username" @input-changed="(val) => inputChanged(val, 'username')" placeholder="Username" :modelValue="username" v-model="username" type="text" id="username" required />    
                        <CustomInput label="Email" @input-changed="(val) => inputChanged(val, 'email')" placeholder="Email" v-model="email" type="email" id="email" required />                        <div class="row mx-0">
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
import { mapGetters } from "vuex";
import store from "../store";

export default {
  data() {
    return {
      username: "",
      email: "",
    };
  },
  created() {
    const userDataObj = JSON.parse(JSON.stringify(this.userData));
    if (userDataObj.email) {
      this.email = userDataObj.email;
    }
    if (userDataObj.username) {
      this.username = userDataObj.username;
    }
  },
  watch: {
    userData: {
      handler(newVal) {
        if (newVal && newVal.email) {
          this.email = newVal.email;
        }
        if (newVal && newVal.username) {
          this.username = newVal.username;
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({
      userData: "getUserData",
    }),
    watchUserData() {
      const userData = this.userData;
      return userData;
    },
  },
  components: { CustomInput, CustomButton },
  methods: {
    submitForm() {
      let userData = JSON.parse(JSON.stringify(this.userData));
      userData["email"] = this.email;
      userData["username"] = this.username;
      store.commit("updateUserData", userData);
    },
    inputChanged(val, variable) {
      switch (variable) {
        case "email":
          this.email = val;
          break;
        case "username":
          this.username = val;
          break;
      }
    },
  },
};
</script>
