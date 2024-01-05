import { Emulator } from "./emulator.js";

const emulator = new Emulator();

document.getElementById("step").onclick = () => emulator.step();

emulator.memory[0x8000+0] = 0x48;
emulator.memory[0x8000+1] = 0x0f;
emulator.memory[0x8000+2] = 0x65;
emulator.memory[0x8000+3] = 0x0f;
emulator.memory[0x8000+4] = 0x6c;
emulator.memory[0x8000+5] = 0x0f;
emulator.memory[0x8000+6] = 0x6c;
emulator.memory[0x8000+7] = 0x0f;
emulator.memory[0x8000+8] = 0x6f;
emulator.memory[0x8000+9] = 0x0f;
emulator.memory[0x8000+10] = 0x21;
emulator.memory[0x8000+11] = 0x0f;
