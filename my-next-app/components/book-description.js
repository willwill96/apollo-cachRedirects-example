import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
const query = gql`
  query BookById($id: ID!) {
    bookById(id: $id) {
      id
      title
      author
      thumbnailUrl
    }
  }
`

const BookDescription = props => {
  const { bookId: id } = props
  const { data } = useQuery(query, {
    variables: {
      id,
    },
  })
  if (!data || !data.bookById.id) {
    return null
  }
  return (
    <React.Fragment>
      <DialogTitle>{data.bookById.title}</DialogTitle>
      <DialogContent style={{ margin: 'auto' }}>
        <img
          src={data.bookById.thumbnailUrl}
          style={{ height: 250, width: 150 }}
        />
      </DialogContent>
      <Typography style={{ margin: 'auto' }} variant="h5">
        Details
      </Typography>
      <Divider />
      <div style={{ padding: 5 }}>
        <div style={{ float: 'left' }}>Author:</div>
        <div style={{ float: 'right' }}>{data.bookById.author}</div>
      </div>
    </React.Fragment>
  )
}
export default BookDescription
