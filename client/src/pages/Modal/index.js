import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Modal = ({expense, userId})=> {
  console.log("expenseTodelete", expense)
    console.log("modal rendered");
    const [hideModal, setHideModal] = useState("");

    const deleteExpense = async (id) => {
      console.log(id);
      console.log(userId);
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
      if (result.status !== 204) {
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
          autoClose: 4000, //4 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId,
          transition: Slide,
        });
        setTimeout(() => {
          navigate(`/budgets/${budgetId}/expenses`);
        }, 4500);
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
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary" onClick={()=> handleDelete(expense._id)}>Yes</button>
      </div>
    </div>
  </div>
</div>
<ToastContainer/>
</>
)
}

export default Modal;