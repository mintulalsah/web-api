const express = require('express')
const { users, admin, alllists, listofgroups, groupones, grouptwos, groupthrees, grouponebusers, groupthreebusers, grouptwobusers, weblists } = require('../models');
const { loaduser } = require('../../user_model');
const { CheckBlockeduser } = require('../CheckBlockeduser');
const groups = require('../models/groups/groups');
const router = express.Router()
function search_word(text, word) {
 // console.log('movie msg is', text);
  //console.log(word);
  var x = 0;
  var y = 0;
  var i = 0;
  var j = 0;
  for (i = 0; i < text.length; i++) {
    if (text[i] === word[0]) {
      for (j = i; j < i + word.length; j++) {
        if (text[j] === word[j - i]) {
          y++;
        }
        if (y === word.length) {
          x = 1;
        }
      }
      y = 0;
    }
  }
  return x;
}

// middleware that is specific to this router
router.use((req, res, next) => {
  //console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', async (req, res) => {
  try {
    //console.log("controller response",req.body)
    grouptwos.find((err, docs) => {
      res.send(docs.reverse())
    }).sort({ $natural: -1 }).limit(20)
  } catch (error) {
    let type = error.type != undefined ? err.type : 'Bad Request';
    let message = "Something went wrong"
    res.send({
      sucess: false,
      error: type,
      message: message
    })
  }
})
//check user block or not
router.get('/checks', async (req, res) => {
   const groupname = req.query.groupname;
  const fcmtoken = req.query.fcmtoken;
 
  try {

    
    console.log("req parameter",groupname,fcmtoken);
    // listofgroups.find((err, docs) => {
    //   res.send(docs)
    // })
   const isblock= await CheckBlockeduser(groupname,fcmtoken);
 
  console.log("is user block"+isblock);
  if(isblock){
    res.send({
      sucess: true,
      isblock: true,
      message: "blocked"
    })
  }
  else{
    res.send({
      sucess: true,
      isblock: false,
      message: "not blocked"
    })
  }
  
  } catch (error) {
    let type = error.type != undefined ? err.type : 'Bad Request';
    let message = "Something went wrong"
    res.send({
      sucess: false,
      error: type,
      message: message
    })
  }
})
// define the home page route

router.get('/groups', async (req, res) => {
  let collectionModel;
  const groupname = req.query.groupname;
  if(groupname==="listofgroups"){
    collectionModel=listofgroups
  }
 else if(groupname==="g1"){
  collectionModel=groupones
  }
  else if(groupname==="g2"){
    collectionModel=grouptwos
  }
  else if(groupname==="g3"){
    collectionModel=groupthrees
  }
  else if(groupname==="groups"){
    collectionModel=groups
  }
  
  if (!collectionModel) {
    return res.status(400).json({ message: 'Invalid collection name' });
  }
  try {
    console.log("req parameter",req.body);  
      collectionModel.find((err, docs) => {
      res.send(docs.reverse())
    }).sort({ $natural: -1 }).limit(20)
    //console.log("controller response",req.body)
  
  } catch (error) {
    let type = error.type != undefined ? err.type : 'Bad Request';
    let message = "Something went wrong"
    res.send({
      sucess: false,
      error: type,
      message: message
    })
  }
})
// define the about route
router.post('/', async (req, res) => {
  try {
    let response = await grouptwos.create(req.body)
    let movielink = null;
    let message = 'success';
    if (!req.body.isadmin) {
      //console.log('chekcing');
      // checking user movie name exact match in document or not
      let requestdoc = await weblists.findOne({ mnm: req.body.mnm.toLowerCase().trim() });
      var found = false;
      if (requestdoc != null) {
        //console.log('found if 0' + requestdoc);
        found = !found;
        movielink = requestdoc.url;
        res.send({
          sucess: true,
          message: message,
          isfound: movielink != null ? true : false,
          mlink: movielink != null ? movielink : ''
        })
        return
      }
      // checking user moview name exist in document string(example if mnm is "love" and if in documemt mnm is love 2023 it will return true)
     // console.log("still checking 1")
      if (!found) {
        requestdoc = await weblists.findOne({ mnm: { '$regex': req.body.mnm.toLowerCase().trim(), '$options': 'i' } });
        if (requestdoc != null) {
          //console.log('found if 1' + requestdoc);
          found = !found;
          movielink = requestdoc.url;
          res.send({
            sucess: true,
            message: message,
            isfound: movielink != null ? true : false,
            mlink: movielink != null ? movielink : ''
          })
          return
        }
      }
      //console.log("still checking contain logic")
      // if (!found) {
      //   // Read users.json file
      //   let alldata=loaduser();
      //     var m = 0;
      //     for (m = 0; m < alldata.length; m++) {
      //       if (search_word(req.body.mnm.toLowerCase().trim(), alldata[m].mnm.toLowerCase())) {
      //         //console.log('found 1 contain'+alldata[m].url);
      //         found = !found;
      //         movielink = alldata[m].url;
      //         let message = 'success';
      //         res.send({
      //           sucess: true,
      //           message: message,
      //           isfound: movielink != null ? true : false,
      //           mlink: movielink != null ? movielink : ''
      //         })
      //         break;
      //       }
      //     }
      
      // }
      //console.log("still checking 2")
      if (!found) {
        let s = req.body.mnm.toLowerCase().trim();
        if (!(s === null) && s.length >= 5) {
          const p = Array.from(s).reduce(
            (a, v, i) => `${a}[^${s.substr(i)}]*?${v}`,
            ""
          );
          const re = RegExp(p);
          requestdoc = await weblists.findOne({ mnm: { '$regex': re, '$options': 'i' } });
          if (requestdoc != null) {
           // console.log('found if 2' + requestdoc);
            found = !found;
            movielink = requestdoc.url;
            res.send({
              sucess: true,
              message: message,
              isfound: movielink != null ? true : false,
              mlink: movielink != null ? movielink : ''
            })
            return
          }
        }
      }
    }
    else {
      res.send({
        sucess: true,
        message: message,
        isfound: movielink != null ? true : false,
        mlink: movielink != null ? movielink : ''
      })
    }

  } catch (error) {
    let type = error.type != undefined ? err.type : 'Bad Request';
    let message = "Something went wrong"
    res.send({
      sucess: false,
      error: type,
      message: message
    })
  }
})


