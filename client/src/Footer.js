import moment, { now } from "moment";

const Footer = () => {
    const year = moment().year();
    return(
      <div className="container" style={{marginTop: "180px"}}>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top" style={{marginTop: "35vh !important"}}>
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-body-secondary">&copy; {year} Jasminder Kaur</span>
        </div>
      </footer>
      </div>
    )
}

export default Footer;