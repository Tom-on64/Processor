# Instructions
8-Bit opcodes

Modes:
00: @ - Address
01: # - Immediate
10: & - Register
11: * - Address in register (either AB or MAR)

## Common microcode
This microcode is at the start of every instruction and fetches the next instruction from memory.

It outputs PC to MAR
Then it outputs from ram to INS and increments PC

`PO MI, RO II CE`

For instructions that take in a memory address, this code will be at the start:
`PO MI, RO M`

## LDA
Loads a value into the A register

| Opcode   | Code example | Microcode |
| -------- | ------------ | --------- |
| 00000001 | A = [@]      |  |
| 00100001 | A = #        |           |
| 01000001 | A = &        |           |
| 01100001 | A = [*]      |           |

## STA
## LDB
## STB
## LDC
## STC
## ADD
## SUB
## INC
## DEC
## AND
## OR
## NOT
## XOR
## SHL
## SHR
## ROL
## ROR
## JMP
## JZ
## JNZ
## JE
## JNE
## JC
## JNC
## JO
## JNO
## PUSH
## POP
## CALL
## RET
## STI
## CLI
## INT
## CMP
## IN
## OUT
## NOP
## HLT

# Micro instructions
AI - A register in
AO - A register out
BI - B register in
BO - B register out
CI - C register in
CO - C register out

MI - Memory address register in (from address bus)
ML - Memory address register low byte in
MH - Memory address register hight byte in
RO - Ram out
RI - Ram in

ΣO - Sum out
SE - Subtract enable

PO - Program counter out
PI - Program counter in (jmp)
PE - Program counter enable (clk)
HLT - Halt procesor
