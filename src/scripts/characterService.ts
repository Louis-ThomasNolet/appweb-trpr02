import axios, { AxiosResponse } from 'axios';
import Character from '../scripts/characters';

const CHARACTER_PATH = '/characters';
export default class CharacterService {
    private API_URL: string;    
    constructor() {
        this.API_URL = 'http://localhost:3000';
    }
    async getCharacterList(): Promise<any[]> {
        const response: AxiosResponse<any[]> = await axios.get(this.API_URL + CHARACTER_PATH);
        return response.data;
    }
    async getCharacter(characterId: number): Promise<any> {   
        const response: AxiosResponse<any> = await axios.get(this.API_URL + CHARACTER_PATH + '/' + characterId);
        return response.data;
    }
    async getRandomCharacter(): Promise<Character> {
        const characterList: any[] = await this.getCharacterList();
        const randomIndex: number = Math.floor(Math.random() * characterList.length);
        return characterList[randomIndex];
    }
}