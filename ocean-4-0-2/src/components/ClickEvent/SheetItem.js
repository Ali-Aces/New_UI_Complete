import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Data from '../../images/2.png';
class SheetItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      newName: this.props.sheet.name,
    };
  }

  handleDoubleClick = () => {
    this.setState({ isEditing: true });
  };

  handleChange = (event) => {
    this.setState({ newName: event.target.value });
  };

  handleBlur = () => {
    // You can add logic here to save the new sheet name
    // For example, call an API to update the sheet name on the server
    this.setState({ isEditing: false });
  };

  render() {
    const { sheet } = this.props;
    const { isEditing, newName } = this.state;

    return (
      <button className="footer-button">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        ) : (
          <Link to={`/Sheet/${sheet.name}`} onDoubleClick={this.handleDoubleClick}>
            <img src={Data} className="icon-footer" />
            {sheet.name}
          </Link>
        )}
      </button>
    );
  }
}

export default SheetItem;
