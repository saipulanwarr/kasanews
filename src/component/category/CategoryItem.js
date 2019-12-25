import React, { Component } from 'react';
import PropTypes from 'prop-types';
import setTime from '../../utils/setTime';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCategory } from '../../actions/categoryActions';

class CategoryItem extends Component {
    onDeleteClick(id){
        this.props.deleteCategory(id);
    }

    render(){
        const { category, idx } = this.props;
        return(
            <tr>
                <td>{idx + 1}</td>
                <td>{category.name}</td>
                <td>{category.createdAt ? setTime(category.createdAt) : ''}</td>
                <td>{category.updatedAt ? setTime(category.updatedAt) : ''}</td>
                <td>
                    <Link className="btn btn-warning btn-sm" to={`/edit-category/${category.categoryId}`}>edit</Link>
                    <button onClick={this.onDeleteClick.bind(this, category.categoryId)} className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }}>delete</button>
                </td>
            </tr>
        )
    }
}

CategoryItem.propTypes = {
    deleteCategory: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { deleteCategory })(CategoryItem);