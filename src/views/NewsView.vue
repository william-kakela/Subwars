<template>
  <div class="news">
    <div class="news-header">
      <h1>News</h1>
      <router-link to="/news-create" tag="button" class="create-news-button"
        >Create news</router-link>
    </div>
    <section class="news-wrapper">
      <div class="news-box" v-for="(news, index) in newsLetters" :key="index">
          <div class="news-img"></div>
          <div class="news-text">
          {{ news.newsLetter }}
          <p>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsu m lorem ipsum lorem ipsum dasdadasd asdasd asjhbdas das askdhba
            sjdhb asdjhb asd as dasjhbd ajshb dhjasdjhasb djhabs
          </p>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import db from "@/firebase/firebase";

export default {
  name: "NewsView",

  created() {
    this.fetchNews();
  },

  data() {
    return {
      newsLetters: [],
    };
  },

  methods: {
    async fetchNews() {
      const querySnapshot = await getDocs(collection(db, "news"));
      querySnapshot.forEach((doc) => {
        this.newsLetters.push(doc.data());
      });
    },
  },
};
</script>

<style scoped>

.news {
  background: #272727;
  min-height: 100vh;
  color: white;
  padding: 4rem;
}

.news-header {
  display: flex;
  justify-content: space-between;
}

.news-header h1 {
  margin-left: 870px;
}

.news-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  border-style: solid;
  gap: 40px;
}

.news-img {
  height: 120px;
  width: 120px;
  background: url("@/assets/nyhet.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 2rem;
}

.news-box {
  background: #646464;
  color: white;
}

.news-box p {
  color: white;
}

.news-text {
  display: flex;
	flex-direction: column; 
	gap: 30px; 
	align-items: flex-end;
  width: 400px;
}

.create-news-button {
  background: #646464;
  color: white;
  border-radius: 10px;
  width: 120px;
  height: 40px;
  border: none;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>