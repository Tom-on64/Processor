import { initDisplay, draw } from "./display.js";

export class Emulator {
    constructor() {
        this.memory = new Uint8Array(Math.pow(2, 16)); // Get 2^16 bytes of memory
        this.regs = {
            a: 0x00, 
            b: 0x00, 
            c: 0x00, 
            pc: 0x00, 
            ins: 0x00, 
            mar: 0x00,
            flag: 0b00000010, 
        };
        initDisplay();
    }

    step() {
        draw(this.memory);
    }
}

const instructions = {}
