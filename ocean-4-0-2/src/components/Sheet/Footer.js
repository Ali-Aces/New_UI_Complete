import React, { useEffect, useContext, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import AlanTalk from "./AlanTalk";
import "../../App.css";
import Sheet from '../../images/1.png';
import Data from '../../images/2.png';
import Dash from '../../images/3.png';
import sty from '../../images/4.png';
import analytics from '../../images/5.png';
import copy from '../../images/Copy.png';
import Paste from '../../images/Paste.png';
import Duplicate from '../../images/Duplicate.png';
import Rename from '../../images/Rename.png'
import {  FaPlusCircle } from "react-icons/fa"; 
const Footer = () => {

  const {
    sheets,
    setSheets,
    dashboards,
    setDashboards,
    storys,
    setStorys,
    matchedUser,
    disableComponenet,
    setDisableComponent,
  } = useContext(GlobalContext);

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedSheet, setSelectedSheet] = useState(null);
  const handleAddSheet = () => {
    console.log("handleAddSheet");
    const newSheet = { name: `sheet${sheets.length}`, workbooks: [], rows: [] };
    setSheets((prev) => [...prev, newSheet]);
  };

  const handleAddDashboard = () => {
    const newDashboard = {
      name: `dashboard${dashboards.length}`,
      graphs: [0, 1, 2, 3, 4, 5],
    };
    setDashboards((prev) => [...prev, newDashboard]);
  };
  const handleAddStory = (index) => {
    const newStory = {
      name: `story${storys.length}`,
      storysPlot: [],
      buttonContain: [],
    };
    setStorys((prev) => [...prev, newStory]);
  };

  const updateSheetname = (e , sheet) => {
    e.preventDefault();
    setSelectedSheet(sheet); // Store the selected sheet
    setContextMenuVisible(true);
    const x = e.clientX;
    const y = e.clientY;
    const contextMenuHeight = 140;
    const topPosition = y - contextMenuHeight;
    setContextMenuPosition({ x, y: topPosition });
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };

  useEffect(() => {
    if (matchedUser === "Basic") {
      setDisableComponent(true);
      document.getElementById("disableFooterStory").style.pointerEvents =
        "none";
      document.getElementById("disableFooterAnalytics").style.pointerEvents =
        "none";
      document.getElementById("disableFooterStory").style.opacity = 0.1;
      document.getElementById("disableFooterAnalytics").style.opacity = 0.1;
    }
    if (matchedUser === "Standard") {
      document.getElementById("disableFooterAnalytics").style.pointerEvents =
        "none";
      document.getElementById("disableFooterAnalytics").style.opacity = 0.1;
    }
    
    // Add a click event listener to the document to close the context menu
    document.addEventListener("click", handleCloseContextMenu);
    
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleCloseContextMenu);
    };
  }, [matchedUser]); // Include matchedUser in the dependencies array

  return (
    <>
      <hr></hr>
      <AlanTalk />
      <div className="footer">
        <button className="footer-button">
          <img src={Sheet} className="icon-footer" />
          <Link to="/Datasource" className="icon-names">Data Source</Link>
        </button>

        {sheets.map((sheet, idx) => (
          <button
            key={idx}
            className="footer-button"
            onContextMenu={updateSheetname}
          >
            <div className="sheet-item">
              <Link
                to={`/Sheet/${sheet.name}`}
              >
                <img src={Data} className="icon-footer" />
                {sheet.name}
              </Link>
            </div>
          </button>
        ))}
        <button onClick={handleAddSheet} >
         
          <FaPlusCircle className="button-plus" id="disableFooterStory" />
        </button>
        {dashboards.map(
          (dashboard, idx) => (
            console.log(dashboards),
            (
              <button key={idx} className="footer-button">
                <Link to={`/dashboard/${dashboard.name}`}>
                  <img src={Dash} className="icon-footer" />
                  {dashboard.name}
                </Link>
              </button>
            )
          )
        )}
        <button onClick={handleAddDashboard} disabled={disableComponenet}>
          <FaPlusCircle className="button-plus" id="disableFooterStory" />
        </button>
        {storys.map((story, idx) => (
          <button key={idx} disabled={disableComponenet} className="footer-button">
            <Link to={`/story/${story.name}`} id="disableFooterStory">
              <img src={sty} className="icon-footer" />
              {story.name}
            </Link>
          </button>
        ))}
        <button onClick={handleAddStory} disabled={disableComponenet}>
          <FaPlusCircle className="button-plus" id="disableFooterStory" />
        </button>
        <button disabled={disableComponenet} className="footer-button">
          <Link to={"/AnalyticsMain"} id="disableFooterAnalytics">
            <img src={analytics} className="icon-footer" />
            Analytics
          </Link>
        </button>
      </div>
      {contextMenuVisible && (
        <div
          className="context-menu"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          {/* Context menu content */}
          <div><img src={copy}  style={{height:"15px",width:"15px"}} />Copy</div>
          <div><img src={Paste}  style={{height:"15px",width:"15px"}} />Paste</div>
          <div><img src={Duplicate}  style={{height:"15px",width:"15px"}} />Duplicate</div>
          <div><img src={Rename}  style={{height:"15px",width:"15px"}} />Rename</div>
        </div>
      )}
      <hr></hr>
    </>
  );
};

export default Footer;
