import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home'
import tutorial from '../views/tutorial'
import scratch from '../views/scratch'
import cloud from '../views/cloud'
import game from '../views/game'
import hat from '../views/hat'
import meeting from '../views/meeting'
//import fun from '../views/fun'
import search from '../views/search'
import config from '../views/config'
import python from '../views/python'
import info from '../views/info'

import setting from '../views/setting/setting'
import about from '../views/setting/about'
import general from '../views/setting/general'
import fontsize from '../views/setting/fontsize'
import communications from '../views/setting/communications'
import device from '../views/setting/device'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/setting',
      name: 'setting',
      component: setting,
      children: [
       {
          path: '/setting/general',
          name: 'general',
          component: general
        },{
          path: '/setting/fontsize',
          name: 'fontsize',
          component: fontsize
        },{
          path: '/setting/communications',
          name: 'communications',
          component: communications
        },{
          path: '/setting/device',
          name: 'device',
          component: device
        }
      ]
    },{
      path: '/tutorial',
      name: 'tutorial',
      component: tutorial
    },{
      path: '/scratch',
      name: 'scratch',
      component: scratch
    },{
      path: '/cloud',
      name: 'cloud',
      component: cloud
    },{
      path: '/game',
      name: 'game',
      component: game
    },{
      path: '/hat',
      name: 'hat',
      component: hat
    },{
    /*  path: '/fun',
      name: 'fun',
      component: fun
    },{*/
      path: '/meeting',
      name: 'meeting',
      component: meeting
    },{
      path: '/search',
      name: 'search',
      component: search
    },{
      path: '/config',
      name: 'config',
      component: config
    },{
      path: '/python',
      name: 'python',
      component: python
    },{
      path: '/info',
      name: 'info',
      component: info
    }
  ]
})
