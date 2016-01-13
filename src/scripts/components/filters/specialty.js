'use strict';

var React = require('react');
var _ = require('underscore');

var SpecialtyFilter = React.createClass({
  
  _onChange: function(evt) {
    var specialtyCode = evt.target.selectedOptions[0].value;
    var filteredDoctors = this.props.doctors.filter(function(doctor) {
      return doctor.specialty_code === specialtyCode;
    });
    this.props.handleFiltered(filteredDoctors);
  },

  render: function() {
    var specialties = {};

    this.props.doctors.forEach(function(doctor) {

      if (!specialties[doctor.specialty_code]) {
        var newSpecialty = {
          full: doctor.specialty,
          count: 1
        }

        specialties[doctor.specialty_code] = newSpecialty;
      } else {
        specialties[doctor.specialty_code].count++
      }

    });

    var createOption = function (specialty, i) {
      return (
          <option value={specialty} >{specialty}</option>
      );
    };

    var options = [<option selected disabled>Choose specialty</option>];

    for (var specialty in specialties) {
      if (specialties.hasOwnProperty(specialty)) {
        options.push(
          <option value={specialty} key={specialty}>
            {specialties[specialty].full} ({specialties[specialty].count})
          </option>
        )
      }
    }


    return (
      <div className="form-group">
        <label htmlFor="specialties">Specialties</label>
        <select onChange={this._onChange}
          name="specialties" 
          className="form-control"
        >
          {options}
        </select>
      </div>
    );
  }

});

module.exports = SpecialtyFilter;
