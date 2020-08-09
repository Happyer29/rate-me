/* eslint-disable no-undef */
import { Links } from '/imports/api/links/links.js';
import { Meteor } from 'meteor/meteor';
import './info.html';

Template.info.onCreated(function () {
  Meteor.subscribe('links.all');
});

Template.info.helpers({
  links() {
    return Links.find({});
  },
});

Template.info.events({
  'submit .info-link-add'(event) {
    event.preventDefault();

    const { target } = event;
    const { title } = target;
    const { url } = target;

    Meteor.call('links.insert', title.value, url.value, (error) => {
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.error);
      } else {
        title.value = '';
        url.value = '';
      }
    });
  },
});
