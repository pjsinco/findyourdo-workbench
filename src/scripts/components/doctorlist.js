'use strict';

var React = require('react');

var DoctorList = React.createClass({

  render: function() {
    var createDoctor = function(doctor, i) {
    var genderColor = 
        { color: (doctor.gender == 'Female' ? 'fuchsia' : 'steelblue') };
      return (
        <li key={i}>
          <h5>
            <a href={"/find-your-do#physicians/" + doctor.id}>{doctor.full_name}</a>
          </h5>
          <p style={{color: '#999'}}>
            {doctor.specialty}
            <span style={genderColor}> &#x02591; </span>
          </p>
          <p style={{color: '#999'}}>{doctor.distance} miles</p>
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
