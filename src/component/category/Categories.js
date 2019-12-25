import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import Profile from '../dashboard/Profile';
import CategoryFeed from '../category/CategoryFeed';
import { getCategories } from '../../actions/categoryActions';

class Categories extends Component {
    componentDidMount(){
        this.props.getCategories();
    }

    render(){
        const { categories, loading } = this.props.category;
        let categoryContent;

        if(categories === null || loading){
            categoryContent = <Spinner />;
        }else{
            categoryContent = <CategoryFeed categories={categories} />;
        }
        
        return(
            <div className="container">
                <Profile />
                <div className="row justify-content-between">
                    <div className="col-4" style={{ marginTop: '10px' }}>
                        <p style={{ color: '#17a2b8', fontSize: '20px' }}>List Category</p>
                    </div>
                    <div className="col-4" style={{ marginTop: '10px' }}>
                        <Link to="/create-category" className="btn btn-info btn-sm" style={{ marginLeft: '70%' }}>Add Category</Link>
                    </div>
                </div>
                
                <table className="table table-sm table-bordered">
                    <thead style={{ color: '#17a2b8' }}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryContent}
                    </tbody>
                </table>

                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className="page-item disabled">
                            <Link className="page-link" to="#" aria-disabled="true">Previous</Link>
                        </li>
                        <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                        <li className="page-item">
                            <Link className="page-link" to="#">Next</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    category: state.category
})

export default connect(mapStateToProps, { getCategories })(Categories);
