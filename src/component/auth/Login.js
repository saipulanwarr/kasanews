import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    }

    render(){
        const { errors, email, password } = this.state;

        return(
            <div className="container">
                <form style={{ margin: '6% 30% 0 30%' }} onSubmit={this.onSubmit}>
                    <p style={{ textAlign: 'center', fontSize: '25px' }}>Login CMS</p>
                    <div className="form-group">
                        <label>Email Address</label>
                        <TextFieldGroup 
                            type="text" 
                            name="email"
                            value={email} 
                            onChange={this.onChange}
                            error={errors.email}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <TextFieldGroup 
                            type="password" 
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            error={errors.password}
                        />
                    </div>
                    <button type="submit" className="btn btn-info" style={{ width: '100%' }}>Login</button>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser }) (Login);