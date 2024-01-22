<!-- prettier-ignore -->

<template>
  <div>
    <HeaderComponent />
    <div class="container-fluid custom-container-width pr-0 py-4">
      <ItemList title="My Bookmarks" :isBookmark="true"  :items="bookmarkedRepos" />
      <div v-if="bookmarkedRepos?.length === 0" class="d-flex py-5 justify-content-center align-items-center">
        <h3 class="my-0" id="no-items-message">No Bookmarked Items</h3>
      </div>
      <ToggleTopics
        @search-input-changed="searchInputChanged"
      />   
      <div class="mt-4">
        <div v-if="resultRepositories?.length">
          <ItemList v-for="item in resultRepositories" :key="item.key" :listKey="item.key" :title="item.label" :items="item.items" :sortBy="item.sortBy" />
        </div>
        <div
          v-else
          class="d-flex justify-content-center align-items-center flex-column mt-5"
        >
          <img
            class="empty-list"
            :width="100"
            :src="require('@/assets-for-challenge/empty.png')"
          />
          <div class="d-flex justify-content-center align-items-center">
            <h3 class="my-0" id="no-items-message">No Items to display, please select a topic</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import ToggleTopics from "@/components/ToggleTopics.vue";
import ItemList from "@/components/ItemList.vue";
import { mapGetters } from "vuex";

export default {
  name: "discoveryView",
  components: {
    HeaderComponent,
    ToggleTopics,
    ItemList,
  },
  computed: {
    ...mapGetters({
      resultRepositories: "getResultRepositories",
      bookmarkedRepos: "getBookmarkedRepositories",
    }),
  },
};
</script>
