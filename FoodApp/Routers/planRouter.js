const express = require('express');
const { protectRoute ,isAuthorised} = require('../helper');
const planRouter = express.Router();

planRouter
     .route('/allPlans')
     .get(getAllPlans)


planRouter.use(protectRoute) // is logged in 
planRouter
     .route('/plan/:id')
     .get(getPlan)

planRouter.use(isAuthorised(['admin' , 'restaurentowner']))  // logged in , lkin role
planRouter
     .route('crudPlan')
     .post(createPlan)
     .patch(updatePlan)
     .delete(deletePlan)


module.exports = planRouter