import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);

  const getFileType = (url) => {
    // This function determines the file type based on the file extension
    const extension = url.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "bmp", "webp"].includes(extension)) {
      return "image";
    } else {
      // You can add more cases here for different file types
      return "other"; // Default to 'other' for non-image types
    }
  };

  const renderFile = (url, index) => {
    const type = getFileType(url);
    if (type === "image") {
      return (
        <div className="file-item" key={`file-item-${index}`}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={url} alt="file" className="file-image" />
          </a>
        </div>
      );
    } else {
      return (
        <div className="file-item" key={`file-item-${index}`}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="file-link"
          >
            <span className="file-icon" role="img" aria-label="file">
              📄
            </span>
            <button class="download-text">Download &#x2B07; </button>
          </a>
        </div>
      );
    }
  };

  const getdata = async () => {
    let dataArray = [];
    const otherAddress = document.querySelector(".address").value;
    try {
      if (otherAddress) {
        dataArray = (await contract.display(otherAddress)) || [];
      } else {
        dataArray = (await contract.display(account)) || [];
        console.log(dataArray);
      }
    } catch (e) {
      console.error("Error showing the data:", e);
      alert("You don't have access.");
      setData([]);
      return;
    }

    // Now we can safely check the length since dataArray is guaranteed to be an array
    if (dataArray.length > 0) {
      const files = dataArray.map((item, i) => renderFile(item, i));
      setData(files);
    } else {
      alert("No File to Display");
      setData([]);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
      <div className="file-list">{data}</div>
    </>
  );
};

export default Display;
