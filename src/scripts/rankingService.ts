import axios, { AxiosResponse } from 'axios';

const RANKING_PATH = "/ranking";

export default class RankingService {
    private API_URL: string;

    constructor(){
        this.API_URL = "http://localhost:3000";
    }

    async getRanking(): Promise<any[]> {
        const response: AxiosResponse<any[]> = await axios.get(this.API_URL + RANKING_PATH);
        return response.data;
    }

    async addRanking(name: string, score: number): Promise<any> {
        const response: AxiosResponse<any> = await axios.post(this.API_URL + RANKING_PATH, { name, score });
        return response.data;
    }

    async deleteRanking(id: number): Promise<any> {
        const response: AxiosResponse<any> = await axios.delete(this.API_URL + RANKING_PATH + `/${id}`);
        return response.data;
    }
}