import { Emulator } from "./emulator.js";

const emulator = new Emulator();

document.getElementById("step").onclick = () => emulator.halted ? document.getElementById("status").innerText = "Halted" : emulator.step();
document.getElementById("pause").onclick = () => {
    if (emulator.running) {
        emulator.running = false;
        document.getElementById("pause").innerText = "Resume"
        document.getElementById("status").innerText = "Paused"
    } else if (!emulator.halted) {
        emulator.running = true;
        document.getElementById("pause").innerText = "Pause"
        document.getElementById("status").innerText = "Running"
        emulator.step();
    } 
    if (emulator.halted) document.getElementById("status").innerText = "Halted";
}

const pgm = [
    0x70, 0x48, 
    0x90, 0x00, 0x80,
    0x70, 0x65, 
    0x90, 0x02, 0x80,
    0x70, 0x6c, 
    0x90, 0x04, 0x80,
    0x90, 0x06, 0x80,
    0x70, 0x6f, 
    0x90, 0x08, 0x80,
    0x70, 0x21, 
    0x90, 0x0A, 0x80,
    0xE0, 0x00, 
    0x40, 0x01, 
    0xF0, 0x00, 
]

pgm.forEach((b, i) => emulator.MEM[i] = b);
