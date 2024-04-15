import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({expense, userId})=> {
    const [hideModal, setHideModal] = useState("");
    const navigate = useNavigate();
    const budgetId = expense.budget;

    const deleteExpense = async (id) => {
      try {
        const response = await fetch(
          `/expenses/${id}/delete`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId
            })
          }
        );
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error("Error:", error);
        return { error: error.message };
      }
    }
    const handleDelete = async(id, event) => {
      //event.preventDefault();
      const result = await deleteExpense(id.toString());
      const toastId = "delete";
      if (result.status !== 200) {
        // setStatus("idle");
        toast.error(result.message, {
          type: "error",
          position: "top-right",
          autoClose: false,
          closeOnClick: true,
          transition: Bounce,
          toastId,
        });
        //setErrorText(result.message || result.error);
      } else {
        toast.success(result.message, {
          type: "success",
          position: "top-center",
          autoClose: 1000, //1 seconds
          toastId,
          transition: Slide,
        });
        setTimeout(() => {
          //setHideModal(true);
          navigate(`/budgets/${budgetId}/expenses`);
        }, 1500);
      }
    }
return(
    <>
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Delete {expense.itemName} ?</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      Are you sure you want to delete {expense.itemName}? 
      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={()=> handleDelete(expense._id)}>Yes</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>
<ToastContainer className="deleteModalToast" autoClose={1500}/>
</>
)
}

export default Modal;