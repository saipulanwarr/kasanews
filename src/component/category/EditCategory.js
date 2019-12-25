import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategory, updateCategory } from '../../actions/categoryActions';
import Profile from '../dashboard/Profile';
import TextFieldGroup from '../common/TextFieldGroup';

class EditCategory extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getCategory(this.props.match.params.categoryId);
    }

    componentWillReceiveProps(newProps){
        if(newProps.category.category){
            this.setState({ name: newProps.category.category.name })
        }

        if(newProps.errors){
            this.setState({ errors: newProps.errors });
        }
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault();

        const newCategory = {
            name: this.state.name
        };

        this.props.updateCategory(this.props.match.params.categoryId, newCategory);
        this.setState({ name: '' });
        this.props.history.push('/category');
    }

    render(){

        return(
            <div className="container">
                <Profile />
                <form style={{ width: '50%', marginTop: '20px' }} onSubmit={this.onSubmit}>
                    <p style={{ fontSize: '20px', color: '#17a2b8' }}>Edit Category</p>
                    <div className="form-group">
                        <label>Name Category</label>
                        <TextFieldGroup 
                            type="text" 
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange} 
                            error={this.state.errors.name}
                        />
                    </div>
                    <button type="submit" className="btn btn-info" style={{ width: '100%' }}>Save</button>
                </form>
            </div>
        )
    }
}

EditCategory.propTypes = {
    getCategory: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    category: state.category,
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { getCategory, updateCategory })(EditCategory);