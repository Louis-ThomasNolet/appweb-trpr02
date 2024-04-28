import { describe, expect, it } from 'vitest'
import ShipService from '../shipService'

const shipService = new ShipService()

describe('ShipService', () => {
    it('should get ships', async () => {
        const ships = await shipService.getShipList()

        expect(ships).toBeInstanceOf(Array)
        expect(ships.length).toBeGreaterThan(0)
    });

    it('should get a specific ship', async () => {
        const ships = await shipService.getShip(5307)

        expect(ships.name).toBe('Jedi Interceptor')
    });

});
