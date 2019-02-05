// Modules
const Github = require('@octokit/rest')();
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
// Defaults
const RESULT_COUNT = 12;
const FILE_NAME = 'data.json';
const FILE_PATH = path.join(__dirname, FILE_NAME);

let existing = {};

// Check for an existing data file
if (fs.existsSync(FILE_PATH)) {
    // Load the existing data file
    console.log("Loading existing data file");
    existing = require(FILE_PATH);
} else {
    // Configure initial values
    // Decided not to use ES6 Destructuring
    let conf = pkg.data || {};
    existing.name = pkg.author || conf.name;
    existing.phone = conf.phone || '';
    existing.email = conf.email || '';
    existing.summary = conf.summary || '';
    existing.social = conf.social || {};
}

loadProjects('MitchPierias');

/**
 * Load Projects
 * @desc Loads user's created repositories
 * @param {String} username GitHub username
 * @returns {Promise} Function result
 */
function loadProjects(username) {
    console.log("Loading projects");
    return Promise.resolve(Github.repos.listForUser({
        username,
        type: 'owner',
        sort: 'updated',
        per_page: RESULT_COUNT,
        page: 1
    }).then(({ data }) => data.map(formatRepo))
    .then(projects => {
        const data = { ...existing, projects };
        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
        console.log(`Saved data to file ${FILE_NAME}`);
    }).catch(console.log));
}

/**
 * Format Repository
 * @desc Formats a project object from the provided repo object.
 * @param {Object} repo GitHub repo API data object
 * @returns {Object} Formatted project object
 */
function formatRepo(repo, idx) {
    return {
        id: repo['id']||idx||0, // Repo ID or idx or zero
        project_name: (repo['name']||'').replace(/[\-\_]/gi,' '),
        description: repo['description'],
        technologies: [repo['language']],
        live_link: repo['homepage'],
        github_link: repo['url'],
        image_urls:{
            "thumb":"https://placehold.it/550x550",
            "medium":"https://placehold.it/550x550",
            "original":"https://placehold.it/550x550"
        },
        stars: repo['stargazers_count']
    }
}