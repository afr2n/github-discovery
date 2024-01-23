<template>
  <div class="signup">
    <SignUpForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SignUpForm from "@/forms/SignUpForm.vue";

export default {
  name: "SignupView",
  components: {
    SignUpForm,
  },
};
</script>
