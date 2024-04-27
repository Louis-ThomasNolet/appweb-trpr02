import{describe, expect, it, vi} from 'vitest';
import{mount} from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../../router/routes'
import NavigationBar from '../NavigationBar.vue';

const router = createRouter({
    history: createWebHistory(),
    routes : routes
  })

describe('NavigationBar.vue', () => {
  it('Doit pouvoir aller sur la page classement', async () => {
   
    await router.isReady()
    router.push('/') 
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')
    const linkScoreEl = wrapper.find('#Classement')
    await linkScoreEl.trigger('click')  

    expect(routerSpy).toHaveBeenCalledWith({name: 'Score'})

  })

  it('Doit pouvoir aller sur la page d\'accueil', async () => {

    await router.isReady()
    router.push('/') 
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')
    const linkHomeEl = wrapper.find('#Star Battle')
    await linkHomeEl.trigger('click')  

    expect(routerSpy).toHaveBeenCalledWith({name: 'Accueil'})

  })
})