import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();

    return(<div className="px-4 py-5 my-5 text-center">
    <img className="d-block mx-auto mb-4" src="../assets/heroSectionImage.jpg" alt="" width="22vh" height="15vh"/>
    <h1 className="display-5 fw-bold text-body-emphasis">Want to spend money responsibly? </h1>
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">Expenses Tracker is the solution! Track your monthly budget and expenses by using this simple tool. </p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={()=> navigate('/signUp')}>Register Now!</button>
        <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={()=> navigate('/signIn') }>Already have an account</button>
      </div>
    </div>
  </div>)
}

export default Homepage;