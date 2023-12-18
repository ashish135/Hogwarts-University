// schedule.test.js

import React from 'react';
import { render } from '@testing-library/react';
import ScheduleGrid from '../../components/Schedule/ScheduleGrid';


test('renders ScheduleGrid correctly', () => {
  const schedule = [
    { student: 'Harry Potter', subject: 'Potions Master', teacher: 'Horace Slughorn' },
    { student: 'Hermione Granger', subject: 'Potions Master', teacher: 'Rubeus Hagrid' },
  ];

  const { getByText } = render(<ScheduleGrid schedule={schedule} />);

  expect(getByText('Harry Potter')).toBeInTheDocument();
  expect(getByText('Hermione Granger')).toBeInTheDocument();
  expect(getByText('Horace Slughorn')).toBeInTheDocument();
  expect(getByText('Rubeus Hagrid')).toBeInTheDocument();
});
