
export default interface Characters {
    id: number;
    name: string;
    credit: number;
    experience: number;
    ship: {
        id: number;
        name: string;
        vitality: number;
    };
}