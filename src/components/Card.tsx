type Props = {
  hdurl: string
  url: string
  title: string
  explanation: string
  date: string
  copyright: string
  favourites?: boolean
  onClick: any
}

const Card = ({
  hdurl,
  url,
  title,
  explanation,
  date,
  copyright,
  favourites = false,
  onClick,
}: Props) => (
  <div class="card">
    <a href={hdurl} target="__blank">
      <img class="card-img-top" src={url}></img>
    </a>
    <div class="card-body">
      <h5 class="card-title">{title}</h5>
      <p class="clickable" onClick={() => onClick(url)}>
        {!favourites ? 'Add To Favorites' : 'Remove From Favourites'}
      </p>
      <p>{explanation}</p>
      <small class="text-muted">
        <strong>{`${date} `}</strong>
        <span>{copyright}</span>
      </small>
    </div>
  </div>
)

export default Card
