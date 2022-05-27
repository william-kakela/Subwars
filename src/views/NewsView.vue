<template>
  <div class="news">
    <div class="news-header">
      <h1>Nyheter</h1>
      <router-link to="/news-create" tag="button" class="create-news-button"
        >skapa nyheter</router-link
      >
    </div>
    <section class="news-wrapper">
      <article class="news-box" v-for="(news, index) in newsLetters" :key="index">
        <div class="news-img"></div>
        <div class="news-text">
          <h3>
          {{ news.newsLetter }}
          </h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
            dolor quod iusto a excepturi earum magnam aliquid saepe nisi neque
            est rerum fugit beatae consequatur accusamus veritatis id, laborum
            maxime totam minus laboriosam reprehenderit modi perferendis
            adipisci. Sapiente error tenetur illo cumque cupiditate iure ratione
            voluptates explicabo beatae porro a nesciunt nisi pariatur, quod
            amet et dolore perspiciatis delectus inventore necessitatibus
            corporis illum tempore minus animi. A officiis optio voluptates, hic
            magnam velit quia aut excepturi aspernatur. Aperiam nisi nesciunt
            reiciendis deserunt incidunt quisquam quae accusamus inventore fuga
          </p>
        </div> 
      </article>
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
  color: white;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.news-box {
  color: white;
  border-bottom: 1px solid #404040;
  display: flex;
  padding: 30px;
}

.news-img {
  height: 200px;
  width: 200px;
  background: url("@/assets/nyhet.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  flex-shrink: 0;
}

.news-box p {
  color: #ccc;
  font-size: 12px;
  line-height: 1.2rem;
}

.news-text {
  padding-inline: 50px;
}

.create-news-button {
  background: #646464;
  color: white;
  border-radius: 10px;
  width: 120px;
  height: 40px;
  border: none;
  cursor: pointer;
}
</style>