// modules
const express = require('express')
const router = express.Router()

// files
const passport = require('../../config/passport')
const admin = require('./modules/admin')
const restController = require('../../controllers/pages/restaurant-controller')
const userController = require('../../controllers/pages/user-controller')
const commentController = require('../../controllers/pages/​​comment-controller') // 引入 controller
const upload = require('../../middleware/multer')
const { authenticated, authenticatedAdmin } = require('../../middleware/auth') // 引入 auth.js
const { generalErrorHandler } = require('../../middleware/error-handler')

// routers
router.use('/admin', authenticatedAdmin, admin)
router.get('/logout', userController.logout)
router.get('/users/top', authenticated, userController.getTopUsers)
router.get('/users/:id/edit', userController.editUser)
router.get('/users/:id', userController.getUser)
router.put('/users/:id', upload.single('image'), userController.putUser)
router.get('/signup', userController.signUpPage)
router.post('/signup', passport.authenticate('local', { failureRedirect: '/signup', failureFlash: true }), userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn) // 注意是 post

router.get('/restaurants/top', authenticated, restController.getTopRestaurants)
router.get('/restaurants/feeds', authenticated, restController.getFeeds) // 新增這一行
router.get('/restaurants/:id/dashboard', authenticated, restController.getDashboard)
router.get('/restaurants/:id', authenticated, restController.getRestaurant) // 新增這行
router.get('/restaurants', authenticated, restController.getRestaurants)
router.delete('/comments/:id', authenticatedAdmin, commentController.deleteComment)// 加入這行
router.post('/comments', authenticated, commentController.postComment) // 加入路由設定
// 新增以下兩行
router.post('/favorite/:restaurantId', authenticated, userController.addFavorite)
router.delete('/favorite/:restaurantId', authenticated, userController.removeFavorite)
// 新增以下兩行
router.post('/like/:restaurantId', authenticated, userController.addLike)
router.delete('/like/:restaurantId', authenticated, userController.removeLike)
// 新增以下兩行
router.post('/following/:userId', authenticated, userController.addFollowing)
router.delete('/following/:userId', authenticated, userController.removeFollowing)
router.get('/', (req, res) => res.redirect('/restaurants'))
router.use('/', generalErrorHandler)

module.exports = router
