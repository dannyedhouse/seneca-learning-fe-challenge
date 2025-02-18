# Seneca Frontend Challenge

Using Vite + Node v20

## Installation

- Install dependencies with `pnpm i`
- Run the application with `pnpm run dev` to start the local server.
- Run the vitest suite with `pnpm run test`

The questions displayed can be changed by editing the questionData.json file.

## Main dependencies

- **Tailwind CSS** as my preferred choice of writing css; with pre-configured classes, and a easy ability to handle conditional styling for different screen sizes.
- **react-query** to handle data fetching with fetch to a static json file, as it handles all re-rendering logic with loading and error states. This allows for easy extendability with a real API call.
- **Framer Motion** for smooth transitions between the option choices.
- **vitest** to run unit tests, due to ease of setup with Vite.

## Approach

- I started by creating a mock data file, with types representing an array of questions, an array of options where each option can have different choices and a correct answer.
- I created a main Question component which handles data fetching, a OptionsContainer to render each option into a OptionSwitch. I determine the choice with the longest text, and set that as the max width for each switch component to keep the design consistent.

## Extension tasks

- To randomise the questions and answers, I created a simple function to randomise the questions on render, and a useSelectOptions custom hook, that handles initial state, selection and value changing. As an assumption, this will always return the incorrect options (but would be something to clarify).
- The AnswerOption type is flexible for multiple different choices (supporting 3 and more), but likely some CSS tweaks as only visually tested for 3.
- Next question button, to get next question from randomised array.

## Limitations

- It proved challenging to adjust each switch to be horizontal/vertical, eventually finding a way using just css/flex (but this needs slightly adjustment as at very specific point can overlap slightly).

## Future improvements

- More test coverage; specificially testing all untested utils, and more tests around the randomisation (like re-rendering, order should be different). I would also try and test the ResizeObserver usage (test isWrapped set correctly, framer adjusts accordingly).
- Review types and handling - for example in my tests I am forcing values to be non-null, even though this is safe due to using mock data, the component null handling could maybe be improved.
- Better CSS - e.g. using variables or mixins (colour pallette, consistent hover states etc.)

---

### Task:

The task is to make a component using React. The component is intended to test the user's knowledge of a topic, by having them move a series of toggles into the correct positions:

UI/UX requirements:

- The solution should lock once all correct answers have been selected so the toggles can no longer be switched.
- The toggles should animate between the two states.
- The background colour should change in proportion to how "correct" the answer is.
- The component should be responsive down to screens 320px wide.

Extension tasks:

- The order of the questions & answer positions should be randomised
- Your solution should be able to accommodate answers with both two and three toggle positions in the answers. For example: Q. "Which are the best sports people & teams?" A. (Liverpool, Chelsea, Man Utd), (Serena Williams, Naomi Osaka)
- You should make it easy to switch between the active question
