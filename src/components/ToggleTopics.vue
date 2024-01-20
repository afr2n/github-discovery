<template>
  <div class="toggle-topics">
    <h3 class="mb-1">Topics</h3>
    <div>
      <CustomButton
        v-for="item in toggleTopics"
        :key="item.key"
        :isDisabled="false"
        :onButtonClick="() => loadGithubRepos(item.key)"
        :isIcon="false"
        buttonType="secondary"
        :isActive="item.selected"
        :buttonText="item.label"
        extraClass="pl-0"
      />
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";
import { mapGetters } from "vuex";
import store from "../store";

export default {
  methods: {
    myChangeFunction(event) {
      let value = event.target.value;
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        let searchValue = value.toLowerCase();
        this.$emit("search-input-changed", searchValue);
      }, 1500);
    },
    loadGithubRepos(topic) {
      const currentTopics = JSON.parse(JSON.stringify(this.toggleTopics));
      if (currentTopics.find((i) => i.key === topic && i.selected)) {
        store.dispatch("unsetGithubReposForTopic", { language: topic });
      } else {
        store.dispatch("fetchGithubReposForTopic", { language: topic });
      }
    },
  },
  computed: {
    ...mapGetters({
      toggleTopics: "getToggleTopics",
    }),
  },
  components: {
    CustomButton,
  },
};
</script>

<style scoped>
.toggle-topics {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
