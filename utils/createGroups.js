/**
 * divides eaters among restaurants
 * @param eaters array of ids
 * @param restaurants array of ids
 * @param _maxGroupSize (Optional): maximum group size
 * @returns created groups
 */

const createGroups = (eaters, restaurants, _maxGroupSize) => {
    const maxGroupSize = _maxGroupSize === undefined ? 7 : _maxGroupSize;
    const nRestaurants = restaurants.length;

    if (maxGroupSize === undefined) {
        maxGroupSize = 7;
    }

    // The number of groups necessary to ensure that group size is maximized
    // while staying at or below the maxGroupSize
    const nGroups = Math.ceil(eaters.length / maxGroupSize);

    // Create the necessary groups
    let groups = [];
    for (let i = 0; i < nGroups; i++) {
        groups.push({
            leader: "",
            eaters: [],
            restaurant: "",
        });
    }

    // Assign restaurants to groups
    if (nGroups < nRestaurants) {
        // If we have more restaurantes than groups, we only take the
        // restaurants we need
        const chosenRestaurants = restaurants.slice(0, nGroups);

        chosenRestaurants.forEach((restaurant, i) => {
            groups[i].restaurant = restaurant;
        });
    } else {
        // If not, we repeat restaurants until we have enough for all the
        // groups. This also works when we have the same number of groups
        // and restaurants
        groups.forEach((group, i) => {
            group.restaurant = restaurants[i % nGroups];
        });
    }

    // Assign eaters to groups
    eaters.forEach((eater, i) => {
        groups[i % nGroups].eaters.push(eater);
    });

    // Assign leaders to each group
    groups.forEach((group) => {
        const leaderIndex = Math.floor(Math.random() * group.eaters.length);

        group.leader = group.eaters[leaderIndex];
    });

    return groups;
};

module.exports = createGroups;
