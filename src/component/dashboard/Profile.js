import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';


class Profile extends Component{
    render(){
        const { profile } = this.props.profile;
        return(
            <div>
                <div className="row justify-content-between">
                    <div className="col-4" style={{ marginTop: '20px' }}>
                        <p style={{ fontSize: '20px' }}> Welcome <span style={{ color: '#17a2b8' }}> {profile ? profile.name : ''}</span></p>
                    </div>
                </div>
            <hr />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);