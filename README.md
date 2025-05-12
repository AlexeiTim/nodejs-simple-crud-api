# Node.js Simple CRUD API

A RESTful API built with Node.js and TypeScript that provides CRUD (Create, Read, Update, Delete) operations. This project demonstrates best practices in building scalable and maintainable Node.js applications.

## Features

- TypeScript support
- RESTful API endpoints
- Environment configuration with dotenv
- Logging with Winston
- UUID generation for unique identifiers
- Jest testing framework
- ESLint and Prettier for code formatting
- Multi-process support with Node.js cluster

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AlexeiTim/nodejs-simple-crud-api.git
cd nodejs-simple-crud-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and configure your environment variables:

```env
PORT=4000
NODE_ENV=development
```

## Available Scripts

- `npm run start:dev` - Start the development server with hot-reload
- `npm run build` - Build the TypeScript project
- `npm run start:prod` - Start the production server
- `npm run start:multi` - Start the server in cluster mode
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
├── src/              # Source files
├── node_modules/     # Dependencies
├── package.json      # Project configuration
├── tsconfig.json     # TypeScript configuration
└── .env             # Environment variables
```

## Testing

The project uses Jest as the testing framework. Run tests using:

```bash
npm test
```

For watching mode:

```bash
npm run test:watch
```

For coverage report:

```bash
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Alexei Tim

## Support

If you encounter any issues, please open an issue in the [GitHub repository](https://github.com/AlexeiTim/nodejs-simple-crud-api/issues).
