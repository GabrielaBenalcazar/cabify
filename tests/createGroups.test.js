const createGroups = require("../utils/create-group");

test("2 personas 1 restaurante - un grupo de 2", () => {
    const people = ["a", "b"];
    const restaurants = ["x"];
    const groupIndex = 7
    const groups = createGroups(people, restaurants, groupIndex);

    console.log(groups);

    expect(groups.length).toBe(1);
    expect(groups[0].eaters.length).toBe(2);
    expect(groups[0].restaurant).toBe("x");
});
test("los grupos no sean mayores de 7", () => {
    const people = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];
    const restaurants = ["x", "y", "z"];
    const groupIndex = 7;
    const groups = createGroups(people, restaurants, groupIndex);

    groups.forEach((group) => {
        expect(group.eaters.length).toBeLessThanOrEqual(7);
    });
});
test("los grupos deben tener mas o menos la misma cantidad de gente 10 eaters 2 restaurantes ", () => {
    const people = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];
    const restaurants = ["x", "y"];
    const groupIndex = 7;
    const groups = createGroups(people, restaurants, groupIndex);

    groups.forEach((group) => {
        expect(group.eaters.length).toBe(5);
    });
});
test("los grupos deben tener mas o menos la misma cantidad de gente 9 eaters 2 restaurantes ", () => {
    const people = ["a", "a", "a", "a", "a", "a", "a", "a", "a"];
    const restaurants = ["x", "y"];
    const groupIndex = 7;
    const groups = createGroups(people, restaurants, groupIndex);

    expect(groups[0].eaters.length).toBe(5);
    expect(groups[1].eaters.length).toBe(4);
});
test("Each group will have a leader that will make the reservation.", () => {
    const people = ["a", "b", "c", "d", "e", "f", "f", "h", "i"];
    const restaurants = ["x", "y"];
    const groupIndex = 7;
    const groups = createGroups(people, restaurants, groupIndex);

    groups.forEach((group) => {
        expect(people.includes(group.leader)).toBe(true);
    });
});
