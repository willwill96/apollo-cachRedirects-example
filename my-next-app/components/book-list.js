import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import BookDescription from './book-description'
const query = gql`
  query {
    books {
      id
      author
      title
      thumbnailUrl
    }
  }
`

const Book = props => {
  const { book } = props
  const [open, setOpen] = useState(false)
  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <BookDescription bookId={book.id} />
      </Dialog>
      <Card
        onClick={() => setOpen(true)}
        style={{
          margin: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          width: 120,
        }}
      >
        <CardActionArea style={{ height: '100%', width: '100%' }}>
          <CardMedia>
            <img
              style={{ height: 200, width: '100%' }}
              src={book.thumbnailUrl}
            />
          </CardMedia>
          <Typography
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 12,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
            title={book.title}
          >
            {book.title}
          </Typography>
        </CardActionArea>
      </Card>
    </React.Fragment>
  )
}

const BookList = () => {
  const { data } = useQuery(query)
  if (!data || !data.books) return null
  const books = data.books
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {books.map(book => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  )
}
export default BookList
