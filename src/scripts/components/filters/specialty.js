'use strict';

var React = require('react');
var _ = require('underscore');

var specialties = [
  {
    code: 'AME',
    full: 'Addiction Medicine',
    count: 3
  },
  {
    code: 'ASM',
    full: 'Aerospace Medicine',
    count: 1,
  },
];

var SpecialtyFilter = React.createClass({
  

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

    var options = [];

    for (var specialty in specialties) {
      if (specialties.hasOwnProperty(specialty)) {
        options.push(
          <option value={specialty}>
            {specialties[specialty].full} ({specialties[specialty].count})
          </option>
        )
      }
    }

    return (
      <div className="form-group">
        <label htmlFor="specialties">Specialties</label>
        <select name="specialties" className="form-control">
          {options}
        </select>
      </div>
    );
  }

});

module.exports = SpecialtyFilter;
