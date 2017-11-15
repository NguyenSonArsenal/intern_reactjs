// reducers/skills.js
// import React from 'react';

let initialSkillsState = [
  {
    id: 1,
    avatar: '/images/1.jpg',
    name: 'One',
    tagline: 'If you have a bad day, catch a wave',
    date_added: '2017-09-01T02:31:12Z'
  },
  {
    id: 2,
    avatar: '/images/2.jpg',
    name: 'Two',
    tagline: 'I am Two f',
    date_added: '2015-01-02T08:00:10Z'
  },
  {
    id: 3,
    avatar: '/images/3.jpg',
    name: 'Three',
    tagline: 'I am Three',
    date_added: '2011-05-01T08:02:07Z'
  },
  {
    id: 4,
    avatar: '/images/4.jpg',
    name: 'Four',
    tagline: 'I am Four',
    date_added: '2016-12-14T08:12:05Z'
  },
  {
    id: 5,
    avatar: '/images/5.jpg',
    name: 'Five',
    tagline: 'I am Five',
    date_added: '2017-05-05T08:08:10Z'
  }
];

let skillsReducer = (state = initialSkillsState, action) => {
  switch (action.type) {
    case 'EDIT_TAGLINE':
      return editTagline(state, action);
  }
  return state;
};


function editTagline(state, action) {
  let clone = [...state];
  let id = action.id -1;
  console.log(id);
  clone.map(function(value, index) {
    if (id == index) {
      clone[index] = {...value, tagline: action.tagline};
      return clone;
    }
  });
  return clone;
}

export default skillsReducer;
