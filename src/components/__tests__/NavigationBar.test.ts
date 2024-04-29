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
   
    router.push('/') // Reset la route au début de chaque test
    await router.isReady()

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')

    const linkAboutEl = wrapper.find('#classement') // Adapter le sélecteur selon ton besoin
    await linkAboutEl.trigger('click')

    expect(routerSpy).toHaveBeenCalledWith('/score') 
  

  })

  it('Doit pouvoir aller sur la page d\'accueil', async () => {

    router.push('/')
    await router.isReady() 

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')

    
    const linkPostsEl = wrapper.find('#accueil') 
    await linkPostsEl.trigger('click')

    expect(routerSpy).toHaveBeenCalledWith('/')

  })
})