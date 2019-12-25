import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
    onLogoutClick(e){
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }
    render(){
        const { isAuthenticated } = this.props.auth;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        CMS SaNews
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    { isAuthenticated ? 
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/category">
                                        Category
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        News
                                    </Link>
                                </li>
                            </ul>
                            <span className="navbar-text">
                                <Link to="" onClick={this.onLogoutClick.bind(this)}>Logout</Link>
                            </span>
                        </div>
                    :
                        ''
                    }
                </div>
            </nav>

            
        )
    }    
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);