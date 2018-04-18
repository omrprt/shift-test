Messly Front End Technical Assessment

  1. Please do not spend more than 3 or so hours on this.
  2. Please don't try and make it look "pretty" with colours and fonts. We only care about the desktop & mobile layouts.
  3. Feel free to use any libraries or JS tools you think necessary.

Task List

  1. Build a function `makeDummyShift()` that generates a random "shift" object which has the following fields:

    a. a duration in hours (which will be a random integer from 1-12).
    b. a status property (initially UNFILLED) which can change to: CONFIRMED or CANCELLED.

  2. Build a function `getNewStatus( shift )` that returns a new random status according to the following transition probabilities:

    a. UNFILLED => UNFILLED where p = 0.97
    b. UNFILLED => CONFIRMED where p = shift.duration > 6 ? 0.02 : 0.01
    c. UNFILLED => CANCELLED where p = shift.duration > 6 ? 0.01 : 0.02

  3. Using Redux, construct some front-end state that holds 1000 shifts generated via the `makeDummyShift` function. The shifts should tick/update every 1 second using the `getNewStatus` function

  4. Construct a pie chart widget showing proportions of shifts in various statuses (again just to be clear - please feel free to use a charting library!).

  5. Construct a bar chart widget showing proportion of shifts in various statuses grouped into sensible "duration buckets" (i.e. 0-4 hours, 4-8 hours, 8-12 hours).

  6. Construct 4 widgets each containing a summary value:

    a. Total number of unfilled shifts
    b. Total number of confirmed shifts
    c. Total number of cancelled shifts
    d. Total number of confirmed or unfilled shifts.

  7. Please layout your widgets using a grid system similar to "Bootstrap Grid" such that:

    a. For desktop screens:

      [ summary 1 ] [ summary 2 ] [ summary 3 ] [ summary 4 ]
      [ bar chart               ] [ pie chart               ]

    b. For mobile screens:

      [ summary 1 ] [ summary 2 ]
      [ summary 3 ] [ summary 4 ]
      [ bar chart               ]
      [ pie chart               ]
