import { FunctionComponent } from 'preact/'
import { Link } from 'react-router-dom'

type Props = {
  homePage: boolean
}

const Navigation: FunctionComponent<Props> = ({ homePage }) => (
  <div className="navigation-container">
    <span className="background" />
    <span className="navigation-items" id="resultsNav">
      {homePage ? (
        <Link to={'/favourites'} className="clickable">
          <h3>{'Favourites'}</h3>
        </Link>
      ) : (
        <Link to={'/'} className="clickable">
          <h3>{'Home'}</h3>
        </Link>
      )}
    </span>
  </div>
)

export default Navigation
