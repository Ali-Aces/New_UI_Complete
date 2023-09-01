import React, { useContext, useRef, useState } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import Footer from "../Sheet/Footer";
import Header from "../Headers/Header";
import { pickBy, keys, max, isEmpty } from "lodash";
import StoryPlot from "./StoryPlot";
import { useEffect } from "react";
import Sidebar from "../SideBar/Sidebar";
import { FaFont,FaSync,FaArrowRight, FaArrowLeft,FaFilePdf,FaSave,} from "react-icons/fa";
import { text } from "@fortawesome/fontawesome-svg-core";
import save from '../../images/Save.png';
import sync from '../../images/Refresh.png';
import left from '../../images/left.png';
import right from '../../images/right.png';
import pdf from '../../images/PDF.png';
import add from '../../images/Add.png';
import Delete from '../../images/Delete.png';
//Second commit
const Story = () => {
  const dragItem = useRef();
  // const [selected, setSelected] = useState();

  const {
    sheets,
    dashboards,
    storys,
    setStorys,
    selectedStory,
    setSelectedStory,
    selected,
    setSelected,
  } = useContext(GlobalContext);

  const storyParam = useParams().story;

  const handleDrop = (index) => {
    const dragSheet = dragItem.current;
    console.log(dragItem, dragSheet);
    const updatedStory = storys.find((story) => story.name === storyParam);
    console.log(updatedStory);
    updatedStory.buttonContain[index] = dragSheet;
    const tempStorys = storys.map((story) =>
      story.name === storyParam ? updatedStory : story
    );
    setStorys(tempStorys);
    setSelectedStory(storys.find((s) => s.name === storyParam));
  };
  function handleAddContainer() {
    const updatedStory = storys.find((story) => story.name === storyParam);
    console.log(updatedStory);
    updatedStory.buttonContain.push(updatedStory.buttonContain.length);
    const tempStorys = storys.map((story) =>
      story.name === storyParam ? updatedStory : story
    );
    setStorys(tempStorys);
  }
  console.log(selected, selectedStory?.buttonContain);
  useEffect(() => {
    setSelectedStory(storys.find((s) => s.name === storyParam));
  }, [storyParam, selectedStory]);
  return (
    <>
      <Header />
      <Sidebar />
      <div className="storyPage">
        <div className="SheetNames">
          <p style={{ fontSize: "18px", padding: "8px", textAlign: "center" }}>
            Story
          </p>
          <hr></hr>
          <br></br>
          {sheets.map((sheet, index) => (
            <p
              key={index}
              className="sheetName"
              style={{
                width: "auto",
                height: "25px",
                padding: "5px",
                margin: "3px",
                // background: "#5d6d7e",
                fontSize: "12px",
                color: "black",
              }}
              draggable
              onDragStart={() => (dragItem.current = sheet)}
            >
              {sheet.name}
            </p>
          ))}
          {dashboards.map((dashboard, index) => (
            <p
              key={index}
              className="sheetName"
              style={{
                width: "auto",
                height: "25px",
                padding: "5px",
                margin: "3px",
                // background: "#5d6d7e",
                color: "black",
                fontSize: "12px",
              }}
              draggable
              onDragStart={() => (dragItem.current = dashboard)}
            >
              {dashboard.name}
            </p>
          ))}
        </div>

        <div className="StoryContainer">
          <div className="StoryContainerBtn">
          
           {/* <p
              className="sheetName"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "15px",
                textTransform: "uppercase",
                width: "100px",
              }}
            >
              {storyParam}
            </p>*/}
            
            {/* <Scrollbars style={{ width: 600, height: 80 }}> */}
            
            <div className="editing-button">
           
            <FaFont className="editing-icons"/>
            <img src={sync} className="editing-icons" />
            <img src={left} className="editing-icons" />
            <img src={right} className="editing-icons" /> 
            <img src={pdf} className="editing-icons" /> 
            <img src={save} className="editing-icons" />
            <img src={add} className="editing-icons" />
            <img src={Delete} className="editing-icons" />
            </div>
            <div className="story">
            <div className="StoryContainerPlot">
            {/* <div>{renderGraphs(storys)}</div> */}
            {selectedStory && selected && (
              <StoryPlot selectedStory={selectedStory} selected={selected} />
            )}
            
          </div>
            {/* </Scrollbars> */}
          </div>
          
          <div className="storyDisplay">
         
              {storys.find((story) => story.name === storyParam) &&
                selectedStory?.buttonContain.map((sheet, index) => (
                  <div
                    droppable
                    onDrop={() => handleDrop(index)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <button
                      key={index}
                      onClick={() => setSelected(sheet.name)}
                      className="storyDropBlock"
                    >
                      {sheet.name}
                    </button>
                  </div>
                ))}
              
              <button
                onClick={handleAddContainer}
                className="Story-Container-Btn"
              >
                Add Here
              </button>
              
            </div>
            </div>
        </div>
      </div>

      <Footer handleAddContainer={handleAddContainer} />
    </>
    
  );
};
export default Story;
