import axios, { AxiosResponse } from 'axios';

const SHIP_PATH = '/ships';
export default class ShipService {
    private API_URL: string;    
    constructor() {
        this.API_URL = 'http://localhost:3000';
    }
    async getShipList(): Promise<any[]> {
        const response: AxiosResponse<any[]> = await axios.get(this.API_URL + SHIP_PATH);
        return response.data;
    }
    async getShip(shipId: number): Promise<any> {   
        const response: AxiosResponse<any> = await axios.get(this.API_URL + SHIP_PATH + '/' + shipId);
        return response.data;
    }
}