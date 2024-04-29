import {describe, expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import NotifyModal from '../NotifyModal.vue';




describe('NotifyModal.vue', () => {
    it('Doit selectionner les bonnes informations dans la boite de dialogue.', () => {

        const wrapper = mount(NotifyModal, {
            props: {
                title: 'mon titre',
                body: 'mon contenu',
                confirmButton: 'mon bouton confirmer'
            }
        })

        expect(wrapper.text()).toContain('mon titre')
        expect(wrapper.text()).toContain('mon contenu')
        expect(wrapper.find('button[name="confirmer"]').exists()).toBe(true)
    })

    it('Sur confirmation doit emettre un evenement.', async () => {
        
        const wrapper = mount(NotifyModal, {
            props: {
                confirmButton: 'mon bouton confirmer'
            }
        })

        await wrapper.find('button[name="confirmer"]').trigger('click')

        expect(wrapper.emitted()).toHaveProperty('onModalConfirmed')
    })

    it('Doit afficher le bon message de fin de partie en fonction de la situation',async () =>{
        const wrapperLoss = mount(NotifyModal, {
            props: {
                title: 'Perdu',
                body: 'Vous avez perdu',
                confirmButton: 'Rejouer'
            }
        });
        expect(wrapperLoss.text()).toContain('Perdu');
        expect(wrapperLoss.text()).toContain('Vous avez perdu');

        const wrapperWin = mount(NotifyModal, { 
            props: {
                title: 'Gagné',
                body: 'Vous avez gagné',
                confirmButton: 'Rejouer'
            }
        });
        expect(wrapperWin.text()).toContain('Gagné');
        expect(wrapperWin.text()).toContain('Vous avez gagné');
        
})

});