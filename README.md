# Fetching Data:

There are some big problems when we're fetching data on our application:

In the case of this application, we're doing a fetchin request in each key stroke, which is not ideal beacuse:

1. Too many requsts in the same time: Meaning that we're slowing each request down.
2. Downloading too much data: Since we're requesting even data that we don't really want, we're downloading un-necessary data.
3. Wrong final data due to ("Race Condition"): Imagine that, for some reason, an intermediate step last longer than the others (or even the final one). It means that the data will arrive later and, therefore, this will be the data stored (wrong one)

What we must do is to stop and clean the previous requests when a new one fires of using a native browser API - Abort Controller.

Each time we have a keystroke the application will re-render and, therefore, the cleanup function will be called, canceling the current request when a new one comes in.

# Globally Listen for a Event

In order to listen for a keystroke event globally, e.g., the solution is to attach a event listener to the entire document.
We can do it on the App Component. However, if we place this effect in the App, we'll listen to the Escape key even if we don't have the movie mounted, which is not ideal, therefore we could move this effect to the MovieDetails Component.

NOTE: Each time a new MovieDetails component mounts, a new event listener is added to the docment (we can see it because of the console.log("closing") added). Therefore, each time this effect is called, it'll add a event listener to the document, meaning if we, after 10 movie details we opened, we'll have the event listener (closing) running 10 times, which is not good for the application. The solution is clear, add a Cleanup Function.
