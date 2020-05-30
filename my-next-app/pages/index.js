import { withApollo } from '../lib/apollo'

import BookList from '../components/book-list'

const Page = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(11, 24, 33, 1)',
      }}
    >
      <div
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 22,
          padding: 20,
        }}
      >
        Books (click to view more)
      </div>
      <BookList />
    </div>
  )
}

export default withApollo({ ssr: false })(Page)