// define the about route
router.post('/sendmessage', async (req, res) => {
  let collectionModel;
  const groupname = req.query.groupname;
   if(groupname==="g1"){
    collectionModel=groupones
    }
    else if(groupname==="g2"){
      collectionModel=grouptwos
    }
    else if(groupname==="g3"){
      collectionModel=groupthrees
    }
    
    if (!collectionModel) {
      return res.status(400).json({ message: 'Invalid collection name' });
    }
  try {
    let response = await collectionModel.create(req.body)
    let movielink = null;
    let message = 'success';
    if (!req.body.isadmin) {
      //console.log('chekcing');
      // checking user movie name exact match in document or not
      let requestdoc = await admin.findOne({ mnm: req.body.mnm.toLowerCase().trim() });
      var found = false;
      if (requestdoc != null) {
        //console.log('found if 0' + requestdoc);
        found = !found;
        movielink = requestdoc.url;
        res.send({
          sucess: true,
          message: message,
          isfound: movielink != null ? true : false,
          mlink: movielink != null ? movielink : ''
        })
        return
      }
      // checking user moview name exist in document string(example if mnm is "love" and if in documemt mnm is love 2023 it will return true)
     // console.log("still checking 1")
      if (!found) {
        requestdoc = await admin.findOne({ mnm: { '$regex': req.body.mnm.toLowerCase().trim(), '$options': 'i' } });
        if (requestdoc != null) {
          //console.log('found if 1' + requestdoc);
          found = !found;
          movielink = requestdoc.url;
          res.send({
            sucess: true,
            message: message,
            isfound: movielink != null ? true : false,
            mlink: movielink != null ? movielink : ''
          })
          return
        }
      }
      //console.log("still checking contain logic")
      if (!found) {
        // Read users.json file
        let alldata=loaduser();
          var m = 0;
          for (m = 0; m < alldata.length; m++) {
            if (search_word(req.body.mnm.toLowerCase().trim(), alldata[m].mnm.toLowerCase())) {
              //console.log('found 1 contain'+alldata[m].url);
              found = !found;
              movielink = alldata[m].url;
              let message = 'success';
              res.send({
                sucess: true,
                message: message,
                isfound: movielink != null ? true : false,
                mlink: movielink != null ? movielink : ''
              })
              break;
            }
          }
      
      }
      //console.log("still checking 2")
      if (!found) {
        let s = req.body.mnm.toLowerCase().trim();
        if (!(s === null) && s.length >= 5) {
          const p = Array.from(s).reduce(
            (a, v, i) => `${a}[^${s.substr(i)}]*?${v}`,
            ""
          );
          const re = RegExp(p);
          requestdoc = await alllists.findOne({ mnm: { '$regex': re, '$options': 'i' } });
          if (requestdoc != null) {
           // console.log('found if 2' + requestdoc);
            found = !found;
            movielink = requestdoc.url;
            res.send({
              sucess: true,
              message: message,
              isfound: movielink != null ? true : false,
              mlink: movielink != null ? movielink : ''
            })
            return
          }
        }
      }
    }
    else {
      res.send({
        sucess: true,
        message: message,
        isfound: movielink != null ? true : false,
        mlink: movielink != null ? movielink : ''
      })
    }

  } catch (error) {
    let type = error.type != undefined ? err.type : 'Bad Request';
    let message = "Something went wrong"
    res.send({
      sucess: false,
      error: type,
      message: message
    })
  }
})

// define the delete route
router.delete('/', async (req, res) => {
  let collectionModel;
  const groupname = req.query.groupname;
  const _id = req.query._id;
   if(groupname==="g1"){
    collectionModel=groupones
    }
    else if(groupname==="g2"){
      collectionModel=grouptwos
    }
    else if(groupname==="g3"){
      collectionModel=groupthrees
    }
    
    if (!collectionModel) {
      return res.status(400).json({ message: 'Invalid collection name' });
    }
    collectionModel.deleteOne({ _id: _id }).then(function(){
    console.log("Blog deleted", req.body._id); // Success
    res.send({
      sucess: true,
      message: "deleted"
    })
 }).catch(function(error){
    console.log(error); // Failure
    res.send({
      sucess: false,
      message: "something went wrong, please try again"
    })
 });
})
// define the about route
router.post('/blockuser', async (req, res) => {
  const groupname = req.query.groupname;
  let collectionModel;
if(groupname==="grouponebusers"){
  collectionModel=grouponebusers
}
else if(groupname==="groupthreebusers"){
collectionModel=groupthreebusers
}
else if(groupname==="grouptwobusers"){
  collectionModel=grouptwobusers
}
console.log('body is',req.body);
  try {
    let response = await collectionModel.create(req.body)
    res.send({
      sucess: true,
      deleted: true,
      message: "blocked"
    })
  } catch (error) {
    let type = error.type != undefined ? err.type : 'Bad Request';
    let message = "Something went wrong"
    res.send({
      sucess: false,
      error: type,
      message: message
    })
  }
})
module.exports = router