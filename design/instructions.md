# Instructions
8-Bit opcodes

Modes:
0: @ - Address
1: # - Immediate

## ADD
## SUB
## INC
## DEC
## SHL
## SHR
## AND
## OR
## NOT
## XOR

## LDA
## STA
## LDB
## STB
## LDC
## STC

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

# Micro instructions (32-bit number = one cycle)
## General purpose registers
AI - A register in (data bus)
AO - A register out (data bus)
BI - B register in (data bus)
BO - B register out (data bus)
CI - C register in (data bus)
CO - C register out (data bus)

## Memory
MI - Memory address register in (address bus)
AAI - Argument address register in (directly from ram)
AAO - Argument address register out (address bus)
RO - Ram out (data bus)
RI - Ram in (data bus)

## ALU
ΣO - Sum out (data bus)
SE - Subtract enable (data bus)

## System 
PO - Program counter out (address bus)
PI - Program counter in (address bus)
PE - Program counter enable
HLT - Halt procesor
