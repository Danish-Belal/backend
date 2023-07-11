const express = require('express');
const { protectRoute ,isAuthorised} = require('../helper');
const planRouter = express.Router();

const {getAllPlans , getPlan , createPlan , updatePlan , deletePlan , top3Plans} = require('../controller/planCountroller')
planRouter
     .route('/allPlans')
     .get(getAllPlans)

planRouter
     .route('/top3')
     .get(top3Plans)


planRouter.use(protectRoute) // is logged in 
planRouter
     .route('planDetail/:id')
     .get(getPlan)

planRouter.use(isAuthorised(['admin' , 'restaurentowner']))  // logged in , lkin role
planRouter
     .route('/crud')
     .post(createPlan)

planRouter
     .route('/crud/:id')
     .patch(updatePlan)
     .delete(deletePlan)


module.exports = planRouter