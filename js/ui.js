import { chart } from './chart.js';
import {
  LightenDarkenColor,
  getNumberOfTimes,
  getStars,
  getColors,
} from './functions.js';

class UI {
  showUser(user) {
    const {
      avatar_url,
      login,
      html_url,
      name,
      bio,
      followers,
      following,
      created_at,
      public_repos,
    } = user;

    let html = '';

    const date = new Date(created_at).toDateString().slice(4).split(' ');
    date.splice(1, 0, ' ');
    date.splice(3, 0, ', ');

    html = `
      <section class="header">
        <div class="header-info">

          <div class="image">
            <img src=${avatar_url} alt="profile">
          </div>
          <h1>${name}</h1>
          <h2><a href=${html_url} target="_blank" rel="noopener noreferrer">@${login}</a></h2>
          ${bio ? `<p class='bio'>${bio}</p>` : ''}
          <div class="date">
            <i class="fa fa-calendar"></i>
            <p>Joined ${date.join('')}</p>
          </div>
          <div class="grid">
            <div class="grid-item">
              <span>${public_repos}</span>
              <p>Repositories</p>
            </div>
            <div class="grid-item">
              <span>${followers}</span>
              <p>Followers</p>
            </div>
            <div class="grid-item">
              <span>${following}</span>
              <p>Following</p>
            </div>
          </div>
        </div>
      </section>

      <section class="info-section">
        <div class="info">
          <div class="chart">
            <h2>Top Languages</h2>
            <div class="chart-area">
              <canvas height=300 id="language"></canvas>
            </div>
          </div>
          <div class="chart">
            <h2>Most Starred</h2>
            <div class="chart-area">
              <canvas height=300 id="starred"></canvas>
            </div>
          </div>
          <div class="chart">
            <h2>Stars per language</h2>
            <div class="chart-area">
              <canvas height=300 id="starsPerLanguage"></canvas>
            </div>
          </div>
        </div>
      </section>

      <section class="repo-section">
          <div class="repo">
            <div class="head">
              <h2>Top Repos</h2>
            </div>
            <div class="repositories">
              <ul></ul>
            </div>
          </div>
        </section>
    `;

    document.querySelector('body').insertAdjacentHTML('afterbegin', html);
  }

  showError() {
    const html = `
      <section class="error-body">
        <div class="error">
          <div class="icon">
            <i class="fa fa-github"></i>
          </div>
          <div class="error-text">
            <h2>Github Finder</h2>
            <p>Something went wrong... Please try again!</p>
          </div>
        </div>
      </section>
    `;
    document.querySelector('body').insertAdjacentHTML('afterbegin', html);
  }

  async showRepos(repos) {
    let html = '';
    repos = repos
      .sort((a, b) => b.watchers_count - a.watchers_count)
      .slice(0, 8);

    const color = async language => {
      const colorToReturn = (await getColors([language])).colors[0];
      return colorToReturn;
    };

    for (const repo of repos) {
      const {
        html_url,
        name,
        description,
        language,
        watchers_count,
        forks,
        size,
      } = repo;

      html += `
        <li>
          <a href=${html_url} target="_blank" rel="noopener noreferrer" class="repo">
            <div class="repo-info">
              <div class="repo-name">
                <i class="fa fa-bookmark"></i>
                <h3>${name}</h3>
              </div>
              <p>${description ? description : ''}</p>
            </div>
            <div class="repo-stats">
              <div class="left">
                <span><div class="language" style="background-color: ${
                  language ? await color(language) : 'var(--blue)'
                }"></div>${language ? language : ''}</span>
                <span>
                  <i class="fa fa-star"></i>
                  ${watchers_count}
                </span>
                <span>
                  <i class="fa fa-code-fork"></i>
                  ${forks}
                </span>
              </div>
              <div class="right">
                <span>${size.toLocaleString()} KB</span>
              </div>
            </div>
          </a>
        </li>
      `;
    }
    document
      .querySelector('.repositories ul')
      .insertAdjacentHTML('afterbegin', html);
  }

  showChart(repository) {
    this.showLanguageChart(repository);
    this.showStarredChart(repository);
    this.showStarsLanguageChart(repository);
  }

  async showLanguageChart(repository) {
    const languagesArr = repository.map(repo => repo.language).sort();
    const numberOfTimes = getNumberOfTimes(languagesArr);

    const languages = [...new Set(languagesArr)].filter(
      language => language !== null
    );

    const colors = await getColors(languages);

    chart.showLanguageChart(
      {
        languages,
        numberOfTimes,
      },
      colors.colors,
      colors.borderColor
    );
  }

  async showStarredChart(repository) {
    repository = repository.sort((a, b) => b.watchers_count - a.watchers_count);
    const repoNames = repository.map(repo => repo.name).slice(0, 5);
    const stars = repository
      .map(repo => repo.watchers_count)
      .sort((a, b) => b - a)
      .slice(0, 5);
    chart.showStarredChart({
      repoNames,
      stars,
    });
  }

  async showStarsLanguageChart(repository) {
    const starsObj = getStars(repository);
    for (const language in starsObj) {
      if (starsObj[language] === 0) {
        delete starsObj[language];
      }
    }
    const languages = Object.keys(starsObj);
    const stars = Object.values(starsObj);
    const colors = await getColors(languages);
    chart.showStarsLanguageChart(
      {
        languages,
        stars,
      },
      colors.colors,
      colors.borderColor
    );
  }
}

export const ui = new UI();
