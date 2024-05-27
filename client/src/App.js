import "./App.css";
import React from "react";
import metamaskIcon from './components/icon.png';
import videobg from "./components/video/video.mp4"
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
const ethers = require("ethers");

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const wallet = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = (await signer).address;
        setAccount(address);
        let contractAddress = "0xdE595f2E9Cc6c599aD76D7F6e3cDaCCa1bbE0735";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(signer);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && wallet();
  }, []);

  return (
    <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
      {/* only this added */}
      <div className="video-container">
        <video src={videobg} autoPlay loop muted />

      </div>

      <div className="App">
        <h1 style={{ color: "white" }}>Sharesphere</h1>

        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>

      <div>
        <p id="account" style={{ color: "white" }}>
          <img
            src={metamaskIcon}
            alt="MetaMask Icon"
            style={{ width: '22px', marginRight: '8px', verticalAlign: 'middle' }} />
          Account: {account ? account : "Not connected"}
        </p>
      </div>



    </>
  );
}

export default App;
// 0xD80CebD65a93B0E35fC1532Ab98cC93cE1a88B63