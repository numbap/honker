const Paginator = ({pages, currentPage, onClick}) => {
    let numButtons = []

    for(let i = 1; i <= pages; i++) {
        numButtons.push(<li className={`page-item ${currentPage == i && 'active'}`} onClick={() => onClick(i)} key={i} ><a className="page-link" href="#">{i}</a></li>)
    }
    return (

        <ul className="pagination justify-content-center">
          {(currentPage > 1) && (<li className="page-item">
            <a className="page-link" href="#" tabindex="-1" onClick={() => onClick(currentPage -1)} >Previous</a>
          </li>)}
          {
            numButtons.map(x => x)
          }
          {(currentPage < pages) && (<li className="page-item">
            <a className="page-link" href="#" onClick={() => onClick(currentPage + 1)} >Next</a>
          </li>)}
        </ul>

    )
}

export default Paginator