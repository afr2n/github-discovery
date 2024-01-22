import { createStore } from "vuex";
import { api } from "@/utils/api.js";
import createPersistedState from "vuex-persistedstate";

const myModule = {
  state: {
    currentLoadingButton: ``,
    toggleTopics: [
      {
        key: "vue",
        label: "Vue",
        selected: false,
        sortNum: 0,
      },
      {
        key: "typescript",
        label: "Typescript",
        selected: false,
        sortNum: 1,
      },
      {
        key: "javascript",
        label: "Javascript",
        selected: false,
        sortNum: 2,
      },
      { key: "go", label: "GO", selected: false, sortNum: 3, sortBy: "stars" },
      {
        key: "css",
        label: "CSS",
        selected: false,
        sortNum: 4,
      },
      {
        key: "node",
        label: "Node",
        selected: false,
        sortNum: 5,
      },
    ],
    resultRepositories: [],
    bookmarkedRepos: [],
    userData: null,
  },
  getters: {
    getCurrentLoadingButton(state) {
      return state.currentLoadingButton;
    },
    getToggleTopics(state) {
      return state.toggleTopics;
    },
    getResultRepositories(state) {
      return state.resultRepositories;
    },
    getBookmarkedRepositories(state) {
      return state.bookmarkedRepos;
    },
    getUserData(state) {
      return state.userData;
    },
  },
  mutations: {
    updateUserData(state, data) {
      state.userData = data;
    },
    updateCurrentLoadingButton(state, buttonId) {
      state.currentLoadingButton = buttonId;
    },
    updateGithubRepoResults(state, updatedArr) {
      state.resultRepositories = [...updatedArr];
    },
    updateToggleTopics(state, updatedArr) {
      state.toggleTopics = [...updatedArr];
    },
    updateBookmarkedRepo(state, updatedArr) {
      state.bookmarkedRepos = [...updatedArr];
    },
  },
  actions: {
    fetchGithubReposForTopic({ commit, state }, payload) {
      const urlToFetch = api.getDataSourceUrl(payload.language, payload.sort);
      const language = payload.language;
      api
        .get(urlToFetch)
        .then((data) => {
          const oldResult = [...state.resultRepositories];
          const toggleTopics = JSON.parse(JSON.stringify(state.toggleTopics));
          const keyExistInResult = oldResult.findIndex(
            (i) => i.key === language
          );
          let newResult = JSON.parse(JSON.stringify(state.resultRepositories));
          const dataItemsToUse = data.items.map((item) => {
            return {
              id: item.id,
              name: item.name,
              updated_at: item.updated_at,
              html_url: item.html_url,
              description: item.description,
            };
          });
          if (keyExistInResult > -1) {
            newResult[keyExistInResult]["items"] = dataItemsToUse;
            newResult[keyExistInResult]["sortBy"] = payload.sort;
          } else {
            newResult.push({
              key: language,
              label: toggleTopics.find((i) => i.key === language).label,
              sortNum: toggleTopics.find((i) => i.key === language).sortNum,
              items: dataItemsToUse,
              sortBy: payload.sort,
            });
          }
          const sortedResult = newResult.sort((a, b) => a.sortNum - b.sortNum);
          const selectedTopics = newResult.map((obj) => obj.key);
          const updatedArray = toggleTopics.map((item) => ({
            ...item,
            selected: selectedTopics.includes(item.key),
          }));
          commit("updateToggleTopics", updatedArray);
          commit("updateGithubRepoResults", sortedResult);
        })
        .catch((e) => {
          console.log("ERROR", e);
        });
    },
    unsetGithubReposForTopic({ commit, state }, payload) {
      const oldResult = JSON.parse(JSON.stringify(state.resultRepositories));
      const updatedResults = oldResult.filter(
        (i) => i.key !== payload.language
      );
      commit("updateGithubRepoResults", updatedResults);
      const toggleTopics = JSON.parse(JSON.stringify(state.toggleTopics));
      const selectedTopics = updatedResults.map((obj) => obj.key);
      const updatedArray = toggleTopics.map((item) => ({
        ...item,
        selected: selectedTopics.includes(item.key),
      }));
      commit("updateToggleTopics", updatedArray);
    },
    handleBookmarkClick({ commit, state }, payload) {
      let newBookmarked = JSON.parse(JSON.stringify(state.bookmarkedRepos));
      if (newBookmarked.find((i) => i.id === payload.item.id)) {
        newBookmarked = newBookmarked.filter((i) => i.id !== payload.item.id);
      } else {
        newBookmarked.push(payload.item);
      }
      commit("updateBookmarkedRepo", newBookmarked);
    },
  },
};

export default createStore({
  modules: { myModule },
  plugins: [
    createPersistedState({
      key: "vuexPersistedState",
      paths: ["myModule"],
    }),
  ],
});
