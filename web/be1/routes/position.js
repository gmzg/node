const express = require('express');

const positionController = require("../controllers/position");
const router = express.Router();
const fileuploadMiddle = require("../middlewares/fileupload");
const userrathMiddle = require("../middlewares/userauth")

router.get('/list',userrathMiddle.auth,positionController.list);
router.get('/listall',positionController.listall);
router.post('/save',fileuploadMiddle.fileupload,positionController.save);
router.post('/remove',positionController.remove);
router.post('/update',positionController.update);
router.post('/changedate',fileuploadMiddle.fileupload,positionController.changedate);
module.exports = router