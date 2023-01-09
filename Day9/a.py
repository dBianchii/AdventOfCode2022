import sys

with open('./Day9/input.txt', 'r') as f:
	input_str = f.read()

lines = input_str.split('\n')



def MoveHead(direction, distance):
	x_move = 0
	y_move = 0

	if direction == 'L':
		x_move = -1
	if direction == 'R':
		x_move = 1
	if direction == 'U':
		y_move = -1
	if direction == 'D':
		y_move = 1

	for i in range(distance):
		h_pos_x += x_move
		h_pos_y += y_move
		if len(map) <= h_pos_y:
			map.append([' '] * len(map[0]))
		if len(map[h_pos_y]) <= h_pos_x:
			for row in map:
				row.append('H')

map = [[' ']]



h_pos_x = 0
h_pos_y = 0
t_pos_x = 0
t_pos_y = 0

for line in lines:
	direction = line[0]
	distance = int(line.split(' ')[1])
	MoveHead(direction, distance)




print(map)
