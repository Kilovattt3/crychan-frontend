import Vue from 'vue'
import VueRouter from 'vue-router'

import Board from './components/Board'
import Home from './components/Home'
import News from './components/News'
import NotFound from './components/NotFound'
import Page from './components/Page'

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/not-found', name: 'not-found', component: NotFound },
	{ path: '/page/:pageSlug', name: 'page', component: Page },
	{ path: '/news', component: News, children: [
		{ path: '', redirect: { name: 'news' } },
		{ path: '/', name: 'news', component: News },
		{ path: ':newsSlug', name: 'news-item', component: News },
	]},
	{ path: '/:boardSlug', component: Board, children: [
		{ path: '', redirect: { name: 'board' } },
		{ path: '/', name: 'board', component: Board },
		{ path: 'thread/:threadId', name: 'thread', component: Board },
	]},
	{ path: '*', redirect: 'not-found' }
]

const router = new VueRouter({
	routes,
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
		if (to.hash)
			return { selector: to.hash }

		if (savedPosition)
			return savedPosition

		return { x: 0, y: 0 }
	}
})

export default router