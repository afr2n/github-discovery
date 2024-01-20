import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChallegeView from "../views/viewChallenge.vue";
import LoginView from "../views/login.vue";
import SignupView from "../views/signup.vue";
import MyAccountView from "../views/Account.vue";
import Discovery from "../views/Discovery.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/account",
    name: "account",
    component: MyAccountView,
  },
  {
    path: "/discovery",
    name: "discovery",
    component: Discovery,
  },
  {
    path: "/challenge",
    name: "challenge",
    component: ChallegeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
