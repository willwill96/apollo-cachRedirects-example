const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: String
    thumbnailUrl: String
  }

  type Query {
    books: [Book]
    bookById(id: ID!): Book
  }
`

const books = [
  {
    id: '1',
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    thumbnailUrl:
      'https://static.wixstatic.com/media/e873a0_d4bf5dc9efaf45af9ab74b7f7f2f38a9~mv2.jpeg',
  },
  {
    id: '2',
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    thumbnailUrl: 'https://i.ytimg.com/vi/zHalXjs0cDA/hqdefault.jpg',
  },
  {
    id: '3',
    title: 'Hunger Games',
    author: 'Suzanne Collins',
    thumbnailUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51PHNm5MhXL._SX327_BO1,204,203,200_.jpg',
  },
  {
    id: '4',
    title: 'Animal Farm',
    author: 'George Orwell',
    thumbnailUrl:
      'https://kbimages1-a.akamaihd.net/9d88b9bf-e6c5-47ff-afe0-616da33edafb/1200/1200/False/animal-farm-75.jpg',
  },
  {
    id: '5',
    title: 'The War of the Worlds',
    author: 'H.G Wells',
    thumbnailUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91d1CrEh8LL.jpg',
  },
]

const resolvers = {
  Query: {
    books: () => books,
    bookById: (_, args) => books.find(book => book.id === args.id),
  },
}

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })
const app2 = express()
server.applyMiddleware({
  app: app2,
  path: '/',
  cors: {
    origin: 'http://localhost:3000',
  },
})
app.use('/graphql', app2)

// The `listen` method launches a web server.
app.listen(4000)
