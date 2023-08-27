import React, { useState, useEffect } from "react";
import "./style.css";
import { red } from "@material-ui/core/colors";

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [suggestedItems, setSuggestedItems] = useState([]);

  // add the items fucnction
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }

    setSuggestedItems([]);
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const handleInputChange = (event) => {
    setInputData(event.target.value);

    if (event.target.value.includes(">")) {
      // Filter previously stored items as suggestions
    //   const filteredSuggestions = items.filter((item) =>
    //     item.name.toLowerCase().includes(inputdata.toLowerCase())
    //   );
      setSuggestedItems(items);
    } else {
      setSuggestedItems([]);
    }
  };

  const selectSuggestedItem = (suggestedItem) => {
    const updatedInputData =
      inputdata.replace('<>', '  <>') + suggestedItem.name;
    setInputData(updatedInputData);
    setSuggestedItems([]);
  };

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });

    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/icon.png" alt="this is img" />
            <figcaption>What's On Your Mind? 🤔</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={handleInputChange}
            />
            {suggestedItems.length > 0 && (
            <ul className="suggested-dropdown">
                {suggestedItems.map((suggestedItem) => (
                <ul className="dpd"
                    key={suggestedItem.id}
                    onClick={() => selectSuggestedItem(suggestedItem)}>
                    {suggestedItem.name}
                </ul>
                ))}
            </ul>
            )}

            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
                
          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id} onClick={() => editItem(curElem.id)}>
                  <h3 className="highlight">{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;