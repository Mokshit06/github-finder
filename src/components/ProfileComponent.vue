<template>
  <div>
    <Header :user="user" />
    <Charts
      :lang="langChartData"
      :starred="starredChartData"
      :stars="starsChartData"
    />
    <Repositories :repositories="topRepos" />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Charts from "@/components/Charts";
import Repositories from "@/components/Repositories";
import Footer from "@/components/Footer";
import { getFrequency, getStars } from "../utils/functions";

export default {
  name: "ProfileComponent",
  props: ["user", "repos"],
  components: {
    Header,
    Repositories,
    Charts,
    Footer
  },
  computed: {
    topRepos() {
      return [...this.repos]
        .filter(repo => repo.fork !== true)
        .sort((a, b) => b.watchers_count - a.watchers_count)
        .slice(0, 8);
    },
    langChartData() {
      const repos = [...this.repos];
      const languagesArr = repos.map(repo => repo.language).sort();
      const numberOfTimes = getFrequency(languagesArr);

      const languages = [...new Set(languagesArr)].map(lang =>
        lang === null ? (lang = "Others") : lang
      );

      return {
        languages,
        numberOfTimes
      };
    },
    starredChartData() {
      const repos = [...this.repos].sort(
        (a, b) => b.watchers_count - a.watchers_count
      );
      const repoNames = repos.map(repo => repo.name).slice(0, 5);
      const stars = repos
        .map(repo => repo.watchers_count)
        .sort((a, b) => b - a)
        .slice(0, 5);

      return {
        repoNames,
        stars
      };
    },
    starsChartData() {
      const repos = [...this.repos];
      const starsObj = getStars(repos);
      for (const language in starsObj) {
        if (starsObj[language] === 0) {
          delete starsObj[language];
        }
      }
      const languages = Object.keys(starsObj);
      const stars = Object.values(starsObj);

      return {
        languages,
        stars
      };
    }
  }
};
</script>

<style>
</style>