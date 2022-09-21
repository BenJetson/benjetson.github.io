---
title: Sporclone
username: benjetson
repo: sporclone
description: >-
  Basic set of online question-based games, written in HTML, CSS, and JS. Uses
  AJAX to fetch answer database.
issues: true
wiki: false
featured: true
rank: 4
date: 2016-04-25
photo: https://live.staticflickr.com/65535/49691531813_db04e6c90c_w.jpg
photo-alt: Screenshot of Sporclone Game
webpage: https://www.bengodfrey.net/sporclone
---

Sporclone is a word guessing game that can be played in a web browser. There are
several clues provided on the board, which players must match with the
associated word before the timer runs out.

<!-- prettier-ignore-start -->
![sporclone game results][gameover] The game results screen.
{:.caption}
<!-- prettier-ignore-end -->

### Construction

This project was created as part of my high school coursework for my Web Design
I class. The instructor (@joncoop) provided us with a basic template, and asked
us to fill in missing portions of the JavaScript and document structure.

The base assignment requirements were (roughly):

- the timer should count down after the start button was pressed
- the guesses should be shown on the game board when the user types
- the scoring system should show the number of correct guesses
- at least 2 different games should be available

However I quickly implemented these and got bored, so I decided to do some
expansions.

#### Expansion 1: Gameboard Obfuscation

The original program always showed the game board even before the user pressed
the "Play Game" button. I found this to be unacceptable because it allowed the
player to see what words they would be required to guess prior to even starting
the timer.

I wanted the gameboard to be hidden from view, but didn't want it to suddenly
and jarringly appear on the page when the game started. This meant that instead
of a simple `display: none`, I would need to cook up some kind of animation.

Not wanting to bring in additional JavaScript dependencies, I decided I would
try to learn about CSS animations since they were starting to gain decent levels
of [browser support](https://caniuse.com/css-animation) by that time.

```css
#answerDisplay {
  filter: blur(15px);
  transition-property: filter, -webkit-filter;
  transition-duration: 2s;
  transition-timing-function: ease;
}

.unhide {
  filter: blur(0px) !important;
}
```

<!-- TODO finish this -->

#### Expansion 2: Answer Obfuscation

The original program also included the answers to the puzzles embedded into the
document structure, which I thought made it a little too easy to cheat.

```txt
Tortoise*Toucan*Clownfish|Nemo*30
```

[gameover]: https://live.staticflickr.com/65535/51267858099_58b56d01b1_b.jpg
