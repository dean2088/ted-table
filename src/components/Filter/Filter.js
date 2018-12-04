import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';

export default class Table extends React.Component {
  static propTypes = {
    inputList: PropTypes.array,
  };

  static defaultProps = {
    inputList: [{
      label: 'Title',
      id: 'title',
      type: 'text'
    }, {
      label: 'Author',
      id: 'author',
      type: 'text'
    }, {
      label: 'ISBN',
      id: 'isbn',
      type: 'number'
    }],
  };

  constructor(props) {
    super(props);
    this.state = {
      inputs: {}
    };
  }

  handleInputChange = (e) => {
    const { id, value } = e.currentTarget;
    this.setState({
      inputs: {
        ...this.state.inputs,
        [id]: value
      }
    });
  };

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.state.inputs);
    }
  };

  render() {
    const {
      inputList
    } = this.props;

    const {
      inputs
    } = this.state;

    return (
      <div className={'row ' + styles.filter}>
        {inputList.map(item => (
          <div key={item.id} style={{ width: (960 - 70) / inputList.length }}>
            <label htmlFor={item.id}>{item.label}</label>
            <input type={item.type} className="form-control" id={item.id} onChange={this.handleInputChange} value={inputs[item.id] || ''} />
          </div>
        ))}
        <div className={styles.btnContainer}>
          <button type="button" className="btn btn-primary" onClick={this.handleClick}>
            Filter
          </button>
        </div>
      </div>
    );
  }
}
