const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    next({message:"Please specify a project"})
})

router.get('/:id', (req, res, next) => {
    // Extract ID and find project
    const { id } = req.params;
    const { projects } = res.locals;
    const currentProject = projects.find(x => parseInt(x.id) === parseInt(id));
    // Handle Project response
    if (currentProject) {
        res.render('project', currentProject);
    } else {
        next({message:`Project '${id}' doesn't exist`});
    }
});

module.exports = router;