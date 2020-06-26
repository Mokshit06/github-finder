import { client_id, client_secret } from '../config/config.js';

class Github {
  constructor() {
    this.client_id = client_id;
    this.client_secret = client_secret;
  }

  async getUserProfile(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    if (!profileResponse.ok) {
      throw new Error('Something went wrong...');
    }

    const profile = await profileResponse.json();

    return profile;
  }

  async getUserRepo(user) {
    const repoResponse1 = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&page=1&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const repoResponse2 = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&page=2&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const repoResponse3 = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&page=3&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    if (!repoResponse1.ok || !repoResponse2.ok || !repoResponse3.ok) {
      throw new Error('Something went wrong...');
    }
    const repo = [
      ...(await repoResponse1.json()),
      ...(await repoResponse2.json()),
      ...(await repoResponse3.json()),
    ];
    return repo;
  }
}

export const github = new Github();
