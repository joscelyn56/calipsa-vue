import VueRouter from 'vue-router'
import VueScrollTo from 'vue-scrollto'

import Welcome from './components/layouts/Welcome'
import Home from "./components/layouts/Home";

import Login from './components/pages/Login'
import Register from './components/pages/Register'

import Dashboard from "./components/pages/Dashboard";
import Events from "./components/pages/Events";
import Location from "./components/pages/Location";

let router = new VueRouter({
	mode: 'hash',
	routes: [
		{
			path: '/',
			component: Home,
			meta: {
				layout: 'default'
			},
			children: [
				{
					path: '/',
					name: 'home',
					component: Dashboard,
					meta: {
						layout: 'default',
						requiresAuth: true
					},
				},
				{
					path: '/events',
					name: 'events',
					component: Events,
					meta: {
						layout: 'default',
						requiresAuth: true
					},
				},
				{
					path: '/locations',
					name: 'locations',
					component: Location,
					meta: {
						layout: 'default',
						requiresAuth: true
					},
				}
			]
		},
		{
			path: '/',
			component: Welcome,
			meta: {
				layout: 'default'
			},
			children: [
				{
					path: '/login',
					name: 'login',
					meta: {
						layout: 'default',
						requiresAuth: false
					},
					component: Login
				},
				{
					path: '/register',
					name: 'register',
					meta: {
						layout: 'default',
						requiresAuth: false
					},
					component: Register
				}
			]
		}
	],
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			VueScrollTo.scrollTo(to.hash, 700)
			return {selector: to.hash}
		} else if (savedPosition) {
			return savedPosition
		} else {
			return {x: 0, y: 0}
		}
	}
})
router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('access_token')
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (token == null) {
			next({
				path: '/login',
				params: {nextUrl: to.fullPath}
			})
		} else {
			next()
		}
	} else {
		if (token == null) {
			next()
		} else {
			next({
				path: '/',
				params: {nextUrl: to.fullPath}
			})
		}
	}
})
export default router
