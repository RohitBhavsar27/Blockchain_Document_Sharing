import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [address, setAddress] = useState(""); // For sharing access

  // Function to share access
  const sharing = async () => {
    try {
      await contract.allow(address);
      alert("Access granted successfully.");
      setAddress(""); // Clear input after sharing
      // Optionally refresh the list of addresses with access here
    } catch (error) {
      console.error("Error sharing access:", error);
      alert("Failed to share access.");
    }
    setModalOpen(false);
  };

  // Function to revoke access
  const revokeAccess = async () => {
    try {
      await contract.disallow(address);
      alert("Access revoked successfully.");
      setAddress(""); // Clear input after revoking
      // Optionally refresh the list of addresses with access here
    } catch (error) {
      console.error("Error revoking access:", error);
      alert("Failed to revoke access." || "");
    }
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      select.innerHTML = ""; // Clear existing options
      addressList.forEach((address) => {
        let option = document.createElement("option");
        option.value = address;
        option.textContent = address;
        select.appendChild(option);
      });
    };

    if (contract) {
      accessList();
    }
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title"><h4>Access Control</h4></div>
          <div className="body">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address to Share"
              className="address"
            />
          </div>
          <form id="myForm">
            <select id="selectNumber" className="custom-select">
              <option disabled>People With Access</option>
            </select>
          </form>

          <div className="footer">
            <button onClick={() => setModalOpen(false)} id="cancelBtn">
              Cancel
            </button>
            <button onClick={sharing} id="shareBtn">Share</button>
            <button onClick={revokeAccess} id="revokeBtn">Revoke</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
