import{ describe, expect, it } from 'vitest';
import RankingService from '../rankingService';


const rankingService = new RankingService();
describe('RankingService', () => {
    it('should get ranking', async() => {
       const ranking = await rankingService.getRanking();//we get the ranking

       expect(ranking).toBeInstanceOf(Array);//we check if the ranking is an array
       expect(ranking).length.greaterThan(0);//we check if the first element of the ranking has an id
    });
    it('should add ranking', async () => {
        await rankingService.addRanking('Test', 1000);//we add a new ranking
        const ranking = await rankingService.getRanking();//we get the ranking

        expect(ranking[ranking.length - 1].name).toBe("Test");

        rankingService.deleteRanking(ranking[ranking.length - 1].id);//we delete the ranking
    });
});