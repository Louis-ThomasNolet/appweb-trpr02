import Ship from './ship';

export default interface Characters {
    readonly id: number;
    readonly name: string;
    readonly credit: number;
    readonly experience: number;
    readonly ship: Ship;
}