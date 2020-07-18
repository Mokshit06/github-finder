<template>
  <div>
    <Header :user="user" />
    <Charts
      :lang="chartRepos[0]"
      :starred="chartRepos[1]"
      :stars="chartRepos[2]"
      v-if="loaded"
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
  name: "Profile",
  components: {
    Header,
    Repositories,
    Charts,
    Footer
  },
  data() {
    return {
      user: {},
      repos: [],
      topRepos: [],
      chartRepos: [],
      loaded: false
    };
  },
  methods: {
    async fetchUser(user) {
      const profileResponse = await fetch(
        `https://api.github.com/users/${user}?client_id=${process.env.VUE_APP_API_KEY}&client_secret=${process.env.VUE_APP_API_SECRET}`
      );

      if (!profileResponse.ok) {
        throw new Error("Something went wrong...");
      }

      const {
        avatar_url,
        login,
        html_url,
        name,
        bio,
        followers,
        following,
        created_at,
        public_repos
      } = await profileResponse.json();

      this.user = {
        avatar_url,
        login,
        html_url,
        name,
        bio,
        followers,
        following,
        created_at,
        public_repos
      };
    },
    async fetchRepos(user) {
      const urls = [
        `https://api.github.com/users/${user}/repos?per_page=100&page=1&  client_id=${process.env.VUE_APP_API_KEY}&client_secret=${process.env.VUE_APP_API_SECRET}`,
        `https://api.github.com/users/${user}/repos?per_page=100&page=2&  client_id=${process.env.VUE_APP_API_KEY}&client_secret=${process.env.VUE_APP_API_SECRET}`,
        `https://api.github.com/users/${user}/repos?per_page=100&page=3&  client_id=${process.env.VUE_APP_API_KEY}&client_secret=${process.env.VUE_APP_API_SECRET}`
      ];

      try {
        const allRepoResponse = await Promise.all(urls.map(url => fetch(url)));
        let allRepos = await Promise.all(
          allRepoResponse.map(repoResponse => repoResponse.json())
        );

        allRepos = allRepos.flat(1);

        this.repos = allRepos;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },

    getLangChartData(repos) {
      const languagesArr = repos.map(repo => repo.language).sort();
      const numberOfTimes = getFrequency(languagesArr);

      const languages = [...new Set(languagesArr)].map(lang =>
        lang === null ? (lang = "Others") : lang
      );

      this.chartRepos[0] = {
        languages,
        numberOfTimes
      };
    },

    getStarredChartData(_repos) {
      const repos = _repos.sort((a, b) => b.watchers_count - a.watchers_count);
      const repoNames = repos.map(repo => repo.name).slice(0, 5);
      const stars = repos
        .map(repo => repo.watchers_count)
        .sort((a, b) => b - a)
        .slice(0, 5);

      this.chartRepos[1] = {
        repoNames,
        stars
      };
    },

    getStarsChartData(repos) {
      const starsObj = getStars(repos);
      for (const language in starsObj) {
        if (starsObj[language] === 0) {
          delete starsObj[language];
        }
      }
      const languages = Object.keys(starsObj);
      const stars = Object.values(starsObj);

      this.chartRepos[2] = {
        languages,
        stars
      };
    },

    getChartRepos(repos) {
      this.getLangChartData(repos);
      this.getStarredChartData(repos);
      this.getStarsChartData(repos);
    }
  },
  async created() {
    this.loaded = false;
    const username = this.$route.params.username;
    try {
      await this.fetchUser(username);
      await this.fetchRepos(username);
      this.loaded = true;
    } catch (error) {
      console.error(error);
    }
    this.topRepos = [...this.repos]
      .filter(repo => repo.fork !== true)
      .sort((a, b) => b.watchers_count - a.watchers_count)
      .slice(0, 8);
    this.getChartRepos(this.repos);
  }
};
</script>

<style>
</style>