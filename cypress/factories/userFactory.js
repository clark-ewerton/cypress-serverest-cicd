import { faker } from '@faker-js/faker/locale/en';

export class UserFactory {
  // Valid user
  static validUser() {
    return {
      email: `${faker.name.firstName().toLowerCase()}@${faker.internet.domainName()}`,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      username: `${faker.name.firstName().toLowerCase()}${faker.internet.userName()}`,
      password: faker.internet.password(),
    };
  }

  // User with invalid email format
  static invalidEmailUser() {
    return {
      email: 'invalid-email', // Invalid email format
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      username: faker.name.firstName().toLowerCase(),
      password: faker.internet.password(),
    };
  }

  // User with missing required fields (e.g., missing email)
  static userWithMissingFields() {
    return {
      email: '', // Missing email field
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      username: faker.name.firstName().toLowerCase(),
      password: faker.internet.password(),
    };
  }

  // User with a simple password (invalid password example)
  static userWithSimplePassword() {
    return {
      email: `${faker.name.firstName().toLowerCase()}@${faker.internet.domainName()}`,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      username: faker.name.firstName().toLowerCase(),
      password: '123', // Simple password
    };
  }

  // User with an already registered email (simulating a conflict)
  static userWithExistingEmail() {
    return {
      email: 'existinguser@example.com', // Fixed email (you can replace it with an actual existing email in your system)
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      username: faker.name.firstName().toLowerCase(),
      password: faker.internet.password(),
    };
  }
}
