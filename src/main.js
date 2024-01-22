import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles.scss";
import "./gridStyles.scss";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9CtaN49BVlf3gv0vEKxVrHHz0V_F7gvw",
  authDomain: "githubdiscovery.firebaseapp.com",
  projectId: "githubdiscovery",
  storageBucket: "githubdiscovery.appspot.com",
  messagingSenderId: "693177247471",
  appId: "1:693177247471:web:5150300206ba4bebef1d1a",
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(ToastPlugin).use(store).use(router).mount("#app");
