<template>
  <div class="headerClass">
    <div class="container-fluid custom-container-width py-4">
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <h3 class="my-0" id="app-title">GITHUB DISCOVERY</h3>
          <router-link to="/discovery">
            <CustomButton
              :isDisabled="false"
              :isIcon="false"
              :isActive="$route.path === '/discovery'"
              buttonText="Discovery"
              extraClass="ml-4"
              id="discovery"
            />
          </router-link>
        </div>
        <div class="d-flex flex-row align-items-start mx-2">
          <router-link to="/account">
            <CustomButton
              :isDisabled="false"
              :isIcon="false"
              :isActive="$route.path === '/account'"
              :buttonText="username"
              id="userAccname"
            />
          </router-link>
          <CustomButton
            :isDisabled="false"
            :isIcon="false"
            :onButtonClick="logoutUser"
            buttonText="Logout"
            id="logout"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";
import { getAuth, signOut } from "firebase/auth";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      username: "",
    };
  },
  created() {
    this.updateUsername();
  },
  watch: {
    userData: "updateUsername",
  },
  computed: {
    ...mapGetters({
      userData: "getUserData",
    }),
  },
  methods: {
    updateUsername() {
      const userDataObj = JSON.parse(JSON.stringify(this.userData));
      if (userDataObj.username) {
        this.username = userDataObj.username;
      } else {
        this.username = "";
      }
    },
    logoutUser() {
      signOut(getAuth()).then(() => {
        this.$router.push("/login");
      });
    },
  },
  components: {
    CustomButton,
  },
};
</script>

<style scoped>
h3 {
  font-family: "Montserrat-Medium";
  font-size: 18px;
}
.headerClass {
  background-color: #f6f7f8;
}
</style>
