import{ describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ControlPanel from '../ControlPanel.vue';
import CharacterService from '../../scripts/characterService';

describe('ControlPanel.vue', async() => {
    
    
    it('Doit pouvoir attaquer', async () => {
        const wrapper = mount(ControlPanel, {
            props: {
                player: {
                    name: 'player',
                    level: 5, // On met un niveau de 5 pour qu'il soit un GOD et qu'il puisse tuer l'ennemi en un coup
                    credits: 0,
                    selectedShip:{
                        ship: {
                            id:1,
                            name: 'ship1',
                        },
                        vitality: 100
                    }
                },
                currentEnemy: {
                    id: 1,
                    name: 'enemy1',
                    credit: 100,
                    experience: 1,
                    ship: {
                        id:2,
                        name: 'ship2',
                        vitality: 1 // On met la vitalité à 1 pour que l'ennemi meurt en un coup
                    }
                },
                taskNumber:1,
                gameEnd: 0
            }
        });

        // On attaque l'ennemi
        await wrapper.find('#Attack').trigger('click');

        // On vérifie que la vitalité de l'ennemi a bien diminué
        expect(wrapper.vm.currentEnemy.ship.vitality).toBe(0);
    });

    it("doit pouvoir reparer son vaisseau", async () => {
        const wrapper = mount(ControlPanel, {
            props: {
                player: {
                    name: 'player',
                    level: 5, // On met un niveau de 5 pour qu'il soit un GOD et qu'il puisse tuer l'ennemi en un coup
                    credits: 0,
                    selectedShip:{
                        ship: {
                            id:1,
                            name: 'ship1',
                        },
                        vitality: 50
                    }
                },
                currentEnemy: {
                    id: 1,
                    name: 'enemy1',
                    credit: 1000,// On met assez de credit pour se soigner au maximum
                    experience: 1,
                    ship: {
                        id:2,
                        name: 'ship2',
                        vitality: 1 // On met la vitalité à 1 pour que l'ennemi meurt en un coup
                    }
                },
                taskNumber:1,
                gameEnd: 0
            }
        });
        // On attaque l'ennemi pour terminer la mission
        await wrapper.find('#Attack').trigger('click');

        // On vérifie que la vie initial du vaisseau est bien de 50
        expect(wrapper.vm.player.selectedShip.vitality).toBe(50);

        // On répare le vaisseau
        await wrapper.find('#Repair').trigger('click');

        expect(wrapper.vm.player.selectedShip.vitality).toBe(100);
    });

    it('Doit pouvoir terminer une mission', async () => {
        const wrapper = mount(ControlPanel, {
            props: {
                player: {
                    name: 'player',
                    level: 5, // On met un niveau de 5 pour qu'il soit un GOD et qu'il puisse tuer l'ennemi en un coup
                    credits: 0,
                    selectedShip:{
                        ship: {
                            id:1,
                            name: 'ship1',
                        },
                        vitality: 100
                    }
                },
                currentEnemy: {
                    id: 1,
                    name: 'enemy1',
                    credit: 100,
                    experience: 1,
                    ship: {
                        id:2,
                        name: 'ship2',
                        vitality: 1 // On met la vitalité à 1 pour que l'ennemi meurt en un coup
                    }
                },
                taskNumber:1,
                gameEnd: 0
            }
        });
        // Vérifie que la mission est bien la première
        expect(wrapper.vm.taskNumber).toBe(1);
        // On attaque l'ennemi
        await wrapper.find('#Attack').trigger('click');

        // On passe à la mission suivante
        await wrapper.find('#EndMission').trigger('click');
        

        // On vérifie que la mission est bien la deuxième
        expect(wrapper.vm.taskNumber).toBe(2);
    });
});