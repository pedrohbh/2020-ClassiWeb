export const UserServiceDoc = {
  tag: {
    name: 'User',
    description: 'Endpoints',
  },

  definitions: {
    User: {
      name: 'Jhon Doe',
      age: 29,
      diplomas: [
        {
          school: 'XYZ University',
          year: 2020,
          completed: true,
          internship: {
            hours: 290,
            location: 'XYZ Company',
          },
        },
      ],
    },
  },
};
