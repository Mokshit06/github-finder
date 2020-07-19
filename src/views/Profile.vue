<template>
  <div>
    <Loading v-if="loading" />
    <NotFound v-else-if="error" error="User"></NotFound>
    <ProfileComponent v-else :user="user" :repos="repos" />
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/components/Loading";
import NotFound from "./NotFound";
import ProfileComponent from "@/components/ProfileComponent";

export default {
  components: {
    NotFound,
    Loading,
    ProfileComponent
  },

  data() {
    return {
      user: null,
      repos: null,
      loading: false,
      error: false
    };
  },

  methods: {
    async fetchUser(user) {
      const urls = [
        `https://api.github.com/users/${user}?client_id=${process.env.VUE_APP_API_KEY}&client_secret=${process.env.VUE_APP_API_SECRET}`,
        `https://api.github.com/users/${user}/repos?per_page=100&page=1&client_id=${process.env.VUE_APP_API_KEY}&client_secret=${process.env.VUE_APP_API_SECRET}`,
        `https://api.github.com/users/${user}/repos?per_page=100&page=2&client_id=${process.env.VUE_APP_API_KEY}&client_secret=${process.env.VUE_APP_API_SECRET}`,
        `https://api.github.com/users/${user}/repos?per_page=100&page=3&client_id=${process.env.VUE_APP_API_KEY}&client_secret=${process.env.VUE_APP_API_SECRET}`
      ];

      try {
        let [userData, ...repoArr] = await Promise.all(
          urls.map(url => axios.get(url))
        );

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
        } = userData.data;

        const repoArrData = repoArr.map(repo => repo.data);
        const repoData = [
          ...repoArrData[0],
          ...repoArrData[1],
          ...repoArrData[2]
        ];

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

        this.repos = repoData;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
    letterCase(str) {
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }
  },

  watch: {
    $route: "fetchUser"
  },

  async created() {
    this.user = this.repos = this.error = null;
    this.loading = true;
    try {
      await this.fetchUser(this.$route.params.username);
      this.loading = false;
    } catch (error) {
      this.error = true;
      this.loading = false;
    }
  },

  metaInfo() {
    return {
      title: this.letterCase(this.$route.params.username),
      meta: [
        {
          name: "description",
          content: `${this.letterCase(this.$route.params.username)},${
            this.$route.params.username
          }, Github Finder, Mokshit Jain, Mokshit Jain Github Finder`
        }
      ]
    };
  }
};
</script>

<style>
</style>