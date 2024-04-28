import {describe,it,expect,vi} from 'vitest';
import {mount} from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
//import routes from '../../router/routes'
import Accueil from '../Accueil.vue';
//import ShipService from '../../scripts/shipService';

const router = createRouter({
    history: createWebHistory(),
    routes : [{path: '/', name: 'Accueil', component: Accueil}]
  })

describe('Accueil.vue', () => {
    it('Demarrer le jeu avec des donnees valides', async () => {
        const mockShipService = {
            getShipList: Promise.resolve([{id: '3',name: 'Y-wing'}]),
        };

        const wrapper = mount(Accueil, {
            global: {
                plugins: [router],
                mocks: {
                    $router: router,
                    $route: {name:'Bataille'},
                    shipService: mockShipService
                }
            }
        });

        await wrapper.find('#name').setValue('Player 1');
        await wrapper.find('#ship-select').setValue('3');


        await wrapper.vm.$nextTick();
        await wrapper.find('form').trigger('submit');
        await router.isReady();

        expect(router.currentRoute.value.name).toBe('Bataille');
        expect(router.currentRoute.value.query.name).toBe('Player 1');
        expect(router.currentRoute.value.query.selectedShip).toBe('3');
    });

});