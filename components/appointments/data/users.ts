import { faker } from "@faker-js/faker";

export const users = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    username: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    serviceType: faker.helpers.arrayElement(["birthing", "clinic"]),
    status: faker.helpers.arrayElement([
      "pending",
      "completed",
      "confirmed",
      "cancelled",
    ]),
    scheduledAt: faker.date.recent(),
    scheduledTime: faker.date.recent(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});
