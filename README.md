# Arcade-Game-Clone

## Table of Contents

* [Description](#Description)
* [Features](#Features)
* [Requirements](#Requirements)
* [Contributing](#Contributing)

## Description

This game plays like a classic frogger arcade game, use the arrow keys to move your character. You must avoid getting hit by the enemy bugs to progress. The game utilizes javascript class objects for the player and enemies.

## Features

#### Level Progress

The levels progress each time your character crosses the water.

- Your character resets position after **crossing the river**.
- The levels increase by one each time you **cross the river**.
- The difficulty increases every **4 levels** until you hit the Hardest difficulty.

#### Player

The arrow keys will enable the player to move around the landscape.

#### Enemies

Enemies move across the landscape attempting to prevent the player from progressing.

- Enemies' **speed increases** after each difficulty.
- There are **3 difficulty** settings for the enemies' speed.
- Hitting enemies will **decrease current level** and reset player position.
- Enemy **positions randomize** after they cross the screen.

## Requirements

Your current browser must atleast support ECMAScript 6

## Contributing

Base project code and assets came from a [Starter Code](https://github.com/udacity/frontend-nanodegree-arcade-game)
