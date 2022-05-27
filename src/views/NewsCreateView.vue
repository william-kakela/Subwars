<template>
  <div class="news-create">
    <h1>Skapa nyheter</h1>
    <form @submit.prevent="createNews">
      <div class="input-wrapper-create-news">
      <label for="news">Nyheter</label>
      <input type="text" id="news" v-model="newsLetter" />
      </div>
      <button type="submit" class="button-create-news">Skapa Nyhet</button>
    </form>
  </div>
</template>

<script>
import { addDoc, collection } from "firebase/firestore";
import db from "@/firebase/firebase";

export default {
  name: "NewsCreateView",

  data() {
    return {
      newsLetter: "",
    };
  },

  methods: {
    async createNews() {
      try {
        const docRef = await addDoc(collection(db, "news"), {
          newsLetter: this.newsLetter,
        });

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
};
</script>

<style scoped>

.news-create {
  background: #272727;
  color: white;
}

.input-wrapper-create-news {
	display: flex;
	flex-direction: column;
	gap: 5px;
  padding-bottom: 20px;
  margin-left: 730px;
  width: 308px;
}

.button-create-news {
   background: #646464;
   color: white;
   border-radius: 10px;
   width: 120px;
   height: 40px;
   border: none;
}

</style>