import { initDisplay, draw } from "./display.js";

export class Emulator {
    constructor() {
        this.memory = new Uint8Array(65536); // Get 2^16 bytes of memory
        this.regs = {
            a: 0x00, 
            b: 0x00, 
            c: 0x00, 
            pc: 0x0000, 
            ins: 0x00, 
            mar: 0x0000,
            flag: 0b00000010, 
        };
        initDisplay();
        this.running = false;
        this.halted = false;

        // Init video memory
        for (let i = 0; i < 2000; i++) {
            const add = 0x8000 + i * 2;
            this.memory[add+0] = 0;
            this.memory[add+1] = 0x0f;
        }
    }

    step() {
        if (this.running) requestAnimationFrame(this.step.bind(this));
        draw(this.memory);

        // Fetch instruction
        this.regs.mar = this.regs.pc;
        this.regs.ins = this.memory[this.regs.mar];
        this.regs.pc++;
        
        this.execute();
    }
    
    execute() {
        switch(this.regs.ins) {
            // ALU Operations
            case 0x01: this.regs.a += this.regs.b; break; // Add
            case 0x02: this.regs.a -= this.regs.b; break; // Sub
            case 0x03: this.regs.a++; break; // Inc
            case 0x04: this.regs.a--; break; // Dec
            case 0x05: this.regs.a <<= this.regs.b; break; // Lsh
            case 0x06: this.regs.a >>= this.regs.b; break; // Rsh
            case 0x07: this.regs.a &= this.regs.b; break; // And
            case 0x08: this.regs.a |= this.regs.b; break; // Or
            case 0x09: this.regs.a = ~this.regs.a; break; // Not
            case 0x0A: this.regs.a ^= this.regs.b; break; // Xor

            // Register Operations
            case 0x0B: this.regs.a = this.addressLoad(); break; // Lda
            case 0x0C: this.addressStore(this.regs.a); break; // Sta
            case 0x0D: this.regs.b = this.addressLoad(); break; // Ldb
            case 0x0E: this.addressStore(this.regs.b); break; // Stb
            case 0x0F: this.regs.c = this.addressLoad(); break; // Ldc
            case 0x10: this.addressStore(this.regs.c); break; // Stc
        }
    } 

    immediate() {

    }

    addressLoad() {
        const add = this.memory[this.regs.pc];
        this.regs.pc++;
        add <<= 8;
        add |= this.memory[this.regs.pc];
        this.regs.pc++;
        return this.memory[add];
    }

    addressStore(val) {
        const add = this.memory[this.regs.pc];
        this.regs.pc++;
        add <<= 8;
        add |= this.memory[this.regs.pc];
        this.regs.pc++;
        this.memory[add] = val;
    }
}

/*
Instructions:
    ALU:
        01: ADD - A += B
        02: SUB - A -= B
        03: INC - A++
        04: DEC - A--
        05: SHL - A << B
        06: RSH - A >> B
        07: AND - A = A & B
        08: OR  - A = A | B
        09: NOT - A = ~A
        0A: XOR - A = A ^ B
    Reg:
        0B: LDA - A = [@]
        0C: STA - [@] = A
        0D: LDB - B = [@]
        0E: STB - [@] = B
        0F: LDC - C = [@]
        10: STC - [@] = C
*/
