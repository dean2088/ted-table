import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';
import { connect } from 'react-redux';
import { bindActions } from 'helpers/bindDispatch';

import Filter from 'components/Filter/Filter';
import Table from 'components/Table/Table';

//redux
import {
  load,
} from 'redux/modules/me';

@connect(state => ({
  books: state.me.result
}), bindActions({
  load
}))
export default class Home extends React.Component {

  static propTypes = {
    load: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: {}
    };

    this.sizeOrder = ['XS', 'S', 'M', 'L', 'XL'];
  }

  componentWillMount() {
    this.props.load();
  }

  handleFilterChange = (filter) => {
    this.setState({
      filter
    });
  };

  render() {
    const { books } = this.props;
    const { filter } = this.state;

    return (
      <div className={'container ' + styles.body}>
        <Filter onClick={this.handleFilterChange} />
        <Table list={books} {...filter} />
      </div>
    );
  }
}
