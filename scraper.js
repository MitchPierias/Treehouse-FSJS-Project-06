// Modules
const Github = require('@octokit/rest')();
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
const md5 = require('md5');
// Defaults
const RESULT_COUNT = 12;
const FILE_NAME = 'data.json';
const FILE_PATH = path.join(__dirname, FILE_NAME);
const SAMPLE_IMAGES = [
    'https://www.adorama.com/alc/wp-content/uploads/2018/11/shutterstock_100419445-825x465.jpg',
    'https://www.shutterbug.com/images/styles/600_wide/public/promompi3718.png',
    'https://www.coe.int/documents/9253022/14570967/tropea.jpg/65fdad14-c290-3333-61a2-beb95da8a095',
    'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://www.proify.com/wp-content/uploads/2016/12/landscape-photography-competition.jpg'
]

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
    existing.pp_url = `https://www.gravatar.com/avatar/${md5(existing.email.toLowerCase())}`
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
    const image = SAMPLE_IMAGES[Math.floor(Math.random()*SAMPLE_IMAGES.length)];
    return {
        id: repo['id']||idx||0, // Repo ID or idx or zero
        project_name: (repo['name']||'').replace(/[\-\_]/gi,' '),
        description: repo['description'],
        technologies: [repo['language']],
        live_link: repo['homepage'],
        github_link: repo['url'],
        image_urls:{
            "thumb":image,
            "medium":image,
            "original":image
        },
        stars: repo['stargazers_count']
    }
}