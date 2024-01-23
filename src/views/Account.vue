<template>
  <div class="signup">
    <HeaderComponent />
    <MyAccountForm />
  </div>
</template>

<script>
// @ is an alias to /src
import MyAccountForm from "@/forms/MyAccountForm.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: "SignupView",
  components: {
    MyAccountForm,
    HeaderComponent,
  },
};
</script>
