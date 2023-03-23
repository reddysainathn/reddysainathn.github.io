const username = 'reddysainathn';
const projectsList = document.getElementById('projects-list');

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((repo) => {
      if (!repo.fork) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = repo.html_url;
        link.textContent = repo.name;
        listItem.appendChild(link);
        projectsList.appendChild(listItem);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
