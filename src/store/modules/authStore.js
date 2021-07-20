require('babel-polyfill')

const auth = {
	namespaced: true,
	state: {
		accessToken: localStorage.getItem('access_token'),
		authenticated: false,
		// currentUser: JSON.parse(localStorage.getItem('user')),
	},
	getters: {
		token: state => state.accessToken,
		isAuthenticated: state => state.authenticated,
		// user: state => (state.currentUser === null) ? {} : state.currentUser,
		// name: state => (state.currentUser === null) ? '' : state.currentUser.name,
		back: state => state.backTo
	},
	mutations: {
		storeToken(state, payload) {
			localStorage.setItem('access_token', payload.token)
			// localStorage.setItem('user', JSON.stringify(payload.user))
			state.authenticated = true
		},
		clearToken(state) {
			state.access_token = ''
			state.authenticated = false
			// state.currentUser = ''
		},
		setBackTo(state, payload) {
			state.backTo = payload
		},
		update(state, payload) {
			localStorage.setItem('user', JSON.stringify(payload))
		}
	},
	actions: {
		async login({commit}, token) {
			commit('storeToken', token)
		},
		async logout({commit}) {
			localStorage.removeItem('access_token')
			localStorage.removeItem('user')
			commit('clearToken')
		},
		async update({commit}, admin) {
			commit('update', admin)
		}
	}
}

export default auth
