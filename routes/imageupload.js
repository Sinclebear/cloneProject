const upload = require('/multer')

// Single Image 처리
router.put('/post/modify', authUtil, upload.single('productImg'), exchangeController.modifyPost);

module.exports = router;