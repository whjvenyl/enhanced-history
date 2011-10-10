PageVisitView = Backbone.View.extend({
  className: 'visit page_visit',

  events: {
    'click .delete_visit': 'deleteClicked'
  },

  render: function() {
    $('#pageVisitTemplate').tmpl(this.model.presenter()).appendTo(this.el);
    return this;
  },

  deleteClicked: function(ev) {
    ev.preventDefault();
    var self = this;
    this.model.destroy({
      success: function() {
        var method = (self.isGroupedAndEmpty() ? 'removeGroup' : 'remove');
        self[method]();
      }
    });
  },

  remove: function() {
    $(this.el).slideUp('fast', function() {
      $(this).remove();
    });
  },

  removeGroup: function() {
    $(this.getGroup()).slideUp('fast', function() {
      $(this).remove();
    });
  },

  isGroupedAndEmpty: function() {
    return ($(this.el).parents('.expanded').children().length === 1 ? true : false);
  },

  getGroup: function() {
    return $(this.el).parents('.grouped_visits');
  }
});
