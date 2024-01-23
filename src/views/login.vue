<template>
  <div class="login">
    <LoginForm :router="router" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/forms/LoginForm.vue";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
};
</script>
