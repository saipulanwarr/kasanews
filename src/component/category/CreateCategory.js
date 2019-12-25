import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import Profile from '../dashboard/Profile';
import { addCategory } from '../../actions/categoryActions';

class CreateCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){
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

        this.props.addCategory(newCategory);
        this.setState({ name: '' });
        this.props.history.push('/category');
    }

    render(){
        const { errors } = this.state;

        return(
            <div className="container">
                <Profile />
                <form style={{ width: '50%', marginTop: '20px' }} onSubmit={this.onSubmit}>
                    <p style={{ fontSize: '20px', color: '#17a2b8' }}>Create Category</p>
                    <div className="form-group">
                        <label>Name Category</label>
                        <TextFieldGroup 
                            type="text" 
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange} 
                            error={errors.name}
                        />
                    </div>
                    <button type="submit" className="btn btn-info" style={{ width: '100%' }}>Save</button>
                </form>
            </div>
        )
    }
};

CreateCategory.propTypes = {
    addCategory: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { addCategory }) (CreateCategory);