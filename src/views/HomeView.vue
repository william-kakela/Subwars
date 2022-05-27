<template>
  <div class="home">
    <section class="top">
      <div class="box">
        <router-link :to="`/tournament/${tournaments[0].id}`">
        {{ tournaments[0].title }}
          </router-link>
      </div>
    </section>
    <section class="bottom">
      <div
        class="box"
        v-for="tournament in tournaments.slice(1, 4)"
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
  name: "HomeView",
  components: {},
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
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
        this.tournaments.push({
          id: doc.id,
          ...doc.data(),
        });
        console.log(doc);
      });
    },
  },
};
</script>

<style scoped>
.home {
  background: #272727;
  color: white;
}

.top {
  height: 250px;
  margin-bottom: 50px;
}

.bottom {
  height: 250px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
}

.image-tournament {
  background: url('@/assets/fb_image.png');
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
}

.box {
  background: #646464;
  height: 200px;
  display: grid;
  place-items: center;
  background: url('@/assets/fb_image.png');
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  
}

.box a {
  text-decoration: none;
  font-size: 2rem;
  color: white;
}

.box a:hover {
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
</style>