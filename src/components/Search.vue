<template>
  <div id="search">
    <h1>BeerDB App</h1>
    <div class="search-wrapper">
      <label class="search-label">Search Beer Recipes</label>
      <input
        class="search-input"
        type="text"
        v-model="searchTerm"
        v-on:input="performSearch"
        placeholder="Beer Name..."
      >
    </div>
    <div class="results-wrapper">
      <div class="result" v-for="recipe in recipes" v-bind:key="recipe.BeerID">
        <div class="result-info-container">
          <span class="result-name">
            <b>Name:</b>
            {{recipe.Name}}
          </span>
          <span class="result-style">
            <b>Style:</b>
            {{recipe.Style}}
          </span>
          <ui-button class="result-button">More Info & Comments</ui-button>
        </div>
        <div class="result-image-container">
          <a :href="externalURL + recipe.URL" target="_blank" class="result-link">
            <img class="result-image" :src="imageURL + recipe.Color">
          </a>
        </div>
      </div>
      <div
        v-if="recipes.length < 1 && searchTerm.length < 3"
      >Enter a value to search. (3 characters minimum)</div>
      <div v-if="recipes.length < 1 && searchTerm.length >= 3">No results found for {{searchTerm}}.</div>
    </div>
    <ui-button @click="openModal('modal1')">Basic Modal</ui-button>
    <ui-modal ref="modal1" title="Basic Modal">Hi World~~~{{searchTerm}}</ui-modal>
  </div>
</template>

<script>
export default {
  name: "Search",
  methods: {
    openModal(ref) {
      this.$refs[ref].open();
    },
    performSearch() {
      const apiURL = this.apiURL;
      const search = this.searchTerm;
      const pageNum = this.pageNum;
      const numResults = this.numResults;

      // Only search terms longer than three characters
      if (search.length >= 3) {
        let query = `findRecipeByName?name=${search}&rpp=${numResults}&page=${pageNum}`;
        query = encodeURI(query);

        this.$http
          .get(apiURL + query)
          .then(response => {
            const results = response.data;
            this.recipes = results;
            console.dir(response.data[0]);
          })
          .catch(error => {
            console.dir(error);
          });
      }
    }
  },
  data: () => {
    return {
      apiURL: "https://beerdbapi.herokuapp.com/",
      imageURL: "https://beerdbapi.herokuapp.com/image?color=",
      externalURL: "https://www.brewersfriend.com",
      searchTerm: "",
      pageNum: 1,
      numResults: 5,
      recipes: []
    };
  },
  components: {}
};
</script>

<style>
.search-wrapper {
  width: 100%;
  overflow: auto;
}

.search-label {
  width: 100%;
  float: left;
  margin: 0 auto;
  clear: both;
}

.search-input {
  width: 70%;
  margin: 10px auto;
  clear: both;
}

.results-wrapper {
  width: 90%;
  margin: 10px auto;
  border: 1px solid black;
}

.result {
  width: 100%;
  padding: 5px;
  margin: 0 auto 2px auto;
  border: 1px solid black;
  display: flex;
  align-items: flex-start;
}

.result-info-container {
  width: calc(100% - 150px);
}

.result-name {
  float: left;
  clear: both;
}

.result-style {
  float: left;
  clear: left;
}

.result-button {
  float: left;
  clear: left;
  margin: 10px;
}

.result-image-container {
  width: 150px;
  height: 150px;
}

.result-link {
  overflow: auto;
}

.result-image {
  width: 100%;
  height: 100%;
}
</style>
