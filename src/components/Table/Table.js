import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';

export default class Table extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    isbn: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
  };

  static defaultProps = {
    list: [],
    isbn: '',
    title: '',
    author: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'isbn'
    };
  }

  handleFilter = (item) => {
    let result = true;
    if (this.props.isbn !== '') {
      result = (item.isbn + '').toLowerCase().indexOf((this.props.isbn + '').toLowerCase()) > -1;
    }

    if (this.props.title !== '') {
      result = result && ((item.title + '').toLowerCase().indexOf((this.props.title + '').toLowerCase()) > -1);
    }

    if (this.props.author !== '') {
      result = result && ((item.author + '').toLowerCase().indexOf((this.props.title + '').toLowerCase()) > -1);
    }

    return result;
  };

  handleSortClick = (e) => {
    const { id } = e.currentTarget;
    this.setState({
      sortBy: id
    });
  };

  handleSortList = (a, b) => {
    const { sortBy } = this.state;
    if(a[sortBy] < b[sortBy]) { return -1; }
    if(a[sortBy] > b[sortBy]) { return 1; }
    return 0;
  };

  render() {
    const {
      list
    } = this.props;

    return (
      <div className={styles.table + ' row'}>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col" onClick={this.handleSortClick} id="isbn">ISBN</th>
              <th scope="col" onClick={this.handleSortClick} id="title">Title</th>
              <th scope="col" onClick={this.handleSortClick} id="author">Author</th>
              <th scope="col" onClick={this.handleSortClick} id="pages">Pages</th>
            </tr>
          </thead>
          <tbody>
            {list.filter(this.handleFilter).sort(this.handleSortList).map((item, i) => (
              <tr key={i}>
                <th>{item.isbn}</th>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.pages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
