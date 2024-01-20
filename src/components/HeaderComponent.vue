<template>
  <div class="headerClass">
    <div class="container-fluid custom-container-width py-4">
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center mx-2">
          <h3 class="my-0 mx-2" id="app-title">GITHUB DISCOVERY</h3>
          <router-link to="/discovery">
            <CustomButton
              :isDisabled="false"
              :onButtonClick="uploadTranscriptions"
              :isIcon="false"
              :isActive="$route.path === '/discovery'"
              buttonText="Discovery"
            />
          </router-link>
        </div>
        <div class="d-flex flex-row align-items-start mx-2">
          <router-link to="/account">
            <CustomButton
              :isDisabled="false"
              :onButtonClick="uploadTranscriptions"
              :isIcon="false"
              :isActive="$route.path === '/account'"
              buttonText="Username"
            />
          </router-link>
          <!-- <CustomButton
            :isDisabled="false"
            :onButtonClick="uploadTranscriptions"
            :isIcon="true"
            :isActive="true"
            :iconUrl="require('@/assets-for-challenge/star-regular.svg')"
          /> -->
          <router-link to="/login">
            <CustomButton
              :isDisabled="false"
              :onButtonClick="uploadTranscriptions"
              :isIcon="false"
              buttonText="Logout"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";
import store from "../store";
import { mapGetters } from "vuex";

export default {
  methods: {
    uploadTranscriptions() {
      store.commit("updateCurrentLoadingButton", "post-transcriptions");
      store.dispatch("postTranscriptionsAction");
    },
    loadTranscriptions() {
      store.commit("updateCurrentLoadingButton", "fetch-transcriptions");
      store.dispatch("fetchTranscriptionsAction");
    },
  },
  computed: {
    ...mapGetters({
      currentLoadingButton: "getCurrentLoadingButton",
    }),
  },
  components: {
    CustomButton,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-family: "Montserrat-Medium";
  font-size: 18px;
}
</style>
