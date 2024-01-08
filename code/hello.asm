mov a, 'H'      ; 70 48
stw a, 0x8000   ; 90 00 80
mov a, 'e'      ; 70 65
stw a, 0x8002   ; 90 02 80
mov a, 'l'      ; 70 6c
stw a, 0x8004   ; 90 00 84
stw a, 0x8006   ; 90 06 80
mov a, 'o'      ; 70 6f
stw a, 0x8008   ; 90 08 80
mov a, '!'      ; 70 21
stw a, 0x800A   ; 90 0A 80
inb a, 0x00     ; E0 00
or a, 0x01      ; 40 01
outb a, 0x00    ; F0 00
