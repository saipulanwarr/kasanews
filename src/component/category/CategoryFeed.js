import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from '../category/CategoryItem';

class CategoryFeed extends Component {
    render(){
        const { categories } = this.props;

        return categories.map((category, idx) => <CategoryItem key={category._id} category={category} idx={idx} />);
    }
}

CategoryFeed.propTypes = {
    categories: PropTypes.array.isRequired
};

export default CategoryFeed;