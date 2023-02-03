# Restaurant Ordering and Payment management System

This is a backend project for a restaurant ordering and payment management system. It is built using Node.js, Express.js, MongoDB and Mongoose. It is a REST API that can be used to create, read, update and delete data from the database.

## Installation

Use Docker to install the project.

```bash
sudo docker-compose build
```

## Usage

```bash
sudo docker-compose up
```

## API Endpoints

### Authentication

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| POST   | /auth/register | Register a user |
| GET    | /auth/otp      | Get OTP         |
| POST   | /auth/login    | Login a user    |

### Cuisine

| Method | Endpoint                       | Description                              |
| ------ | ------------------------------ | ---------------------------------------- |
| POST   | /cuisine/create                | Create a new cuisine                     |
| GET    | /cuisine/restaurant/:id        | Get restaurant cuisines                  |
| GET    | /cuisine/dishes/restaurant/:id | Get restaurant dishes ordered by cuisine |

### Dishes

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | /dishes/create         | Create a new dish         |
| GET    | /dishes/restaurant/:id | Get all restaurant dishes |

### Orders

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | /order/create        | Create an order     |
| PUT    | /order/update/status | Update order status |
| GET    | /order/get/:id       | Get an order        |
| GET    | /order/user/:id      | Get user orders     |
| GET    | /order/              | Get all orders      |

### Payment

| Method | Endpoint     | Description  |
| ------ | ------------ | ------------ |
| POST   | /payment/add | Add payment  |
| GET    | /payment/    | Get payments |

### QR

| Method | Endpoint     | Description |
| ------ | ------------ | ----------- |
| GET    | /qr/generate | Generate QR |

### Restaurant

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /restaurant/create | Create a restaurant |
| GET    | /restaurant/       | Get all restaurants |

### Table

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| POST   | /table/create | Create a new table |

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[Rishab Gaddi](https://rishabgaddi.github.io/)
