const users = require('./users');
const admin = require('./admin');
const alllists = require('./alllists');
const weblists = require('./weblists');
const grouponebusers = require('./blockedgroup/grouponebusers');
const groupthreebusers = require('./blockedgroup/groupthreebusers');
const grouptwobusers = require('./blockedgroup/grouptwobusers');
const groupones = require('./groups/groupones');
const groups = require('./groups/groups');
const grouptwos = require('./groups/grouptwos');
const groupthrees = require('./groups/groupthrees');
const listofgroups = require('./groups/listofgroups');
module.exports ={
    users,admin,weblists,alllists,grouponebusers,groupthreebusers,grouptwobusers,
    groupones,grouptwos,groupthrees,listofgroups,groups
}