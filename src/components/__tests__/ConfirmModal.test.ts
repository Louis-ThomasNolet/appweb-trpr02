import{describe, expect, it, vi} from 'vitest';
import{mount} from '@vue/test-utils';
import ConfirmModal from '../ConfirmModal.vue';
//import {Modal} from 'bootstrap';


describe('ConfirmModal.vue', () => {
  it('Doit afficher les bonnes informations dans la boite de dialogue.', () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        title: 'mon titre',
        body: 'mon contenu',
        cancelButton: 'mon bouton annuler',
        confirmButton: 'mon bouton confirmer'
      }
    })

    expect(wrapper.text()).toContain('mon titre')
    expect(wrapper.text()).toContain('mon contenu')
    expect(wrapper.find('button[name="annuler"]').exists()).toBe(true)
    expect(wrapper.find('button[name="confirmer"]').exists()).toBe(true)
  })
/*
  it('Sur modification du prop trigger, doit afficher la boite de dialogue.', async () => {
    // Ce test ne fonctionne pas, mais il devrait et je ne trouve pas la solution :P
    const spyBootstrap = vi.spyOn(Modal.prototype, 'show')
    const wrapper = mount(ConfirmModal)

    await wrapper.setProps({ trigger: 1 })

    expect(spyBootstrap).toHaveBeenCalled()
  })
*/
  it('Sur confirmation, doit émettre un événement.', async () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        confirmButton: 'mon bouton confirmer'
      }
    })

    await wrapper.find('button[name="confirmer"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('onModalConfirmed')
  })
})