<template>
  <div class="tournament-create">
      <h1>Skapa turneringar</h1>
    <form @submit.prevent="createTournament">
      <div class="input-wrapper-create-tournament">
      <label for="title">Skapa turnering</label>
      <input type="text" id="title" required minlength="3" v-model="title" />
      </div>
      <button type="submit" class="button-tournament">Skapa turnering</button>
    </form>
  </div>
</template>

<script>
import { addDoc, collection } from "firebase/firestore";
import db from "@/firebase/firebase";

export default {
  name: "TournamentCreateView",

  data() {
    return {
      title: "",
    };
  },

  methods: {
    async createTournament() {
      try {
        const docRef = await addDoc(collection(db, "tournaments"), {
          title: this.title,
        });

        console.log("Document written with ID: ", docRef.id);
        this.title = '';
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
};
</script>

<style scoped>

.tournament-create {
 background: #272727;
  color: white;

}

input {
  border-radius: 5%;
}

.input-wrapper-create-tournament {
	display: flex;
	flex-direction: column;
	gap: 5px;
  padding-bottom: 20px;
  width: 308px;
  margin-left: 730px;
}

.button-tournament { 
  background: #646464;
   color: white;
   border-radius: 10px;
   width: 150px;
   height: 40px;
   border: none;
}

</style>