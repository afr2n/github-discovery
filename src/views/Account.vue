<template>
  <div class="signup">
    <HeaderComponent />
    <MyAccountForm />
  </div>
</template>

<script>
// @ is an alias to /src
import MyAccountForm from "@/components/MyAccountForm.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: "SignupView",
  components: {
    MyAccountForm,
    HeaderComponent,
  },
};
</script>
