<!-- prettier-ignore -->

<template>
	<div class="card px-2 mt-4 mb-5" @mouseover="zoomIn" @mouseleave="resetZoom">
    <div class="card-content">
      <div class="starContainer"> 
        <CustomButton
          :isDisabled="false"
          :onButtonClick="handleBookmarkClick"
          :isIcon="true"
          :isActive="isBookmarked || isFromBookmarkList"
          :activeIconUrl="require('@/assets-for-challenge/star-solid.svg')"
          :iconUrl="require('@/assets-for-challenge/star-regular.svg')"
        />
      </div>
      <div class="text-left">
        <a class="text-black" :href="item.html_url" target="_blank" rel="noopener noreferrer">
        <span class="title ">{{item.name}}</span>
        </a> 
        <p>{{item.description}}</p>
      </div>
      <div>
        <p class="lastUpdated text-right">Last Updated: {{lastUpdatedDate}}</p>
      </div>
    </div>
	</div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";
import store from "../store";
import { mapGetters } from "vuex";

export default {
  data() {
    const itemUpdatedAt = this.item.updated_at;
    const updatedDate =
      String(new Date(itemUpdatedAt).getDate()).padStart(2, "0") +
      "/" +
      String(new Date(itemUpdatedAt).getMonth() + 1).padStart(2, "0") +
      "/" +
      new Date(itemUpdatedAt).getFullYear();
    const isBookmarked = this.bookmarkedRepos?.find(
      (i) => i.id === this.item.id
    );
    return {
      lastUpdatedDate: updatedDate,
      isBookmarked: isBookmarked,
    };
  },
  created() {
    const bookmarkedArr = JSON.parse(JSON.stringify(this.bookmarkedRepos));
    const isBookmarked = bookmarkedArr?.find((i) => i.id === this.item.id);
    this.isBookmarked = isBookmarked;
  },
  methods: {
    handleBookmarkClick() {
      store.dispatch("handleBookmarkClick", { item: this.item });
    },
  },
  watch: {
    watchBookmarkedRepos(newVal) {
      this.isBookmarked = newVal;
    },
  },
  computed: {
    ...mapGetters({
      bookmarkedRepos: "getBookmarkedRepositories",
    }),
    watchBookmarkedRepos() {
      const isBookmarked = this.bookmarkedRepos?.find(
        (i) => i.id === this.item.id
      );
      return isBookmarked;
    },
  },
  props: {
    item: {
      type: Object,
      required: false,
    },
    isFromBookmarkList: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    CustomButton,
  },
};
</script>

<style scoped>
.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  word-wrap: break-word;
  background-color: #f6f7f8;
  background-clip: border-box;
  /* background: url("@/assets-for-challenge/repo.png") 0 0 no-repeat;
  background-size: 300px 150px; */
  -webkit-box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.06);
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.06);
  width: 300px;
  height: 150px;
  padding-top: 1.5rem;
  margin-right: 10px;
  flex-shrink: 0;
}
.card:hover {
  transform: scale(1.25);
  box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 8px;
  z-index: 50;
}
.card:hover:first-child {
  margin-left: 50px;
}
.card:hover .starContainer {
  cursor: pointer;
  z-index: 50;
}
.starContainer {
  position: absolute;
  right: 0;
  top: 0;
}
.title {
  text-transform: capitalize;
  font-weight: bold;
}
.text-right {
  text-align: right;
}
p {
  display: flex;
  flex-wrap: wrap;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
  white-space: normal;
  line-height: 1.2em;
  margin-bottom: 0;
}
.card-content {
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.lastUpdated {
  font-size: 12px;
}
</style>
