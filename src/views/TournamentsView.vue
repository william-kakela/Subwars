<template>
  <div class="tournaments">
    <div class="tournament-header">
    <h1>Turneringar</h1>
    <router-link to="/tournament-create" tag="button" class="create-tournament-button">Skapa turnering</router-link> 
  </div>
     <section class="tournament-top">
      <div class="tournament-box"
        v-for="tournament in tournaments.slice(1, 5)"
        :key="tournament.uid"
      >
        <router-link :to="`/tournament/${tournament.id}`">
        {{ tournament.title }}
          </router-link>
      </div>

    </section>
  </div>
</template>

<script>

import { collection, getDocs } from "firebase/firestore";
import db from "@/firebase/firebase";

export default {
  name: "TournamentsView",

  created() {
    this.fetchTournaments();
  },

  data() {
    return {
      tournaments: [],
    };
  },

  methods: {
    async fetchTournaments() {
      const querySnapshot = await getDocs(collection(db, "tournaments"));
      querySnapshot.forEach((doc) => {
        this.tournaments.push(({
           id: doc.id,
          ...doc.data(),
        }));
      });
    },
  },
};
</script>

<style scoped>

.tournaments {
  background: #272727;
  min-height: 100vh;
  color: white;
  padding-top: 1rem;
  padding: 3rem;
}

.tournament-top {
  height: 250px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 60px;
}

.tournament-header {
  display: flex;
  justify-content: space-between;
}

.tournament-header h1 {
 margin-left: 820px;
}


.tournament-box {
  background: #646464;
  height: 200px;
  display: grid;
  place-items: center;
  background: url('@/assets/fb_image.png');
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  
}

.tournament-box a {
  text-decoration: none;
  font-size: 1.5rem;
  color: white;
}
.tournament-box a:hover {
  background-image: linear-gradient(
    to right,
    #000,
    #000 50%,
    #f1c232 50%
  );
  background-size: 200% 100%;
  background-position: -100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease-in-out;
}

.create-tournament-button {
  height: 35px;
  width: 140px;
  border-radius: 10px;
  border: none;
  color: white;
  background: grey;
  margin-bottom: 20px;
  cursor: pointer;
}


</style>