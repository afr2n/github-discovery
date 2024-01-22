import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/login.vue";
import SignupView from "../views/signup.vue";
import MyAccountView from "../views/Account.vue";
import Discovery from "../views/Discovery.vue";
import { getAuth } from "firebase/auth";
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/discovery",
    name: "discovery",
    component: Discovery,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});
export default router;
