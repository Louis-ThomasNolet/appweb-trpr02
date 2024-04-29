import{describe, expect, it, vi} from 'vitest';
import{mount} from '@vue/test-utils';
import ConfirmModal from '../ConfirmModal.vue';
  // Importation de la classe Modal de Bootstrap


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