# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

### Testing

To track my test coverage i added a script into package.json to run jest --coverage. I worked on test coverage until it hit 100% across statements, functions, branches and lines. This gave me sufficient confidence before i went to refactor the code, it also helped me understand what the code is doing.

### dpk.js

Through my refactor i was aiming to tackle the mutable "candidate" variable and nested IF statements. This looked hard to read and subsquently, understand. I returned any values at the top of the function to clean up code below, these were an undefined event value and an undefined event.partitionKey value. This made it easier to read what was being returned in these cases, it also reduced the IF statements and code length. Finally i added in a couple of ?? logical operators to reduce the code and create an immutable "candidate". The logic contained inside the original IF statements was quite simple, therefore refactoring to the ?? logial operator i feel, has not impacted readability.




