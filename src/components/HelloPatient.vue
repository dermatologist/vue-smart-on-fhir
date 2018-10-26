<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <div>
          <ul>
              <li v-bind:key="post.uuid" v-for="post in conditions">
                  {{post.uuid}} | {{post.display}}
              </li>
          </ul>
          <p v-if="isLoading">loading posts...</p>
          <p v-if="error">loading failed</p>
      </div>

      <h2>SEARCH: </h2>
      <div class="autocomplete">
          <input size="60" type="text" @input="onChange"
                 v-model="search"
                 @keyup.down="onArrowDown" @keyup.up="onArrowUp" @keyup.enter="onEnter" />
          <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
              <li class="loading" v-if="isLoading">
                  Loading results...
              </li>
              <li v-else v-for="(result, i) in results" :key="i"
                  @click="setResult(result)" class="autocomplete-result"
                  :class="{ 'is-active': i === arrowCounter }">
                  {{ result }}
              </li>
          </ul>

      </div>
 </div>

</template>

<script>

import Conditions from '../services/conditionService';

/*
The services return $.deferred object that gets saved in
deferredPromise below.

*/
export default {
  name: 'HelloPatient',
  props: {
    msg: String,
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: 0,
      deferredPromise: null,
    };
  },
  created() {

  },
  computed: {
    error() {
      if (this.deferredPromise && this.deferredPromise.state() === 'rejected') {
        return true;
      }
      return false;
    },
    pending() {
      if (this.deferredPromise && this.deferredPromise.state() === 'pending') { return true; }
      return false;
    },
    /*
    TODO: This needs tweaking. Always returns [].
    The getPromise proceses the c.data.entry which is an array
    */
    conditions() {
      let toReturn = [];
      if (this.deferredPromise != null) {
        this.deferredPromise.done((c) => {
          toReturn = c.data.entry;
          this.getPromise(toReturn);
        });
      }
      return toReturn;
    },
  },
  methods: {

    onChange() {
      // Let's warn the parent that a change was made
      this.$emit('input', this.search);

      // Send request
      this.deferredPromise = Conditions(this.search);
    },

    filterResults() {
      /*
        If any filtering is needed, you may do it here.
      */
    },

    getPromise(p) {
      this.results = p;
      return p;
    },
    /*
    The rest of the code may not be needed for you app.
    This captures the clicked/selected result and displays
    the fullURL of the resource.
    */
    setResult(result) {
      this.search = result.fullUrl;
      this.isOpen = false;
    },

    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
        console.log(evt);
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      console.log(this.search);
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
  },

  watch: {
    pending(val, oldValue) {
      // actually compare them
      console.log(val, oldValue);
      if (val !== oldValue) {
        this.isOpen = true;
        this.isLoading = false;
      }
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },

  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
    width: 100%;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
    background-color: #4aae9b;
    color: white;
}

</style>
