// Defining the strict types so our future scoring engine knows exactly how to grade the player.
export type QuestionType = "number" | "boolean" | "text";

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  answer: string | number | boolean;
  unit?: string; // e.g., "slices", "holes", "days" - shown in the input box
  tolerance?: number; // For numbers: How far off they can be to still get partial/full points
  fact: string; // The sarcastic/interesting fact shown after they lock in their guess
}

export const questionBank: Question[] = [
  // --- NUMBERS (Proximity Guessing) ---
  {
    id: 1,
    question: "You've eaten a million of them, but exactly how many tiny holes are punched into a single Ritz cracker?",
    type: "number",
    answer: 7,
    unit: "holes",
    tolerance: 2,
    fact: "There are exactly 7 holes. They aren't just for breathing, they stop the cracker from exploding in the oven. The more you know."
  },
  {
    id: 2,
    question: "How many ridges are on the edge of a standard US quarter coin?",
    type: "number",
    answer: 119,
    unit: "ridges",
    tolerance: 15,
    fact: "119 ridges. They originally added them so people would stop shaving the silver off the edges. Now they just collect pocket lint."
  },
  {
    id: 3,
    question: "Think of a standard dartboard. What number is directly opposite the 20 at the very bottom?",
    type: "number",
    answer: 3,
    unit: "number",
    tolerance: 0,
    fact: "It's 3. If you guessed anything else, you've clearly never played darts sober."
  },
  {
    id: 4,
    question: "Exactly how many slices are in a standard loaf of sliced bread? (Including the end pieces).",
    type: "number",
    answer: 20,
    unit: "slices",
    tolerance: 4,
    fact: "Usually 20 to 24, but the industry standard is 20. And yes, the end pieces are called the heels."
  },
  {
    id: 5,
    question: "How many distinct colors make up the classic Google logo?",
    type: "number",
    answer: 4,
    unit: "colors",
    tolerance: 0,
    fact: "Blue, red, yellow, green. If you guessed 5, you're hallucinating."
  },
  {
    id: 6,
    question: "How many physical keys are on a standard, full-sized piano?",
    type: "number",
    answer: 88,
    unit: "keys",
    tolerance: 5,
    fact: "52 white keys, 36 black keys. Total 88. Mozart would be disappointed if you got this wrong."
  },
  {
    id: 7,
    question: "How many total dots (pips) are on a standard pair of dice?",
    type: "number",
    answer: 42,
    unit: "dots",
    tolerance: 5,
    fact: "A single die has 21 dots. Two dice have 42. It's simple math that your brain just refused to do."
  },
  {
    id: 8,
    question: "What is the exact, total number of properties you can buy on a classic Monopoly board?",
    type: "number",
    answer: 28,
    unit: "properties",
    tolerance: 4,
    fact: "22 streets, 4 railroads, and 2 utilities. Ruining family game night since 1935."
  },
  {
    id: 9,
    question: "How many times does the average human blink in a single minute?",
    type: "number",
    answer: 15,
    unit: "blinks",
    tolerance: 5,
    fact: "Usually 15-20 times. Also, you are now manually blinking. You're welcome."
  },
  {
    id: 10,
    question: "How many squares are on a standard chessboard?",
    type: "number",
    answer: 64,
    unit: "squares",
    tolerance: 0,
    fact: "8x8 grid. 64 squares. If you failed this, don't even try playing chess."
  },

  // --- BOOLEAN (Yes/No - 50/50 Chance but still tricky) ---
  {
    id: 11,
    question: "Does a strawberry have its seeds on the inside or the outside?",
    type: "boolean",
    answer: "outside", // We will map this to true/false or custom buttons in the UI
    fact: "Outside. On average, there are 200 seeds on the outside of a single strawberry."
  },
  {
    id: 12,
    question: "In the United States, is a tomato legally classified as a fruit or a vegetable?",
    type: "boolean",
    answer: "vegetable",
    fact: "Botanically it's a fruit, but the US Supreme Court legally declared it a vegetable in 1893 to tax it. Capitalism wins again."
  },
  {
    id: 13,
    question: "Does the Mona Lisa have eyebrows?",
    type: "boolean",
    answer: "no",
    fact: "Nope. Da Vinci either never finished them, or they faded over the last 500 years."
  },
  {
    id: 14,
    question: "Is the Statue of Liberty holding the torch in her left or right hand?",
    type: "boolean",
    answer: "right",
    fact: "It's the right hand. The tablet is in her left. Next time you're in New York, actually look at it."
  },
  {
    id: 15,
    question: "If you flip a coin 10 times and get heads every time, are you more likely to get tails on the 11th flip?",
    type: "boolean",
    answer: "no",
    fact: "No. The coin has no memory. It's still exactly 50/50. Google the 'Gambler's Fallacy' before you visit Vegas."
  },

  // --- TEXT (Exact or close text matching) ---
  {
    id: 16,
    question: "What is the only letter that doesn't appear in any US state name?",
    type: "text",
    answer: "q",
    fact: "The letter Q. It literally does not exist in any of the 50 states."
  },
  {
    id: 17,
    question: "What color is the 'G' at the very end of the Google logo?",
    type: "text",
    answer: "blue",
    fact: "It's blue. G(blue) o(red) o(yellow) g(blue) l(green) e(red). Your brain completely ignored it."
  },
  {
    id: 18,
    question: "On a standard keyboard, what letter is directly between E and T?",
    type: "text",
    answer: "r",
    fact: "It's R. Q-W-E-R-T-Y. You literally look at this every single day."
  },
  {
    id: 19,
    question: "What color are the two 'O's in the middle of the Subway logo?",
    type: "text",
    answer: "there are no O's", // Tricky text question! We will accept "none"
    fact: "Trick question. There are no O's in Subway. Did you just guess yellow?"
  },
  {
    id: 20,
    question: "If you spell out numbers (one, two, three...), what is the first number to contain the letter 'A'?",
    type: "text",
    answer: "one thousand", // Accepting "1000" or "thousand"
    fact: "One thousand. You can literally count to 999 without ever using the letter A."
  },

  // --- MORE NUMBERS ---
  {
    id: 21,
    question: "Exactly how many ghosts chase Pac-Man in the original arcade game?",
    type: "number",
    answer: 4,
    unit: "ghosts",
    tolerance: 0,
    fact: "Blinky, Pinky, Inky, and Clyde. Just the four of them."
  },
  {
    id: 22,
    question: "How many complete time zones are there in the world?",
    type: "number",
    answer: 24,
    unit: "zones",
    tolerance: 2,
    fact: "There are 24 primary time zones, one for each hour of the day. (Though realistically, political lines make it closer to 38)."
  },
  {
    id: 23,
    question: "How many breaths does an average person take in a single day?",
    type: "number",
    answer: 22000,
    unit: "breaths",
    tolerance: 5000,
    fact: "Around 22,000. And just like blinking, you are now breathing manually. Sorry."
  },
  {
    id: 24,
    question: "How many total keys are on a standard Windows QWERTY keyboard (including the numpad)?",
    type: "number",
    answer: 104,
    unit: "keys",
    tolerance: 10,
    fact: "The standard is 104 keys. Laptops ruined this, but the classic desktop keyboard never changed."
  },
  {
    id: 25,
    question: "Exactly how many bones are in the adult human body?",
    type: "number",
    answer: 206,
    unit: "bones",
    tolerance: 15,
    fact: "206. You are born with about 300, but a bunch of them fuse together as you grow up."
  },
  {
    id: 26,
    question: "How many hearts does an octopus have?",
    type: "number",
    answer: 3,
    unit: "hearts",
    tolerance: 0,
    fact: "They have 3 hearts. Two pump blood to the gills, and one pumps it to the rest of the body."
  },
  {
    id: 27,
    question: "If you shuffle a deck of 52 cards perfectly, how many possible arrangements are there?",
    type: "number",
    answer: 8, // We are tricking the unit here for a specific type of answer
    unit: "digits long", 
    tolerance: 10,
    fact: "It's 8.06e+67. That means if you shuffle a deck, that exact order of cards has likely never existed before in the history of the universe."
  },
  {
    id: 28,
    question: "How many dimples are on an average golf ball?",
    type: "number",
    answer: 336,
    unit: "dimples",
    tolerance: 50,
    fact: "Usually exactly 336. They are designed that way to create turbulence so the ball flies twice as far."
  },
  {
    id: 29,
    question: "How many unique pieces does a standard Rubik's Cube have?",
    type: "number",
    answer: 26,
    unit: "pieces",
    tolerance: 3,
    fact: "26 tiny pieces on the outside, connected by a core mechanism on the inside."
  },
  {
    id: 30,
    question: "What is the exact percentage of water covering the Earth's surface?",
    type: "number",
    answer: 71,
    unit: "%",
    tolerance: 5,
    fact: "71%. And we've explored less than 5% of the oceans beneath it."
  },
  {
    id: 31,
    question: "Does the Starbucks mermaid have one tail or two?",
    type: "boolean",
    answer: "two", // Accepts 'two' or '2' in our future engine
    fact: "She has two tails. She's a twin-tailed siren. Look closer next time you buy a $7 coffee."
  },
  {
    id: 32,
    question: "Does the Monopoly Man wear a monocle?",
    type: "boolean",
    answer: "no",
    fact: "The Mandela Effect strikes again. Rich Uncle Pennybags has never worn a monocle in the history of the game."
  },
  {
    id: 33,
    question: "How many dots are on the Domino's Pizza logo?",
    type: "number",
    answer: 3,
    unit: "dots",
    tolerance: 0,
    fact: "Just 3. Two on one side, one on the other. They originally planned to add a dot for every new store, but gave up after three."
  },
  {
    id: 34,
    question: "Does Pikachu have a black tip at the end of his tail?",
    type: "boolean",
    answer: "no",
    fact: "Nope. His tail is completely yellow with a brown base. Your childhood memories are lying to you."
  },
  {
    id: 35,
    question: "Think of the Google logo. What color are the two 'O's?",
    type: "text",
    answer: "red and yellow",
    fact: "The first 'O' is red, the second 'O' is yellow. You stare at it every day and still had to guess."
  },
  {
    id: 36,
    question: "Does Mickey Mouse wear suspenders?",
    type: "boolean",
    answer: "no",
    fact: "No suspenders. Just two big yellow buttons on his red shorts. Where are the shorts attaching? Nobody knows."
  },
  {
    id: 37,
    question: "What color is the rightmost overlapping circle in the Mastercard logo?",
    type: "text",
    answer: "yellow",
    fact: "It's yellow (or orange-yellow). The left is red. Capitalism is colorful."
  },
  {
    id: 38,
    question: "How many stars are in the Paramount Pictures mountain logo?",
    type: "number",
    answer: 22,
    unit: "stars",
    tolerance: 3,
    fact: "22 stars. They originally stood for the 22 actors who signed contracts with the studio in 1916."
  },

  // --- EVERYDAY OBJECTS ---
  {
    id: 39,
    question: "How many prongs (tines) are on a standard dining fork?",
    type: "number",
    answer: 4,
    unit: "prongs",
    tolerance: 0,
    fact: "Four. If it has three, it's a trident or a dessert fork. Hence the name 'fork' (four-k... kinda)."
  },
  {
    id: 40,
    question: "How many pockets does a standard pair of blue jeans have?",
    type: "number",
    answer: 5,
    unit: "pockets",
    tolerance: 0,
    fact: "Five. Two in back, two in front, and that tiny, useless pocket inside the right front pocket originally meant for pocket watches."
  },
  {
    id: 41,
    question: "Think of a vertical traffic light. Which color is at the very bottom?",
    type: "text",
    answer: "green",
    fact: "It's green. If you answered red, please hand over your driver's license immediately."
  },
  {
    id: 42,
    question: "How many flat sides does a standard unsharpened wooden pencil have?",
    type: "number",
    answer: 6,
    unit: "sides",
    tolerance: 0,
    fact: "Six. They are hexagonal so they don't roll off your desk and into the abyss."
  },
  {
    id: 43,
    question: "Which way does the profile face on a United States Lincoln penny?",
    type: "text",
    answer: "right",
    fact: "Right. Almost every other US coin faces left. Lincoln is just built different."
  },
  {
    id: 44,
    question: "How many hot dog buns come in a standard grocery store pack?",
    type: "number",
    answer: 8,
    unit: "buns",
    tolerance: 0,
    fact: "Eight buns. But hot dogs are sold in packs of 10. The meat industry hates you."
  },

  // --- SNEAKY MATH & TIME ---
  {
    id: 45,
    question: "How many hours are in exactly one week?",
    type: "number",
    answer: 168,
    unit: "hours",
    tolerance: 10,
    fact: "24 hours times 7 days is 168. You have 168 hours a week and you're spending them playing this game."
  },
  {
    id: 46,
    question: "What is the only number spelled with the exact same amount of letters as its value?",
    type: "number", // They can input "4" or "four"
    answer: 4,
    unit: "number",
    tolerance: 0,
    fact: "Four. F-O-U-R. Four letters. It's the only one."
  },
  {
    id: 47,
    question: "How many months of the year have exactly 28 days?",
    type: "number",
    answer: 12,
    unit: "months",
    tolerance: 0,
    fact: "All 12 of them have at least 28 days. Did you guess 1? You fell right into my trap."
  },
  {
    id: 48,
    question: "If you cut a standard pizza with exactly 3 straight cuts across the whole pizza, what is the maximum number of slices you can get?",
    type: "number",
    answer: 7,
    unit: "slices",
    tolerance: 1,
    fact: "Seven slices. It's called the 'Lazy Caterer's sequence'. Math is weird."
  },
  {
    id: 49,
    question: "How many zeros are in one trillion?",
    type: "number",
    answer: 12,
    unit: "zeros",
    tolerance: 1,
    fact: "Twelve zeros. 1,000,000,000,000. Unless you are playing Cookie Clicker, you will never see this number."
  },
  {
    id: 50,
    question: "How many straight edges does a perfect circle have?",
    type: "number",
    answer: 0,
    unit: "edges",
    tolerance: 0,
    fact: "Zero. It's a circle. Why did you even hesitate?"
  },

  // --- WEIRD SCIENCE & NATURE ---
  {
    id: 51,
    question: "Are bananas technically classified as berries?",
    type: "boolean",
    answer: "yes",
    fact: "Yes. Botanically, a banana is a berry. Nature makes no sense."
  },
  {
    id: 52,
    question: "Are strawberries technically classified as berries?",
    type: "boolean",
    answer: "no",
    fact: "No. Strawberries are 'aggregate fruits'. A banana is a berry, but a strawberry isn't. The world is a lie."
  },
  {
    id: 53,
    question: "Do male mosquitoes bite humans?",
    type: "boolean",
    answer: "no",
    fact: "No. Only female mosquitoes bite because they need blood to develop their eggs. Males just drink flower nectar like gentlemen."
  },
  {
    id: 54,
    question: "Do bulls get angry when they see the color red?",
    type: "boolean",
    answer: "no",
    fact: "Bulls are actually red-green colorblind. They get angry at the cape's movement, not the color."
  },
  {
    id: 55,
    question: "Are bats actually blind?",
    type: "boolean",
    answer: "no",
    fact: "Bats can actually see perfectly fine, some even better than humans. The phrase 'blind as a bat' is a complete scam."
  },
  {
    id: 56,
    question: "How many eyes does a honeybee have?",
    type: "number",
    answer: 5,
    unit: "eyes",
    tolerance: 1,
    fact: "Five. Two large compound eyes, and three tiny simple eyes on the top of their head."
  },
  {
    id: 57,
    question: "Which planet in our solar system is closest to Earth right now, on average?",
    type: "text",
    answer: "mercury",
    fact: "Mercury! Venus comes closer sometimes, but Mercury is the closest to Earth the majority of the time."
  },

  // --- LANGUAGE & GEOGRAPHY ---
  {
    id: 58,
    question: "How many total letters are in the word 'Mississippi'?",
    type: "number",
    answer: 11,
    unit: "letters",
    tolerance: 1,
    fact: "11 letters. If you counted them on your fingers just now, I respect the dedication."
  },
  {
    id: 59,
    question: "What color is the cross on the flag of Switzerland?",
    type: "text",
    answer: "white",
    fact: "It's a white cross on a red background. Like a reverse first-aid kit."
  },
  {
    id: 60,
    question: "Can the Great Wall of China be seen from space with the naked eye?",
    type: "boolean",
    answer: "no",
    fact: "No, it's a total myth. It's really long, but it's only about 20 feet wide. You can't see a road from space either."
  },
  {
    id: 61,
    question: "How many states make up the contiguous United States (the lower block)?",
    type: "number",
    answer: 48,
    unit: "states",
    tolerance: 2,
    fact: "48. Hawaii and Alaska are the lonely ones holding out."
  },
  {
    id: 62,
    question: "What letter is located directly to the right of 'T' on a standard QWERTY keyboard?",
    type: "text",
    answer: "y",
    fact: "Y. You type on it every day, but your brain refuses to memorize the layout."
  },

  // --- RANDOM CHAOS ---
  {
    id: 63,
    question: "Did historically accurate pirates actually make people 'walk the plank'?",
    type: "boolean",
    answer: "no",
    fact: "No. Walking the plank was mostly invented by Hollywood and writers like Robert Louis Stevenson. Real pirates just threw you overboard."
  },
  {
    id: 64,
    question: "How many items are in a 'baker's dozen'?",
    type: "number",
    answer: 13,
    unit: "items",
    tolerance: 0,
    fact: "13. Bakers used to throw in an extra loaf to avoid getting beaten for shortchanging customers in medieval times."
  },
  {
    id: 65,
    question: "How many horizontal lines are in the capital letter 'E'?",
    type: "number",
    answer: 3,
    unit: "lines",
    tolerance: 0,
    fact: "Three. Top, middle, bottom. If you missed this, please reboot your brain."
  },
  {
    id: 66,
    question: "Does the standard game of Tetris have any pieces that are 5 blocks large?",
    type: "boolean",
    answer: "no",
    fact: "No. 'Tetra' literally means four. Every single piece in Tetris is exactly 4 blocks."
  },
  {
    id: 67,
    question: "If you mix the colors blue and yellow together, what color do you get?",
    type: "text",
    answer: "green",
    fact: "Green. Did you overthink it and guess brown?"
  },
  {
    id: 68,
    question: "How many points does a traditional Star of David have?",
    type: "number",
    answer: 6,
    unit: "points",
    tolerance: 0,
    fact: "Six points. Two overlapping triangles."
  },
  {
    id: 69,
    question: "What color is the 'H' in the standard blue hospital road sign?",
    type: "text",
    answer: "white",
    fact: "White. It's a big white H on a blue square. Not red."
  },
  {
    id: 70,
    question: "How many letters are in the Hawaiian alphabet?",
    type: "number",
    answer: 13,
    unit: "letters",
    tolerance: 3,
    fact: "Only 13. Five vowels and eight consonants. And they still manage to make words way longer than English."
  },
  {
    id: 71,
    question: "Did Frankenstein have bolts in his neck in the original book by Mary Shelley?",
    type: "boolean",
    answer: "no",
    fact: "No. The neck bolts were invented purely for the 1931 movie so the actor could hold his makeup on."
  },
  {
    id: 72,
    question: "Which chess piece can only ever move diagonally?",
    type: "text",
    answer: "bishop",
    fact: "The Bishop. The pawn is straight, the rook is straight, the knight jumps. Only the bishop is forever cursed to the diagonal."
  },
  {
    id: 73,
    question: "What color is the pill Neo swallows in the movie The Matrix?",
    type: "text",
    answer: "red",
    fact: "The Red pill. The blue pill wakes you back up in your bed."
  },
  {
    id: 74,
    question: "How many players from a single team are allowed on the field during a standard soccer match?",
    type: "number",
    answer: 11,
    unit: "players",
    tolerance: 1,
    fact: "11 players per team. 22 total running around chasing one ball."
  },
  {
    id: 75,
    question: "How many red stripes are exactly on the American flag?",
    type: "number",
    answer: 7,
    unit: "stripes",
    tolerance: 2,
    fact: "7 red stripes, and 6 white stripes. Total 13 for the original colonies."
  },
  {
    id: 76,
    question: "Do ostriches actually bury their heads in the sand when they are scared?",
    type: "boolean",
    answer: "no",
    fact: "No. If they did that, they would suffocate. They just lay their heads flat on the ground to hide."
  },
  {
    id: 77,
    question: "How many sides does a stop sign have?",
    type: "number",
    answer: 8,
    unit: "sides",
    tolerance: 0,
    fact: "Eight. It's a standard octagon. Please tell me you got this right."
  },
  {
    id: 78,
    question: "How many strings are on a standard acoustic guitar?",
    type: "number",
    answer: 6,
    unit: "strings",
    tolerance: 1,
    fact: "Six strings. E-A-D-G-B-E. Unless you're playing a bass or a weird custom harp."
  },
  {
    id: 79,
    question: "What letter comes immediately after 'W' in the alphabet?",
    type: "text",
    answer: "x",
    fact: "X. I know you just had to sing the alphabet song in your head to figure it out."
  },
  {
    id: 80,
    question: "What color is the literal background of this website right now?",
    type: "text",
    answer: "cream", // We can accept off-white, cream, beige
    fact: "It's an off-white cream color (#f4f0ea to be exact). Did you really just guess 'white'?"
  },
  {
    id: 81,
    question: "Does Curious George have a tail?",
    type: "boolean",
    answer: "no",
    fact: "No tail. He is technically an ape, not a monkey. Your childhood books lied to you."
  },
  {
    id: 82,
    question: "How many rings are interlocked in the Audi car logo?",
    type: "number",
    answer: 4,
    unit: "rings",
    tolerance: 0,
    fact: "Four rings. They represent the four originally independent motor companies that merged in 1932."
  },
  {
    id: 83,
    question: "What color is the actual 'F' in the classic Facebook logo?",
    type: "text",
    answer: "white",
    fact: "It's white. The background square/circle is blue. If you guessed blue, you fell right into the trap."
  },
  {
    id: 84,
    question: "Does the Pringles mascot (Julius Pringles) wear a bowtie?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, he wears a red bowtie. And no, he does NOT wear a monocle."
  },
  {
    id: 85,
    question: "How many stars are in the Subaru car logo?",
    type: "number",
    answer: 6,
    unit: "stars",
    tolerance: 1,
    fact: "Six stars. They represent the Pleiades star cluster. One big star and five little ones."
  },
  {
    id: 86,
    question: "What color is SpongeBob SquarePants' tie?",
    type: "text",
    answer: "red",
    fact: "It's a bright red tie. And he wears a white collared shirt. He dresses better than most office workers."
  },
  {
    id: 87,
    question: "Does Pikachu have stripes on his back?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, he has two horizontal brown stripes on his back. You literally only look at his face."
  },
  {
    id: 88,
    question: "What color is the play button triangle inside the classic YouTube logo?",
    type: "text",
    answer: "white",
    fact: "The triangle is white. The rectangle around it is red."
  },
  {
    id: 89,
    question: "What color is C-3PO's right leg below the knee in the original Star Wars movie?",
    type: "text",
    answer: "silver",
    fact: "It's silver. The Mandela Effect strikes again; most people swear he is entirely gold."
  },
  {
    id: 90,
    question: "How many colored sections make up the Simon Says electronic memory game?",
    type: "number",
    answer: 4,
    unit: "sections",
    tolerance: 0,
    fact: "Four sections: Red, Blue, Green, and Yellow. Beeps and boops included."
  },

  // --- ANATOMY & NATURE ---
  {
    id: 91,
    question: "Do human ears continue to grow your entire life?",
    type: "boolean",
    answer: "yes",
    fact: "Yes. Cartilage never stops growing. Enjoy looking forward to that."
  },
  {
    id: 92,
    question: "How many teeth does a standard, healthy human adult have (including wisdom teeth)?",
    type: "number",
    answer: 32,
    unit: "teeth",
    tolerance: 4,
    fact: "32 teeth. If you have more, please consult a dentist or an exorcist."
  },
  {
    id: 93,
    question: "Can you hum while holding your nose completely closed?",
    type: "boolean",
    answer: "no",
    fact: "No, you literally cannot. And I know you just tried to do it."
  },
  {
    id: 94,
    question: "Are zebras black with white stripes, or white with black stripes?",
    type: "text",
    answer: "black", // Accept "black with white stripes"
    fact: "They are black with white stripes. Their skin underneath all the fur is solid black."
  },
  {
    id: 95,
    question: "How many arms does a standard starfish have?",
    type: "number",
    answer: 5,
    unit: "arms",
    tolerance: 0,
    fact: "Five. Hence the 'star' in starfish."
  },
  {
    id: 96,
    question: "Do owls actually have eyeballs?",
    type: "boolean",
    answer: "no",
    fact: "No, they have eye 'tubes'. Because they are tubes, they can't move them, which is why they have to swivel their entire head."
  },
  {
    id: 97,
    question: "How many distinct points does a naturally formed snowflake have?",
    type: "number",
    answer: 6,
    unit: "points",
    tolerance: 0,
    fact: "Always 6. It's due to the molecular structure of ice crystals."
  },
  {
    id: 98,
    question: "Do polar bears have black skin?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, their skin is jet black to absorb heat from the sun, and their fur is actually transparent, not white."
  },
  {
    id: 99,
    question: "Are peanuts biologically classified as nuts?",
    type: "boolean",
    answer: "no",
    fact: "No. They are legumes. They grow underground like potatoes. The name is a lie."
  },

  // --- EVERYDAY OBJECTS & MATH ---
  {
    id: 100,
    question: "How many holes are drilled into a standard 10-pin bowling ball?",
    type: "number",
    answer: 3,
    unit: "holes",
    tolerance: 0,
    fact: "Three. Thumb, middle finger, ring finger."
  },
  {
    id: 101,
    question: "What is the only vowel that does NOT appear on the top letter row of a QWERTY keyboard?",
    type: "text",
    answer: "a",
    fact: "The letter 'A'. It's chilling on the home row with caps lock."
  },
  {
    id: 102,
    question: "How many pockets does a standard billiards (pool) table have?",
    type: "number",
    answer: 6,
    unit: "pockets",
    tolerance: 0,
    fact: "Six. Four corners and two side pockets."
  },
  {
    id: 103,
    question: "What color is the bottom-most stripe on the United States flag?",
    type: "text",
    answer: "red",
    fact: "Red. It starts with red on top, and ends with red on the bottom."
  },
  {
    id: 104,
    question: "How many total colored squares make up the outside of a classic, fully solved 3x3 Rubik's Cube?",
    type: "number",
    answer: 54,
    unit: "squares",
    tolerance: 6,
    fact: "54 squares. 9 squares per side, 6 sides."
  },
  {
    id: 105,
    question: "Does the uppercase letter 'Q' have a straight line in it?",
    type: "boolean",
    answer: "yes",
    fact: "Yes. The little tail at the bottom right is a straight line."
  },
  {
    id: 106,
    question: "How many sides does a standard D20 die have?",
    type: "number",
    answer: 20,
    unit: "sides",
    tolerance: 0,
    fact: "20 sides. It's called an icosahedron. And yes, rolling a 1 still hurts."
  },
  {
    id: 107,
    question: "If you bowl a 'perfect game' in 10-pin bowling, how many pins do you knock down total?",
    type: "number",
    answer: 120,
    unit: "pins",
    tolerance: 10,
    fact: "120 pins. 12 consecutive strikes, 10 pins each."
  },
  {
    id: 108,
    question: "How many strings does a standard violin have?",
    type: "number",
    answer: 4,
    unit: "strings",
    tolerance: 0,
    fact: "Four. G, D, A, and E. That's all it takes to make you cry."
  },
  {
    id: 109,
    question: "What color is a standard yield sign in the United States?",
    type: "text",
    answer: "red and white", // Accepting red, or red and white
    fact: "Red and white. It used to be yellow, but they changed it in 1971."
  },

  // --- LANGUAGE, TIME & GEOGRAPHY ---
  {
    id: 110,
    question: "How many months of the year have exactly 31 days?",
    type: "number",
    answer: 7,
    unit: "months",
    tolerance: 1,
    fact: "Seven months. You definitely just used the knuckle trick to count them."
  },
  {
    id: 111,
    question: "What is the only even prime number?",
    type: "number",
    answer: 2,
    unit: "number",
    tolerance: 0,
    fact: "Two. Every other even number can be divided by 2, making them not prime."
  },
  {
    id: 112,
    question: "What letter represents the number 1000 in Roman Numerals?",
    type: "text",
    answer: "m",
    fact: "M, which stands for 'mille' (Latin for thousand). Not K, sorry."
  },
  {
    id: 113,
    question: "What is the last letter of the Greek alphabet?",
    type: "text",
    answer: "omega",
    fact: "Omega. Alpha is the beginning, Omega is the end."
  },
  {
    id: 114,
    question: "How many dots are there in a standard grammatical ellipsis?",
    type: "number",
    answer: 3,
    unit: "dots",
    tolerance: 0,
    fact: "Exactly three (...). If you use four, you're just being dramatic."
  },
  {
    id: 115,
    question: "Is the capital city of Australia Sydney?",
    type: "boolean",
    answer: "no",
    fact: "No, it's Canberra. Sydney is just the one with the famous opera house."
  },
  {
    id: 116,
    question: "In standard English, what is the most commonly used letter?",
    type: "text",
    answer: "e",
    fact: "The letter 'E'. It appears in roughly 11% of all English words."
  },
  {
    id: 117,
    question: "Does the sun rise in the East or the West?",
    type: "text",
    answer: "east",
    fact: "The East. If it's rising in the West, the Earth has stopped spinning and we are all doomed."
  },
  {
    id: 118,
    question: "How many days are in a standard leap year?",
    type: "number",
    answer: 366,
    unit: "days",
    tolerance: 0,
    fact: "366. February gets its 29th day."
  },
  {
    id: 119,
    question: "What is the literal English translation of the Spanish word 'quesadilla'?",
    type: "text",
    answer: "little cheese thing", // Will accept "cheese", "little cheese"
    fact: "It translates to 'little cheese thing'. Deliciously accurate."
  },

  // --- PURE CHAOS ---
  {
    id: 120,
    question: "What is the official color of a standard tennis ball as classified by the International Tennis Federation?",
    type: "text",
    answer: "optic yellow", // Will accept yellow
    fact: "Optic Yellow. Some people swear they are green, but officially, they are yellow."
  },
  {
    id: 121,
    question: "How many different colored rings make up the classic Olympic logo?",
    type: "number",
    answer: 5,
    unit: "rings",
    tolerance: 0,
    fact: "Five. Blue, yellow, black, green, and red. They represent the inhabited continents."
  },
  {
    id: 122,
    question: "Did George Washington have wooden teeth?",
    type: "boolean",
    answer: "no",
    fact: "No. His dentures were made from ivory, lead, brass, and terrifyingly, actual human teeth. No wood."
  },
  {
    id: 123,
    question: "How many holes are in a standard, full-sized golf course?",
    type: "number",
    answer: 18,
    unit: "holes",
    tolerance: 0,
    fact: "18 holes. If it has 9, it's a half-course. If it has windmills, it's mini-golf."
  },
  {
    id: 124,
    question: "In the famous painting 'American Gothic' (the farmer and the woman), is the woman his wife or his daughter?",
    type: "text",
    answer: "daughter",
    fact: "She is his daughter. The models were actually the artist's sister and his dentist."
  },
  {
    id: 125,
    question: "How many visible buttons are on the front face of a classic Super Nintendo (SNES) controller?",
    type: "number",
    answer: 6,
    unit: "buttons",
    tolerance: 1,
    fact: "Six. A, B, X, Y, Start, and Select. The D-Pad is technically one piece, and the shoulder buttons aren't on the front face."
  },
  {
    id: 126,
    question: "Does a standard USB-A plug have a 50/50 chance of going in correctly on the first try?",
    type: "boolean",
    answer: "yes",
    fact: "Mathematically yes. But spiritually, it always takes three tries. You know this is true."
  },
  {
    id: 127,
    question: "How many zeros are in one billion?",
    type: "number",
    answer: 9,
    unit: "zeros",
    tolerance: 1,
    fact: "Nine zeros. 1,000,000,000."
  },
  {
    id: 128,
    question: "What color is the lid on a standard jar of Skippy peanut butter?",
    type: "text",
    answer: "cyan", // Will accept cyan, teal, or blue
    fact: "It's a cyan/teal blue. Jif is red. Peter Pan is green. The peanut butter wars are color-coded."
  },
  {
    id: 129,
    question: "Does the Earth actually take exactly 24 hours to rotate once on its axis?",
    type: "boolean",
    answer: "no",
    fact: "No, it takes 23 hours, 56 minutes, and 4 seconds. We just round up so our clocks don't break."
  },
  {
    id: 130,
    question: "What color is the 'o' pointing to in the smiling arrow of the Amazon logo?",
    type: "text",
    answer: "z", // Tricky text question! The 'a' points to 'z'
    fact: "Trick question! The arrow starts at 'a' and points to 'z'. (Because they sell everything from A to Z)."
  },
  {
    id: 131,
    question: "In vanilla Minecraft, exactly how many wooden planks does it take to craft a single chest?",
    type: "number",
    answer: 8,
    unit: "planks",
    tolerance: 0,
    fact: "8 planks. Just a hollow ring in the crafting table. Don't tell me you forgot the recipe."
  },
  {
    id: 132,
    question: "How many playable main protagonists are there in the story mode of Grand Theft Auto V?",
    type: "number",
    answer: 3,
    unit: "characters",
    tolerance: 0,
    fact: "Three: Michael, Franklin, and Trevor. If you guessed online characters, you're overthinking it."
  },
  {
    id: 133,
    question: "In basic computer logic and languages like C, what exact number represents a 'true' boolean state?",
    type: "number",
    answer: 1,
    unit: "value",
    tolerance: 0,
    fact: "1 is true, 0 is false. If you guessed 2, you're officially fired from coding."
  },
  {
    id: 134,
    question: "What letter is directly between 'U' and 'O' on a standard QWERTY keyboard?",
    type: "text",
    answer: "i",
    fact: "The letter 'I'. You are probably literally staring at it right now."
  },
  {
    id: 135,
    question: "How many iron blocks does it take to build an Iron Golem in Minecraft?",
    type: "number",
    answer: 4,
    unit: "blocks",
    tolerance: 0,
    fact: "4 iron blocks in a T-shape, plus a pumpkin. Expensive, but worth it."
  },
  {
    id: 136,
    question: "How many letters are in the longest English word you can type using only the top row of a keyboard?",
    type: "number",
    answer: 10,
    unit: "letters",
    tolerance: 1,
    fact: "10 letters. The word is 'TYPEWRITER'. Go ahead, trace it out. I'll wait."
  },
  {
    id: 137,
    question: "How many standard colored action buttons (A, B, X, Y) are on the right side of a classic Xbox controller?",
    type: "number",
    answer: 4,
    unit: "buttons",
    tolerance: 0,
    fact: "Four buttons. And no, the joystick doesn't count."
  },

  // --- THE MANDELA EFFECT & LOGOS ---
  {
    id: 138,
    question: "Does the Monopoly Man have a mustache?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, he has a big white mustache. He just doesn't have a monocle. Get your rich guys straight."
  },
  {
    id: 139,
    question: "Does the classic red-and-white Coca-Cola logo contain a hyphen?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, it is 'Coca-Cola'. The hyphen is a little swoosh in the middle."
  },
  {
    id: 140,
    question: "Think of the Pepsi logo. Which color is on the top half of the circle?",
    type: "text",
    answer: "red",
    fact: "Red is on top, blue is on the bottom, white is in the middle. Refreshing."
  },
  {
    id: 141,
    question: "What color is the letter 'L' in the Google logo?",
    type: "text",
    answer: "green",
    fact: "It's green. It's the only green letter in the entire logo."
  },
  {
    id: 142,
    question: "How many curved lines are in the Spotify logo?",
    type: "number",
    answer: 3,
    unit: "lines",
    tolerance: 0,
    fact: "Exactly three. And fun fact: they are slightly crooked, which bothers designers to no end."
  },
  {
    id: 143,
    question: "What color is the classic Target store logo (the bullseye)?",
    type: "text",
    answer: "red",
    fact: "Red. If you missed this, I don't know how you survive in modern society."
  },

  // --- NATURE & ANATOMY ---
  {
    id: 144,
    question: "Do flamingos hatch out of their eggs already pink?",
    type: "boolean",
    answer: "no",
    fact: "No, they are born gray. They turn pink because of the shrimp and algae they eat."
  },
  {
    id: 145,
    question: "How many legs does a butterfly have?",
    type: "number",
    answer: 6,
    unit: "legs",
    tolerance: 0,
    fact: "Six legs. They are insects. Your brain just imagined them as floating wings, didn't it?"
  },
  {
    id: 146,
    question: "How many total bones are in a Great White Shark's body?",
    type: "number",
    answer: 0,
    unit: "bones",
    tolerance: 0,
    fact: "Zero. Their entire skeleton is made of cartilage. Squishy, deadly cartilage."
  },
  {
    id: 147,
    question: "Are killer whales (orcas) technically classified as whales?",
    type: "boolean",
    answer: "no",
    fact: "No, they are actually the world's largest species of dolphin. The ocean is full of lies."
  },
  {
    id: 148,
    question: "Do penguins live at the North Pole?",
    type: "boolean",
    answer: "no",
    fact: "No, penguins live in the Southern Hemisphere (Antarctica). Polar bears live in the North."
  },
  {
    id: 149,
    question: "How many hearts does an earthworm have?",
    type: "number",
    answer: 5,
    unit: "hearts",
    tolerance: 1,
    fact: "Five tiny little hearts to keep that weird tube-body pumping."
  },
  {
    id: 150,
    question: "Are tomatoes considered berries?",
    type: "boolean",
    answer: "yes",
    fact: "Yes. Botanically, tomatoes are berries. Let that sink in next time you eat ketchup."
  },

  // --- GEOGRAPHY & FLAGS ---
  {
    id: 151,
    question: "How many spokes are on the blue Ashoka Chakra wheel in the center of the Indian flag?",
    type: "number",
    answer: 24,
    unit: "spokes",
    tolerance: 2,
    fact: "24 spokes. They represent the 24 hours of the day and the continuous forward movement of the country."
  },
  {
    id: 152,
    question: "How many stars are on the red flag of China?",
    type: "number",
    answer: 5,
    unit: "stars",
    tolerance: 0,
    fact: "Five stars. One large star and four smaller ones arranged in an arc."
  },
  {
    id: 153,
    question: "What color is the top stripe on the flag of Germany?",
    type: "text",
    answer: "black",
    fact: "Black. The order is Black, Red, Gold."
  },
  {
    id: 154,
    question: "How many official time zones does the entire country of China use?",
    type: "number",
    answer: 1,
    unit: "zones",
    tolerance: 0,
    fact: "Just one. The entire massive country runs on Beijing Standard Time. Sunset in the west happens at like midnight."
  },
  {
    id: 155,
    question: "Does a standard magnetic compass actually point to the true North Pole?",
    type: "boolean",
    answer: "no",
    fact: "No, it points to Magnetic North, which is constantly moving and is currently somewhere in Northern Canada."
  },

  // --- TRIVIA CHAOS ---
  {
    id: 156,
    question: "Opposite sides of a standard six-sided die always add up to what exact number?",
    type: "number",
    answer: 7,
    unit: "total",
    tolerance: 0,
    fact: "Seven. 1 is opposite 6, 2 is opposite 5, 3 is opposite 4. The math is beautiful."
  },
  {
    id: 157,
    question: "Does the King of Hearts in a standard deck of cards have a mustache?",
    type: "boolean",
    answer: "no",
    fact: "No, he is the only King in the deck without a mustache. He's also stabbing himself in the head."
  },
  {
    id: 158,
    question: "How many dots are on the letter 'i' in the spelling of 'Mississippi'?",
    type: "number",
    answer: 4,
    unit: "dots",
    tolerance: 0,
    fact: "Four 'i's, four dots. It's the most fun word to spell in the English language."
  },
  {
    id: 159,
    question: "In the original movie, did Darth Vader actually say the exact words 'Luke, I am your father'?",
    type: "boolean",
    answer: "no",
    fact: "No. The actual line is 'No, I am your father.' You've been quoting it wrong your entire life."
  },
  {
    id: 160,
    question: "How many total black keys are on a standard 88-key piano?",
    type: "number",
    answer: 36,
    unit: "keys",
    tolerance: 3,
    fact: "36 black keys, 52 white keys."
  },
  {
    id: 161,
    question: "How many sides does a heptagon have?",
    type: "number",
    answer: 7,
    unit: "sides",
    tolerance: 0,
    fact: "Seven. Pentagon is 5, Hexagon is 6, Heptagon is 7."
  },
  {
    id: 162,
    question: "What color is the letter 'N' in the classic 90s Nintendo logo?",
    type: "text",
    answer: "red",
    fact: "It's bold, solid red. Just like Mario's hat."
  },
  {
    id: 163,
    question: "How many total primary colors are there in the RGB additive color model?",
    type: "number",
    answer: 3,
    unit: "colors",
    tolerance: 0,
    fact: "Three. Red, Green, Blue. That's literally what RGB stands for."
  },
  {
    id: 164,
    question: "How many lines are in a traditional Haiku poem?",
    type: "number",
    answer: 3,
    unit: "lines",
    tolerance: 0,
    fact: "Three lines. 5 syllables, 7 syllables, 5 syllables. Poetry is just math with words."
  },
  {
    id: 165,
    question: "Is glass technically a slow-moving liquid?",
    type: "boolean",
    answer: "no",
    fact: "No, it's an amorphous solid. That myth comes from old windows being thicker at the bottom because of how they were manufactured, not melting."
  },
  {
    id: 166,
    question: "Which chess piece is visually shaped like a horse?",
    type: "text",
    answer: "knight",
    fact: "The Knight. If you typed 'horse', I award you zero points."
  },
  {
    id: 167,
    question: "Does a lightning bolt visibly travel from the sky down to the ground?",
    type: "boolean",
    answer: "no",
    fact: "No. The actual bright flash you see travels from the ground UP to the cloud. Physics is wild."
  },
  {
    id: 168,
    question: "How many consonants are in the standard English alphabet?",
    type: "number",
    answer: 21,
    unit: "consonants",
    tolerance: 0,
    fact: "21 consonants and 5 vowels. (Sometimes Y, but we aren't counting that)."
  },
  {
    id: 169,
    question: "What is the only state in the US that starts with the letter 'P'?",
    type: "text",
    answer: "pennsylvania",
    fact: "Pennsylvania. I know you were sitting there trying to invent 'P-something' states."
  },
  {
    id: 170,
    question: "How many main rings does the planet Saturn have?",
    type: "number",
    answer: 7,
    unit: "rings",
    tolerance: 1,
    fact: "Seven main rings, creatively named A, B, C, D, E, F, and G."
  },
  {
    id: 171,
    question: "Do male seahorses carry the eggs and give birth to the babies?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, the female deposits the eggs into the male's pouch, and he carries them until birth. Equality."
  },
  {
    id: 172,
    question: "How many dots make up the colon punctuation mark?",
    type: "number",
    answer: 2,
    unit: "dots",
    tolerance: 0,
    fact: "Two. One on top of the other. Just making sure your eyes work."
  },
  {
    id: 173,
    question: "In the classic game Rock, Paper, Scissors, what item definitively beats Scissors?",
    type: "text",
    answer: "rock",
    fact: "Rock. If you got this wrong, you have never settled a playground dispute."
  },
  {
    id: 174,
    question: "How many sides does a trapezoid have?",
    type: "number",
    answer: 4,
    unit: "sides",
    tolerance: 0,
    fact: "Four. It's a quadrilateral with at least one pair of parallel sides."
  },
  {
    id: 175,
    question: "What color is the top stripe on the LGBTQ+ Pride Flag?",
    type: "text",
    answer: "red",
    fact: "Red. It follows the standard colors of the rainbow, starting with red at the top."
  },
  {
    id: 176,
    question: "How many strings are on a standard bass guitar?",
    type: "number",
    answer: 4,
    unit: "strings",
    tolerance: 0,
    fact: "Four thick strings. E, A, D, and G."
  },
  {
    id: 177,
    question: "If you divide 100 by half, what number do you get?",
    type: "number",
    answer: 200,
    unit: "number",
    tolerance: 0,
    fact: "200. Dividing by 0.5 is the same as multiplying by 2. Did you answer 50? Shame."
  },
  {
    id: 178,
    question: "What color is the inner-most ring on a standard archery target?",
    type: "text",
    answer: "yellow", // Accepting yellow/gold
    fact: "It's yellow (or gold). It goes white, black, blue, red, yellow."
  },
  {
    id: 179,
    question: "Does the Great Sphinx of Giza have a nose?",
    type: "boolean",
    answer: "no",
    fact: "No. It was broken off hundreds of years ago. Napoleon gets blamed, but nobody actually knows who did it."
  },
  {
    id: 180,
    question: "How many zeroes are in exactly one million?",
    type: "number",
    answer: 6,
    unit: "zeroes",
    tolerance: 0,
    fact: "Six. 1,000,000. It's nice to dream."
  },
  {
    id: 181,
    question: "Look closely at a KitKat bar wrapper. Is there a hyphen between Kit and Kat?",
    type: "boolean",
    answer: "no",
    fact: "No hyphen. It's just KitKat. Your brain inserted a dash that never existed."
  },
  {
    id: 182,
    question: "Is the popular shoe brand spelled 'Sketchers' with a T?",
    type: "boolean",
    answer: "no",
    fact: "No T. It's Skechers. Millions of people get this wrong every single day."
  },
  {
    id: 183,
    question: "Does the cereal brand 'Froot Loops' actually spell the word fruit with two O's?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, it's FROOT. There is no actual fruit in the cereal, so they legally couldn't call it 'Fruit'."
  },
  {
    id: 184,
    question: "Is the classic Bugs Bunny cartoon series spelled 'Looney Toons'?",
    type: "boolean",
    answer: "no",
    fact: "No, it's Looney TUNES. Because it was originally a sister series to 'Merrie Melodies'. Mind blown."
  },
  {
    id: 185,
    question: "Think of the classic Fruit of the Loom logo. Is there a cornucopia (horn of plenty) behind the fruit?",
    type: "boolean",
    answer: "no",
    fact: "No cornucopia. It's just a pile of fruit. Thousands of people swear they remember a basket, but they are all wrong."
  },
  {
    id: 186,
    question: "Does the official brand name of the famous square cheese cracker 'Cheez-It' end with an S?",
    type: "boolean",
    answer: "no",
    fact: "No S. It is Cheez-It. Singular. We just call them Cheez-Its because we eat 50 at a time."
  },
  {
    id: 187,
    question: "Is the department store JCPenney spelled with an 'e' before the 'y'?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, there is an E before the Y. Penney. If you spelled it Penny, you're not alone."
  },
  {
    id: 188,
    question: "Think of the classic Super Mario outfit. Are his overalls red?",
    type: "boolean",
    answer: "no",
    fact: "No! His shirt is red, his overalls are blue. Unless you are playing the original 1981 arcade Donkey Kong, you have this backward."
  },

  // --- ABSURD BIOLOGY & NATURE MYTHS ---
  {
    id: 189,
    question: "Does a snail actually have teeth?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, and they have thousands of them. They are on a ribbon-like structure called a radula. Sweet dreams."
  },
  {
    id: 190,
    question: "Do pigs physically have the biological ability to sweat?",
    type: "boolean",
    answer: "no",
    fact: "No. 'Sweating like a pig' makes no sense because pigs literally cannot sweat. They roll in mud to cool off."
  },
  {
    id: 191,
    question: "In a pride of lions, do the males do the majority of the hunting?",
    type: "boolean",
    answer: "no",
    fact: "No, the females do about 90% of the hunting. The males just sleep 20 hours a day and look majestic."
  },
  {
    id: 192,
    question: "Does a camel actually store water inside its humps?",
    type: "boolean",
    answer: "no",
    fact: "No, humps store fat, not water. It's an emergency food reserve, not a backpack hydration bladder."
  },
  {
    id: 193,
    question: "When human blood is completely deoxygenated inside your veins, does it turn blue?",
    type: "boolean",
    answer: "no",
    fact: "No. Blood is always red. It just looks blue through your skin because of how light scatters."
  },
  {
    id: 194,
    question: "Can a human breathe and swallow at the exact same time?",
    type: "boolean",
    answer: "no",
    fact: "No, you literally cannot. Your epiglottis blocks your airway when you swallow so you don't choke to death."
  },
  {
    id: 195,
    question: "Does cracking your knuckles actually lead to arthritis?",
    type: "boolean",
    answer: "no",
    fact: "No. The popping sound is just nitrogen gas bubbles bursting in your joint fluid. Crack away."
  },
  {
    id: 196,
    question: "Are dogs completely colorblind, seeing only in black and white?",
    type: "boolean",
    answer: "no",
    fact: "No, dogs can see blue and yellow. They just can't see red or green. Throwing a red ball on green grass is basically torture to them."
  },
  {
    id: 197,
    question: "Do humans actually swallow an average of 8 spiders a year in their sleep?",
    type: "boolean",
    answer: "no",
    fact: "No. That stat was entirely made up in a 1993 magazine article to prove how easily people believe fake facts on the internet."
  },
  {
    id: 198,
    question: "In the wild, do polar bears occasionally eat penguins?",
    type: "boolean",
    answer: "no",
    fact: "No. Polar bears live at the North Pole. Penguins live at the South Pole. They literally never meet."
  },
  {
    id: 199,
    question: "Does shaving your hair make it grow back thicker?",
    type: "boolean",
    answer: "no",
    fact: "No. It just feels thicker because you cut the hair off at its widest point. It's an optical illusion."
  },
  {
    id: 200,
    question: "Do chameleons change their color primarily to blend in with their surroundings?",
    type: "boolean",
    answer: "no",
    fact: "No, they change color based on their temperature, mood, and to communicate. The stealth camouflage thing is a myth."
  },

  // --- TRICKY MATH & NUMBERS ---
  {
    id: 201,
    question: "How many total syllables are in the word 'Hippopotamus'?",
    type: "number",
    answer: 5,
    unit: "syllables",
    tolerance: 0,
    fact: "Five. Hip-po-pot-a-mus. Clap it out like you're in kindergarten."
  },
  {
    id: 202,
    question: "How many pockets (numbers) are on a standard European roulette wheel (including the zero)?",
    type: "number",
    answer: 37,
    unit: "numbers",
    tolerance: 1,
    fact: "37. Numbers 1 through 36, plus a single zero. (American wheels have 38 because of the double zero)."
  },
  {
    id: 203,
    question: "During a standard volleyball match, exactly how many players are on the court in total?",
    type: "number",
    answer: 12,
    unit: "players",
    tolerance: 0,
    fact: "12 total. Six players on each side of the net."
  },
  {
    id: 204,
    question: "How many points does the red maple leaf on the Canadian flag have?",
    type: "number",
    answer: 11,
    unit: "points",
    tolerance: 2,
    fact: "11 points. It was specifically redesigned in 1965 to look less blurry when blowing in the wind."
  },
  {
    id: 205,
    question: "How many times does the letter 'A' appear in the word 'Banana'?",
    type: "number",
    answer: 3,
    unit: "letters",
    tolerance: 0,
    fact: "Three. B-A-N-A-N-A. Don't go full Gwen Stefani on me."
  },
  {
    id: 206,
    question: "How many straight sides does a hexagon have?",
    type: "number",
    answer: 6,
    unit: "sides",
    tolerance: 0,
    fact: "Six sides. Hex = Six. This is primary school geometry."
  },
  {
    id: 207,
    question: "If you order a 'gross' of items, exactly how many items are you getting?",
    type: "number",
    answer: 144,
    unit: "items",
    tolerance: 10,
    fact: "144. A dozen dozens. Math is fun."
  },
  {
    id: 208,
    question: "How many strings does a standard ukulele have?",
    type: "number",
    answer: 4,
    unit: "strings",
    tolerance: 0,
    fact: "Four strings. Guitars have six, ukuleles have four. Easy."
  },
  {
    id: 209,
    question: "Exactly how many zeroes are in one quadrillion?",
    type: "number",
    answer: 15,
    unit: "zeroes",
    tolerance: 2,
    fact: "15 zeroes. 1,000,000,000,000,000. It's a number so big it literally stops making sense in your head."
  },
  {
    id: 210,
    question: "How many planets in our solar system actually have rings around them?",
    type: "number",
    answer: 4,
    unit: "planets",
    tolerance: 0,
    fact: "Four of them! Jupiter, Saturn, Uranus, and Neptune all have rings. Saturn's are just the only ones showing off."
  },
  {
    id: 211,
    question: "How many primary points (N, S, E, W) are on a standard compass rose?",
    type: "number",
    answer: 4,
    unit: "points",
    tolerance: 0,
    fact: "Four main points: North, South, East, West. If you guessed 8, you were counting the 'intercardinal' points."
  },
  {
    id: 212,
    question: "How many total eyes does a standard caterpillar have?",
    type: "number",
    answer: 12,
    unit: "eyes",
    tolerance: 2,
    fact: "12 eyes, called stemmata. And their vision is still absolute garbage."
  },
  {
    id: 213,
    question: "If you add up all the inside angles of a standard triangle, how many degrees is it?",
    type: "number",
    answer: 180,
    unit: "degrees",
    tolerance: 0,
    fact: "180 degrees. If you said 360, you're thinking of a circle or a square."
  },
  {
    id: 214,
    question: "Exactly how many days are in a fortnight?",
    type: "number",
    answer: 14,
    unit: "days",
    tolerance: 0,
    fact: "14 days. It literally comes from the Old English term 'fourteen nights'."
  },
  {
    id: 215,
    question: "How many colored squares make up a single face of a 3x3 Rubik's Cube?",
    type: "number",
    answer: 9,
    unit: "squares",
    tolerance: 0,
    fact: "9 squares per side. 3 rows of 3."
  },
  {
    id: 216,
    question: "How many pairs of ribs does a typical human body have?",
    type: "number",
    answer: 12,
    unit: "pairs",
    tolerance: 2,
    fact: "12 pairs, for a total of 24 ribs. The 'Adam's rib' thing doesn't mean men have fewer."
  },
  {
    id: 217,
    question: "How many permanent teeth does a standard adult dog have?",
    type: "number",
    answer: 42,
    unit: "teeth",
    tolerance: 4,
    fact: "42 permanent teeth. That's 10 more than humans have, which is why their bites hurt so much."
  },
  {
    id: 218,
    question: "How many dots are floating above the lowercase letter 'i'?",
    type: "number",
    answer: 1,
    unit: "dots",
    tolerance: 0,
    fact: "One dot. The actual scientific name for that dot is a 'tittle'. Look it up."
  },
  {
    id: 219,
    question: "How many straight lines do you need to draw a classic 5-pointed star without lifting your pen?",
    type: "number",
    answer: 5,
    unit: "lines",
    tolerance: 0,
    fact: "Five straight lines crossing over each other. It's a classic doodle."
  },
  {
    id: 220,
    question: "Exactly how many seconds are in one hour?",
    type: "number",
    answer: 3600,
    unit: "seconds",
    tolerance: 100,
    fact: "3600. 60 seconds times 60 minutes. You probably just guessed 120."
  },

  // --- TEXT INPUT: COLORS & LETTERS ---
  {
    id: 221,
    question: "What color is the '0' pocket on a standard casino roulette wheel?",
    type: "text",
    answer: "green",
    fact: "It's Green! It's the only pocket on the wheel that isn't red or black."
  },
  {
    id: 222,
    question: "Think of the French flag. What color is the vertical stripe perfectly in the middle?",
    type: "text",
    answer: "white",
    fact: "White. The order is Blue, White, Red."
  },
  {
    id: 223,
    question: "What color is the literal background of the classic Pac-Man arcade maze?",
    type: "text",
    answer: "black",
    fact: "Black. The maze lines are blue, the dots are white/yellow, but the void is black."
  },
  {
    id: 224,
    question: "What is the very first letter on the middle row (the home row) of a QWERTY keyboard?",
    type: "text",
    answer: "a",
    fact: "A. ASDFGHJKL. You place your left pinky on it every time you type."
  },
  {
    id: 225,
    question: "What specific letter is printed on the front of Captain America's mask?",
    type: "text",
    answer: "a",
    fact: "A. For America. Or Avengers. Or 'Ahhh I'm getting punched'."
  },
  {
    id: 226,
    question: "What color is the massive 'W' in the Wikipedia puzzle globe logo?",
    type: "text",
    answer: "black",
    fact: "Black. It's a giant black W printed on one of the white puzzle pieces."
  },
  {
    id: 227,
    question: "What is the only number in the English language whose letters are in perfect alphabetical order when spelled out?",
    type: "text",
    answer: "forty",
    fact: "Forty. F-O-R-T-Y. It's the only one. Don't try to find another, you'll be here all day."
  },
  {
    id: 228,
    question: "What is the absolute last letter of the English alphabet?",
    type: "text",
    answer: "z",
    fact: "Z. Or Zed if you're British. Either way, it's at the end."
  },
  {
    id: 229,
    question: "What color is the giant 'M' in the McDonald's logo?",
    type: "text",
    answer: "yellow", // Will also accept Gold in the scoring engine
    fact: "Yellow (or Gold). The Golden Arches. The background is red."
  },
  {
    id: 230,
    question: "What color is the massive 'H' painted on a standard helicopter landing pad (helipad)?",
    type: "text",
    answer: "white",
    fact: "White. It's a massive white H. Sometimes surrounded by a red circle, but the letter is white."
  },
  {
    id: 231,
    question: "In the classic Google logo, are both of the 'G's the exact same color?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! Both the capital 'G' and the lowercase 'g' are blue. You probably pictured the second one as green."
  },
  {
    id: 232,
    question: "Does the standard Monopoly board have a corner space explicitly named 'Free Parking'?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, it is one of the four corners. Though the official rules say it does absolutely nothing, despite what your family told you."
  },
  {
    id: 233,
    question: "How many parallel stripes make up the classic Adidas logo?",
    type: "number",
    answer: 3,
    unit: "stripes",
    tolerance: 0,
    fact: "Exactly 3 stripes. If you bought shoes with 4 stripes, you bought Abibas."
  },
  {
    id: 234,
    question: "In the world-famous Mona Lisa painting, is she wearing a necklace?",
    type: "boolean",
    answer: "no",
    fact: "No necklace. Her chest and neck are completely bare. Your brain just wants to decorate her."
  },
  {
    id: 235,
    question: "Does a standard, professional dartboard have a '0' section?",
    type: "boolean",
    answer: "no",
    fact: "No. The lowest number on the board is 1. If you miss the board entirely, you get zero, but there's no zero on it."
  },
  {
    id: 236,
    question: "What color is the glowing 'Walk' stick-figure on a standard modern crosswalk signal?",
    type: "text",
    answer: "white",
    fact: "It's white. The 'Don't Walk' hand is orange/red. People always guess green because they think of traffic lights."
  },
  {
    id: 237,
    question: "How many distinct flavors/colors are in a standard bag of original Skittles?",
    type: "number",
    answer: 5,
    unit: "colors",
    tolerance: 0,
    fact: "Five: Red, Orange, Yellow, Green, and Purple. Taste the rainbow (of exactly 5 things)."
  },
  {
    id: 238,
    question: "Does the famous animated girl on the Wendy's logo have freckles?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, she has freckles on her cheeks. She also has a secret 'mom' written in her collar."
  },
  {
    id: 239,
    question: "In the movie Snow White, does the Evil Queen actually say the words 'Mirror, mirror, on the wall'?",
    type: "boolean",
    answer: "no",
    fact: "No! She says 'Magic mirror on the wall.' You've been lied to your entire life."
  },
  {
    id: 240,
    question: "In the original Star Trek series, did Captain Kirk ever say the exact phrase 'Beam me up, Scotty'?",
    type: "boolean",
    answer: "no",
    fact: "No. He never said that exact sentence in the entire original TV show. The Mandela Effect is undefeated."
  },
  {
    id: 241,
    question: "Is the famous children's bear family spelled the 'Berenstein' Bears or the 'Berenstain' Bears?",
    type: "text",
    answer: "berenstain",
    fact: "BerenSTAIN. With an A. Welcome to the parallel universe."
  },
  {
    id: 242,
    question: "What color are the overalls that Luigi wears in classic Super Mario games?",
    type: "text",
    answer: "blue", // Or navy
    fact: "His overalls are blue. His SHIRT is green. If you guessed green overalls, you need to replay the classics."
  },
  {
    id: 243,
    question: "Does the Ford car logo have a little curly loop on the top of the 'F'?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, there is a weird little pig-tail loop on the F. You've seen it a thousand times and never noticed."
  },
  {
    id: 244,
    question: "Is the popular American peanut butter brand named 'Jif' or 'Jiffy'?",
    type: "text",
    answer: "jif",
    fact: "It is just 'Jif'. 'Jiffy' peanut butter has literally never existed. You combined Jif and Skippy."
  },
  {
    id: 245,
    question: "What color is Scooby-Doo's collar?",
    type: "text",
    answer: "blue", // Will accept cyan, teal, or blue
    fact: "It's light blue/cyan, with a gold diamond tag. Red is Clifford the Big Red Dog."
  },
  {
    id: 246,
    question: "How many triangles make up the classic Legend of Zelda 'Triforce' symbol?",
    type: "number",
    answer: 3,
    unit: "triangles",
    tolerance: 0,
    fact: "Three golden triangles arranged to form a larger triangle. Hence 'Tri'-force."
  },

  // --- BRAIN-BREAKING MATH & GEOMETRY ---
  {
    id: 247,
    question: "Exactly how many zeros are in a 'Googol'?",
    type: "number",
    answer: 100,
    unit: "zeros",
    tolerance: 0,
    fact: "Exactly 100 zeros. A 'Googolplex' is a 1 followed by a googol of zeros. My brain hurts just typing that."
  },
  {
    id: 248,
    question: "How many seconds are in a 24-hour day?",
    type: "number",
    answer: 86400,
    unit: "seconds",
    tolerance: 1000,
    fact: "86,400 seconds. Tick tock."
  },
  {
    id: 249,
    question: "Does the Roman Numeral system have a symbol for the number zero?",
    type: "boolean",
    answer: "no",
    fact: "No! The Romans didn't have a zero. They just started at I (1). Math was very annoying back then."
  },
  {
    id: 250,
    question: "How many straight sides does a Nonagon have?",
    type: "number",
    answer: 9,
    unit: "sides",
    tolerance: 0,
    fact: "Nine. Nona = Nine. I know you forgot this immediately after 4th grade geometry."
  },
  {
    id: 251,
    question: "What is the square root of 144?",
    type: "number",
    answer: 12,
    unit: "number",
    tolerance: 0,
    fact: "12. The highest multiplication table you ever had to memorize in school."
  },
  {
    id: 252,
    question: "If you have 2 apples and you take away 1, how many apples do you have?",
    type: "number",
    answer: 1,
    unit: "apples",
    tolerance: 0,
    fact: "One. You took it. It's in your hand. If you guessed 2, you failed the simplest trick question ever."
  },
  {
    id: 253,
    question: "Exactly how many degrees are in a perfect, complete circle?",
    type: "number",
    answer: 360,
    unit: "degrees",
    tolerance: 0,
    fact: "360 degrees. Do a 360 and walk away."
  },
  {
    id: 254,
    question: "How many individual corners (vertices) are on a standard cube?",
    type: "number",
    answer: 8,
    unit: "corners",
    tolerance: 0,
    fact: "Eight corners. Top four, bottom four."
  },
  {
    id: 255,
    question: "How many straight edges does a standard cube have?",
    type: "number",
    answer: 12,
    unit: "edges",
    tolerance: 0,
    fact: "Twelve edges. It has 6 faces, 8 corners, and 12 edges. Good luck visualizing that."
  },
  {
    id: 256,
    question: "If you add up the 4 internal angles of a square, how many degrees do you get?",
    type: "number",
    answer: 360,
    unit: "degrees",
    tolerance: 0,
    fact: "360 degrees. Four 90-degree corners."
  },

  // --- HUMAN BODY & BIOLOGY MYTHS ---
  {
    id: 257,
    question: "Are human fingernails made out of the exact same biological material as rhino horns?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! Both are made of keratin. Rhino horns are essentially just giant, compacted fingernails."
  },
  {
    id: 258,
    question: "Do humans actually only use 10% of their brains?",
    type: "boolean",
    answer: "no",
    fact: "No, that's a total Hollywood myth. You use almost 100% of your brain, even when you're sleeping."
  },
  {
    id: 259,
    question: "Are human babies born with fully formed, solid kneecaps?",
    type: "boolean",
    answer: "no",
    fact: "No! Babies only have soft cartilage in their knees. Solid kneecaps don't form until they are a few years old."
  },
  {
    id: 260,
    question: "Is the 'funny bone' actually a bone?",
    type: "boolean",
    answer: "no",
    fact: "No, it's the ulnar nerve. That's why hitting it feels like an electric shock, not a broken bone."
  },
  {
    id: 261,
    question: "What is the largest physical organ of the human body?",
    type: "text",
    answer: "skin",
    fact: "Your skin! If you guessed the liver or intestines, you forgot that you are wearing an organ right now."
  },
  {
    id: 262,
    question: "How many distinct chambers are inside a healthy human heart?",
    type: "number",
    answer: 4,
    unit: "chambers",
    tolerance: 0,
    fact: "Four. Two atria on top, two ventricles on the bottom."
  },
  {
    id: 263,
    question: "Is it biologically possible to sneeze with your eyes wide open?",
    type: "boolean",
    answer: "yes",
    fact: "Yes. It's difficult because it goes against a reflex, but your eyes will absolutely NOT pop out of your head."
  },
  {
    id: 264,
    question: "Do your hair and fingernails continue to physically grow after you die?",
    type: "boolean",
    answer: "no",
    fact: "No. Your skin just dehydrates and shrinks, making the hair and nails look longer. Creepy, but true."
  },
  {
    id: 265,
    question: "How many pairs of chromosomes does a typical human have?",
    type: "number",
    answer: 23,
    unit: "pairs",
    tolerance: 0,
    fact: "23 pairs, making 46 total. (Hence the DNA testing company '23andMe')."
  },
  {
    id: 266,
    question: "Is the 'Tongue Map' (the idea that sweet, sour, salty, bitter have specific spots on the tongue) scientifically real?",
    type: "boolean",
    answer: "no",
    fact: "No! It was debunked decades ago. You can taste any flavor on any part of your tongue."
  },

  // --- GEOGRAPHY & NATURE ---
  {
    id: 267,
    question: "How many continents have names that start and end with the exact same letter in the English language?",
    type: "number",
    answer: 5,
    unit: "continents",
    tolerance: 1,
    fact: "Five! Europe, Asia, Africa, Antarctica, Australia. Only the Americas break the rule."
  },
  {
    id: 268,
    question: "Does water actually flush in the opposite direction down toilets in Australia?",
    type: "boolean",
    answer: "no",
    fact: "No! The Coriolis effect is real, but it only affects massive things like hurricanes. Toilet water direction just depends on how the jets are aimed."
  },
  {
    id: 269,
    question: "How many total oceans are officially recognized in the world today?",
    type: "number",
    answer: 5,
    unit: "oceans",
    tolerance: 0,
    fact: "Five. Atlantic, Pacific, Indian, Arctic, and Southern (recognized in 2000)."
  },
  {
    id: 270,
    question: "Is the capital city of New York State actually New York City?",
    type: "boolean",
    answer: "no",
    fact: "No, the capital is Albany. If you got this wrong, New Yorkers are laughing at you."
  },
  {
    id: 271,
    question: "What is the hardest naturally occurring substance found on Earth?",
    type: "text",
    answer: "diamond",
    fact: "Diamond. It's basically just very angry, very pressurized carbon."
  },
  {
    id: 272,
    question: "Do goldfish actually have a three-second memory?",
    type: "boolean",
    answer: "no",
    fact: "No! Goldfish can remember things for months and can even be trained to do tricks."
  },
  {
    id: 273,
    question: "How many humps does a Bactrian camel have?",
    type: "number",
    answer: 2,
    unit: "humps",
    tolerance: 0,
    fact: "Two humps! (Dromedary camels have one). Remember it like this: 'B' for Bactrian has two bumps, 'D' for Dromedary has one."
  },
  {
    id: 274,
    question: "Does every single centipede actually have exactly 100 legs?",
    type: "boolean",
    answer: "no",
    fact: "No! They can have anywhere from 30 to 354 legs, but they ALWAYS have an odd number of pairs, so they can never have exactly 100."
  },
  {
    id: 275,
    question: "If you looked at our Sun from outer space, what color would it actually be?",
    type: "text",
    answer: "white",
    fact: "It's white! It only looks yellow/orange to us because the Earth's atmosphere scatters the blue light away."
  },
  {
    id: 276,
    question: "Exactly how many states make up the United States of America?",
    type: "number",
    answer: 50,
    unit: "states",
    tolerance: 0,
    fact: "50 states. Some people weirdly guess 51 or 52. Puerto Rico and DC are not states."
  },
  {
    id: 277,
    question: "What color is the cross on the flag of Scotland?",
    type: "text",
    answer: "white",
    fact: "It's a white cross (an X shape) on a blue background."
  },
  {
    id: 278,
    question: "Does the planet Mars have rings?",
    type: "boolean",
    answer: "no",
    fact: "No rings on Mars. Only Jupiter, Saturn, Uranus, and Neptune have rings."
  },
  {
    id: 279,
    question: "How many keys are on a standard full-size keyboard's separate numeric keypad (Numpad)?",
    type: "number",
    answer: 17,
    unit: "keys",
    tolerance: 2,
    fact: "17 keys. Numbers 0-9, dot, slash, asterisk, minus, plus, enter, and Num Lock."
  },
  {
    id: 280,
    question: "If you cut an earthworm perfectly in half, will both halves grow into two new worms?",
    type: "boolean",
    answer: "no",
    fact: "No! Only the half with the head *might* survive and regenerate its tail. The tail half will just die."
  },
  {
    id: 281,
    question: "Look closely at the Volkswagen (VW) logo in your mind. Is there a physical gap between the V and the W?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, there is a distinct gap separating the V and the W. If you pictured them connected, you've got the Mandela Effect."
  },
  {
    id: 282,
    question: "What color is the plastic lid on a standard jar of Nutella?",
    type: "text",
    answer: "white",
    fact: "It's white! You might have guessed brown because of the hazelnut, but the lid is always white."
  },
  {
    id: 283,
    question: "Does the bullseye logo for Target actually have the word 'Target' written inside the circles?",
    type: "boolean",
    answer: "no",
    fact: "No. It's just a solid red dot with a red ring around it. The word is only ever written underneath or next to it."
  },
  {
    id: 284,
    question: "What color is the giant 'N' in the modern Netflix logo?",
    type: "text",
    answer: "red",
    fact: "It's red. A big, folding red N on a black background."
  },
  {
    id: 285,
    question: "What color is the tongue in the classic Rolling Stones lips logo?",
    type: "text",
    answer: "red",
    fact: "Red. Bright red lips, bright red tongue, bright white teeth."
  },
  {
    id: 286,
    question: "Think of the word 'Google'. What color is the letter 'M'?",
    type: "text",
    answer: "there is no m", // The scoring engine will accept 'none' or 'no m'
    fact: "Trick question. There is no 'M' in Google. Gotcha."
  },

  // --- EVERYDAY OBJECTS & MATH ---
  {
    id: 287,
    question: "What color is a commercial airplane's highly indestructible 'Black Box' flight recorder?",
    type: "text",
    answer: "orange",
    fact: "It's bright 'international orange' so they can find it easily in wreckage. The name 'Black Box' is a total lie."
  },
  {
    id: 288,
    question: "How many total digits are in a standard United States Social Security Number?",
    type: "number",
    answer: 9,
    unit: "digits",
    tolerance: 0,
    fact: "Nine digits. XXX-XX-XXXX. If you didn't know this, don't sign any financial documents today."
  },
  {
    id: 289,
    question: "How many pedals does a standard, full-sized grand piano have at the bottom?",
    type: "number",
    answer: 3,
    unit: "pedals",
    tolerance: 0,
    fact: "Three pedals. Una corda, sostenuto, and the sustain pedal. Beethoven would be proud if you knew that."
  },
  {
    id: 290,
    question: "What is the official, literal paint color of the Golden Gate Bridge in San Francisco?",
    type: "text",
    answer: "orange", // Will accept 'International Orange'
    fact: "It's International Orange. It's not red, and it's definitely not gold."
  },
  {
    id: 291,
    question: "How many standard US cups fit into a single gallon of milk?",
    type: "number",
    answer: 16,
    unit: "cups",
    tolerance: 0,
    fact: "16 cups. 4 cups in a quart, 4 quarts in a gallon."
  },
  {
    id: 292,
    question: "What is the highest single number printed on a standard casino roulette wheel?",
    type: "number",
    answer: 36,
    unit: "number",
    tolerance: 0,
    fact: "36. Plus the 0 (and sometimes 00). If you bet on 37, the dealer is keeping your money."
  },
  {
    id: 293,
    question: "How many dots (pips) are on a standard 'double-six' domino tile?",
    type: "number",
    answer: 12,
    unit: "dots",
    tolerance: 0,
    fact: "12 dots. Six on one side, six on the other. Basic addition saves the day."
  },
  {
    id: 294,
    question: "Does water physically expand or shrink when it freezes into ice?",
    type: "text",
    answer: "expand",
    fact: "It expands! That's why ice floats and why leaving a soda can in the freezer is a terrible idea."
  },
  {
    id: 295,
    question: "Is it biologically possible for a human to sneeze while they are fast asleep?",
    type: "boolean",
    answer: "no",
    fact: "No! The brain essentially shuts down the sneeze reflex during REM sleep. You have to wake up to sneeze."
  },
  {
    id: 296,
    question: "Are humans the only species of animal on Earth that blushes?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! Charles Darwin called it 'the most peculiar and most human of all expressions.' We are the only animals capable of feeling embarrassment."
  },
  {
    id: 297,
    question: "What color is a giraffe's tongue?",
    type: "text",
    answer: "black", // Will also accept blue/purple
    fact: "It is dark black, blue, or purple! It has extra melanin to prevent it from getting sunburned while they eat leaves all day."
  },
  {
    id: 298,
    question: "How many individual wings does a standard honey bee have?",
    type: "number",
    answer: 4,
    unit: "wings",
    tolerance: 0,
    fact: "Four wings! Two sets. They hook together when they fly so it looks like they only have two."
  },
  {
    id: 299,
    question: "Do identical twins have the exact same fingerprints?",
    type: "boolean",
    answer: "no",
    fact: "No! Fingerprints are formed by amniotic fluid pressure in the womb, not just DNA. Even clones have different fingerprints."
  },
  {
    id: 300,
    question: "Do pineapples grow on trees?",
    type: "boolean",
    answer: "no",
    fact: "No, they grow in the middle of a spiky bush on the ground. It looks ridiculous."
  },
  {
    id: 301,
    question: "Since Pluto got demoted, exactly how many officially recognized planets are in our solar system?",
    type: "number",
    answer: 8,
    unit: "planets",
    tolerance: 0,
    fact: "Eight. Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. R.I.P. Pluto."
  },
  {
    id: 302,
    question: "What color is the blood of a horseshoe crab?",
    type: "text",
    answer: "blue",
    fact: "It's bright blue! They have copper-based blood instead of iron-based blood like us."
  },
  {
    id: 303,
    question: "How many distinct digestive compartments does a cow's stomach have?",
    type: "number",
    answer: 4,
    unit: "compartments",
    tolerance: 0,
    fact: "Four. The rumen, reticulum, omasum, and abomasum. That's a lot of hardware just to digest grass."
  },
  {
    id: 304,
    question: "How many legs does a standard arachnid (like a spider or scorpion) have?",
    type: "number",
    answer: 8,
    unit: "legs",
    tolerance: 0,
    fact: "Eight legs. Insects have six. Arachnids have eight."
  },
  {
    id: 305,
    question: "Is a dolphin biologically classified as a fish?",
    type: "boolean",
    answer: "no",
    fact: "No! They are marine mammals. They breathe air, have hair (briefly), and produce milk."
  },
  {
    id: 306,
    question: "Do any species of bats actually drink the blood of other animals?",
    type: "boolean",
    answer: "yes",
    fact: "Yes. Vampire bats are 100% real and survive entirely on the blood of livestock."
  },
  {
    id: 307,
    question: "Does the Moon physically produce its own light?",
    type: "boolean",
    answer: "no",
    fact: "No. The moon is a giant rock. It just reflects the light of the Sun."
  },
  {
    id: 308,
    question: "Are diamonds formed from highly pressurized pieces of coal?",
    type: "boolean",
    answer: "no",
    fact: "No! Almost all diamonds on Earth are older than the first land plants (which coal is made from). Diamonds are just pure, angry carbon."
  },
  {
    id: 309,
    question: "How many physical eyes does an iguana have?",
    type: "number",
    answer: 3,
    unit: "eyes",
    tolerance: 0,
    fact: "Three! They have a 'parietal eye' on the top of their head to detect shadows of predators flying above them."
  },
  {
    id: 310,
    question: "Can a sloth hold its breath underwater longer than a dolphin?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! A sloth can hold its breath for 40 minutes by slowing its heart rate. Dolphins cap out around 10 minutes."
  },
  {
    id: 311,
    question: "How many hearts does a squid have?",
    type: "number",
    answer: 3,
    unit: "hearts",
    tolerance: 0,
    fact: "Three hearts! Two pump blood to the gills, and one pumps blood to the rest of the squishy body."
  },
  {
    id: 312,
    question: "In the Emperor Penguin species, does the male or the female sit on the egg to incubate it?",
    type: "text",
    answer: "male",
    fact: "The male! The father balances the egg on his feet for two months in the freezing dark while the mother goes hunting."
  },
  {
    id: 313,
    question: "Scientists classify an octopus as having 6 arms. How many limbs do they classify as 'legs'?",
    type: "number",
    answer: 2,
    unit: "legs",
    tolerance: 0,
    fact: "Two legs! They use the back two limbs specifically to walk along the sea floor, and the other six to grab things."
  },
  {
    id: 314,
    question: "Can a kangaroo physically jump backward?",
    type: "boolean",
    answer: "no",
    fact: "No, they cannot. Their massive tails and leg structure make reversing physically impossible."
  },

  // --- GEOGRAPHY & CULTURE ---
  {
    id: 315,
    question: "Exactly how many standard time zones does the country of Russia span across?",
    type: "number",
    answer: 11,
    unit: "zones",
    tolerance: 1,
    fact: "11 time zones! When it is 8:00 AM in Moscow, people in Eastern Russia are eating dinner."
  },
  {
    id: 316,
    question: "How many letters make up the classic Greek alphabet?",
    type: "number",
    answer: 24,
    unit: "letters",
    tolerance: 1,
    fact: "24 letters. From Alpha to Omega."
  },
  {
    id: 317,
    question: "What is the only US State whose name starts with the letter 'D'?",
    type: "text",
    answer: "delaware",
    fact: "Delaware! The first state, and the only one starting with D."
  },
  {
    id: 318,
    question: "What color is the cross on the national flag of England?",
    type: "text",
    answer: "red",
    fact: "It's a red cross on a white background (St George's Cross). Don't mix it up with the UK Union Jack."
  },
  {
    id: 319,
    question: "Exactly how many US states start with the letter 'V'?",
    type: "number",
    answer: 2,
    unit: "states",
    tolerance: 0,
    fact: "Just two! Virginia and Vermont."
  },
  {
    id: 320,
    question: "Did actual historical Vikings wear metal helmets with horns on them?",
    type: "boolean",
    answer: "no",
    fact: "No! Horned helmets were completely made up by 19th-century opera costume designers. Real Vikings wore smooth metal domes."
  },
  {
    id: 321,
    question: "Is the Earth a perfect, mathematical sphere?",
    type: "boolean",
    answer: "no",
    fact: "No, it's an 'oblate spheroid'. It bulges out at the equator because it spins so fast."
  },

  // --- PURE TRIVIA ---
  {
    id: 322,
    question: "In the game of chess, exactly how many pieces total are on the board at the very start of a match?",
    type: "number",
    answer: 32,
    unit: "pieces",
    tolerance: 0,
    fact: "32 pieces. 16 white, 16 black. Good luck remembering how the knight moves."
  },
  {
    id: 323,
    question: "Is the number zero (0) considered an even number or an odd number in mathematics?",
    type: "text",
    answer: "even",
    fact: "It is officially an EVEN number because it can be cleanly divided by two without a remainder."
  },
  {
    id: 324,
    question: "Is a bolt of lightning hotter than the surface of the sun?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! A lightning bolt can reach 50,000 degrees Fahrenheit, which is about five times hotter than the surface of the sun."
  },
  {
    id: 325,
    question: "According to the TSA in American airports, is peanut butter officially classified as a liquid?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! The TSA defines a liquid as anything that assumes the shape of its container. Peanut butter counts. Do not bring a jar on a plane."
  },
  {
    id: 326,
    question: "What is the official breed of the little dog token in Monopoly?",
    type: "text",
    answer: "scottish terrier", // Will also accept Scottie
    fact: "It's a Scottish Terrier (or Scottie). His name is officially 'Scottie'."
  },
  {
    id: 327,
    question: "How many primary colors make up the standard rainbow (ROYGBIV)?",
    type: "number",
    answer: 7,
    unit: "colors",
    tolerance: 0,
    fact: "Seven! Red, Orange, Yellow, Green, Blue, Indigo, Violet."
  },
  {
    id: 328,
    question: "How many physical wheels are on a standard unicycle?",
    type: "number",
    answer: 1,
    unit: "wheels",
    tolerance: 0,
    fact: "One. 'Uni' means one. If you guessed 2, you're thinking of a bicycle and you need a nap."
  },
  {
    id: 329,
    question: "Is the Great Wall of China one single, unbroken, continuous wall?",
    type: "boolean",
    answer: "no",
    fact: "No! It is actually a massive network of many different walls and trenches built by different dynasties over centuries."
  },
  {
    id: 330,
    question: "If you cut an earthworm in half, will both halves grow into two new worms?",
    type: "boolean",
    answer: "no",
    fact: "No! Only the half with the head *might* survive to grow a new tail. The other half just dies."
  },
  {
    id: 331,
    question: "Exactly how many cards are in a standard, modern Uno deck?",
    type: "number",
    answer: 108,
    unit: "cards",
    tolerance: 4,
    fact: "108 cards. If you guessed 52, you were thinking of a normal deck of playing cards and you owe me a Draw 4."
  },
  {
    id: 332,
    question: "How many total spaces are there on a standard Monopoly board?",
    type: "number",
    answer: 40,
    unit: "spaces",
    tolerance: 2,
    fact: "40 spaces. 10 per side. It feels like 400 when you are losing."
  },
  {
    id: 333,
    question: "How many individual squares make up a standard 9x9 Sudoku grid?",
    type: "number",
    answer: 81,
    unit: "squares",
    tolerance: 0,
    fact: "81 squares. 9 rows of 9. Simple multiplication that probably just made you sweat."
  },
  {
    id: 334,
    question: "How many total pieces are on the board at the very start of a game of Checkers?",
    type: "number",
    answer: 24,
    unit: "pieces",
    tolerance: 2,
    fact: "24 pieces. 12 red, 12 black."
  },
  {
    id: 335,
    question: "How many total letters are in the standard English alphabet?",
    type: "number",
    answer: 26,
    unit: "letters",
    tolerance: 0,
    fact: "26. Did you just panic and guess 24? Don't worry, it happens to the best of us."
  },
  {
    id: 336,
    question: "If you add up every single dot (pip) on a standard 6-sided die, what is the total?",
    type: "number",
    answer: 21,
    unit: "dots",
    tolerance: 0,
    fact: "21. (1+2+3+4+5+6). Basic addition, maximum anxiety."
  },
  {
    id: 337,
    question: "How many primary time zones are there in the United States (including Alaska and Hawaii)?",
    type: "number",
    answer: 6,
    unit: "zones",
    tolerance: 1,
    fact: "Six! Eastern, Central, Mountain, Pacific, Alaska, and Hawaii-Aleutian."
  },
  {
    id: 338,
    question: "How many complete rotations does the Earth make in exactly one week?",
    type: "number",
    answer: 7,
    unit: "rotations",
    tolerance: 0,
    fact: "Seven. One rotation is literally what a day is. Why did you overthink this?"
  },
  {
    id: 339,
    question: "How many strings are on a standard, full-sized concert harp?",
    type: "number",
    answer: 47,
    unit: "strings",
    tolerance: 5,
    fact: "47 strings. It's basically an upright piano that you have to pluck."
  },
  {
    id: 340,
    question: "How many points are on the star in the center of the flag of Israel?",
    type: "number",
    answer: 6,
    unit: "points",
    tolerance: 0,
    fact: "Six points. It is the Star of David (two overlapping triangles)."
  },
  {
    id: 341,
    question: "How many faces does a standard D12 die have?",
    type: "number",
    answer: 12,
    unit: "faces",
    tolerance: 0,
    fact: "Twelve. The 'D' literally stands for Die, and the '12' stands for Twelve. Please tell me you got this right."
  },
  {
    id: 342,
    question: "If you multiply any number in the universe by zero, what is the exact result?",
    type: "number",
    answer: 0,
    unit: "result",
    tolerance: 0,
    fact: "Zero. I threw this one in here just to make sure you were still paying attention."
  },
  {
    id: 343,
    question: "How many lines of perfect symmetry does a square have?",
    type: "number",
    answer: 4,
    unit: "lines",
    tolerance: 0,
    fact: "Four. Vertical, horizontal, and the two diagonals."
  },
  {
    id: 344,
    question: "How many colored stripes are in the classic, retro 1980s Apple logo?",
    type: "number",
    answer: 6,
    unit: "stripes",
    tolerance: 0,
    fact: "Six stripes! Green, yellow, orange, red, purple, and blue."
  },
  {
    id: 345,
    question: "How many players from a single hockey team are allowed on the ice during normal play?",
    type: "number",
    answer: 6,
    unit: "players",
    tolerance: 1,
    fact: "Six players. Five skaters and one terribly stressed-out goalie."
  },
  {
    id: 346,
    question: "How many numbers are printed on the face of a standard analog clock?",
    type: "number",
    answer: 12,
    unit: "numbers",
    tolerance: 0,
    fact: "12 numbers. 1 through 12. Don't let the digital age ruin your brain."
  },
  {
    id: 347,
    question: "How many letters are in the word 'twelve'?",
    type: "number",
    answer: 6,
    unit: "letters",
    tolerance: 0,
    fact: "Six letters. T-W-E-L-V-E. I know you just traced it in the air."
  },
  {
    id: 348,
    question: "How many total bases are there on a standard baseball diamond?",
    type: "number",
    answer: 4,
    unit: "bases",
    tolerance: 0,
    fact: "Four bases. First, Second, Third, and Home plate."
  },
  {
    id: 349,
    question: "How many standard US cups are in one pint?",
    type: "number",
    answer: 2,
    unit: "cups",
    tolerance: 0,
    fact: "Two cups to a pint. Two pints to a quart. Four quarts to a gallon. The US measurement system is a mess."
  },
  {
    id: 350,
    question: "How many sides does a decagon have?",
    type: "number",
    answer: 10,
    unit: "sides",
    tolerance: 0,
    fact: "Ten sides. 'Deca' means ten, just like a decade is ten years."
  },

  // --- ABSURD (BUT TRUE) BIOLOGY & PHYSICS ---
  {
    id: 351,
    question: "Do adult flamingos actually have the biological ability to fly?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! They can fly up to 35 mph. You just never see it because they are always busy standing in the mud."
  },
  {
    id: 352,
    question: "Does the Pringles mascot (Julius Pringles) have hair on the top of his head?",
    type: "boolean",
    answer: "no",
    fact: "No! He is completely bald. He has a massive mustache, but no hair on top."
  },
  {
    id: 353,
    question: "Does the classic Monopoly Man hold a walking cane in the game's official logo?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, he holds a cane. He does NOT wear a monocle, but he definitely has a cane."
  },
  {
    id: 354,
    question: "Are coconuts scientifically classified as nuts?",
    type: "boolean",
    answer: "no",
    fact: "No! They are technically a 'drupe' (a fruit with a hard stony covering enclosing the seed). The name is a total lie."
  },
  {
    id: 355,
    question: "Do penguins have knees?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, they do! They are just hidden deep inside their fat and feathers. They are basically squatting 24/7."
  },
  {
    id: 356,
    question: "Is it biologically possible to cry in space?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, you can cry, but the tears don't fall. They just pool up into a giant, weird water bubble on your eyeballs because there's no gravity."
  },
  {
    id: 357,
    question: "Are there any actual, man-made bridges that cross the Amazon River?",
    type: "boolean",
    answer: "no",
    fact: "No! The river is over 4,000 miles long and there is not a single bridge that crosses it. You have to take a boat."
  },
  {
    id: 358,
    question: "Do fish actually sleep with their eyes open?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! They don't have eyelids, so they can't close their eyes. They just hover in place and zone out."
  },
  {
    id: 359,
    question: "Is the famous cartoon character 'Hello Kitty' actually a cat?",
    type: "boolean",
    answer: "no",
    fact: "No! The creator officially stated she is a little British girl named Kitty White. Look it up, it ruined my week too."
  },
  {
    id: 360,
    question: "Does the Statue of Liberty wear shoes?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, she wears giant size 879 sandals. You just can't see them under her massive robe."
  },
  {
    id: 361,
    question: "Can you visibly see the Great Wall of China from the surface of the Moon with the naked eye?",
    type: "boolean",
    answer: "no",
    fact: "No. That is a total myth. From the moon, you can't see anything man-made. It's like trying to see a human hair from two miles away."
  },
  {
    id: 362,
    question: "Do human fingernails grow faster than toenails?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! Fingernails grow about 3 to 4 times faster than toenails. Nobody actually knows why."
  },
  {
    id: 363,
    question: "Are white chocolate and milk chocolate made from the exact same cocoa solids?",
    type: "boolean",
    answer: "no",
    fact: "No. White chocolate actually contains ZERO cocoa solids. It's just cocoa butter, sugar, and milk. It's basically a lie."
  },
  {
    id: 364,
    question: "Does the standard game of chess have a black square in the bottom-right corner of the board?",
    type: "boolean",
    answer: "no",
    fact: "No! The rule is 'white on right'. The bottom-right square must always be white."
  },
  {
    id: 365,
    question: "Do any species of birds actually have the ability to fly backward?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! Hummingbirds are the only birds in the world that can fly backward."
  },
  {
    id: 366,
    question: "Do purebred Dalmatian puppies have spots when they are born?",
    type: "boolean",
    answer: "no",
    fact: "No! They are born completely snow-white. The spots don't start showing up until they are a few weeks old."
  },
  {
    id: 367,
    question: "Does sound travel faster through water than it does through the air?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! Sound travels about 4.3 times faster in water than in air because water particles are packed much closer together."
  },
  {
    id: 368,
    question: "Can a human physically survive and live a normal life without an appendix?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! You don't need it. It's basically just a ticking time bomb in your abdomen."
  },
  {
    id: 369,
    question: "Are all the planets in our solar system named after Greek gods?",
    type: "boolean",
    answer: "no",
    fact: "No, they are named after ROMAN gods. (Except Earth, which is just Old English for 'ground')."
  },
  {
    id: 370,
    question: "Can lightning actually strike the exact same place twice?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! The Empire State Building gets struck by lightning about 25 times every single year."
  },

  // --- EXACT TEXT: COLORS, SHAPES & LETTERS ---
  {
    id: 371,
    question: "What is the only letter of the alphabet that does NOT appear anywhere in the periodic table of elements?",
    type: "text",
    answer: "j",
    fact: "The letter J. Go ahead, check. I'll wait."
  },
  {
    id: 372,
    question: "What color is the slanted letter 'E' in the classic Dell computer logo?",
    type: "text",
    answer: "blue",
    fact: "It's blue! The entire word 'DELL' is blue."
  },
  {
    id: 373,
    question: "What is the only English number (between 0 and 9) whose letters are in reverse alphabetical order?",
    type: "text",
    answer: "one",
    fact: "One. O-N-E. O is before N, N is before E. It's a completely useless but fun fact."
  },
  {
    id: 374,
    question: "What color is the exclamation mark in the classic Yahoo! logo?",
    type: "text",
    answer: "purple",
    fact: "It's purple! The entire logo is purple."
  },
  {
    id: 375,
    question: "What color is the cap on a standard, classic bottle of Huy Fong Sriracha sauce?",
    type: "text",
    answer: "green",
    fact: "It's bright green! Making the whole bottle look like a giant red jalapeño."
  },
  {
    id: 376,
    question: "What specific geometric shape is a standard United States 'STOP' sign?",
    type: "text",
    answer: "octagon",
    fact: "It's an octagon. Eight sides. Don't ever say hexagon."
  },
  {
    id: 377,
    question: "What color is the massive center circle on the national flag of Japan?",
    type: "text",
    answer: "red",
    fact: "Red. It represents the sun."
  },
  {
    id: 378,
    question: "What specific letter does the classic superhero Superman wear on his chest?",
    type: "text",
    answer: "s",
    fact: "It's an S. Yes, comic nerds will say 'it means hope on Krypton', but it's literally just the letter S."
  },
  {
    id: 379,
    question: "What specific geometrical shape is a standard honeybee honeycomb cell?",
    type: "text",
    answer: "hexagon",
    fact: "Hexagon! It's the most mathematically efficient shape in nature for storing honey without wasting space."
  },
  {
    id: 380,
    question: "What color is the outermost ring of a classic, physical dartboard?",
    type: "text",
    answer: "black",
    fact: "It's black, with white numbers printed on it. The double/triple rings are red and green."
  },
  {
    id: 381,
    question: "Exactly how many black lines intersect across the surface of a standard basketball?",
    type: "number",
    answer: 8,
    unit: "lines",
    tolerance: 0,
    fact: "Eight intersecting lines. If you close your eyes and try to draw a basketball right now, I guarantee you'll mess it up."
  },
  {
    id: 382,
    question: "How many actual green houses do you need to build on a Monopoly property before you can upgrade to a red hotel?",
    type: "number",
    answer: 4,
    unit: "houses",
    tolerance: 0,
    fact: "Four houses. Then you trade them in for one hotel. Ruining friendships, four houses at a time."
  },
  {
    id: 383,
    question: "How many total pins are set up at the end of the lane in a standard game of bowling?",
    type: "number",
    answer: 10,
    unit: "pins",
    tolerance: 0,
    fact: "Ten pins. Arranged in a perfect triangle. And somehow, you still only knocked down two."
  },
  {
    id: 384,
    question: "How many individual pieces of bread are in a classic McDonald's Big Mac?",
    type: "number",
    answer: 3,
    unit: "pieces",
    tolerance: 0,
    fact: "Three. Top bun, middle bun, bottom bun. Two beef patties."
  },
  {
    id: 385,
    question: "Exactly how many tentacles does a biological octopus have?",
    type: "number",
    answer: 0,
    unit: "tentacles",
    tolerance: 0,
    fact: "ZERO! They have eight ARMS. Squids have tentacles. Biologists get really mad if you mix this up."
  },
  {
    id: 386,
    question: "How many individual white stripes are on the United States flag?",
    type: "number",
    answer: 6,
    unit: "stripes",
    tolerance: 0,
    fact: "Six white stripes. There are seven red stripes. Totaling 13."
  },
  {
    id: 387,
    question: "How many gold stars are arranged in a circle on the flag of the European Union?",
    type: "number",
    answer: 12,
    unit: "stars",
    tolerance: 0,
    fact: "12 stars. It has absolutely nothing to do with the number of member countries; 12 is just a symbol of perfection."
  },
  {
    id: 388,
    question: "How many total legs does a standard crab have (including the two claws)?",
    type: "number",
    answer: 10,
    unit: "legs",
    tolerance: 0,
    fact: "Ten legs. They are 'decapods'. Shrimp and lobsters also have 10."
  },
  {
    id: 389,
    question: "How many little round studs (dimples) are on the top of a classic 2x4 rectangular LEGO brick?",
    type: "number",
    answer: 8,
    unit: "studs",
    tolerance: 0,
    fact: "Eight studs. The pain of stepping on them is immeasurable, but mathematically, there are eight."
  },
  {
    id: 390,
    question: "How many digits make up a standard United States phone number (excluding the '1' country code)?",
    type: "number",
    answer: 10,
    unit: "digits",
    tolerance: 0,
    fact: "Ten digits. Three for area code, seven for the number. XXX-XXX-XXXX."
  },
  {
    id: 391,
    question: "How many black squares are there on a standard chessboard?",
    type: "number",
    answer: 32,
    unit: "squares",
    tolerance: 0,
    fact: "32 black, 32 white. Totaling 64."
  },
  {
    id: 392,
    question: "During an American Football game, how many total players are legally allowed to be on the field at the exact same time?",
    type: "number",
    answer: 22,
    unit: "players",
    tolerance: 0,
    fact: "22 players. Eleven on offense, eleven on defense."
  },
  {
    id: 393,
    question: "How many white keys are on a standard 88-key piano?",
    type: "number",
    answer: 52,
    unit: "keys",
    tolerance: 2,
    fact: "52 white keys, 36 black keys."
  },
  {
    id: 394,
    question: "How many total properties in standard Monopoly belong to the 'Red' color group?",
    type: "number",
    answer: 3,
    unit: "properties",
    tolerance: 0,
    fact: "Three. Illinois, Indiana, and Kentucky Avenues."
  },
  {
    id: 395,
    question: "How many straight sides does a dodecagon have?",
    type: "number",
    answer: 12,
    unit: "sides",
    tolerance: 0,
    fact: "Twelve sides. 'Dodeca' means twelve."
  },
  {
    id: 396,
    question: "Exactly how many edible dots are scattered inside the maze of the original Pac-Man arcade game?",
    type: "number",
    answer: 244,
    unit: "dots",
    tolerance: 10,
    fact: "244 dots (240 regular pac-dots, and 4 large power pellets). Gaming history right there."
  },
  {
    id: 397,
    question: "How many main eyes does a common housefly have?",
    type: "number",
    answer: 5,
    unit: "eyes",
    tolerance: 1,
    fact: "Five! Two giant compound eyes, and three tiny simple eyes on top of their head called ocelli."
  },
  {
    id: 398,
    question: "How many standard vowels are in the English alphabet (excluding Y)?",
    type: "number",
    answer: 5,
    unit: "vowels",
    tolerance: 0,
    fact: "Five. A, E, I, O, U. You definitely just counted them on your fingers."
  },
  {
    id: 399,
    question: "How many points does a perfectly formed, naturally occurring snowflake have?",
    type: "number",
    answer: 6,
    unit: "points",
    tolerance: 0,
    fact: "Always six. Water molecules strictly bond in hexagonal structures when freezing."
  },
  {
    id: 400,
    question: "How many individual strings does a standard cello have?",
    type: "number",
    answer: 4,
    unit: "strings",
    tolerance: 0,
    fact: "Four thick strings. C, G, D, and A."
  },

  // --- ABSURD BIOLOGY & WEIRD FACTS ---
  {
    id: 401,
    question: "Do female cows actually naturally have horns?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! Both male and female cattle naturally grow horns. Farmers just usually remove them when they are calves."
  },
  {
    id: 402,
    question: "Is the scientific myth true that a duck's quack does not echo?",
    type: "boolean",
    answer: "no",
    fact: "No! A duck's quack absolutely echoes. It's just hard to hear the echo because the sound of the quack itself fades in perfectly."
  },
  {
    id: 403,
    question: "Is a watermelon botanically classified as a berry?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! A watermelon is technically a giant berry called a 'pepo'. Biology is completely unhinged."
  },
  {
    id: 404,
    question: "Is it neurologically possible for a human to tickle themselves?",
    type: "boolean",
    answer: "no",
    fact: "No. Your cerebellum predicts your own movements and cancels out the sensory response. You can't surprise your own brain."
  },
  {
    id: 405,
    question: "Do big, fluffy, white cumulus clouds actually weigh anything?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! An average cumulus cloud weighs about 1.1 million pounds. It's basically a floating lake."
  },
  {
    id: 406,
    question: "Do all species of bees have a stinger?",
    type: "boolean",
    answer: "no",
    fact: "No! First of all, there are entirely stingless bee species, and secondly, male bees (drones) cannot sting at all."
  },
  {
    id: 407,
    question: "Does the planet Venus physically rotate backward compared to Earth?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! It spins clockwise. If you stood on Venus, the Sun would rise in the West and set in the East."
  },
  {
    id: 408,
    question: "Can an adult cheetah physically roar like a lion or a tiger?",
    type: "boolean",
    answer: "no",
    fact: "No! Cheetahs literally cannot roar. They actually just meow, chirp, and purr like overgrown house cats."
  },
  {
    id: 409,
    question: "Does the famous Pringles mascot (Julius Pringles) wear a monocle?",
    type: "boolean",
    answer: "no",
    fact: "No monocle! Just a mustache and a bowtie. Stop mixing him up with the Monopoly Man."
  },
  {
    id: 410,
    question: "Does the little girl on the Wendy's logo have pigtails?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, she has two red pigtails tied with blue ribbons."
  },
  {
    id: 411,
    question: "Is a cucumber botanically classified as a fruit?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! Because it develops from a flower and contains seeds, it is 100% a fruit."
  },
  {
    id: 412,
    question: "Are bats biologically classified as a species of bird?",
    type: "boolean",
    answer: "no",
    fact: "No! They are mammals. The ONLY mammals naturally capable of true, sustained flight."
  },
  {
    id: 413,
    question: "Under New York State tax law, is a hot dog legally considered a sandwich?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! The New York Department of Taxation legally defines a hot dog as a sandwich for tax purposes. Debate settled."
  },
  {
    id: 414,
    question: "In the Praying Mantis species, is it true that the female often eats the male after mating?",
    type: "boolean",
    answer: "yes",
    fact: "Yes. It's called 'sexual cannibalism'. She literally bites his head off for the extra protein."
  },

  // --- EXACT TEXT & LETTERS ---
  {
    id: 415,
    question: "Look at the Google logo in your mind. What color is the second 'o'?",
    type: "text",
    answer: "yellow",
    fact: "It's Yellow! G (blue) o (red) o (yellow) g (blue) l (green) e (red)."
  },
  {
    id: 416,
    question: "What is the absolute lowest point value section on a standard dartboard?",
    type: "text",
    answer: "1", // Or 'one'
    fact: "It's 1. There is no zero on the board."
  },
  {
    id: 417,
    question: "What color is the cue ball in a standard game of pool (billiards)?",
    type: "text",
    answer: "white",
    fact: "It's solid white. It's the only ball you are actually allowed to hit with the stick."
  },
  {
    id: 418,
    question: "What specific geometric shape is a standard United States 'YIELD' road sign?",
    type: "text",
    answer: "triangle",
    fact: "It's an upside-down triangle. Stop signs are octagons, yield signs are triangles."
  },
  {
    id: 419,
    question: "What single letter represents the number 50 in Roman Numerals?",
    type: "text",
    answer: "l",
    fact: "The letter 'L' is 50. 'X' is 10, 'C' is 100."
  },
  {
    id: 420,
    question: "What color is the very top horizontal stripe on the United States flag?",
    type: "text",
    answer: "red",
    fact: "It's red. The flag starts with red on top and ends with red on the bottom."
  },
  {
    id: 421,
    question: "What color is the cross in the center of the national flag of Greece?",
    type: "text",
    answer: "white",
    fact: "It's a white cross on a blue square in the top left corner."
  },
  {
    id: 422,
    question: "What letter sits directly between 'Y' and 'I' on a standard QWERTY keyboard?",
    type: "text",
    answer: "u",
    fact: "The letter U! Look down, I dare you."
  },
  {
    id: 423,
    question: "Statistically, what is the single LEAST used letter in the English language?",
    type: "text",
    answer: "z",
    fact: "The letter Z. Poor Z."
  },
  {
    id: 424,
    question: "What color is the lightsaber that Obi-Wan Kenobi hands to Luke Skywalker in the very first Star Wars movie (A New Hope)?",
    type: "text",
    answer: "blue",
    fact: "It is Blue. He doesn't get the green one until Return of the Jedi."
  },
  {
    id: 425,
    question: "What color is the blood of a Vulcan (like Spock) in the Star Trek universe?",
    type: "text",
    answer: "green",
    fact: "Green! Their blood is copper-based instead of iron-based."
  },
  {
    id: 426,
    question: "What color is the solid background of a standard, rectangular Speed Limit sign in the United States?",
    type: "text",
    answer: "white",
    fact: "White. Black text on a white rectangle."
  },
  {
    id: 427,
    question: "Looking left-to-right at the 5 interlocked Olympic rings, what color is the ring on the absolute far right?",
    type: "text",
    answer: "red",
    fact: "Red! The order is Blue, Yellow, Black, Green, Red."
  },
  {
    id: 428,
    question: "What color are flamingo chicks when they are newly hatched?",
    type: "text",
    answer: "gray", // Will also accept white/grey
    fact: "They are fluffy and gray/white! They don't turn pink until they eat enough shrimp and algae."
  },
  {
    id: 429,
    question: "What color is the iconic star in the Macy's department store logo?",
    type: "text",
    answer: "red",
    fact: "It's a solid Red star. Simple and effective."
  },
  {
    id: 430,
    question: "What letter is perfectly positioned directly between 'G' and 'J' on a standard keyboard?",
    type: "text",
    answer: "h",
    fact: "The letter H. F-G-H-J-K. Right in the middle of your home row."
  },
  {
    id: 431,
    question: "What color is the 'A' in the center of the classic Avengers logo?",
    type: "text",
    answer: "white", // Or silver, but usually rendered as white with a black/blue background
    fact: "It's white (or silver). The circle around it is what usually has the color."
  },
  {
    id: 432,
    question: "How many physical wheels are on a standard school bus?",
    type: "number",
    answer: 6,
    unit: "wheels",
    tolerance: 0,
    fact: "Six wheels! Two in the front, and four in the back (they have dual rear wheels for weight)."
  },
  {
    id: 433,
    question: "Think of the classic green Starbucks logo. Does the mermaid wear a crown?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, she wears a five-pointed star crown. You've held that cup a hundred times and never noticed."
  },
  {
    id: 434,
    question: "Exactly how many times does the letter 'A' appear in the word 'Alfalfa'?",
    type: "number",
    answer: 3,
    unit: "letters",
    tolerance: 0,
    fact: "Three. A-L-F-A-L-F-A. Count it again just to be sure."
  },
  {
    id: 435,
    question: "Does the standard, physical game of Twister have a blue circle?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! The colors are Red, Blue, Yellow, and Green."
  },
  {
    id: 436,
    question: "How many colored sections make up a classic Simon Says toy?",
    type: "number",
    answer: 4,
    unit: "sections",
    tolerance: 0,
    fact: "Four sections. Red, Blue, Green, Yellow."
  },
  {
    id: 437,
    question: "What color is the dot on the 'i' in the Pixar animation logo before the lamp jumps on it?",
    type: "text",
    answer: "black", // Or none, but it is black text
    fact: "It's black. The whole logo is just black text until Luxo Jr. commits murder on the 'i'."
  },
  {
    id: 438,
    question: "In the United States, how many physical coins do you need to make exactly 41 cents using the absolute minimum amount of coins?",
    type: "number",
    answer: 4,
    unit: "coins",
    tolerance: 0,
    fact: "Four coins. One quarter (25), one dime (10), one nickel (5), one penny (1)."
  },
  {
    id: 439,
    question: "Is the letter 'Y' officially considered a vowel in the standard English alphabet?",
    type: "boolean",
    answer: "no",
    fact: "No! It is officially a consonant. The whole 'sometimes Y' thing is just an exception, not its official classification."
  },
  {
    id: 440,
    question: "How many individual prongs are on a standard American 3-prong electrical outlet?",
    type: "number",
    answer: 3,
    unit: "prongs",
    tolerance: 0,
    fact: "Three. Two flat blades and one round grounding pin. Shocking, I know."
  },
  {
    id: 441,
    question: "How many degrees are in a perfect right angle?",
    type: "number",
    answer: 90,
    unit: "degrees",
    tolerance: 0,
    fact: "90 degrees. You literally sit at one all day at your desk."
  },
  {
    id: 442,
    question: "If a standard digital clock reads 12:00, how many times will the number '1' appear on the screen over the next exact 60 seconds?",
    type: "number",
    answer: 60,
    unit: "times",
    tolerance: 5,
    fact: "Trick question! The '1' in '12' is on the screen for all 60 seconds. Gotcha."
  },
  {
    id: 443,
    question: "How many sides does a rhombus have?",
    type: "number",
    answer: 4,
    unit: "sides",
    tolerance: 0,
    fact: "Four sides. It's just a square that someone pushed over."
  },
  {
    id: 444,
    question: "If you multiply 11 by 11, what is the exact answer?",
    type: "number",
    answer: 121,
    unit: "number",
    tolerance: 0,
    fact: "121. The only fun multiplication table besides the 10s."
  },
  {
    id: 445,
    question: "How many total days are in the month of July?",
    type: "number",
    answer: 31,
    unit: "days",
    tolerance: 0,
    fact: "31 days. July and August both have 31. The calendar makes no logical sense."
  },
  {
    id: 446,
    question: "What specific geometric shape is the President of the United States' primary office?",
    type: "text",
    answer: "oval", // Or ellipse
    fact: "It's an Oval. It's literally called the Oval Office."
  },
  {
    id: 447,
    question: "How many sides does a standard snowflake have?",
    type: "number",
    answer: 6,
    unit: "sides",
    tolerance: 0,
    fact: "Six sides. Always six. Never eight. Never five. Science demands six."
  },

  // --- ABSURD BIOLOGY & NATURE ---
  {
    id: 448,
    question: "Is it biologically possible for humans to physically burp while completely weightless in space?",
    type: "boolean",
    answer: "no",
    fact: "No! Without gravity to separate the air and liquid in your stomach, a burp in space just becomes... vomit. Astronauts have to be careful."
  },
  {
    id: 449,
    question: "How many individual arms does a standard giant squid have?",
    type: "number",
    answer: 8,
    unit: "arms",
    tolerance: 0,
    fact: "Eight arms! Plus two long tentacles. Totaling 10 appendages."
  },
  {
    id: 450,
    question: "Do male kangaroos have a pouch?",
    type: "boolean",
    answer: "no",
    fact: "No, only female kangaroos have pouches to carry their joeys."
  },
  {
    id: 451,
    question: "Are Eggplants botanically classified as a fruit or a vegetable?",
    type: "text",
    answer: "fruit",
    fact: "It's a fruit! Specifically, it is technically a berry. Yes, an eggplant is a berry."
  },
  {
    id: 452,
    question: "How many total vocal cords does a healthy adult human have?",
    type: "number",
    answer: 2,
    unit: "cords",
    tolerance: 0,
    fact: "Just two. They are tiny little flaps in your throat that vibrate."
  },
  {
    id: 453,
    question: "Do all species of sharks have to keep swimming constantly or they will die?",
    type: "boolean",
    answer: "no",
    fact: "No! Only certain species (like Great Whites) are 'obligate ram ventilators'. Many sharks can sit perfectly still on the ocean floor and breathe."
  },
  {
    id: 454,
    question: "What color is a healthy human's liver?",
    type: "text",
    answer: "red", // Or dark red/brown
    fact: "It's a dark, reddish-brown. If it's yellow, you have drank entirely too much."
  },
  {
    id: 455,
    question: "How many total toes does a standard cat have on its two front paws combined?",
    type: "number",
    answer: 10,
    unit: "toes",
    tolerance: 0,
    fact: "Ten! Five on each front paw. But they only have four on their back paws."
  },

  // --- BRAND & LOGO CHECK ---
  {
    id: 456,
    question: "Does the Twitter/X bird logo have a name?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! His name was Larry the Bird, named after the basketball player Larry Bird. RIP Larry."
  },
  {
    id: 457,
    question: "What color is the rightmost circle in the Venn diagram of the Mastercard logo?",
    type: "text",
    answer: "yellow", // Or orange
    fact: "It's yellow/orange. The left circle is red."
  },
  {
    id: 458,
    question: "How many 'G's are actually in the word 'Google'?",
    type: "number",
    answer: 2,
    unit: "letters",
    tolerance: 0,
    fact: "Just two. One capital, one lowercase. G-O-O-G-L-E."
  },
  {
    id: 459,
    question: "Does the standard Domino's Pizza logo have a blue domino?",
    type: "boolean",
    answer: "no",
    fact: "No! The domino itself is red and blue, but the dots are white."
  },
  {
    id: 460,
    question: "What is the exact shape of the background on the classic Levi's jeans logo?",
    type: "text",
    answer: "batwing", // Will accept bat, batwing, or shield
    fact: "It's called a 'batwing' shape. It actually mirrors the stitching on the back pockets of the jeans!"
  },
  {
    id: 461,
    question: "What color is the 'H' in the Hulu logo?",
    type: "text",
    answer: "green",
    fact: "It's neon green. The whole word is green."
  },
  {
    id: 462,
    question: "Does the character of Pikachu have black tips on the ends of his ears?",
    type: "boolean",
    answer: "yes",
    fact: "Yes! He DOES have black tips on his ears. People just constantly confuse it with him having a black tip on his tail (which he doesn't)."
  },

  // --- GEOGRAPHY & THE WORLD ---
  {
    id: 463,
    question: "How many individual continents start with the letter 'A' in the English language?",
    type: "number",
    answer: 4,
    unit: "continents",
    tolerance: 0,
    fact: "Four! Asia, Africa, Australia, Antarctica. If you guessed 5, you probably counted North/South America as one 'America'."
  },
  {
    id: 464,
    question: "What color is the massive star right in the center of the flag of Vietnam?",
    type: "text",
    answer: "yellow",
    fact: "It's a bright yellow star on a solid red background."
  },
  {
    id: 465,
    question: "Are all deserts hot?",
    type: "boolean",
    answer: "no",
    fact: "No! A desert is just classified by lack of precipitation. Antarctica is literally the largest desert on Earth."
  },
  {
    id: 466,
    question: "Does the Sun technically revolve around the Earth?",
    type: "boolean",
    answer: "no",
    fact: "No. The Earth revolves around the Sun. If you got this wrong, Galileo is crying."
  },
  {
    id: 467,
    question: "How many individual states actually border the Pacific Ocean in the United States?",
    type: "number",
    answer: 5,
    unit: "states",
    tolerance: 0,
    fact: "Five! Washington, Oregon, California, Alaska, and Hawaii."
  },
  {
    id: 468,
    question: "What color is the iconic, standard New York City taxi cab?",
    type: "text",
    answer: "yellow",
    fact: "Yellow. It was specifically chosen because it's the easiest color to spot from a distance."
  },

  // --- THE FINAL SPRINT: PURE CHAOS ---
  {
    id: 469,
    question: "How many physical letters are in the English word 'Rhythm'?",
    type: "number",
    answer: 6,
    unit: "letters",
    tolerance: 0,
    fact: "Six letters. R-H-Y-T-H-M. And absolutely zero standard vowels."
  },
  {
    id: 470,
    question: "If you have a perfectly standard, un-jokered deck of playing cards, how many black cards are in it?",
    type: "number",
    answer: 26,
    unit: "cards",
    tolerance: 0,
    fact: "26 black cards (Spades and Clubs), 26 red cards (Hearts and Diamonds)."
  },
  {
    id: 471,
    question: "Is Toronto the capital city of Canada?",
    type: "boolean",
    answer: "no",
    fact: "No! It is Ottawa. Toronto is just the biggest city, so it gets all the attention."
  },
  {
    id: 472,
    question: "What specific letter sits exactly to the left of the letter 'P' on a standard QWERTY keyboard?",
    type: "text",
    answer: "o",
    fact: "The letter O. O-P. You are probably typing on it right now."
  },
  {
    id: 473,
    question: "How many numbers are visible on the physical face of a standard dartboard?",
    type: "number",
    answer: 20,
    unit: "numbers",
    tolerance: 0,
    fact: "20 numbers. Arranged in a circle designed specifically to punish you if you miss."
  },
  {
    id: 474,
    question: "Does the original 1993 movie Jurassic Park feature a physical T-Rex in its actual logo?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, the logo is literally a massive T-Rex skeleton."
  },
  {
    id: 475,
    question: "How many total keys are on a standard modern piano?",
    type: "number",
    answer: 88,
    unit: "keys",
    tolerance: 0,
    fact: "88 keys. If your piano has 89, it is haunted."
  },
  {
    id: 476,
    question: "If you cut a pizza into 8 slices, and eat 8 slices, how many slices are left?",
    type: "number",
    answer: 0,
    unit: "slices",
    tolerance: 0,
    fact: "Zero. You ate the whole pizza. Good job."
  },
  {
    id: 477,
    question: "What is the absolute highest scoring single letter tile in the English version of Scrabble?",
    type: "text",
    answer: "q", // Or Z, both are worth 10
    fact: "Both Q and Z are worth 10 points. If you play 'QUIZ' on a triple word score, you win the friendship."
  },
  {
    id: 478,
    question: "How many physical tiles are in a standard bag of English Scrabble?",
    type: "number",
    answer: 100,
    unit: "tiles",
    tolerance: 0,
    fact: "Exactly 100 tiles. Including the two blank ones you always hoard until the end."
  },
  {
    id: 479,
    question: "What color is the physical, plastic 'Enter' or 'Return' key on a classic, beige 1990s computer keyboard?",
    type: "text",
    answer: "gray", // Or beige/white
    fact: "They were gray or beige, just like the rest of the keys! RGB didn't exist to save us back then."
  },
  {
    id: 480,
    question: "Is it possible to lick your own elbow?",
    type: "boolean",
    answer: "no",
    fact: "No. And I know for an absolute fact that you just tried it right now."
  },
  {
    id: 481,
    question: "How many points does a perfectly drawn, standard pentagram star have?",
    type: "number",
    answer: 5,
    unit: "points",
    tolerance: 0,
    fact: "Five points. 'Penta' means five. It's not just for summoning demons, it's basic geometry."
  },
  {
    id: 482,
    question: "Is the Empire State Building the tallest building in New York City?",
    type: "boolean",
    answer: "no",
    fact: "No! The One World Trade Center is taller. The Empire State Building isn't even top 3 anymore."
  },
  {
    id: 483,
    question: "What color is the iconic gemstone known as a Ruby?",
    type: "text",
    answer: "red",
    fact: "It's Red! Sapphires are blue, emeralds are green, rubies are red."
  },
  {
    id: 484,
    question: "How many zeroes are in exactly one hundred?",
    type: "number",
    answer: 2,
    unit: "zeroes",
    tolerance: 0,
    fact: "Two. 100. Sometimes the easiest questions are the most terrifying."
  },
  {
    id: 485,
    question: "Can a human being legally own a pet penguin in the United States?",
    type: "boolean",
    answer: "no",
    fact: "No! They are protected under the Antarctic Treaty. You cannot keep Happy Feet in your bathtub."
  },
  {
    id: 486,
    question: "How many total legs do three standard spiders have combined?",
    type: "number",
    answer: 24,
    unit: "legs",
    tolerance: 0,
    fact: "24 legs. (8 x 3). Please don't imagine three spiders right now."
  },
  {
    id: 487,
    question: "Does a standard, physical compass needle point to True North?",
    type: "boolean",
    answer: "no",
    fact: "No! It points to Magnetic North, which shifts every single day."
  },
  {
    id: 488,
    question: "What color is the liquid inside a standard Magic 8-Ball?",
    type: "text",
    answer: "blue",
    fact: "It's dark blue! The white text triangle floats inside dark blue liquid, not black."
  },
  {
    id: 489,
    question: "How many players are on a standard American Football team on the field at once?",
    type: "number",
    answer: 11,
    unit: "players",
    tolerance: 0,
    fact: "11 players on offense, 11 on defense."
  },
  {
    id: 490,
    question: "What letter is located directly between 'A' and 'D' on a standard QWERTY keyboard?",
    type: "text",
    answer: "s",
    fact: "The letter S! A-S-D-F. WASD gaming basics."
  },
  {
    id: 491,
    question: "Is the tomato legally a fruit?",
    type: "boolean",
    answer: "no",
    fact: "No! Botanically it's a fruit, but legally (for taxes in the US), it is classified as a vegetable."
  },
  {
    id: 492,
    question: "How many strings are on a standard cello?",
    type: "number",
    answer: 4,
    unit: "strings",
    tolerance: 0,
    fact: "Four strings."
  },
  {
    id: 493,
    question: "What color is the actual 'M' in the MTV logo?",
    type: "text",
    answer: "black",
    fact: "Usually, it is a giant Black M, with 'TV' spray-painted over it in red."
  },
  {
    id: 494,
    question: "How many sides does a completely round circle have?",
    type: "number",
    answer: 0, // Or infinity
    unit: "sides",
    tolerance: 0,
    fact: "Zero sides. Or infinite sides. Either way, you probably guessed '1' and you are wrong."
  },
  {
    id: 495,
    question: "Does the moon technically have a 'dark side' that never receives sunlight?",
    type: "boolean",
    answer: "no",
    fact: "No! Both sides receive sunlight. We just only ever see one side because the moon is 'tidally locked' to Earth."
  },
  {
    id: 496,
    question: "What specific color is the 'H' painted on a hospital helipad?",
    type: "text",
    answer: "white",
    fact: "It is White. Usually with a red circle or square around it."
  },
  {
    id: 497,
    question: "How many total continents are officially recognized?",
    type: "number",
    answer: 7,
    unit: "continents",
    tolerance: 0,
    fact: "Seven. Africa, Antarctica, Asia, Australia, Europe, North America, and South America."
  },
  {
    id: 498,
    question: "Is water actually, scientifically 'wet'?",
    type: "boolean",
    answer: "no",
    fact: "No! Water makes OTHER things wet. Liquid itself is not wet. The internet debate is over."
  },
  {
    id: 499,
    question: "What is the single most common vowel used in the English language?",
    type: "text",
    answer: "e",
    fact: "The letter E. It makes up roughly 11% of everything you ever type."
  },
  {
    id: 500,
    question: "I'm going to ask you a tricky question. What is the absolute last word in this sentence?",
    type: "text",
    answer: "sentence",
    fact: "The last word was 'sentence'. If you answered 'question', you got played."
  },
  {
    id: 501,
    question: "You are driving in an unfamiliar neighborhood looking for a specific house number. Do you instinctively turn down the car radio volume?",
    type: "boolean",
    answer: "yes",
    fact: "Yes, you do. Because somehow less auditory input equals better vision. Human biology is an absolute scam."
  },
  {
    id: 502,
    question: "You bump your hip into a table corner. Do you apologize to the inanimate object?",
    type: "boolean",
    answer: "yes",
    fact: "We all do it. You said 'sorry' to a piece of wood. The table does not forgive you."
  },
  {
    id: 503,
    question: "Are you manually breathing right now?",
    type: "boolean",
    answer: "yes",
    fact: "Gotcha. Have fun operating your lungs manually for the next 5 minutes."
  },
  {
    id: 504,
    question: "If you drop a bar of soap on the floor, does the floor get clean?",
    type: "boolean",
    answer: "no",
    fact: "The floor remains disgusting, and now your soap is contaminated. You lose."
  },
  {
    id: 505,
    question: "Do you rehearse arguments in the shower that will literally never happen?",
    type: "boolean",
    answer: "yes",
    fact: "And you win every single one of them. You are undefeated in the Shampoo Debates of 2026."
  },
  {
    id: 506,
    question: "Are you currently aware of exactly where your tongue is resting in your mouth?",
    type: "boolean",
    answer: "yes",
    fact: "Now you are. It doesn't really fit, does it? It's just awkwardly sitting there."
  },
  {
    id: 507,
    question: "Is it highly illegal to turn on the interior car light while someone is driving at night?",
    type: "boolean",
    answer: "no",
    fact: "Our parents lied to us. It is completely legal, they were just annoyed."
  },
  {
    id: 508,
    question: "Does aggressively staring at the microwave make your food heat up faster?",
    type: "boolean",
    answer: "yes",
    fact: "Scientifically? No. Emotionally? Absolutely. It intimidates the radiation."
  },
  {
    id: 509,
    question: "Have you ever nodded your head in agreement while talking to someone on a phone call?",
    type: "boolean",
    answer: "yes",
    fact: "They can't see you. You look ridiculous. But we all do it."
  },
  {
    id: 510,
    question: "Do you have a favorite, designated burner on your stove that you use for 90% of your cooking?",
    type: "boolean",
    answer: "yes",
    fact: "Front-right burner supremacy. The back-left one is for absolute emergencies only."
  },
  {
    id: 511,
    question: "Is cereal just a socially acceptable form of cold soup?",
    type: "boolean",
    answer: "yes",
    fact: "Broth (milk) + ingredients (cereal). It's soup. Stop lying to yourself."
  },
  {
    id: 512,
    question: "Do you pull out your phone, check the time, put it away, and immediately forget what time it is?",
    type: "boolean",
    answer: "yes",
    fact: "You weren't checking the time. You were just giving your hands something to do."
  },
  {
    id: 513,
    question: "Have you ever typed the wrong password, realized it halfway through, but pressed Enter anyway?",
    type: "boolean",
    answer: "yes",
    fact: "The definition of insanity is hoping the computer will just accept your typo out of pity."
  },
  {
    id: 514,
    question: "Do you lower your voice when talking about someone who is literally 500 miles away?",
    type: "boolean",
    answer: "yes",
    fact: "Paranoia is a universal trait. What if they have supersonic hearing?"
  },
  {
    id: 515,
    question: "Does pressing the elevator button repeatedly make the metal box arrive faster?",
    type: "boolean",
    answer: "yes",
    fact: "Yes. The elevator algorithm detects your impatience and prioritizes you. (This is a lie)."
  },

  // --- THE "PAINFULLY ACCURATE" NUMBERS ---
  {
    id: 516,
    question: "Be honest. How many tabs do you currently have open on your phone's browser that you swear you'll 'read later'?",
    type: "number",
    answer: 87,
    unit: "tabs",
    tolerance: 80,
    fact: "You are never going to read that recipe from 2021. Just close them all. Free yourself."
  },
  {
    id: 517,
    question: "How many times do you forcefully click the grilling tongs together before actually picking up any food?",
    type: "number",
    answer: 2,
    unit: "clicks",
    tolerance: 1,
    fact: "Two test clicks. You have to calibrate the physics. It's the law of the grill."
  },
  {
    id: 518,
    question: "When you tell your friends 'I am 5 minutes away!', how many minutes away are you actually?",
    type: "number",
    answer: 20,
    unit: "minutes",
    tolerance: 15,
    fact: "We all know '5 minutes away' means 'I haven't even put my shoes on yet'."
  },
  {
    id: 519,
    question: "How many alarms do you have to set just to wake up normally in the morning?",
    type: "number",
    answer: 5,
    unit: "alarms",
    tolerance: 3,
    fact: "6:00, 6:15, 6:30, 6:45, 7:00. And you still sleep through the first three."
  },
  {
    id: 520,
    question: "How many sauce packets from fast food restaurants are currently rotting in your fridge's bottom drawer?",
    type: "number",
    answer: 45,
    unit: "packets",
    tolerance: 40,
    fact: "You are hoarding Taco Bell mild sauce like it's a post-apocalyptic currency."
  },
  {
    id: 521,
    question: "How many times do you hit the 'Clear' button (C or CE) on a calculator before starting a new math problem?",
    type: "number",
    answer: 4,
    unit: "taps",
    tolerance: 2,
    fact: "You gotta make absolutely sure the ghosts of previous math problems are dead."
  },
  {
    id: 522,
    question: "How many minutes is a 'quick nap' actually supposed to be before it legally becomes going back to sleep?",
    type: "number",
    answer: 20,
    unit: "minutes",
    tolerance: 10,
    fact: "If you sleep for 3 hours, you didn't take a nap. You just rebooted your day."
  },
  {
    id: 523,
    question: "How many unread emails are currently haunting your personal inbox?",
    type: "number",
    answer: 8000,
    unit: "emails",
    tolerance: 7999,
    fact: "Select All -> Mark as Read. It takes two seconds. Live a clean life."
  },
  {
    id: 524,
    question: "At what exact age do you magically figure out what you are doing with your life and feel like a 'real' adult?",
    type: "number",
    answer: 99,
    unit: "years old",
    tolerance: 90,
    fact: "Trick question. Nobody ever knows what they are doing. Everyone is faking it."
  },
  {
    id: 525,
    question: "If you plug in a USB cable without looking, what is the exact percentage chance you get it right on the first try?",
    type: "number",
    answer: 0,
    unit: "%",
    tolerance: 0,
    fact: "It is a scientifically proven 0%. It always takes exactly three tries: Up, down, then up again."
  },
  {
    id: 526,
    question: "How many times a day do you open the fridge, lower your standards, and close it again hoping new food spawned?",
    type: "number",
    answer: 6,
    unit: "times",
    tolerance: 4,
    fact: "Staring at the jar of pickles for the 5th time won't turn it into a pizza."
  },
  {
    id: 527,
    question: "On a scale of 1 to 10, how much does your lower back randomly hurt right now?",
    type: "number",
    answer: 7,
    unit: "pain",
    tolerance: 3,
    fact: "Welcome to existing on a planet with gravity. Stretch once in a while."
  },
  {
    id: 528,
    question: "How many holes does a standard drinking straw actually have?",
    type: "number",
    answer: 1,
    unit: "holes",
    tolerance: 0,
    fact: "It is one continuous topological hole. A tunnel. Don't fight me on this."
  },
  {
    id: 529,
    question: "How many times do you check your pocket for your phone, feel nothing, and have a mini heart attack per day?",
    type: "number",
    answer: 3,
    unit: "panics",
    tolerance: 2,
    fact: "And half the time, you are literally holding the phone in your other hand while you panic."
  },
  {
    id: 530,
    question: "If you have 3 apples and you eat 1, exactly how many bananas do you have?",
    type: "number",
    answer: 0,
    unit: "bananas",
    tolerance: 0,
    fact: "Reading comprehension check. You failed."
  },

  // --- THE "TEXT MATCH" GASLIGHTING ---
  {
    id: 531,
    question: "You squeeze past a stranger in the grocery store aisle. What is the exact 3-letter midwestern sound you make?",
    type: "text",
    answer: "ope",
    fact: "'Ope, just gonna squeeze right past ya.' It is ingrained in our DNA."
  },
  {
    id: 532,
    question: "The waiter sets down your food and says 'Enjoy your meal!' What is the most embarrassing two-word automatic response you give?",
    type: "text",
    answer: "you too",
    fact: "And then you lie awake in bed at 3 AM replaying that exact moment for the rest of your life."
  },
  {
    id: 533,
    question: "You don't want to fold your laundry. What specific piece of bedroom furniture do you dump it all on?",
    type: "text",
    answer: "chair",
    fact: "Ah yes, The Chair. The structural load-bearing clothing entity in the corner of the room."
  },
  {
    id: 534,
    question: "What is the single word you type into the URL bar just to check if your internet connection is working?",
    type: "text",
    answer: "google",
    fact: "Googling Google to make sure you can reach Google. Flawless logic."
  },
  {
    id: 535,
    question: "When you are at the eye doctor and they ask 'Better 1, or better 2?', but they look exactly the same, what do you say?",
    type: "text",
    answer: "about the same",
    fact: "We are all just guessing. We have no idea which one is clearer."
  },
  {
    id: 536,
    question: "What is the exact default name Windows gives a brand new folder on your desktop?",
    type: "text",
    answer: "New folder",
    fact: "I know for a fact you have a 'New folder (4)' somewhere on your computer right now."
  },
  {
    id: 537,
    question: "Fill in the blank of the biggest lie on the internet: 'I have read and agree to the terms and __________'",
    type: "text",
    answer: "conditions",
    fact: "You just signed away the rights to your firstborn child and didn't even notice."
  },
  {
    id: 538,
    question: "When a webpage freezes, what F-key do you aggressively spam hoping it fixes everything?",
    type: "text",
    answer: "f5",
    fact: "Refreshing the page 40 times in 3 seconds definitely makes the server run faster."
  },
  {
    id: 539,
    question: "What is the only acceptable one-word answer to 'How are you?' even if your life is actively falling apart?",
    type: "text",
    answer: "good",
    fact: "Because society is simply not prepared for you to trauma-dump at the Starbucks counter."
  },
  {
    id: 540,
    question: "What specific 4-letter word do you say when you drop something but manage to catch it before it hits the floor?",
    type: "text",
    answer: "ninja",
    fact: "Peak athletic performance. You are basically Spider-Man for 2 seconds."
  },
  {
    id: 541,
    question: "What is the acceptable 4-letter text message to send to show fake, polite amusement?",
    type: "text",
    answer: "haha",
    fact: "'ha' is passive aggressive. 'hahaha' means you're crazy. 'haha' is the safe zone."
  },
  {
    id: 542,
    question: "What do you confidently pretend to look at when your friend is typing in their phone password?",
    type: "text",
    answer: "ceiling",
    fact: "Suddenly the architecture of the ceiling is the most fascinating thing in the world."
  },
  {
    id: 543,
    question: "What is the universally accepted 4-word phrase you say into a microphone to test if it works?",
    type: "text",
    answer: "testing 1 2 3",
    fact: "If you don't say this, the audio gods will sabotage your presentation."
  },
  {
    id: 544,
    question: "What do you call the little plastic thing at the end of a shoelace?",
    type: "text",
    answer: "aglet",
    fact: "Phineas and Ferb taught an entire generation this word and we will never forget it."
  },
  {
    id: 545,
    question: "What is the exact two-letter sound you make when you stub your toe on the bedframe?",
    type: "text",
    answer: "ow",
    fact: "Usually immediately followed by a 4-letter curse word we cannot print in this game."
  },
  {
    id: 546,
    question: "What do you aggressively tap or slap when the TV remote stops working?",
    type: "text",
    answer: "batteries",
    fact: "Ah yes, blunt force trauma. The best way to generate electricity."
  },
  {
    id: 547,
    question: "What is the generic name of the pixelated dinosaur you play as when Chrome has no internet?",
    type: "text",
    answer: "steve",
    fact: "He doesn't officially have a name, but the internet has collectively agreed he looks like a Steve."
  },
  {
    id: 548,
    question: "If a website forces you to create a password with a capital letter, a number, and a symbol, what is the most common one used?",
    type: "text",
    answer: "Password1!",
    fact: "Hackers love you. Please change your bank login immediately."
  },
  {
    id: 549,
    question: "What do you call the TV remote when you forget the actual word for it?",
    type: "text",
    answer: "clicker",
    fact: "Also acceptable: 'the thingy', 'the channel changer', or 'the zapper'."
  },
  {
    id: 550,
    question: "What is the only guaranteed fix for literally any broken electronic device?",
    type: "text",
    answer: "turn it off and on",
    fact: "IT departments hate this one simple trick. Restarting solves 99% of your problems."
  },
  {
    id: 551,
    question: "Do you exclusively leave the TV or car volume on an even number, or a multiple of 5?",
    type: "boolean",
    answer: "yes",
    fact: "Volume level 17 is a crime against humanity. 15 or 20. There is no in-between."
  },
  {
    id: 552,
    question: "Have you ever faked a laugh because you didn't hear what someone said after saying 'what?' three times?",
    type: "boolean",
    answer: "yes",
    fact: "And you just pray to God it wasn't a question you were supposed to answer."
  },
  {
    id: 553,
    question: "If you drop food on the floor and pick it up within 5 seconds, is it legally safe from bacteria?",
    type: "boolean",
    answer: "yes",
    fact: "The germs legally have to wait. It's in their union contract."
  },
  {
    id: 554,
    question: "Does turning off the AC in your car give it a sudden boost of horsepower to get up a hill?",
    type: "boolean",
    answer: "no",
    fact: "It technically frees up engine power, but let's be real, your 2011 Honda Civic isn't a race car."
  },
  {
    id: 555,
    question: "Do you run up the basement stairs on all fours when you turn the lights off?",
    type: "boolean",
    answer: "yes",
    fact: "The shadow demons cannot catch you if you engage full beast mode. Good survival instincts."
  },
  {
    id: 556,
    question: "Is a hotdog considered a taco?",
    type: "boolean",
    answer: "no",
    fact: "A hotdog is a sandwich. We have been over this. Stop trying to make 'Hotdog Taco' happen."
  },
  {
    id: 557,
    question: "Do you automatically say 'ow' when you bump into something, even if it didn't hurt at all?",
    type: "boolean",
    answer: "yes",
    fact: "You are just emotionally pre-loading the pain. Very dramatic of you."
  },
  {
    id: 558,
    question: "Have you ever panicked and searched for your phone while literally holding it in your hand?",
    type: "boolean",
    answer: "yes",
    fact: "The human brain experiences a 404 Error at least once a day. You are not immune."
  },
  {
    id: 559,
    question: "Do you have a designated piece of furniture in your room that is exclusively for piling clothes on?",
    type: "boolean",
    answer: "yes",
    fact: "Ah, The Chair. The load-bearing pillar of your entire bedroom ecosystem."
  },
  {
    id: 560,
    question: "When you were a kid, did you close the fridge door slowly to try and see when the light turns off?",
    type: "boolean",
    answer: "yes",
    fact: "We all tried to catch the fridge slipping. You are not unique."
  },
  {
    id: 561,
    question: "If you point your car's key fob at your chin, does it actually increase the unlock range?",
    type: "boolean",
    answer: "yes",
    fact: "Yes. The fluids in your skull amplify the signal. You are officially an antenna."
  },
  {
    id: 562,
    question: "Have you ever spelled a word so incomprehensibly wrong that spellcheck just gave up?",
    type: "boolean",
    answer: "yes",
    fact: "It just hits you with the red underline of shame and offers zero suggestions. Brutal."
  },
  {
    id: 563,
    question: "Do you aggressively shake your mouse cursor when you lose track of it on the screen?",
    type: "boolean",
    answer: "yes",
    fact: "It's the digital equivalent of waving your arms around in a dark room."
  },
  {
    id: 564,
    question: "Are you currently procrastinating something vastly more important by playing this trivia game?",
    type: "boolean",
    answer: "yes",
    fact: "Go do your homework. Or don't. I'm just text on a screen, I can't stop you."
  },
  {
    id: 565,
    question: "Do you type 'lol' with a completely straight, emotionless face?",
    type: "boolean",
    answer: "yes",
    fact: "'lol' no longer means 'laughing out loud'. It means 'I acknowledge your text and choose not to elaborate'."
  },
  {
    id: 566,
    question: "Is it physically impossible to walk past a dog without saying some variation of 'puppy'?",
    type: "boolean",
    answer: "yes",
    fact: "The dog must be acknowledged. It is federal law."
  },
  {
    id: 567,
    question: "Do you pause your music or lower the volume so you can parallel park better?",
    type: "boolean",
    answer: "yes",
    fact: "You need absolute silence to calculate the curb geometry. Total focus required."
  },

  // --- THE "TOO CLOSE TO HOME" NUMBERS ---
  {
    id: 568,
    question: "How many times do you check your phone alarm at night to make absolutely sure it is set?",
    type: "number",
    answer: 3,
    unit: "checks",
    tolerance: 2,
    fact: "You check it, lock your phone, doubt yourself, and check it again. Every night."
  },
  {
    id: 569,
    question: "How many 'goodbyes' does it realistically take to end a phone call with your mother?",
    type: "number",
    answer: 4,
    unit: "byes",
    tolerance: 2,
    fact: "'Okay bye. Yup, love you. Okay, see ya. Bye. Mmhmm, bye.' It never ends."
  },
  {
    id: 570,
    question: "How many seconds does it take for you to deeply regret a risky text immediately after hitting send?",
    type: "number",
    answer: 1,
    unit: "seconds",
    tolerance: 1,
    fact: "The immediate wave of dread is a universal constant. Should have just gone to sleep."
  },
  {
    id: 571,
    question: "What is the exact temperature you sneakily set the thermostat to when your dad isn't looking?",
    type: "number",
    answer: 69,
    unit: "degrees",
    tolerance: 3,
    fact: "Nice. But he will find out. He always finds out."
  },
  {
    id: 572,
    question: "You go to Target for 'just one thing'. How many items do you actually leave with?",
    type: "number",
    answer: 12,
    unit: "items",
    tolerance: 8,
    fact: "And you spent $140. Target tells you what you need, not the other way around."
  },
  {
    id: 573,
    question: "How many times do you aggressively click 'Save' on a document just to be absolutely safe?",
    type: "number",
    answer: 3,
    unit: "clicks",
    tolerance: 2,
    fact: "Ctrl+S, Ctrl+S, Ctrl+S. Because Microsoft Word cannot be trusted."
  },
  {
    id: 574,
    question: "How many times a week do you promise yourself you will 'get your life together on Monday'?",
    type: "number",
    answer: 4,
    unit: "promises",
    tolerance: 3,
    fact: "Monday comes and goes. The cycle continues."
  },
  {
    id: 575,
    question: "How many unread group chat messages does it take before you just mark it as read without scrolling up?",
    type: "number",
    answer: 50,
    unit: "messages",
    tolerance: 30,
    fact: "If it was important, they will text you directly. Let it go."
  },
  {
    id: 576,
    question: "What is the maximum acceptable number of days a half-empty water glass can sit on your nightstand?",
    type: "number",
    answer: 3,
    unit: "days",
    tolerance: 2,
    fact: "By day 4, it's a science experiment. Drink it if you dare."
  },
  {
    id: 577,
    question: "How many times do you slam the spacebar to wake up a sleeping computer monitor?",
    type: "number",
    answer: 5,
    unit: "smacks",
    tolerance: 3,
    fact: "WAKE UP. WIGGLE MOUSE. WAKE UP."
  },
  {
    id: 578,
    question: "How many minutes before an alarm goes off is it considered completely useless to try falling back asleep?",
    type: "number",
    answer: 15,
    unit: "minutes",
    tolerance: 10,
    fact: "Those 15 minutes of sleep are just anxiety with your eyes closed."
  },
  {
    id: 579,
    question: "How many times do you flip a USB drive before it actually goes into the port correctly?",
    type: "number",
    answer: 3,
    unit: "flips",
    tolerance: 1,
    fact: "It exists in a quantum state until observed. Up, down, up again."
  },
  {
    id: 580,
    question: "How many business days does it take your social battery to recover from a single social event?",
    type: "number",
    answer: 2,
    unit: "days",
    tolerance: 1,
    fact: "You need 48 hours of uninterrupted blanket burrito time."
  },
  {
    id: 581,
    question: "How many bites does it take to realize the pizza roll is filled with actual lava, but you swallow it anyway?",
    type: "number",
    answer: 1,
    unit: "bites",
    tolerance: 0,
    fact: "You committed to the bite. You must suffer the consequences."
  },
  {
    id: 582,
    question: "How many seconds of a YouTube ad will you watch before your brain completely tunes it out?",
    type: "number",
    answer: 5,
    unit: "seconds",
    tolerance: 2,
    fact: "You are just staring intensely at the 'Skip Ad' countdown timer."
  },
  {
    id: 583,
    question: "How many layers of irony are you currently operating on while browsing the internet?",
    type: "number",
    answer: 4,
    unit: "layers",
    tolerance: 3,
    fact: "We don't even know what's a joke anymore."
  },
  {
    id: 584,
    question: "At what exact phone battery percentage does genuine, primal anxiety start to kick in?",
    type: "number",
    answer: 15,
    unit: "%",
    tolerance: 10,
    fact: "When the battery icon turns red, survival instincts take over."
  },

  // --- THE "STUPID KEYBOARD" TEXT MATCHES ---
  {
    id: 585,
    question: "What exact number do you type into a calculator and flip upside down to spell 'BOOBS'?",
    type: "text",
    answer: "58008",
    fact: "A classic of middle school mathematics. (Or 80085, but 58008 fits the flip better)."
  },
  {
    id: 586,
    question: "What do you confidently reply when the hairdresser turns you to the mirror and asks if you like your terrible new haircut?",
    type: "text",
    answer: "yes",
    fact: "And then you go cry in your car. It's the polite thing to do."
  },
  {
    id: 587,
    question: "What do you instinctively blame when you die in a multiplayer video game, even if it was totally your fault?",
    type: "text",
    answer: "lag",
    fact: "It's never your aim. It is always the server ping."
  },
  {
    id: 588,
    question: "What do you call the massive pile of tangled, useless cords in your house that you are terrified to throw away?",
    type: "text",
    answer: "drawer",
    fact: "The cord drawer. You might need that mini-USB from 2008 someday."
  },
  {
    id: 589,
    question: "What is the ultimate, universally accepted two-word excuse for cancelling plans last minute?",
    type: "text",
    answer: "im sick",
    fact: "Works every time. Just don't post on your story later."
  },
  {
    id: 590,
    question: "What do you physically do with your face when a group of people is staring at you and singing Happy Birthday?",
    type: "text",
    answer: "smile",
    fact: "Just sit there and smile through the agonizing 30 seconds of perceived torture."
  },
  {
    id: 591,
    question: "What is the only acceptable word to yell into the phone when the line goes completely silent for more than 3 seconds?",
    type: "text",
    answer: "hello",
    fact: "You sound like a ghost hunter trying to contact the dead."
  },
  {
    id: 592,
    question: "What specific 3-letter midwestern sound do you make when you trip in public and want to play it off as a joke?",
    type: "text",
    answer: "oop",
    fact: "'Oop, gravity works!' You aren't fooling anyone."
  },
  {
    id: 593,
    question: "What is the very first word you say when you step outside and it's slightly chillier than you expected?",
    type: "text",
    answer: "cold",
    fact: "'Wow, it's cold.' Brilliant observation, meteorologist."
  },
  {
    id: 594,
    question: "What 5-letter word do you type as a reply when someone texts you a massive, emotional paragraph that you didn't read?",
    type: "text",
    answer: "crazy",
    fact: "'Damn that's crazy.' The ultimate conversation killer."
  },
  {
    id: 595,
    question: "What is the only 2-letter word anyone ever writes with their finger on a foggy bathroom mirror?",
    type: "text",
    answer: "hi",
    fact: "Sometimes accompanied by a badly drawn smiley face."
  },
  {
    id: 596,
    question: "What exactly do you yell right before throwing a crumpled up piece of paper into a trash can?",
    type: "text",
    answer: "kobe",
    fact: "Even if you miss completely, you still have to say it. Respect."
  },
  {
    id: 597,
    question: "Fill in the blank: The FitnessGram Pacer Test is a multistage aerobic capacity ____.",
    type: "text",
    answer: "test",
    fact: "That audio clip still triggers middle-school gym class PTSD."
  },
  {
    id: 598,
    question: "What do you call the plastic or metal tip at the end of your shoelace?",
    type: "text",
    answer: "aglet",
    fact: "A, G, L, E, T! Don't forget it!"
  },
  {
    id: 599,
    question: "What do you repeatedly say to your dog when you pretend to throw the ball but keep it hidden behind your back?",
    type: "text",
    answer: "where is it",
    fact: "You are committing psychological warfare against your best friend."
  },
  {
    id: 600,
    question: "What 4-letter word do you aggressively whisper to your computer when it's taking too long to load a webpage?",
    type: "text",
    answer: "load",
    fact: "C'mon, load. Just load. Please load. (It didn't load)."
  },
  {
    id: 601,
    question: "Do you run the tap water for a few seconds before filling your cup to clear out the 'pipe ghosts'?",
    type: "boolean",
    answer: "yes",
    fact: "If you don't let the first 3 seconds of water run down the drain, you are drinking stagnant poison. Science."
  },
  {
    id: 602,
    question: "Have you ever practiced a fake argument in the shower and ended up actually getting mad at the person?",
    type: "boolean",
    answer: "yes",
    fact: "You ruined your own morning over a hypothetical scenario. Peak human intelligence."
  },
  {
    id: 603,
    question: "Do you sleep with exactly one foot outside the blanket to regulate your body temperature?",
    type: "boolean",
    answer: "yes",
    fact: "The internal thermostat of a human is controlled entirely by the left ankle."
  },
  {
    id: 604,
    question: "If you put something in a 'safe place' so you won't lose it, will you ever find it again?",
    type: "boolean",
    answer: "no",
    fact: "A 'safe place' is just a black hole you created in your own house. It belongs to the void now."
  },
  {
    id: 605,
    question: "Have you ever accidentally ended a business call or customer service chat by saying 'Love you'?",
    type: "boolean",
    answer: "yes",
    fact: "And now you have to change your name, move to a new country, and fake your own death."
  },
  {
    id: 606,
    question: "Do you ever just unlock your phone, stare at the home screen, swipe left, swipe right, and lock it again?",
    type: "boolean",
    answer: "yes",
    fact: "The dopamine receptors are fried. You are just waiting for a notification that doesn't exist."
  },
  {
    id: 607,
    question: "Does blowing violently into an old video game cartridge actually fix it?",
    type: "boolean",
    answer: "yes",
    fact: "Nintendo explicitly said this damages the game. But Nintendo is wrong. The spit magic works."
  },
  {
    id: 608,
    question: "Are there actually hot singles in your area waiting to meet you?",
    type: "boolean",
    answer: "no",
    fact: "The only thing in your area waiting to meet you is a targeted ad and a phishing scam."
  },
  {
    id: 609,
    question: "Do you mentally calculate exactly how many hours and minutes of sleep you'll get before closing your eyes?",
    type: "boolean",
    answer: "yes",
    fact: "'If I fall asleep right this second, I will get exactly 4 hours and 12 minutes.' This is why you can't sleep."
  },
  {
    id: 610,
    question: "Do you randomly remember an awkward thing you said 6 years ago and physically cringe out loud?",
    type: "boolean",
    answer: "yes",
    fact: "Nobody else remembers it. But your brain will make sure you suffer for it every night at 2 AM."
  },
  {
    id: 611,
    question: "Is 'we'll see' just a polite parent code for 'absolutely not'?",
    type: "boolean",
    answer: "yes",
    fact: "It has never meant 'we will see'. It has always meant 'no, but I don't want to hear you whine right now'."
  },
  {
    id: 612,
    question: "Have you ever read a full page of a book and realized you didn't process a single word of it?",
    type: "boolean",
    answer: "yes",
    fact: "Your eyes were scanning the text, but your brain was thinking about whether penguins have knees."
  },
  {
    id: 613,
    question: "Do you turn down the car radio so you can 'see' better when looking for an address?",
    type: "boolean",
    answer: "yes",
    fact: "Ah yes, reducing auditory processing to allocate more RAM to your visual cortex. We are machines."
  },
  {
    id: 614,
    question: "Have you ever sent a text, instantly regretted it, and stared at the screen as if you could pull it back?",
    type: "boolean",
    answer: "yes",
    fact: "The sheer panic of watching those three little typing dots appear in response."
  },
  {
    id: 615,
    question: "Do you have a 'good' side of the bed that you will fiercely defend?",
    type: "boolean",
    answer: "yes",
    fact: "If someone tries to sleep on your side, it feels like a violation of the Geneva Convention."
  },

  // --- THE "PAINFULLY ACCURATE" NUMBERS ---
  {
    id: 616,
    question: "How many times a day does the average man randomly think about the Roman Empire?",
    type: "number",
    answer: 1,
    unit: "times",
    tolerance: 1,
    fact: "Aqueducts. Gladiators. Julius Caesar. It just sneaks up on you."
  },
  {
    id: 617,
    question: "How many items do you pat down in your pockets before leaving the house? (Phone, keys, wallet...)",
    type: "number",
    answer: 3,
    unit: "pats",
    tolerance: 1,
    fact: "The Holy Trinity of leaving the house. The Macarena of Anxiety."
  },
  {
    id: 618,
    question: "How many minutes do you spend endlessly scrolling Netflix looking for something to watch while your food gets cold?",
    type: "number",
    answer: 25,
    unit: "minutes",
    tolerance: 20,
    fact: "By the time you pick a movie, you've already finished eating and you're just staring at the credits."
  },
  {
    id: 619,
    question: "How many hours of sleep do you consider a 'good night' even though science demands 8?",
    type: "number",
    answer: 6,
    unit: "hours",
    tolerance: 2,
    fact: "6 hours is the sweet spot between 'functioning member of society' and 'barely alive'."
  },
  {
    id: 620,
    question: "How many empty water cups/bottles are currently stationed on your nightstand?",
    type: "number",
    answer: 4,
    unit: "cups",
    tolerance: 3,
    fact: "It looks like the movie 'Signs' in your bedroom. Take them to the sink."
  },
  {
    id: 621,
    question: "How many days can an empty cardboard Amazon box sit in your hallway before you finally break it down?",
    type: "number",
    answer: 14,
    unit: "days",
    tolerance: 10,
    fact: "It is basically a piece of furniture now. You might as well charge it rent."
  },
  {
    id: 622,
    question: "At what exact battery percentage does your phone basically become a life support machine?",
    type: "number",
    answer: 5,
    unit: "%",
    tolerance: 4,
    fact: "Below 5%, time moves differently. Every second counts. Plug it in."
  },
  {
    id: 623,
    question: "How many minutes early does your dad demand you arrive at the airport before a domestic flight?",
    type: "number",
    answer: 180,
    unit: "minutes",
    tolerance: 60,
    fact: "3 hours early. Gotta beat the traffic. Even if the flight is at 4 AM. Dad Law."
  },
  {
    id: 624,
    question: "What is the acceptable maximum number of pillows a normal person should sleep with?",
    type: "number",
    answer: 3,
    unit: "pillows",
    tolerance: 2,
    fact: "One for the head, one between the knees, one to hug because we are all desperately lonely."
  },
  {
    id: 625,
    question: "How many single, mismatched socks are currently abandoned in your laundry basket?",
    type: "number",
    answer: 7,
    unit: "socks",
    tolerance: 6,
    fact: "The dryer demands a sacrifice. It takes one sock from every pair as a toll."
  },
  {
    id: 626,
    question: "How many items do you add to an online shopping cart before closing the tab to avoid spending money?",
    type: "number",
    answer: 6,
    unit: "items",
    tolerance: 4,
    fact: "Window shopping, but make it digital. You weren't going to pay that shipping fee anyway."
  },
  {
    id: 627,
    question: "How many minutes does 'I'm almost there' actually translate to in real-world time?",
    type: "number",
    answer: 15,
    unit: "minutes",
    tolerance: 10,
    fact: "You haven't even found your car keys yet. Stop lying."
  },
  {
    id: 628,
    question: "How many times do you press 'Ctrl+Z' when you mess up a drawing before you just start over completely?",
    type: "number",
    answer: 15,
    unit: "undos",
    tolerance: 10,
    fact: "Just mashing undo until the canvas is blank again. The artist's curse."
  },
  {
    id: 629,
    question: "How many days in a row can you eat the exact same meal before your body physically rejects it?",
    type: "number",
    answer: 4,
    unit: "days",
    tolerance: 3,
    fact: "Meal prep sounds great until it's Thursday and you have to eat chicken and rice for the 8th time."
  },
  {
    id: 630,
    question: "How many times do you check the tracking number of a package on the day it's supposed to arrive?",
    type: "number",
    answer: 12,
    unit: "refreshes",
    tolerance: 10,
    fact: "'Out for Delivery' is the most stressful phrase in the English language."
  },

  // --- THE "STUPID KEYBOARD" TEXT MATCHES ---
  {
    id: 631,
    question: "What is the single most agonizing, conversation-killing, 1-letter response to a long text?",
    type: "text",
    answer: "k",
    fact: "The digital equivalent of being shot in the chest."
  },
  {
    id: 632,
    question: "What do you instinctively say out loud when a pet (specifically a dog or cat) does a massive stretch?",
    type: "text",
    answer: "big stretch",
    fact: "It is federally mandated that you announce the stretch. If you don't, you are a monster."
  },
  {
    id: 633,
    question: "What do you name a file when you are saving it for the final time, but you already have a file named 'final'?",
    type: "text",
    answer: "final2",
    fact: "Ah yes. 'final2', followed by 'final_FINAL', followed by 'ACTUAL_FINAL_PLEASE'."
  },
  {
    id: 634,
    question: "What do you confidently type into Google or a document just to see if your keyboard is working?",
    type: "text",
    answer: "asdf",
    fact: "The left hand's resting position. A true classic."
  },
  {
    id: 635,
    question: "What do you call the specific brand of existential dread that hits you at 7 PM on a Sunday night?",
    type: "text",
    answer: "sunday scaries",
    fact: "The weekend is over, and the consequences of your procrastination have arrived."
  },
  {
    id: 636,
    question: "What 4-letter word do you type when you fake-laugh at a joke online but your face is completely blank?",
    type: "text",
    answer: "lmao",
    fact: "You did not laugh your anatomy off. You merely exhaled slightly out of your nose."
  },
  {
    id: 637,
    question: "What do you whisper to yourself when you drop your phone face-down and are afraid to pick it up?",
    type: "text",
    answer: "please",
    fact: "Suddenly everyone turns into a religious scholar when the iPhone hits the pavement."
  },
  {
    id: 638,
    question: "What is the name of the folder on your computer desktop where you dump all the junk you don't want to sort?",
    type: "text",
    answer: "stuff",
    fact: "Also acceptable: 'misc', 'junk', or 'new folder (7)'."
  },
  {
    id: 639,
    question: "What do you say to the hairdresser when they show you the back of your head with a mirror, even if you hate it?",
    type: "text",
    answer: "looks good",
    fact: "You lack the courage to tell them they ruined your life. So you tip 20% and leave."
  },
  {
    id: 640,
    question: "What is the universally agreed upon name of the default, blocky protagonist in Minecraft?",
    type: "text",
    answer: "steve",
    fact: "The legend himself. Wearing the same cyan shirt since 2009."
  },
  {
    id: 641,
    question: "What do you say when you hand a cashier a $20 bill for a $19.95 purchase to assert dominance?",
    type: "text",
    answer: "keep the change",
    fact: "Enjoy that nickel, you peasant. I am incredibly wealthy."
  },
  {
    id: 642,
    question: "What is the 5-letter word for the most agonizing state of a loading bar at 99%?",
    type: "text",
    answer: "stuck",
    fact: "It's not moving. It's never going to move. You have to restart."
  },
  {
    id: 643,
    question: "What 4-letter word do you say when your computer suddenly bluescreens before you hit save?",
    type: "text",
    answer: "nooo",
    fact: "The scream of a soul leaving a body."
  },
  {
    id: 644,
    question: "What do you say to a stranger's baby when it is unblinkingly staring at you in the grocery store line?",
    type: "text",
    answer: "hi",
    fact: "Just 'hi'. And then you look away because it feels like the baby knows your sins."
  },
  {
    id: 645,
    question: "What word do you use to fill the awkward silence when passing a coworker in the hallway for the 3rd time today?",
    type: "text",
    answer: "hey",
    fact: "You already said 'good morning'. You already did the nod. You have nothing left but 'hey'."
  },
  {
    id: 646,
    question: "What is the absolute worst 4-letter response to 'we need to talk'?",
    type: "text",
    answer: "okay",
    fact: "That 'okay' carries the weight of a thousand panic attacks."
  },
  {
    id: 647,
    question: "What do you yell at the TV when the sports team you like does something incredibly stupid?",
    type: "text",
    answer: "come on",
    fact: "Because yelling at the pixels definitely makes the millionaire athletes play better."
  },
  {
    id: 648,
    question: "What is the only acceptable 3-letter reply when your friend sends you a deeply cursed, unexplainable image?",
    type: "text",
    answer: "wtf",
    fact: "No other words suffice. Only pure confusion."
  },
  {
    id: 649,
    question: "What do you write in a birthday card as it's being passed around the office for someone you don't know?",
    type: "text",
    answer: "happy birthday",
    fact: "Followed by a signature that is completely illegible to hide your identity."
  },
  {
    id: 650,
    question: "What 4-letter word do you say when you trip over absolutely nothing in public?",
    type: "text",
    answer: "whoa",
    fact: "You have to play it off like the ground suddenly shifted beneath your feet."
  },
  {
    id: 651,
    question: "Do you physically lean your body when playing a racing game to help the digital car turn?",
    type: "boolean",
    answer: "yes",
    fact: "Physics dictates that shifting your 150lb body on the couch definitely helps Mario drift better."
  },
  {
    id: 652,
    question: "Have you ever used your phone flashlight to help you look for your phone?",
    type: "boolean",
    answer: "yes",
    fact: "The human brain is an evolutionary marvel, yet here we are, hunting for the light source we are currently holding."
  },
  {
    id: 653,
    question: "Do you pretend to be asleep when someone walks into your room so they don't talk to you?",
    type: "boolean",
    answer: "yes",
    fact: "And you perfectly regulate your breathing just to sell the performance. Oscar-worthy."
  },
  {
    id: 654,
    question: "Is 'maybe' just a cowardly way of saying absolutely not?",
    type: "boolean",
    answer: "yes",
    fact: "'Maybe' has never meant yes in the history of the English language. Just say no, coward."
  },
  {
    id: 655,
    question: "Have you ever restarted a 3-minute YouTube video because you zoned out for the first 10 seconds?",
    type: "boolean",
    answer: "yes",
    fact: "And then you zone out again at the exact same timestamp. A flawless cycle."
  },
  {
    id: 656,
    question: "Do you have a drawer or cabinet dedicated entirely to plastic bags shoved inside of a larger plastic bag?",
    type: "boolean",
    answer: "yes",
    fact: "Ah yes, the Bag of Bags. A staple in every household ecosystem."
  },
  {
    id: 657,
    question: "Is it morally acceptable to eat exactly 40% of the fries out of the bag on the drive home?",
    type: "boolean",
    answer: "yes",
    fact: "It is the Fry Tax. You are the driver. You are owed compensation."
  },
  {
    id: 658,
    question: "Are you currently sitting in a posture that would make a chiropractor violently weep?",
    type: "boolean",
    answer: "yes",
    fact: "You look like a cooked shrimp right now. Sit up straight."
  },
  {
    id: 659,
    question: "Does mashing the 'A' button actually increase your chances of catching a Pokémon?",
    type: "boolean",
    answer: "yes",
    fact: "Nintendo says it doesn't do anything. Nintendo is lying to us. It helps."
  },
  {
    id: 660,
    question: "Have you ever created a fake scenario in your head that made you genuinely furious at a real person?",
    type: "boolean",
    answer: "yes",
    fact: "You woke up and chose to gaslight yourself into anger. Incredible."
  },
  {
    id: 661,
    question: "Do you feel a tiny twinge of guilt when you finally close a browser tab you've kept open for 4 months?",
    type: "boolean",
    answer: "yes",
    fact: "You were never going to read that article. You just murdered it."
  },
  {
    id: 662,
    question: "If you take a nap at 6 PM, do you wake up knowing what year it is?",
    type: "boolean",
    answer: "no",
    fact: "Waking up at 8 PM in the pitch black is the closest humans get to time travel."
  },
  {
    id: 663,
    question: "Do you ever type a furious, 400-word paragraph, delete the whole thing, and just reply 'ok'?",
    type: "boolean",
    answer: "yes",
    fact: "Sometimes peace is better than being right. Also, typing is exhausting."
  },
  {
    id: 664,
    question: "Do you lower the volume of the car radio so you can 'smell' something burning better?",
    type: "boolean",
    answer: "yes",
    fact: "You have to mute the bass to properly engage your olfactory sensors."
  },
  {
    id: 665,
    question: "Is 'I'm on my way' the biggest lie in modern human history?",
    type: "boolean",
    answer: "yes",
    fact: "You are literally still in a towel staring at the bathroom mirror."
  },

  // --- THE "PAINFULLY ACCURATE" NUMBERS ---
  {
    id: 666,
    question: "How many consecutive sneezes is the absolute legal limit before it just becomes annoying?",
    type: "number",
    answer: 3,
    unit: "sneezes",
    tolerance: 1,
    fact: "First is 'bless you'. Second is 'bless you again'. Third is 'alright, knock it off'."
  },
  {
    id: 667,
    question: "How many days does a '7-day free trial' actually last before you forget to cancel it and lose $89.99?",
    type: "number",
    answer: 7,
    unit: "days",
    tolerance: 0,
    fact: "They bank entirely on your ADHD. And it works every single time."
  },
  {
    id: 668,
    question: "How many items are currently rotting in your Amazon 'Save for later' abyss?",
    type: "number",
    answer: 50,
    unit: "items",
    tolerance: 40,
    fact: "You don't need a novelty waffle maker. Leave it in the void."
  },
  {
    id: 669,
    question: "How many alarms does a normal person set to wake up for a 6:00 AM flight?",
    type: "number",
    answer: 10,
    unit: "alarms",
    tolerance: 5,
    fact: "Because sleeping through a normal Tuesday is fine, but missing a flight means financial ruin."
  },
  {
    id: 670,
    question: "How many slices of pizza is considered a single serving if absolutely nobody is watching you eat?",
    type: "number",
    answer: 8,
    unit: "slices",
    tolerance: 2,
    fact: "The whole pizza. A personal pan pizza is just whatever pizza you can personally finish."
  },
  {
    id: 671,
    question: "How many minutes do you spend scrolling Netflix before giving up and watching a 4-hour YouTube video essay?",
    type: "number",
    answer: 45,
    unit: "minutes",
    tolerance: 30,
    fact: "Why watch a new movie when you can watch a guy explain the lore of a game you don't even play?"
  },
  {
    id: 672,
    question: "How many business days does it take to mentally recover from a minor, slightly awkward social interaction?",
    type: "number",
    answer: 3,
    unit: "days",
    tolerance: 2,
    fact: "You will think about that weird wave you did to the cashier until Thursday."
  },
  {
    id: 673,
    question: "How many hours of sleep is considered an urban legend by anyone over the age of 20?",
    type: "number",
    answer: 8,
    unit: "hours",
    tolerance: 1,
    fact: "8 hours of uninterrupted sleep is a myth sold to us by mattress companies."
  },
  {
    id: 674,
    question: "How many different streaming services are you currently leeching off your exes, friends, or parents?",
    type: "number",
    answer: 3,
    unit: "accounts",
    tolerance: 2,
    fact: "If Netflix ever fully cracks down on password sharing, society will collapse."
  },
  {
    id: 675,
    question: "How many half-drunken bottles of water are currently residing on your nightstand?",
    type: "number",
    answer: 6,
    unit: "bottles",
    tolerance: 4,
    fact: "It looks like the set of the movie 'Signs' in your bedroom. Hydrate or clean up."
  },
  {
    id: 676,
    question: "How many times do you check your pocket for your keys while standing directly outside your locked front door?",
    type: "number",
    answer: 3,
    unit: "checks",
    tolerance: 2,
    fact: "Even if you are actively holding the keys in your hand, you still check."
  },
  {
    id: 677,
    question: "How many hours are you legally allowed to procrastinate if you worked hard for exactly 15 minutes?",
    type: "number",
    answer: 5,
    unit: "hours",
    tolerance: 3,
    fact: "You sent one email. You deserve to lay on the floor and stare at the ceiling until dinner."
  },
  {
    id: 678,
    question: "How many times do you hit 'Next Episode' before the 'Are you still watching?' screen aggressively judges you?",
    type: "number",
    answer: 3,
    unit: "episodes",
    tolerance: 1,
    fact: "Yes, Netflix, I am still watching. Don't judge my coping mechanisms."
  },
  {
    id: 679,
    question: "How many times do you have to say 'bye' to officially end a phone call in the Midwest?",
    type: "number",
    answer: 4,
    unit: "byes",
    tolerance: 2,
    fact: "'Alright, yep. See ya later. Bye now. Mmhm, bye.' A flawless ritual."
  },
  {
    id: 680,
    question: "What is the exact number of times you have to click a pen before you start annoying everyone in the room?",
    type: "number",
    answer: 5,
    unit: "clicks",
    tolerance: 2,
    fact: "Clicking it once is functional. Clicking it 6 times is a declaration of war."
  },

  // --- THE "STUPID KEYBOARD" TEXT MATCHES ---
  {
    id: 681,
    question: "What is the most chaotic 2-word response when a stranger knocks on the public bathroom stall you are occupying?",
    type: "text",
    answer: "come in",
    fact: "It asserts absolute dominance and terrifies the person outside."
  },
  {
    id: 682,
    question: "What do you universally call the one kitchen drawer that contains scissors, tape, dead batteries, and soy sauce packets?",
    type: "text",
    answer: "junk drawer",
    fact: "Every house has one. If you don't, you are a serial killer."
  },
  {
    id: 683,
    question: "What do you instinctively say to a store mannequin when you accidentally bump into it?",
    type: "text",
    answer: "sorry",
    fact: "And then you realize it has no face, and you evaluate your entire life."
  },
  {
    id: 684,
    question: "What is the worst possible 2-word text you can receive from your boss at 4:59 PM on a Friday?",
    type: "text",
    answer: "call me",
    fact: "Those two words carry the weight of a thousand panic attacks."
  },
  {
    id: 685,
    question: "What 4-letter word is the universal response to literally any mild inconvenience in modern society?",
    type: "text",
    answer: "bruh",
    fact: "Drop your phone? Bruh. Wi-Fi cuts out? Bruh. Stub your toe? Bruh."
  },
  {
    id: 686,
    question: "What do you write in the group project document when you did 0% of the work but need it to look like you participated?",
    type: "text",
    answer: "looks good",
    fact: "The freeloader's catchphrase. The ultimate crime."
  },
  {
    id: 687,
    question: "What is the 4-letter transition word you use, accompanied by a heavy knee slap, to signal that you are leaving someone's house?",
    type: "text",
    answer: "well",
    fact: "'Well, I suppose I should get going.' *Stays for another 45 minutes standing in the doorway*."
  },
  {
    id: 688,
    question: "What do you yell from across the house when your mom calls your name but refuses to elaborate?",
    type: "text",
    answer: "what",
    fact: "It's a trap. If you walk over there, you are doing chores."
  },
  {
    id: 689,
    question: "What do you say when someone asks what you did this weekend, but you literally just stared at the ceiling for 48 hours?",
    type: "text",
    answer: "nothing",
    fact: "Technically, sustaining human life counts as doing something, but 'nothing' is easier to explain."
  },
  {
    id: 690,
    question: "What is the only acceptable 5-letter response when someone trauma dumps on you out of nowhere?",
    type: "text",
    answer: "crazy",
    fact: "'Damn, that's crazy.' The conversational emergency exit."
  },
  {
    id: 691,
    question: "What do you say when handing your friend a plate of food straight out of the microwave?",
    type: "text",
    answer: "careful",
    fact: "You must warn them that the plate is 400 degrees but the food is still frozen in the center."
  },
  {
    id: 692,
    question: "What do you name your variables when you are programming at 3 AM and have completely lost the will to live?",
    type: "text",
    answer: "test",
    fact: "Also acceptable: 'asdf', 'temp', or 'please_work'."
  },
  {
    id: 693,
    question: "What exact math problem do you type into a calculator just to make sure the buttons are working?",
    type: "text",
    answer: "1+1",
    fact: "You know it's 2, but you need the machine to validate you."
  },
  {
    id: 694,
    question: "What 4-letter word do you mutter when your code actually compiles on the very first try?",
    type: "text",
    answer: "wait",
    fact: "Because if it worked on the first try, something is catastrophically wrong."
  },
  {
    id: 695,
    question: "What do you say when explaining something gets too difficult and you just give up on the conversation?",
    type: "text",
    answer: "nevermind",
    fact: "The ultimate conversational white flag."
  },
  {
    id: 696,
    question: "What 3-letter word do you aggressively whisper to inanimate objects when you drop them at 2 AM?",
    type: "text",
    answer: "shh",
    fact: "Because shushing the spoon hitting the tile floor will definitely stop the sound waves."
  },
  {
    id: 697,
    question: "What do you confidently say when someone asks if you remember them, and you have absolutely zero clue who they are?",
    type: "text",
    answer: "yes",
    fact: "And then you spend the next 20 minutes desperately hunting for context clues."
  },
  {
    id: 698,
    question: "What 1-letter text do you send to completely destroy someone's well-thought-out, multi-paragraph argument?",
    type: "text",
    answer: "l",
    fact: "A single 'L'. It does more psychic damage than any insult ever could."
  },
  {
    id: 699,
    question: "What 4-letter word do you reply with when your friend describes a severe mental breakdown?",
    type: "text",
    answer: "same",
    fact: "Mutual solidarity through shared mental illness. Beautiful."
  },
  {
    id: 700,
    question: "What 3-letter acronym do you say out loud when someone tells you a mildly sad but not tragic piece of news?",
    type: "text",
    answer: "rip",
    fact: "'They were out of chicken nuggets.' 'RIP.'"
  },
  {
    id: 701,
    question: "Do you desperately stop the microwave at 0:01 just so you don't have to hear the beep of shame?",
    type: "boolean",
    answer: "yes",
    fact: "You defused the bomb. The kitchen is safe. Your family can sleep in peace. A true hero."
  },
  {
    id: 702,
    question: "Have you ever been interviewed on a late-night talk show in your own head while washing the dishes?",
    type: "boolean",
    answer: "yes",
    fact: "And the imaginary crowd laughed at all of your jokes. You were charming. Simply delightful."
  },
  {
    id: 703,
    question: "When you walk into a spiderweb, do you instantly turn into a karate master fighting invisible demons?",
    type: "boolean",
    answer: "yes",
    fact: "The sudden transition from a calm walk to a Level 99 Ninja is a human survival instinct."
  },
  {
    id: 704,
    question: "Do you hold your breath when a character in a movie goes underwater just to see if you would survive?",
    type: "boolean",
    answer: "yes",
    fact: "Spoiler: You wouldn't survive. Tom Cruise is holding his breath for 6 minutes, you struggled at 45 seconds."
  },
  {
    id: 705,
    question: "Have you ever forgotten how to walk normally because you suddenly realized someone was watching you walk?",
    type: "boolean",
    answer: "yes",
    fact: "'Left foot, right foot. Wait, where do my arms go? Am I swinging them too much?' You look like a robot."
  },
  {
    id: 706,
    question: "Do you actively refuse to get up and plug in your phone charger until the battery hits exactly 1%?",
    type: "boolean",
    answer: "yes",
    fact: "You like living on the edge. You are playing chicken with a lithium-ion battery."
  },
  {
    id: 707,
    question: "Do you type out a risky text, hit send, and immediately throw your phone across the room?",
    type: "boolean",
    answer: "yes",
    fact: "If you don't look at the phone, the consequences of your actions don't legally exist yet."
  },
  {
    id: 708,
    question: "Do you say 'just looking, thanks' to a store employee when you are, in fact, desperately lost?",
    type: "boolean",
    answer: "yes",
    fact: "You would rather wander the aisles for 40 minutes than admit defeat to a teenager in a red polo."
  },
  {
    id: 709,
    question: "Do you compulsively reload your weapon in a video game even if you only fired a single bullet?",
    type: "boolean",
    answer: "yes",
    fact: "And then you get eliminated during the reload animation. Every single time. Learn your lesson."
  },
  {
    id: 710,
    question: "Have you ever enthusiastically waved back at someone who was actually waving at the person directly behind you?",
    type: "boolean",
    answer: "yes",
    fact: "The only cure for this level of embarrassment is to fake an injury and move to a new city."
  },
  {
    id: 711,
    question: "Do you take off your sunglasses when you are trying to hear someone better?",
    type: "boolean",
    answer: "yes",
    fact: "Your ears apparently need the lighting to be correct in order to process sound. Flawless human biology."
  },
  {
    id: 712,
    question: "Do you check behind the shower curtain for murderers every single time you enter the bathroom?",
    type: "boolean",
    answer: "yes",
    fact: "What is your plan if someone is actually there? You have a toothbrush. You are not winning that fight."
  },
  {
    id: 713,
    question: "When you accidentally step on your pet's paw, do you apologize like you just committed a federal war crime?",
    type: "boolean",
    answer: "yes",
    fact: "They don't speak English, but they need to know it was an accident. The guilt is unbearable."
  },
  {
    id: 714,
    question: "On long road trips, do you imagine a little ninja doing parkour on the power lines outside the car window?",
    type: "boolean",
    answer: "yes",
    fact: "We all lived the exact same childhood and we didn't even have the internet to coordinate it."
  },
  {
    id: 715,
    question: "Do you mentally plan out exactly what you would buy if you won the lottery, even though you didn't buy a ticket?",
    type: "boolean",
    answer: "yes",
    fact: "You've already divided up the millions in your head. Now you just need the actual money."
  },

  // --- THE "MATHEMATICALLY ACCURATE" NUMBERS ---
  {
    id: 716,
    question: "How many songs do you aggressively skip on your 'Favorites' playlist before finally settling on one?",
    type: "number",
    answer: 12,
    unit: "skips",
    tolerance: 10,
    fact: "You put those songs on the list. Why do you hate them so much?"
  },
  {
    id: 717,
    question: "How many times do you backspace a perfectly spelled word just because the rhythm of your typing felt off?",
    type: "number",
    answer: 1,
    unit: "times",
    tolerance: 1,
    fact: "The vibes were simply incorrect. You had to re-type it to restore the balance."
  },
  {
    id: 718,
    question: "What is the absolute maximum acceptable volume level for the TV when people are sleeping upstairs?",
    type: "number",
    answer: 8,
    unit: "volume",
    tolerance: 4,
    fact: "At volume 8, you have to read the subtitles. At volume 9, you wake the dead. It is a fragile line."
  },
  {
    id: 719,
    question: "What exact percentage do you panic-tip when the iPad gets flipped around and the barista stares into your soul?",
    type: "number",
    answer: 20,
    unit: "%",
    tolerance: 5,
    fact: "They just handed you a black coffee. You did all the work. But the social pressure broke you."
  },
  {
    id: 720,
    question: "How many consecutive cracks in the sidewalk can you step on before you legally break your mother's back?",
    type: "number",
    answer: 0,
    unit: "cracks",
    tolerance: 0,
    fact: "Zero. Step on a crack, break your mama's back. Are you a monster?"
  },
  {
    id: 721,
    question: "How many times can you read the exact same sentence in a book before you realize you're just staring at paper?",
    type: "number",
    answer: 4,
    unit: "times",
    tolerance: 2,
    fact: "Your eyes are doing the work but your brain has clocked out for the day."
  },
  {
    id: 722,
    question: "How many feet away is the Uber driver when you finally decide to walk outside and awkwardly stand on the curb?",
    type: "number",
    answer: 500,
    unit: "feet",
    tolerance: 400,
    fact: "And then you make eye contact with every passing car hoping it's a Honda Civic."
  },
  {
    id: 723,
    question: "How many exclamation points is the absolute legal maximum to use in a professional work email?",
    type: "number",
    answer: 2,
    unit: "points",
    tolerance: 1,
    fact: "'Thanks!' is polite. 'Thanks!!!' means you are unhinged. Know the difference."
  },
  {
    id: 724,
    question: "How many minutes does it take for a group chat plan to completely fall apart after one person says 'I might be late'?",
    type: "number",
    answer: 5,
    unit: "minutes",
    tolerance: 4,
    fact: "The house of cards immediately collapses. Everyone secretly wanted to stay home anyway."
  },
  {
    id: 725,
    question: "How many days in a row do you actively avoid checking your bank account after a weekend of 'treating yourself'?",
    type: "number",
    answer: 4,
    unit: "days",
    tolerance: 3,
    fact: "If you don't look at the banking app, the money technically didn't leave. Schrodinger's Wallet."
  },
  {
    id: 726,
    question: "How many nearly identical photos do you take of a sunset before realizing none of them look as good as real life?",
    type: "number",
    answer: 6,
    unit: "photos",
    tolerance: 4,
    fact: "The camera ruins the majesty. Delete 5 of them and post the 6th on your story."
  },
  {
    id: 727,
    question: "How many times does the site say 'New password cannot be old password' before you throw your laptop out the window?",
    type: "number",
    answer: 1,
    unit: "times",
    tolerance: 1,
    fact: "If my old password was correct all along, WHY DID YOU TELL ME IT WAS WRONG IN THE FIRST PLACE?"
  },
  {
    id: 728,
    question: "How many 'just one more TikTok's does it actually take before you put the phone down and fall asleep?",
    type: "number",
    answer: 45,
    unit: "videos",
    tolerance: 40,
    fact: "It's a time machine. You opened the app at 10 PM and now it's 2 AM."
  },
  {
    id: 729,
    question: "How many inches from the curb are you when you proudly declare 'that's a perfect parallel park'?",
    type: "number",
    answer: 18,
    unit: "inches",
    tolerance: 12,
    fact: "You are practically in the middle of the street, but you didn't hit the car behind you, so it's a win."
  },
  {
    id: 730,
    question: "How many pens have you accidentally stolen from banks, offices, and waiters in your lifetime?",
    type: "number",
    answer: 40,
    unit: "pens",
    tolerance: 35,
    fact: "You are a menace to office supply budgets everywhere."
  },

  // --- THE "STUPID KEYBOARD" TEXT MATCHES ---
  {
    id: 731,
    question: "What physical direction do you nod your head to acknowledge a complete stranger that you respect?",
    type: "text",
    answer: "down",
    fact: "The downward nod is formal. It protects the neck. It says 'I respect you, but stay over there'."
  },
  {
    id: 732,
    question: "What physical direction do you nod your head to acknowledge a close friend you just saw in public?",
    type: "text",
    answer: "up",
    fact: "The upward nod exposes the throat. It is a sign of ultimate trust and brotherhood."
  },
  {
    id: 733,
    question: "What 4-letter word do you loudly say, accompanied by a double knee-slap, to signal that it is time to leave?",
    type: "text",
    answer: "welp",
    fact: "'Welp, I suppose I should get going.' It's the Midwest goodbye sequence."
  },
  {
    id: 734,
    question: "What 3-letter sound do you involuntarily make when sitting down or standing up after the age of 25?",
    type: "text",
    answer: "oof",
    fact: "Your joints are screaming. The 'oof' is the sound of your youth leaving your body."
  },
  {
    id: 735,
    question: "What 2-letter acronym do you type in the game chat after getting absolutely destroyed by a 12-year-old?",
    type: "text",
    answer: "gg",
    fact: "It stands for 'Good Game', but it actually means 'I am dead inside and uninstalling right now'."
  },
  {
    id: 736,
    question: "What specific 4-word question do you ask a dog in a high-pitched voice the absolute second you meet them?",
    type: "text",
    answer: "whos a good boy",
    fact: "(Or girl). You don't know them. But they are a good boy. It is a fact."
  },
  {
    id: 737,
    question: "What is the very first 2-letter word you say when the answering machine clicks on and your brain short-circuits?",
    type: "text",
    answer: "um",
    fact: "You had 6 rings to prepare what you were going to say, and you still blew it."
  },
  {
    id: 738,
    question: "What 3-letter word do you aggressively exhale while chewing a pizza roll that is currently burning the roof of your mouth?",
    type: "text",
    answer: "hot",
    fact: "'Hafashafa... hot... hafashafa.' Just spit it out, you psycho."
  },
  {
    id: 739,
    question: "What 2-letter word do you yell when the toaster pops up even though you were literally staring right at it?",
    type: "text",
    answer: "ah",
    fact: "It jumpscares you every single time. Your fight-or-flight response is broken."
  },
  {
    id: 740,
    question: "What single word does the GPS say when you miss your exit and begin questioning all your life choices?",
    type: "text",
    answer: "rerouting",
    fact: "The most condescending robotic tone imaginable. She is judging you."
  },
  {
    id: 741,
    question: "What 2-word excuse do you use after coughing in a quiet room so people know you aren't dying of a plague?",
    type: "text",
    answer: "just water",
    fact: "You have to assure the public that you merely forgot how to swallow your own saliva."
  },
  {
    id: 742,
    question: "What 3-letter word is the universal text response to a friend cancelling plans you didn't want to go to anyway?",
    type: "text",
    answer: "bet",
    fact: "'Oh no, that sucks! Feel better!' (Takes off pants and immediately turns on Netflix)."
  },
  {
    id: 743,
    question: "What is the only 4-letter button you aggressively mash on the microwave at 3 AM to stop the beeping?",
    type: "text",
    answer: "stop",
    fact: "You must press it before it hits 0:00. Your life depends on it."
  },
  {
    id: 744,
    question: "What 3-letter word do you call someone whose actual name you forgot 5 seconds after they introduced themselves?",
    type: "text",
    answer: "bro",
    fact: "Also acceptable: man, dude, mate, or chief. You will never learn their real name."
  },
  {
    id: 745,
    question: "Complete the unholy modern internet trinity: Gaslight, Gatekeep, _________.",
    type: "text",
    answer: "girlboss",
    fact: "You have spent too much time on the internet. Log off."
  },
  {
    id: 746,
    question: "What 4-word phrase translates to 'I literally already told you this, learn to read' in corporate email speak?",
    type: "text",
    answer: "per my last email",
    fact: "The most ruthless, polite insult in the professional world."
  },
  {
    id: 747,
    question: "What 4-letter word do you say when you don't hear someone for the 3rd time and just decide to agree with whatever they said?",
    type: "text",
    answer: "yeah",
    fact: "And you just pray they didn't just ask you a highly specific question."
  },
  {
    id: 748,
    question: "What 3-letter word do you use as a greeting when walking past an acquaintance, accompanied by the downward nod?",
    type: "text",
    answer: "hey",
    fact: "It's quick, non-committal, and prevents them from stopping to talk."
  },
  {
    id: 749,
    question: "What 4-letter word do you type to your partner when you want to seem totally okay but are actually furious?",
    type: "text",
    answer: "fine",
    fact: "It is never fine. The storm is coming. Take cover."
  },
  {
    id: 750,
    question: "What 2-word phrase do you instinctively say out loud when your pet does a massive stretch on the rug?",
    type: "text",
    answer: "big stretch",
    fact: "It is legally required to acknowledge the stretch. Good job."
  },
  {
    id: 751,
    question: "Do you subconsciously walk slightly faster when you hear footsteps behind you, even in broad daylight?",
    type: "boolean",
    answer: "yes",
    fact: "You aren't taking any chances. It could be an assassin, or worse, someone trying to sell you solar panels."
  },
  {
    id: 752,
    question: "If a cooking recipe explicitly calls for one single clove of garlic, do you immediately ignore it and use four?",
    type: "boolean",
    answer: "yes",
    fact: "One clove of garlic is a culinary joke. We measure garlic with our heart, not a recipe."
  },
  {
    id: 753,
    question: "Have you ever pulled out your phone to look busy just because someone was walking past you?",
    type: "boolean",
    answer: "yes",
    fact: "Staring intensely at your lock screen to avoid 3 seconds of awkward eye contact. Brilliant."
  },
  {
    id: 754,
    question: "Do you mentally apologize to the other forks in the drawer when you bypass them to pick your favorite one?",
    type: "boolean",
    answer: "yes",
    fact: "They have a different weight and vibe. The other forks understand. They are just inferior."
  },
  {
    id: 755,
    question: "Have you ever faked a yawn just to casually check if a specific person in the room is looking at you?",
    type: "boolean",
    answer: "yes",
    fact: "Ah, the yawn-check. A flawless psychological maneuver used by humans since the dawn of time."
  },
  {
    id: 756,
    question: "Is the 5-second rule legally binding for a dropped piece of shredded cheese?",
    type: "boolean",
    answer: "yes",
    fact: "The bacteria legally have to wait 5 seconds. It is in their union contract."
  },
  {
    id: 757,
    question: "Do you press 'Ctrl+C' at least three times just to make absolutely sure the text actually copied?",
    type: "boolean",
    answer: "yes",
    fact: "Because pasting the previous thing you copied is a fate worse than death."
  },
  {
    id: 758,
    question: "When walking past a mirror in the dark, do you intentionally avoid looking at it so your demon reflection doesn't grab you?",
    type: "boolean",
    answer: "yes",
    fact: "We all know there's a 1% chance your reflection blinks when you don't. Keep your eyes forward."
  },
  {
    id: 759,
    question: "If a manager or teacher says 'Can I ask you a question?', do you instantly assume you've committed a federal crime?",
    type: "boolean",
    answer: "yes",
    fact: "Your brain instantly flashes through every bad thing you've ever done in your entire life."
  },
  {
    id: 760,
    question: "Do you randomly remember a minorly embarrassing moment from 5th grade and physically wince in public?",
    type: "boolean",
    answer: "yes",
    fact: "Nobody else on earth remembers you waving at someone who wasn't waving at you. Let it go."
  },
  {
    id: 761,
    question: "If you intentionally step on a crunchy-looking leaf on the sidewalk and it doesn't crunch, is your entire day ruined?",
    type: "boolean",
    answer: "yes",
    fact: "The betrayal is immeasurable. The leaf lied to you."
  },
  {
    id: 762,
    question: "Have you ever paused a movie to listen to a weird noise in the house, and then completely forgot to unpause it for 20 minutes?",
    type: "boolean",
    answer: "yes",
    fact: "You successfully stared at a frozen frame of Shrek while dissociating into the void."
  },
  {
    id: 763,
    question: "When you were a kid, did you try to balance the light switch perfectly in the middle so the light was neither on nor off?",
    type: "boolean",
    answer: "yes",
    fact: "You were harnessing the raw power of electricity. A dangerous, thrilling game."
  },
  {
    id: 764,
    question: "Have you ever stared at a totally normal word for so long that it completely lost all meaning and looked misspelled?",
    type: "boolean",
    answer: "yes",
    fact: "It's called semantic satiation. Your brain just un-learned the English language temporarily."
  },
  {
    id: 765,
    question: "Do you calculate exactly how much money you'd save if you stopped buying coffee, and then immediately go buy a coffee?",
    type: "boolean",
    answer: "yes",
    fact: "'Wow, I could save $1,200 a year.' *Taps Apple Pay at Starbucks.*"
  },

  // --- THE "PAINFULLY ACCURATE" NUMBERS ---
  {
    id: 766,
    question: "How many times do you slap your pockets to perform the 'keys, phone, wallet' macarena before leaving the house?",
    type: "number",
    answer: 3,
    unit: "slaps",
    tolerance: 1,
    fact: "The holy trinity of modern human existence. If you don't do the dance, you lose an item."
  },
  {
    id: 767,
    question: "What is the socially acceptable amount of times to hit snooze before you are legally considered a menace to society?",
    type: "number",
    answer: 3,
    unit: "snoozes",
    tolerance: 1,
    fact: "After 3 snoozes, you aren't actually getting any real sleep. You are just torturing yourself in 9-minute increments."
  },
  {
    id: 768,
    question: "How many days can a basket of clean laundry sit on your bed before you are forced to just sleep next to it?",
    type: "number",
    answer: 7,
    unit: "days",
    tolerance: 6,
    fact: "Washing the clothes takes 1 hour. Folding them takes 3 to 14 business days."
  },
  {
    id: 769,
    question: "How many working pens are actually in your house right now, despite you buying a 50-pack last year?",
    type: "number",
    answer: 2,
    unit: "pens",
    tolerance: 2,
    fact: "Pens vanish into the same dimension as single socks and lost guitar picks."
  },
  {
    id: 770,
    question: "What is the maximum number of grocery bags you can carry on your arms before you are legally required to make a second trip?",
    type: "number",
    answer: 15,
    unit: "bags",
    tolerance: 10,
    fact: "One trip or die trying. The plastic handles cutting off your blood circulation is a badge of honor."
  },
  {
    id: 771,
    question: "How many times do you wiggle the manual gear shift in neutral to make absolutely sure the car isn't in gear?",
    type: "number",
    answer: 3,
    unit: "wiggles",
    tolerance: 2,
    fact: "Left, right, left, right. Okay, it's safe. It's an uncontrollable instinct."
  },
  {
    id: 772,
    question: "How many times does the DVD screensaver logo have to hit the corner perfectly for you to achieve inner peace?",
    type: "number",
    answer: 1,
    unit: "hits",
    tolerance: 0,
    fact: "When it finally hits the absolute perfect pixel in the corner, your soul ascends."
  },
  {
    id: 773,
    question: "How many actual minutes does it take to leave the house after you confidently declare 'I'm leaving right now'?",
    type: "number",
    answer: 10,
    unit: "minutes",
    tolerance: 8,
    fact: "You still need to find your keys, fill your water bottle, and stare at the wall for 4 minutes."
  },
  {
    id: 774,
    question: "How many unread texts do you currently have from your mother that you are just mentally pretending don't exist?",
    type: "number",
    answer: 2,
    unit: "texts",
    tolerance: 2,
    fact: "You'll reply 'later'. Spoiler: You won't."
  },
  {
    id: 775,
    question: "How many times do you rapidly press the crosswalk button thinking it will somehow make the light change faster?",
    type: "number",
    answer: 6,
    unit: "presses",
    tolerance: 4,
    fact: "Most of those buttons literally do nothing. They are placebo buttons for impatient pedestrians."
  },
  {
    id: 776,
    question: "How many 5-minute tasks have you been aggressively putting off doing for over 6 months?",
    type: "number",
    answer: 4,
    unit: "tasks",
    tolerance: 3,
    fact: "Making that one phone call has paralyzed your entire life schedule."
  },
  {
    id: 777,
    question: "If you have to wake up at exactly 7:00 AM, how many alarms do you set starting from 6:15 AM?",
    type: "number",
    answer: 5,
    unit: "alarms",
    tolerance: 3,
    fact: "You are setting a trap for your future self, and your future self will evade all of them."
  },
  {
    id: 778,
    question: "How many browser tabs is it considered 'psychopathic' to have open on your phone without organizing them?",
    type: "number",
    answer: 50,
    unit: "tabs",
    tolerance: 40,
    fact: "When the tab counter just turns into a smiley face :D, you have a digital hoarding problem."
  },
  {
    id: 779,
    question: "How many seconds of pure silence on a phone call makes it officially an 'awkward silence'?",
    type: "number",
    answer: 4,
    unit: "seconds",
    tolerance: 2,
    fact: "By second 4, you are desperately searching the room for a topic of conversation."
  },
  {
    id: 780,
    question: "How many times do you check the package tracking app on the day it says 'Out for Delivery'?",
    type: "number",
    answer: 10,
    unit: "refreshes",
    tolerance: 8,
    fact: "Refreshing the app does not make the delivery truck drive faster. Sit down."
  },

  // --- THE "STUPID KEYBOARD" TEXT MATCHES ---
  {
    id: 781,
    question: "What 8-letter panicked word do you yell out when someone violently knocks on the public bathroom stall you are occupying?",
    type: "text",
    answer: "occupied",
    fact: "It's the only word you can manage while desperately holding the broken lock shut."
  },
  {
    id: 782,
    question: "What 4-letter word do you type to sound enthusiastic about plans when you are actually dead inside?",
    type: "text",
    answer: "cool",
    fact: "'Cool! Can't wait!' translates directly to 'I am going to fake an illness an hour before this starts'."
  },
  {
    id: 783,
    question: "What 5-letter word do you instinctively say to a toddler who hands you a fake plastic ringing phone?",
    type: "text",
    answer: "hello",
    fact: "You must answer the call. It is the unwritten law of interacting with toddlers."
  },
  {
    id: 784,
    question: "What 3-letter word do you secretly whisper to yourself when a major social plan gets cancelled and you get to stay home?",
    type: "text",
    answer: "yay",
    fact: "You text back 'Oh no!' but you are already putting your sweatpants back on."
  },
  {
    id: 785,
    question: "What 2-letter word do you type to acknowledge you received a task from your boss, but are secretly annoyed by it?",
    type: "text",
    answer: "ok",
    fact: "No capitalization, no punctuation. Just 'ok'. The ultimate passive-aggressive compliance."
  },
  {
    id: 786,
    question: "What 6-letter word do you politely say to the ATM when it finally dispenses your cash?",
    type: "text",
    answer: "thanks",
    fact: "We must be polite to the robots so they spare us during the uprising."
  },
  {
    id: 787,
    question: "What 4-letter word do you say out loud when you miraculously catch something you dropped before it hits the floor?",
    type: "text",
    answer: "nice",
    fact: "You are basically an Avenger for about 2 seconds, and nobody was there to witness it."
  },
  {
    id: 788,
    question: "What 4-letter word do you hiss through your teeth when you step on a stray Lego in the pitch black?",
    type: "text",
    answer: "ouch",
    fact: "It is a pain rivaled only by hitting your funny bone or stubbing a pinky toe."
  },
  {
    id: 789,
    question: "What 4-letter word do you quickly type when you realize you accidentally sent a risky text to the wrong person?",
    type: "text",
    answer: "oops",
    fact: "Followed instantly by a block, a plane ticket to Mexico, and a new identity."
  },
  {
    id: 790,
    question: "What 4-letter word do you say to the barista when they call out a name that sounds slightly like yours, but isn't yours?",
    type: "text",
    answer: "mine",
    fact: "Your name is John, they yelled 'Jim', and you just accepted your new identity for the coffee."
  },
  {
    id: 791,
    question: "What 3-letter acronym do you type when you desperately want to end a conversation but don't want to leave them on read?",
    type: "text",
    answer: "lol",
    fact: "The modern conversational tombstone. The discussion ends here."
  },
  {
    id: 792,
    question: "What 3-letter word do you awkwardly say when you pull up to a four-way stop at the exact same time as someone else?",
    type: "text",
    answer: "you",
    fact: "Accompanied by a frantic waving motion. 'No you go. No you. Okay I'll—wait no, you go.'"
  },
  {
    id: 793,
    question: "What 5-letter word do people call the legendary default Windows XP background of the green hill and blue sky?",
    type: "text",
    answer: "bliss",
    fact: "An image burned into the retinas of an entire generation."
  },
  {
    id: 794,
    question: "What 4-letter string of gibberish do you use for a temporary file name when you're too lazy to type real words?",
    type: "text",
    answer: "asdf",
    fact: "The home row keys have saved billions of hours of human productivity."
  },
  {
    id: 795,
    question: "What 4-letter word do you aggressively whisper to your character in a video game when they get stuck on a tiny rock?",
    type: "text",
    answer: "move",
    fact: "You have slain dragons, but a 3-inch pebble has paralyzed your hero entirely."
  },
  {
    id: 796,
    question: "What 5-letter therapy word do you reply with when your friend explains a deeply complex emotional issue to you?",
    type: "text",
    answer: "valid",
    fact: "You have no idea how to help them, but calling their feelings 'valid' buys you time to think."
  },
  {
    id: 797,
    question: "What 4-letter word do you call the tiny, useless pocket on the right side of your jeans?",
    type: "text",
    answer: "coin",
    fact: "It was originally for pocket watches in the 1800s. Now it is just a lint trap."
  },
  {
    id: 798,
    question: "What 6-letter curse word do you mutter when you remember you left your coffee on the roof of your car?",
    type: "text",
    answer: "dammit",
    fact: "You remember it precisely 3 seconds after pulling onto the highway."
  },
  {
    id: 799,
    question: "What 4-letter word do you text when your friend asks 'are you almost ready?' and you are literally still in bed?",
    type: "text",
    answer: "soon",
    fact: "'Soon' is a measure of time relative to the universe. Technically, 3 hours from now is soon."
  },
  {
    id: 800,
    question: "What 3-letter word do you type as a standalone reply when a friend sends you a paragraph of absolute nonsense?",
    type: "text",
    answer: "huh",
    fact: "The perfect response. The namesake of our game. You are learning."
  },
  {
    id: 801,
    question: "Have you ever tripped on a perfectly flat surface and then glared at the ground to blame it?",
    type: "boolean",
    answer: "yes",
    fact: "You have to inspect the floor. If people see you looking at the ground, they'll think it was a structural issue, not your own clumsy feet."
  },
  {
    id: 802,
    question: "Do you mentally rehearse a script in your head before making a 30-second phone call to order a pizza?",
    type: "boolean",
    answer: "yes",
    fact: "And if they ask a question that wasn't in your script, your entire operating system crashes."
  },
  {
    id: 803,
    question: "If you drop a single ice cube on the kitchen floor, do you just kick it under the fridge instead of picking it up?",
    type: "boolean",
    answer: "yes",
    fact: "It's just water. The fridge will absorb it. This is peak domestic efficiency."
  },
  {
    id: 804,
    question: "Have you ever taken out your earbuds just to hear someone better, even though absolutely nothing was playing?",
    type: "boolean",
    answer: "yes",
    fact: "It's a psychological barrier. Taking them out proves to the other person that you are now perceiving them."
  },
  {
    id: 805,
    question: "Do you ever stare blankly at yourself in the mirror while brushing your teeth and completely dissociate?",
    type: "boolean",
    answer: "yes",
    fact: "Just two solid minutes of staring into your own soul while making a foamy mess. A great start to the day."
  },
  {
    id: 806,
    question: "If you leave exactly 1 second on the microwave timer and walk away, are you a sociopath?",
    type: "boolean",
    answer: "yes",
    fact: "Press the 'Clear' button. The next person to use the microwave shouldn't have to suffer for your sins."
  },
  {
    id: 807,
    question: "Have you ever worn headphones in public with no music playing just so people won't talk to you?",
    type: "boolean",
    answer: "yes",
    fact: "The universal 'Do Not Disturb' sign. If someone still tries to talk to you, they belong in jail."
  },
  {
    id: 808,
    question: "Do you occasionally invent a fictional scenario in your head where you save everyone in the room from a ridiculous threat?",
    type: "boolean",
    answer: "yes",
    fact: "If a ninja attacks this Starbucks right now, I know exactly which chair I'm throwing."
  },
  {
    id: 809,
    question: "Have you ever turned down the brightness on your phone to hide the fact that you are scrolling through embarrassing garbage?",
    type: "boolean",
    answer: "yes",
    fact: "You think the privacy screen protects you, but everyone behind you on the bus knows exactly what you're looking at."
  },
  {
    id: 810,
    question: "Do you automatically assume someone is mad at you if they use a period at the end of a text message?",
    type: "boolean",
    answer: "yes",
    fact: "Proper grammar is aggressive. 'Okay.' is a threat. 'Okay' is peace."
  },
  {
    id: 811,
    question: "Have you ever walked into a spiderweb and instantly turned into a frantic karate master?",
    type: "boolean",
    answer: "yes",
    fact: "You didn't see the spider, but you know it is currently crawling on your neck. It's a scientific fact."
  },
  {
    id: 812,
    question: "Do you say 'bless you' to your pets when they sneeze?",
    type: "boolean",
    answer: "yes",
    fact: "They don't know what it means, but manners apply to all species."
  },
  {
    id: 813,
    question: "Have you ever fake-laughed at a joke, only to realize a second later that it was actually a tragic story?",
    type: "boolean",
    answer: "yes",
    fact: "The sudden realization that you just chuckled at someone's dead grandmother. Time to move to another country."
  },
  {
    id: 814,
    question: "Do you hold your breath when driving through a tunnel just to see if you can make it?",
    type: "boolean",
    answer: "yes",
    fact: "If you breathe, the tunnel wins. You cannot let the tunnel win."
  },
  {
    id: 815,
    question: "Have you ever aggressively tapped your pockets to make sure you have your keys, while holding your keys in your hand?",
    type: "boolean",
    answer: "yes",
    fact: "The human brain simply loves to hit you with a totally unearned panic attack."
  },

  // --- THE "WAY TOO SPECIFIC" NUMBERS ---
  {
    id: 816,
    question: "How many business days does it take you to reply to a text that you opened, read, and said 'I'll reply to this later'?",
    type: "number",
    answer: 3,
    unit: "days",
    tolerance: 2,
    fact: "At that point, it's too late to just reply. You have to invent a fake medical emergency to justify the delay."
  },
  {
    id: 817,
    question: "How many consecutive times do you write the previous year on a date in January before your brain finally updates?",
    type: "number",
    answer: 15,
    unit: "times",
    tolerance: 10,
    fact: "It's mid-February and you are still writing 2023 on your documents. Wake up."
  },
  {
    id: 818,
    question: "How many screenshots of recipes do you have in your phone gallery that you will literally never cook?",
    type: "number",
    answer: 50,
    unit: "recipes",
    tolerance: 40,
    fact: "You are never going to make a 14-hour smoked brisket. Stop hoarding the screenshots."
  },
  {
    id: 819,
    question: "How many totally random, unidentifiable cords do you own that belong to devices you haven't seen since 2012?",
    type: "number",
    answer: 15,
    unit: "cords",
    tolerance: 10,
    fact: "You can't throw them away. What if you suddenly need a proprietary charger for a 2008 digital camera?"
  },
  {
    id: 820,
    question: "How many pairs of underwear do you pack for a 3-day weekend trip 'just in case'?",
    type: "number",
    answer: 7,
    unit: "pairs",
    tolerance: 2,
    fact: "What do you think is going to happen? Are you planning on soiling yourself twice a day?"
  },
  {
    id: 821,
    question: "How many items do you end up buying at IKEA when you specifically went in for literally just one plant?",
    type: "number",
    answer: 12,
    unit: "items",
    tolerance: 8,
    fact: "You went for a fake fern and left with $200 worth of meatballs, tealight candles, and a bookshelf."
  },
  {
    id: 822,
    question: "How many times a day do you let out a massive, dramatic sigh for absolutely no reason?",
    type: "number",
    answer: 10,
    unit: "sighs",
    tolerance: 5,
    fact: "You aren't even stressed. Your body just needs to physically expel the existential dread."
  },
  {
    id: 823,
    question: "How many times do you check the oven when baking a frozen pizza, completely ignoring the timer you set?",
    type: "number",
    answer: 4,
    unit: "checks",
    tolerance: 2,
    fact: "The timer says 15 minutes, but you don't trust it. The pizza could spontaneously combust at minute 12."
  },
  {
    id: 824,
    question: "How many times do you reread a text before sending it to someone you have a crush on?",
    type: "number",
    answer: 10,
    unit: "reads",
    tolerance: 5,
    fact: "And even after analyzing it like a Shakespearean scholar, you still end up sounding like an idiot."
  },
  {
    id: 825,
    question: "How many empty, or nearly empty, shampoo and body wash bottles are currently just sitting on the floor of your shower?",
    type: "number",
    answer: 3,
    unit: "bottles",
    tolerance: 2,
    fact: "You keep telling yourself you'll use that last 2% of soap. You won't. Throw it away."
  },
  {
    id: 826,
    question: "How many minutes past your alarm going off do you stay in bed endlessly scrolling on your phone?",
    type: "number",
    answer: 20,
    unit: "minutes",
    tolerance: 10,
    fact: "You are actively choosing to make yourself late so you can watch a video of a guy building a mud hut."
  },
  {
    id: 827,
    question: "How many attempts does it take the average person to spell 'restaurant' correctly without autocorrect?",
    type: "number",
    answer: 3,
    unit: "tries",
    tolerance: 1,
    fact: "Resturaunt. Restarant. Resteraunt. It's a cursed word."
  },
  {
    id: 828,
    question: "How many times do you try to casually push a pull door before giving up and using the handle?",
    type: "number",
    answer: 2,
    unit: "pushes",
    tolerance: 1,
    fact: "The sign says pull. You saw the sign. You pushed anyway."
  },
  {
    id: 829,
    question: "How many times a week do you enthusiastically agree to future plans, knowing you will definitely cancel them later?",
    type: "number",
    answer: 2,
    unit: "lies",
    tolerance: 1,
    fact: "'Yeah we should totally hang out!' translates to 'I hope I never see you again.'"
  },
  {
    id: 830,
    question: "How many times do you physically turn your phone around to show someone a meme, only to pull it back to make sure you clicked the right image?",
    type: "number",
    answer: 1,
    unit: "check",
    tolerance: 0,
    fact: "You have to verify that you didn't accidentally show them an unhinged screenshot from your camera roll."
  },

  // --- THE "STUPID KEYBOARD" TEXT MATCHES ---
  {
    id: 831,
    question: "What 2-letter word do you type to aggressively agree with someone, proving you are 100% on their side?",
    type: "text",
    answer: "fr",
    fact: "For real. The ultimate validation."
  },
  {
    id: 832,
    question: "What 4-word phrase do you use to excuse yourself from a social gathering without actually saying goodbye to anyone?",
    type: "text",
    answer: "im gonna head out",
    fact: "The classic Irish Exit. Accompanied by a quick slap of the knees."
  },
  {
    id: 833,
    question: "What 4-letter word do you say when the internet cuts out during the climax of a movie?",
    type: "text",
    answer: "bruh",
    fact: "A single 'bruh' holds more emotion than a 500-page poetry book."
  },
  {
    id: 834,
    question: "What 2-word phrase do you use to sign off a professional email when you are absolutely furious with the recipient?",
    type: "text",
    answer: "best regards",
    fact: "If you leave out the 'Best' and just say 'Regards', you have officially declared war."
  },
  {
    id: 835,
    question: "What 5-letter word do you say when someone asks how your terrible, burnt food tastes?",
    type: "text",
    answer: "great",
    fact: "You smile through the pain. You chew the charcoal. You do not complain."
  },
  {
    id: 836,
    question: "What 3-letter word do you say to the automatic sliding doors at the grocery store when they open too slowly?",
    type: "text",
    answer: "open",
    fact: "You are basically using the Force. You are a Jedi of the produce section."
  },
  {
    id: 837,
    question: "What 4-letter word do you sigh out loud when you finally sit down on the couch after a painfully long day?",
    type: "text",
    answer: "ahhh",
    fact: "And you will not stand back up for at least 4 hours. You belong to the cushions now."
  },
  {
    id: 838,
    question: "What 6-letter word do you politely say to a mannequin when you accidentally bump into it at the mall?",
    type: "text",
    answer: "sorry",
    fact: "You apologized to a faceless chunk of plastic. They win."
  },
  {
    id: 839,
    question: "What 4-letter word do you text a friend when they say they are '5 minutes away' but you know they are still in bed?",
    type: "text",
    answer: "lies",
    fact: "You know they are lying. They know they are lying. But the charade continues."
  },
  {
    id: 840,
    question: "What 4-letter word do you say out loud when you safely make it through a yellow light that was definitely red?",
    type: "text",
    answer: "phew",
    fact: "You beat the system. You are a criminal mastermind."
  },
  {
    id: 841,
    question: "What 3-letter word do you type when your friend sends you a meme you literally saw 3 weeks ago?",
    type: "text",
    answer: "lol",
    fact: "You don't want to hurt their feelings by saying 'old', so you just give them the pity laugh."
  },
  {
    id: 842,
    question: "What 4-letter word do you mutter to yourself when you drop your keys trying to unlock the front door?",
    type: "text",
    answer: "crap",
    fact: "It's always right when you have to go to the bathroom really bad, too."
  },
  {
    id: 843,
    question: "What 2-word phrase do you politely say when a coworker tells you a 'funny' story that is incredibly boring?",
    type: "text",
    answer: "thats crazy",
    fact: "The universal response when your brain has entirely stopped listening."
  },
  {
    id: 844,
    question: "What 5-letter word do you scream when the shower water suddenly turns freezing cold?",
    type: "text",
    answer: "whoa",
    fact: "The sudden ice blast triggers a primal survival instinct."
  },
  {
    id: 845,
    question: "What 4-letter word do you text your friend to let them know you are outside their house?",
    type: "text",
    answer: "here",
    fact: "You refuse to ring the doorbell. You will sit in the car until they emerge."
  },
  {
    id: 846,
    question: "What 2-word response do you give when your parents ask where all your money went?",
    type: "text",
    answer: "i dunno",
    fact: "You know exactly where it went. It went to Doordash and iced coffee."
  },
  {
    id: 847,
    question: "What 6-letter word do you say when you trip up the stairs but manage to catch yourself before falling?",
    type: "text",
    answer: "whoops",
    fact: "You play it off casually, but your heart rate is currently at 180 BPM."
  },
  {
    id: 848,
    question: "What 4-letter word do you use to refer to the pile of assorted junk sitting on your kitchen counter?",
    type: "text",
    answer: "mail",
    fact: "It's 90% junk mail and 10% incredibly important documents you are ignoring."
  },
  {
    id: 849,
    question: "What 4-letter word do you type when your computer decides to run an unskippable update right as you sit down to work?",
    type: "text",
    answer: "bruh",
    fact: "Windows always knows exactly when you are in a rush. It feeds on your stress."
  },
  {
    id: 850,
    question: "What 5-letter word do you reply with when someone hits you with an undeniably solid counter-argument?",
    type: "text",
    answer: "touché",
    fact: "You lost the debate, but you bowed out with class and a little French accent."
  },
  {
    id: 851,
    question: "Have you ever closed a social media app, stared at your home screen for 2 seconds, and immediately reopened the exact same app?",
    type: "boolean",
    answer: "yes",
    fact: "Your dopamine receptors are completely fried. You are trapped in the infinite scroll loop."
  },
  {
    id: 852,
    question: "Do you perform the awkward, tight-lipped 'white people smile' when passing a coworker in the hallway?",
    type: "boolean",
    answer: "yes",
    fact: "No teeth. Lips sealed tight. A slight nod. The universal sign of 'I acknowledge you but please don't speak to me'."
  },
  {
    id: 853,
    question: "Have you ever used your phone's calculator for a deeply embarrassing math problem like 8 + 5 just because you 'don't trust your brain'?",
    type: "boolean",
    answer: "yes",
    fact: "You knew it was 13. But what if the laws of mathematics changed while you were asleep?"
  },
  {
    id: 854,
    question: "Do you own the original cardboard box for a TV or computer you bought 4 years ago 'just in case you move'?",
    type: "boolean",
    answer: "yes",
    fact: "You are paying rent for an empty piece of cardboard. Throw it in the recycling bin."
  },
  {
    id: 855,
    question: "Have you ever dropped your phone flat onto your own face while scrolling in bed?",
    type: "boolean",
    answer: "yes",
    fact: "The ultimate betrayal by gravity. A split lip is the price we pay for late-night memes."
  },
  {
    id: 856,
    question: "Do you mentally race the microwave timer, trying to grab your plate and hit 'clear' before it reaches 0:00?",
    type: "boolean",
    answer: "yes",
    fact: "You defused the bomb with 0:01 left. The kitchen is safe. You are a hero."
  },
  {
    id: 857,
    question: "Have you ever pretended you didn't know how to stop the elevator doors from closing when someone was running towards it?",
    type: "boolean",
    answer: "yes",
    fact: "'Oh no! The button isn't working!' you whisper, as you avoid all eye contact. Villain behavior."
  },
  {
    id: 858,
    question: "If an online recipe says 'Prep time: 10 minutes', is it actually going to be a 45-minute nightmare?",
    type: "boolean",
    answer: "yes",
    fact: "Food bloggers assume you have a team of sous chefs chopping your onions. It's a lie."
  },
  {
    id: 859,
    question: "Do you actively refuse to ask a store employee for help until you have desperately circled the aisles at least 5 times?",
    type: "boolean",
    answer: "yes",
    fact: "Asking for directions is a sign of weakness. You will find the paprika or die trying."
  },
  {
    id: 860,
    question: "Have you ever taken a phantom step at the bottom of a staircase because you thought there was one more stair?",
    type: "boolean",
    answer: "yes",
    fact: "That heavy, soul-crushing stomp followed by the sudden realization that you look like an idiot."
  },
  {
    id: 861,
    question: "Do you throw away the frozen food packaging, and then immediately dig it out of the trash to read the oven temperature again?",
    type: "boolean",
    answer: "yes",
    fact: "Your short-term memory is roughly 4 seconds long. 400 degrees or 425? Better check the garbage."
  },
  {
    id: 862,
    question: "Have you ever re-read an email you just sent just to admire how incredibly professional you sounded?",
    type: "boolean",
    answer: "yes",
    fact: "You used the word 'henceforth'. You are basically a CEO now."
  },
  {
    id: 863,
    question: "Do you hold your breath when driving past a graveyard so the ghosts don't possess you?",
    type: "boolean",
    answer: "yes",
    fact: "A superstition from 4th grade that you still obey as a fully grown adult."
  },
  {
    id: 864,
    question: "Have you ever aggressively pressed the 'lock' button on your car fob 5 times as you walk away just to be absolutely sure?",
    type: "boolean",
    answer: "yes",
    fact: "Beep. Beep. Beep. Beep. Okay, the car is safe. Probably."
  },
  {
    id: 865,
    question: "Do you randomly panic that you left the stove on while you are currently 400 miles away on vacation?",
    type: "boolean",
    answer: "yes",
    fact: "You haven't cooked in three days, but yes, the house is definitely burning down."
  },

  // --- THE "PAINFULLY ACCURATE" NUMBERS ---
  {
    id: 866,
    question: "How many hours does 'I'm just going to rest my eyes for a second' usually turn into?",
    type: "number",
    answer: 4,
    unit: "hours",
    tolerance: 2,
    fact: "You didn't rest your eyes. You lapsed into a coma and woke up not knowing what year it is."
  },
  {
    id: 867,
    question: "What is the absolute maximum number of times you can say 'What?' before you just have to nod and laugh?",
    type: "number",
    answer: 3,
    unit: "times",
    tolerance: 1,
    fact: "After 3 'whats', you just have to pray they didn't ask you a serious question."
  },
  {
    id: 868,
    question: "How many days does a perfectly good banana sit on the kitchen counter before it officially becomes a fruit fly habitat?",
    type: "number",
    answer: 5,
    unit: "days",
    tolerance: 2,
    fact: "You bought them with the best intentions. Now they are just brown mush."
  },
  {
    id: 869,
    question: "How many open browser tabs does it take before your laptop fan starts sounding like a Boeing 747 taking off?",
    type: "number",
    answer: 30,
    unit: "tabs",
    tolerance: 20,
    fact: "Chrome is currently consuming 98% of your RAM. Your computer is begging for mercy."
  },
  {
    id: 870,
    question: "If someone is walking toward a door you are holding, what is the maximum acceptable distance in feet before it becomes a weird power walk?",
    type: "number",
    answer: 15,
    unit: "feet",
    tolerance: 5,
    fact: "If they are further than 15 feet, you have doomed them to an awkward jog. Let the door close."
  },
  {
    id: 871,
    question: "How many times a week do you eat a meal standing over the kitchen sink like a feral goblin?",
    type: "number",
    answer: 3,
    unit: "meals",
    tolerance: 2,
    fact: "Plates require washing. The sink is efficient. You are an innovator."
  },
  {
    id: 872,
    question: "How many hours do you spend intensely researching a $12 Amazon purchase?",
    type: "number",
    answer: 3,
    unit: "hours",
    tolerance: 2,
    fact: "You act like buying a spatula requires a background check and a peer-reviewed study."
  },
  {
    id: 873,
    question: "How many decorative pillows must be violently thrown off the bed before you can actually go to sleep?",
    type: "number",
    answer: 5,
    unit: "pillows",
    tolerance: 3,
    fact: "They serve no purpose other than making the bed look nice for ghosts while you are at work."
  },
  {
    id: 874,
    question: "How many completely orphaned, single socks are currently sitting in your drawer missing their partner?",
    type: "number",
    answer: 6,
    unit: "socks",
    tolerance: 4,
    fact: "The dryer eats them. It is a sacrifice to the appliance gods."
  },
  {
    id: 875,
    question: "How many times do you smash the 'Skip Intro' button on Netflix during a weekend binge?",
    type: "number",
    answer: 12,
    unit: "skips",
    tolerance: 8,
    fact: "You don't have time for the theme song. You have content to consume."
  },
  {
    id: 876,
    question: "How many times do you re-read a 3-word text from your crush trying to decipher the hidden meaning?",
    type: "number",
    answer: 15,
    unit: "reads",
    tolerance: 10,
    fact: "They said 'sounds good'. There is no hidden code. Stop overthinking."
  },
  {
    id: 877,
    question: "How many unused ketchup and soy sauce packets are currently hoarding space in your fridge door?",
    type: "number",
    answer: 25,
    unit: "packets",
    tolerance: 15,
    fact: "You are preparing for a condiment apocalypse that will never come."
  },
  {
    id: 878,
    question: "How many times do you aggressively hit the 'Save' button in a video game before fighting a boss?",
    type: "number",
    answer: 3,
    unit: "saves",
    tolerance: 1,
    fact: "Save 1: Normal. Save 2: Just to be sure. Save 3: Paranoia."
  },
  {
    id: 879,
    question: "How many actual business days does a 'quick 5-minute task' take when you are actively procrastinating?",
    type: "number",
    answer: 14,
    unit: "days",
    tolerance: 10,
    fact: "You will spend 3 weeks stressing over an email that takes 45 seconds to type."
  },
  {
    id: 880,
    question: "How many decibels is a standard 'Dad Sneeze'?",
    type: "number",
    answer: 130,
    unit: "decibels",
    tolerance: 20,
    fact: "130 decibels is equivalent to a military jet taking off. It shakes the foundation of the house."
  },

  // --- THE "STUPID KEYBOARD" TEXT MATCHES ---
  {
    id: 881,
    question: "What 3-letter word do people aggressively yell when a waiter drops a plate in a crowded restaurant?",
    type: "text",
    answer: "opa",
    fact: "It's either 'Opa!' or completely silent, terrifying judgment."
  },
  {
    id: 882,
    question: "What is the specific 5-letter abbreviation for the fake laugh you type when your face is completely stone-dead?",
    type: "text",
    answer: "lmfao",
    fact: "You did not laugh. You did not lose any anatomy. You just breathed heavily."
  },
  {
    id: 883,
    question: "What 3-letter word do you use to start a sentence when you're about to drop the most unsolicited advice ever?",
    type: "text",
    answer: "bro",
    fact: "'Bro, you just gotta hit the gym and invest in crypto.' Please stop talking."
  },
  {
    id: 884,
    question: "What 2-word phrase do you excitedly yell to your pet when you walk through the front door?",
    type: "text",
    answer: "im home",
    fact: "You announce your arrival to the dog. The humans in the house are secondary."
  },
  {
    id: 885,
    question: "What 4-letter word do you use to describe a movie you didn't understand at all but don't want to sound stupid?",
    type: "text",
    answer: "deep",
    fact: "'Yeah man, Interstellar was just super... deep.' You have no idea what happened."
  },
  {
    id: 886,
    question: "What 2-letter word do you type when someone asks what you're doing, but you're literally just staring at a wall?",
    type: "text",
    answer: "nm",
    fact: "Not much. Just sustaining human life and waiting for the day to end."
  },
  {
    id: 887,
    question: "What 3-letter abbreviation do you type when your friend asks if you're ready to go, and you just stepped out of the shower?",
    type: "text",
    answer: "omw",
    fact: "On My Way. Technically, moving from the bathroom to the closet is a journey."
  },
  {
    id: 888,
    question: "What 3-letter word do you use to describe an overhyped, extremely average meal that cost you $30?",
    type: "text",
    answer: "mid",
    fact: "The most devastating culinary insult of the modern era."
  },
  {
    id: 889,
    question: "What 2-word phrase do you say out loud when a random website begs you to accept their tracking cookies?",
    type: "text",
    answer: "accept all",
    fact: "Take my data. Take my identity. Just let me read the recipe."
  },
  {
    id: 890,
    question: "What 4-letter word do you scream when the Wi-Fi symbol randomly gets an exclamation mark next to it?",
    type: "text",
    answer: "nooo",
    fact: "The modern tragedy. Disconnected from the hive mind."
  },
  {
    id: 891,
    question: "What 3-letter abbreviation do you text when a friend asks what you want for dinner and you refuse to make a decision?",
    type: "text",
    answer: "idc",
    fact: "I Don't Care. Which is a lie, because you will shoot down their first 4 suggestions."
  },
  {
    id: 892,
    question: "What 4-letter word do you say when someone asks if you want the last slice of pizza, even though you absolutely do?",
    type: "text",
    answer: "sure",
    fact: "You play it cool. 'Sure, I guess I'll take it.' You have been staring at it for 20 minutes."
  },
  {
    id: 893,
    question: "What 4-letter word do you type when you want a conversation to end but don't want to leave them on 'read'?",
    type: "text",
    answer: "cool",
    fact: "The conversation is over. 'Cool' is the digital brick wall."
  },
  {
    id: 894,
    question: "What 3-letter word do you say when you realize you left your wallet at home while standing at the checkout counter?",
    type: "text",
    answer: "brb",
    fact: "Be Right Back. Spoiler: You are never going back to that store again out of sheer shame."
  },
  {
    id: 895,
    question: "What 4-letter word do you type to soften the blow after sending a deeply offensive or risky joke?",
    type: "text",
    answer: "jk",
    fact: "Just Kidding. The ultimate 'get out of jail free' card."
  },
  {
    id: 896,
    question: "What 5-letter word do you aggressively whisper to a loading screen that is stuck at 99%?",
    type: "text",
    answer: "cmon",
    fact: "C'mon. Just one more percent. You can do it."
  },
  {
    id: 897,
    question: "What 5-letter word do you use when your teacher asks if you understand the math concept, but you absolutely don't?",
    type: "text",
    answer: "kinda",
    fact: "You understand none of it, but 'kinda' gets them to stop looking at you."
  },
  {
    id: 898,
    question: "What 2-word phrase do you politely mumble when the waiter asks how the food is, but your mouth is completely full?",
    type: "text",
    answer: "its good",
    fact: "Accompanied by a thumbs up and a desperate attempt not to choke."
  },
  {
    id: 899,
    question: "What 4-letter word do you text when your friend sends a message that just says 'guess what'?",
    type: "text",
    answer: "what",
    fact: "You are playing their game. You have walked right into the trap."
  },
  {
    id: 900,
    question: "What 4-letter word do you mutter to yourself when you drop a pen and it rolls completely under the fridge?",
    type: "text",
    answer: "gone",
    fact: "It belongs to the void now. You will never see that pen again."
  }
];