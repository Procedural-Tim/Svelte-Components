# Vision

An easy to use web based data visualization and transformation library built by Svelte kit and using the Svelte framework.

# Philosophy (not fully implemented)

- All components should out put a data set, a data set is defined as an array of values containing an x, y, and maybe z as well as metadata.
- Components should allow access to the raw HTML elements when possible and only use library specific concepts when not possible. IE fo pie chart I will expose the slice elements so users can add attributes to the underlying path elements.
- I am not a designer, I leave that to you. By exposing raw elements and styled elements when possible, the developer can style the components freely without having to over wright existing library styles.

# Components

## Data Source Components

Components used to generate data sets.

- Table (concept)
- JSON (concept)

## Transformers

Components that take in data sets and perfom some kind of transformation on them

- Filter (concept)
- Mapper (concept)

## Visualizations

Components that take in data sets and produce a visualization of that data.

- Bar graph (pre-alpha)
- Line graph (pre-alpha)
- Pie graph (pre-alpha)
- Mosaic graph (pre-alpha)
- Scatter (concept)
- Bubble (concept)
- Pyramids (concept)
- Box (concept)
- Spider (concept)

## Common

Common UI components will be listed as they are developed, IE buttons, layouts, etc.
