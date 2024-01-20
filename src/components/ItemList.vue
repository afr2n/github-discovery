<!-- prettier-ignore -->

<template>
  <div class="items-list container-fluid">
		<div class="flex row">
			<h3 class="text-left ">{{ isBookmark ? title : "Top " + title }}</h3>
			<div class="dropdown" v-if="!isBookmark" >
				<button @click="toggleDropdown" class="dropdown-btn">
					<span class="arrow " :class="{ 'up': isOpen, 'down': !isOpen }"></span>
				</button>
				<div v-if="isOpen" class="dropdown-content">
					<ul>
						<li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
							{{ option.label }}
						</li>
					</ul>
				</div>
			</div>
      <div class="card-list-container w-100">
        <CustomCard
          v-for="item in items"
          :key="item.id"
          :item="item"
          :isFromBookmarkList="isBookmark"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CustomCard from "@/components/CustomCard.vue";
import { mapGetters } from "vuex";
import store from "../store";

export default {
  props: {
    items: {
      type: Array,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    listKey: {
      type: String,
      required: false,
    },
    isBookmark: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedOption: "",
      options: [
        { label: "Sort by stars", value: "stars" },
        { label: "Sort by forks", value: "forks" },
        { label: "Sort by help wanted issues", value: "help-wanted-issues" },
        { label: "Sory by updated", value: "updated" },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
      console.log("option", option.value);
      console.log("listKey", this.listKey);
      store.dispatch("fetchGithubReposForTopic", {
        language: this.listKey,
        sort: option.value,
      });
    },
    myChangeFunction(event) {
      let value = event.target.value;
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        let searchValue = value.toLowerCase();
        this.$emit("search-input-changed", searchValue);
      }, 1500);
    },
  },
  computed: {
    ...mapGetters({
      toggleTopics: "getToggleTopics",
    }),
  },
  components: {
    CustomCard,
  },
};
</script>

<style scoped>
.toggle-topics {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.card-list-container {
  overflow-x: auto;
  display: flex;
  white-space: nowrap;
}
h3 {
  margin-top: 0;
  margin-bottom: -10px;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow {
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 8px 12px;
  width: 200px;
  cursor: pointer;
  text-align: left;
}

li:hover {
  background-color: #f2f2f2;
}
</style>
