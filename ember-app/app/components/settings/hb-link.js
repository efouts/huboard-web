import Ember from 'ember';

var HbLinkComponent = Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ["isLinked:hb-state-link:hb-state-unlink"],
  classNames: ["hb-widget-link"],
  isLinked: function(){
    return this.get("parent.board.columns.length") === this.get("link.board.columns.length");
  }.property("parent.board.columns.[]", 'link.board', "link.board.columns.[]"),
  isDisabled: false,
  actions: {
    remove: function(link) {
      var rawLink = this.get('settings.data.links').find((x) => {
        return Ember.get(x,'repo.full_name') === Ember.get(link, 'data.repo.full_name');
      });
      this.get("settings.data.links").removeObject(rawLink);
      Ember.$.ajax({
        url: "/api/"+ this.get('settings.data.repo.full_name') + "/links",
        data: {
          link: link.get('repo.color.name')
        },
        type: 'DELETE',

      });
    },
    copy: function(){

      var component = this,
        apiUrl = "/api/" + this.get("link.data.repo.full_name") + "/columns";

      component.set('isDisabled', true);

      Ember.$.ajax({
        url: apiUrl,
        dataType: 'json',
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify({
          columns: this.get("labels").mapBy('data')
        }),
        success: function(response) {
          component.get('link').load().then(() => {
            component.set('isDisabled', false);
          })
        }
      })
    }
  }
});

export default HbLinkComponent;
