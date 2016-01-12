'use strict';

var React = require('react');

var DoctorList = React.createClass({

  render: function() {
    var createDoctor = function(doctor, i) {
      return (
        <li key={i}>
          <a href={"/find-your-do#physicians/" + doctor.id}>{doctor.full_name}</a>
          <span style={{marginLeft: '3px', color: '#999'}}>
            {doctor.specialty} &bull; {doctor.gender}
          </span><br />
          <span style={{color: '#999'}}>{doctor.distance} miles</span>
        </li>
      )
    }

    return (
      <ul>
        {this.props.doctors.map(createDoctor)}
      </ul>
    );
  }

});

module.exports = DoctorList;
