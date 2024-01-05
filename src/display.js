/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('display');
const ctx = canvas.getContext('2d');

// Default: color text mode 80x25 (8x16 font)
const width  = 640;
const height = 400;

const charHeight = 16;
const charWidth = 8;

// Constants
const VIDMEM = 0x8000;

const colors = [
    "#000", 
    "#00A", 
    "#0A0", 
    "#0AA", 
    "#A00", 
    "#A0A", 
    "#A50", 
    "#AAA", 
    "#555", 
    "#55F", 
    "#5F5", 
    "#5FF", 
    "#F55", 
    "#F5F", 
    "#FF5", 
    "#FFF", 
]

/** @argument {Uint8Array} mem */
export const draw = (mem) => {
    ctx.clearRect(0, 0, width, height);

    ctx.font = "16px IBM_VGA_8x16, monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    for (let i = 0; i < 2000; i++) {
        const address = VIDMEM + i * 2;
        const char = String.fromCharCode(mem[address]);
        const attr = mem[address+1];

        const fg = attr & 0x0F;
        const bg = (attr & 0xF0) >> 4;

        const x = (i % 80) * charWidth;
        const y = Math.floor(i / 80) * charHeight;

        ctx.fillStyle = colors[bg];
        ctx.fillRect(x, y, charWidth, charHeight);
        
        ctx.fillStyle = colors[fg];
        ctx.fillText(char, x, y, charWidth);
    }
}

export const initDisplay = () => {
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
}
