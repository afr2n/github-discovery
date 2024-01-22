<template>
  <div class="login">
    <LoginForm :router="router" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
  setup() {
    const router = useRouter();
    // Now, you can use router.push(), router.replace(), etc.
    console.log("router in view", router);
    return {
      router,
    };
  },
};
</script>
