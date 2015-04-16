var React = require('react');
var assign = require('object-assign');
var escapeRegExp = require('./utils/escapeRegExp');

var CATALOG = [
  {
    categoryName: 'Sporting Goods',
    products: [
      { id: 1, name: 'Basketball', price: 4000, quantity: 0 },
      { id: 2, name: 'Boxing Gloves', price: 3500, quantity: 3 },
      { id: 3, name: 'Baseball', price: 1000, quantity: 0 }
    ]
  },
  {
    categoryName: 'Pets',
    products: [
      { id: 4, name: 'Gerbil', price: 500, quantity: 0 },
      { id: 5, name: 'Goldfish', price: 300, quantity: 3 },
      { id: 6, name: 'Parakeet', price: 2000, quantity: 2 }
    ]
  }
];

var cellStyle = {
  padding: 10
};

var headerCellStyle = assign({}, cellStyle, {
  textAlign: 'left'
});

var PropTypes = {
  product: React.PropTypes.shape({
    name: React.PropTypes.string,
    price: React.PropTypes.number,
    quantity: React.PropTypes.number
  })
};

PropTypes.productCategory = React.PropTypes.shape({
  categoryName: React.PropTypes.string,
  products: React.PropTypes.arrayOf(PropTypes.product)
});

PropTypes.productCatalog = React.PropTypes.arrayOf(PropTypes.productCategory);

var CategoryRow = React.createClass({
  propTypes: {
    productCategory: PropTypes.productCategory
  },
  render() {
    return (
      <tr>
        <th colSpan="2" style={{textAlign: 'left', padding: 10}}>
          {this.props.productCategory.categoryName}
        </th>
      </tr>
    );
  }
});

var ProductRow = React.createClass({
  propTypes: {
    product: PropTypes.product
  },
  render() {
    var { name, price } = this.props.product;

    return (
      <tr>
        <td style={{padding: 10}}>{name}</td>
        <td style={{padding: 10}}>${price/100}</td>
      </tr>
    );
  }
});

var FilterableProductTable = React.createClass({
  propTypes: {
    productCatalog: PropTypes.productCatalog,
    filterBy: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      filterBy: ''
    };
  },
  render() {
    var matcher = new RegExp(escapeRegExp(this.props.filterBy), 'i');

    var rows = [];

    this.props.productCatalog.forEach(function (productCategory) {
      var productRows = [];

      productCategory.products.forEach(function (product) {
        if (matcher.test(product.name))
          productRows.push(<ProductRow key={product.id} product={product}/>);
      });

      if (productRows.length)
        rows.push(<CategoryRow key={productCategory.categoryName} productCategory={productCategory}/>);

      rows = rows.concat(productRows);
    });

    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

var ProductCatalog = React.createClass({
  propTypes: {
    productCatalog: PropTypes.productCatalog
  },
  getInitialState() {
    return {
      searchQuery: ''
    };
  },
  handleQueryChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  },
  render() {
    return (
      <div>
        <h2>Product Catalog</h2>
        <input type="search" placeholder="search" onChange={this.handleQueryChange} value={this.state.searchQuery}/>
        <br/>
        <div>
          <FilterableProductTable productCatalog={this.props.productCatalog} filterBy={this.state.searchQuery}/>
        </div>
      </div>
    );
  }
});

React.render(
  <ProductCatalog productCatalog={CATALOG}/>,
  document.getElementById('app')
);
