# Cabify test

The main task of this challenge was to create groups of people and distribute
them among restaurants.

This project holds all the necessary components to achieve this goal.

[Code repository][2]

## Tech stack

-   Express
-   NodeJS
-   MongoDB (using mongoose)

## Decisions made

Below are some features of this project that were not in the main requirements

### Extensive unit tests

Since the core functionality (creating the groups) is quite complex, unit
testshave been written to ensure that all edge cases are covered. The tests
have been written using the [jest][1] framework.

### Variable group size

Considering that maximum group size is rather arbitrary, it is now an optional
parameter that can be included when creating groups, overriding the default of
7

## Project structure

### Models

| Model      | Description                                 |
| ---------- | ------------------------------------------- |
| Eater      | has a name and an email                     |
| Restaurant | has a name and an address                   |
| Grop       | has a leader, some eaters, and a restaurant |

### Routes

| Route                 | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| `POST /eaters`        | Creates a new Eater                                             |
| `GET /eaters`         | Returns a list of all the eaters                                |
| `DELETE /eaters`      | Removes all the eaters and restaurants registered in the system |
| `POST /restaurants`   | Creates a new Restautant                                        |
| `GET /restaurants`    | Returns a list of all the eaters                                |
| `POST /create_groups` | Creates a new Group                                             |
| `GET /create_groups`  | Returns a list of all the Gropus                                |

### Utils

#### `createGroups`

The function `createGroups` takes three arguments: `eaters`, `restaurants`
and `groupSize` .

-   eaters: an array of eaters
-   restaurants: an array restaurants
-   groupSize (optional): maximum group size

The function works in the following way

1. Calculate the number of groups needed to have the largest groups possible
   while staying at or below the max group size. Assign restaurants to each
   group
    - If there are more restaurants than needed for the number of groups
      calculated, some restaurants are omitted
    - If there are not enough restaurants to cover all the groups, some of
      them will be re-used until all groups are covered
2. Assign eaters equally among the groups. The way this is achieved is by
   sending a single eater to each group, as if they were cards being dealt to
   players. This ensures that the size difference between any two groups will
   at most be one.
3. Finally a random eater of each group is selected as its leader

[1]: https://jestjs.io/
[2]: https://github.com/GabrielaBenalcazar/cabify
