import {describe,it,expect,vi} from 'vitest';
import {mount} from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../../router/routes'
import Accueil from '../Accueil.vue';
//import ShipService from '../../scripts/shipService';

const router = createRouter({
    history: createWebHistory(),
    routes : routes
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
                    $route: {name:'Bataille', query: {name: 'Player 1', selectedShip: '3'}},
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
    });

    it("Doit afficher un message d'erreur si le nom du joueur est vide", async () => {
        const mockShipService = {
            getShipList: Promise.resolve([{id: '3',name: 'Y-wing'}]),
        };

        const wrapper = mount(Accueil, {
            global: {
                plugins: [router],
                mocks: {
                    $router: router,
                    $route: {name:'Bataille', query: {name: 'Player 1', selectedShip: '3'}},
                    shipService: mockShipService
                }
            }
        });

        await wrapper.find('#name').setValue('');
        await wrapper.find('#ship-select').setValue('3');


        await wrapper.vm.$nextTick();
        await wrapper.find('form').trigger('submit');
        await router.isReady();

        expect(router.currentRoute.value.name).toBe('Accueil');//Comme le nom est vide on doit rester sur la page d'accueil
        
    });

});
