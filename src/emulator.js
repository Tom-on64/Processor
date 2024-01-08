import { initDisplay, draw } from "./display.js";

export class Emulator {
    constructor() {
        this.MEM = new Uint8Array(65536); // Get 2^16 bytes of memory
        this.restart();
    }

    restart() {
        this.REG = [
            0, // A
            0, // B 
            0, // C 
            0, // D 
            0, // H 
            0, // L 
            0, // UNUSED
            0, // Flag 4-bit
        ];
        this.PORT = [
            0x00, // 00 - Status
        ];

        // Init video memory
        for (let i = 0; i < 2000; i++) {
            const add = 0x8000 + i * 2;
            this.MEM[add + 0] = 0;
            this.MEM[add + 1] = 0x0f;
        }
        // Init stack
        for (let i = 0; i < 256; i++) this.MEM[0x7c00 + i] = 0;

        // Init 
        this.pc = 0; // Program counter
        this.MEM[0xFFFE] = this.pc & 0x00FF; // Low byte
        this.MEM[0xFFFF] = (this.pc & 0xFF00) >> 8; // High byte
        this.MEM[0xFFFE] = this.pc & 0x00FF; // Low byte
        this.MEM[0xFFFF] = (this.pc & 0xFF00) >> 8; // High byte

        // Emulator
        this.running = false;
        this.halted = false;

        initDisplay();
    }

    step() {
        draw(this.MEM);

        if (this.halted) return;
        if (this.running) requestAnimationFrame(this.step.bind(this));

        this.execute();

        if (this.PORT[0] & 0x01) this.halted = true;
    }
    
    execute() {
        this.pc = this.MEM[0xFFFF]; // High byte
        this.pc = (this.pc << 8) | this.MEM[0xFFFE]; // Low byte

        const ins = this.MEM[this.pc];
        const opcode = ins >> 4; // Get high 4 Bits
        const reg = ins & 0x07; // Get low 3 Bits
        const mode = (ins & 0x08) >> 3; // Get 3rd bit 
        this.pc++;

        switch (opcode) {
            case 0x0: // Add
                this.REG[reg] += mode ? this.reg() : this.imm8(); 
                break; 
            case 0x1: // Adc
                this.REG[reg] += (mode ? this.reg() : this.imm8()) + (this.REG[7] & 0x01); 
                break; 
            case 0x2: // Sub
                this.REG[reg] -= mode ? this.reg() : this.imm8(); 
                break;
            case 0x3: // And
                this.REG[reg] &= mode ? this.reg() : this.imm8(); 
                break;
            case 0x4: // Or
                this.REG[reg] |= mode ? this.reg() : this.imm8(); 
                break;
            case 0x5: // Nor
                this.REG[reg] = ~(this.REG[reg] | (mode ? this.reg() : this.imm8())); 
                break;
            case 0x6: { // Cmp reg, reg/imm8
                const a = this.REG[reg];
                const b = mode ? this.reg() : this.imm8();
                if (a == b) this.REG[7] |= 0x4;
                if (a > b) this.REG[7] |= 0x8;
                } break;
            case 0x7: // Mov
                this.REG[reg] = mode ? this.reg() : this.imm8(); 
                break;
            case 0x8: // Ldw
                this.REG[reg] = this.MEM[mode ? this.reg() : this.imm16()]; 
                break;
            case 0x9: // Stw
                this.MEM[mode ? this.reg() : this.imm16()] = this.REG[reg];
                break;
            case 0xA: // Lda
                this.REG[5] = this.imm16() & 0x00FF;
                this.REG[4] = (this.imm16()) >> 8;
                break;
            case 0xB: // Jnz
                if (mode ? this.reg() : this.imm8()) this.pc = (this.REG[4] << 8) | this.REG[5];
                break;
            case 0xC: { // Push
                let sp = this.MEM[0xFFFD];
                sp = (sp << 8) | this.MEM[0xFFFC]
                this.MEM[sp] = mode ? this.REG[reg] : this.imm8();
                sp++;
                this.MEM[0xFFFC] = this.pc & 0x00FF;
                this.MEM[0xFFFD] = (this.pc & 0xFF00) >> 8;
                } break;
            case 0xD: { // Pop
                let sp = this.MEM[0xFFFD];
                sp = (sp << 8) | this.MEM[0xFFFC]
                sp--;
                this.REG[reg] = this.MEM[sp];
                this.MEM[0xFFFC] = this.pc & 0x00FF;
                this.MEM[0xFFFD] = (this.pc & 0xFF00) >> 8;
                } break;
            case 0xE: // Inb
                this.REG[reg] = this.PORT[mode ? this.REG[reg] : this.imm8()];
                break;
            case 0xF: // Outb
                this.PORT[mode ? this.REG[reg] : this.imm8()] = this.REG[reg];
                break;
        }

        this.MEM[0xFFFE] = this.pc & 0x00FF; // Low byte
        this.MEM[0xFFFF] = (this.pc & 0xFF00) >> 8; // High byte
    }

    reg() {
        const reg = this.MEM[this.pc];
        this.pc++;
        return this.REG[reg];
    }

    imm8() {
        const byte = this.MEM[this.pc];
        this.pc++;
        return byte;
    }

    imm16() {
        const low = this.MEM[this.pc];
        this.pc++;
        const high = this.MEM[this.pc]
        this.pc++;
        return (high << 8) | low;
    }
}
