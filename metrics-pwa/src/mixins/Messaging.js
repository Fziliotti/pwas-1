var myMixin = {
  // created: function() {
  //   window.glue.contexts.subscribe('filter', (context, delta, removed) => {
      
  //   })
  // },
  methods: {
    subscribe: function(name, subscriber) {
      if ( name === undefined ) return
      window.glue.contexts.subscribe(name, (context, delta, removed) => {
        if ( subscriber !== undefined ) {
          subscriber(context, delta, removed)
        }
      })
    },

    filter: function(filter) {

      if ( window.glue != undefined ) {
        alert('GLUE42: Filtering message ' + filter);
        window.glue.contexts.update('filter', filter);
      }
      else {
        alert('WEBSockets: Filtering message ' + filter);
        this.$socket.emit('filterByDate', filter);
      }
    }
  }
};

export default myMixin;
