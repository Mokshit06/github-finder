import { github } from './github.js';
import { ui } from './ui.js';

const { user } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

(async () => {
  try {
    const userObj = await github.getUserProfile(user.toLowerCase());
    const userRepos = (await github.getUserRepo(user.toLowerCase())).filter(
      repo => repo.fork !== true
    );
    ui.showUser(userObj);
    ui.showRepos(userRepos);
    ui.showChart(userRepos);
  } catch (e) {
    ui.showError();
  }
})();
