<template>
  <div class="news-create">
    <h1>Skapa nyheter</h1>
    <form @submit.prevent="createNews">
      <div class="input-wrapper-create-news">
      <label for="news">Nyheter</label>
      <input type="text" id="news" v-model="newsLetter" />
      </div>
       <div class="input-wrapper-create-newstext">
      <label for="news-text">Skriv text till nyhet</label>
      <textarea type="text" id="news-text" v-model="newsText" />
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
      newsText: '',
    };
  },

  methods: {
    async createNews() {
      try {
        const docRef = await addDoc(collection(db, "news"), {
          newsLetter: this.newsLetter,
          newsText: this.newsText
        });

        console.log("Document written with ID: ", docRef.id);
        this.newsLetter = '',
        this.newsText = ''
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
  text-align: center;
}

.input-wrapper-create-news {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 20px;
  align-items: center;
}

.input-wrapper-create-news > input {
  width: 300px;
  background-color: #646464;
  border: none;
  padding: 10px;
  border-radius: 5px;
  color: white;
}

::placeholder {
  color: white;
}

.input-wrapper-create-newstext {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 20px;
  align-items: center;
}

.input-wrapper-create-newstext > textarea {
  width: 700px;
  height: 500px;
  background-color: #646464;
  border: none;
  padding: 10px;
  border-radius: 5px;
  color: white;
}


.button-create-news {
   background: #646464;
   color: white;
   border-radius: 10px;
   width: 120px;
   height: 40px;
   border: none;
   cursor: pointer;
}

</style>