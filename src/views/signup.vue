<template>
  <div class="signup">
    <SignUpForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SignUpForm from "@/components/SignUpForm.vue";

export default {
  name: "SignupView",
  components: {
    SignUpForm,
  },
};
</script>
