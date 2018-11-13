(function (win){
  function Public (){
    //初始化数据
    this.init();
  }

  Public.prototype = {
    init: function (){
      let that = this;
      $('#btn').click(function (){
        that.getName();
      })
    },
    getName: function(){
      $('#name').html('小样儿');
    }
  }

  $.fn.extend({
    Public: new Public()
  })
})(window)