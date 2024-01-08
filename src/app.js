import { Emulator } from "./emulator.js";

const emulator = new Emulator();

document.getElementById("step").onclick = () => emulator.step();
document.getElementById("pause").onclick = () => emulator.running = !emulator.running;
document.getElementById("restart").onclick = () => emulator.restart();

const updateInfo = () => {
    requestAnimationFrame(updateInfo);
    if (emulator.halted) document.getElementById("status").innerText = "Halted";
    else if (emulator.running) document.getElementById("status").innerText = "Running";
    else document.getElementById("status").innerText = "Paused";
}; updateInfo();

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
