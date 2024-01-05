import { Emulator } from "./emulator.js";

const emulator = new Emulator();

document.getElementById("step").onclick = () => emulator.step();
document.getElementById("pause").onclick = () => {
    if (emulator.running && !emulator.halted) {
        emulator.running = false;
        document.getElementById("pause").innerText = "Resume"
        document.getElementById("status").innerText = "Paused"
    } else if (!emulator.halted) {
        emulator.running = true;
        document.getElementById("pause").innerText = "Pause"
        document.getElementById("status").innerText = "Running"
        emulator.step();
    } else document.getElementById("status").innerText = "Halted";
}

emulator.memory[0x8000+0] = 0x48;
emulator.memory[0x8000+2] = 0x65;
emulator.memory[0x8000+4] = 0x6c;
emulator.memory[0x8000+6] = 0x6c;
emulator.memory[0x8000+8] = 0x6f;
emulator.memory[0x8000+10] = 0x21;
