import { useEffect } from 'react'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <React.Fragment>
      <Component {...pageProps} />{' '}
      <style jsx global>{`
        body,
        html {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
    </React.Fragment>
  )
}
export default MyApp
