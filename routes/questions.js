"use strict";

const express = require('express');
const router = express.Router();
const debug = require('debug')('questions');
const uuid = require('uuid');


/* GET users listing. */
router.route('/')

    .get((req, res, next) => {
        let qs = [];
        for (let value in req.db.JSON()) {
            qs.push(req.db.JSON()[value]);
        }
      return res.send({questions: qs});
    })

    .post((req, res, next) => {
        let newQ = req.body;
        if (!('name' in newQ && 'topic' in newQ && 'question' in newQ)){
            return res.status(400).json({error: 400, message: 'Bad request, check the sent body'});
        } else {
            let id = uuid.v1();
            newQ['id'] = id;
            req.db.set(id, newQ);

            //emit!
            req.app.io.emit('questions-blackboard', newQ);
            res.json(newQ);
        }
    });




router.route('/:id')

    .get((req, res, next) => {
        let q = req.db.get(req.params.id);
        if (q){
            return res.json(q);
        } else {
            return res.status(404).json({error: 404, message: 'Unable to find the question for the specified id'});
        }

    })



    .delete((req, res, next) => {
        return res.send('a question DELETED');
    });




module.exports = router;
