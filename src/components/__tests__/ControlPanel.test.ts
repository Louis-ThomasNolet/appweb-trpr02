import{ describe, expect, it, vi } from 'vitest';
import{ mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../../router/routes'
import NavigationBar from '../NavigationBar.vue';

const router = createRouter({
    history: createWebHistory(),
    routes : routes
  })

describe('ControlPanel.vue', () => {
    it('Doit pouvoir attaquer', async () => {
        
    })
})