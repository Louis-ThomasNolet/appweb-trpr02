import{ describe, expect, it } from 'vitest';
import CharacterService from '../characterService';

const characterService = new CharacterService();

describe('CharacterService', () => {
    it('should get characters', async() => {
        const characters = await characterService.getCharacterList();

        expect(characters).toBeInstanceOf(Array);
        expect(characters.length).toBeGreaterThan(0);
    });

    it('should get a specific character', async() => {
        const characters = await characterService.getCharacter(8531);
        const ship = characters.ship;

        expect(characters.name).toBe('Luke Skywalker');
        expect(characters.credit).toBe(95);
        expect(characters.experience).toBe(2);
        expect(ship.name).toBe('Solar Sailer');
        expect(ship.vitality).toBe(77);
    });

    it('should get random character', async() => {
        const characters = await characterService.getRandomCharacter();

        expect(characters).toHaveProperty('id');
        expect(characters).toHaveProperty('name');
        expect(characters).toHaveProperty('credit');
        expect(characters).toHaveProperty('experience');
        expect(characters).toHaveProperty('ship');
    });
});