import React from 'react';
import {
  Body,
  Item,
  Icon,
  Input,
} from 'native-base';

class SearchBar extends React.Component {
  static propTypes = {
    filter: React.PropTypes.shape({
      title_search: React.PropTypes.shape({
        value: React.PropTypes.string,
      }),
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      keyword: props.filter.title_search ? props.filter.title_search.value : '',
    };
  }

  shouldComponentUpdate(newProps) {
    return JSON.stringify(newProps.filter) !== JSON.stringify(this.props.filter);
  }

  doNewSearch = () => {
    // TODO: doing new search
  }

  render() {
    return (
      <Body>
        <Item >
          <Icon name="search" />
          <Input
            placeholder="Search"
            value={this.state.keyword}
            onChangeText={text => this.setState({ keyword: text })}
            onBlur={this.doNewSearch}
          />
        </Item>
      </Body>
    );
  }
}

export default SearchBar;
